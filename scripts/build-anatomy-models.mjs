/**
 * bun scripts/build-anatomy-models.mjs /path/to/source-directory
 * The source directory contains resolved-plan.json, obj/*.obj (BodyParts3D 4.0,
 * isa_BP3D_4.0_obj_99), and the five HRA reproductive GLBs plus lung and liver.
 * Sources and licenses: public/models/anatomy/NOTICE.md. No runtime external requests.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
const root = process.argv[2];
if (!root) throw new Error('Pass an anatomical source directory. See NOTICE.md.');
const out = path.resolve('public/models/anatomy');
await mkdir(out, { recursive: true });
const plan = JSON.parse(await readFile(path.join(root, 'resolved-plan.json'), 'utf8'));
const sourceNames = new Map();
const isa = (await readFile(path.join(root,'isa.tsv'),'utf8')).trim().split('\n').slice(1).map(line=>line.split('\t'));
for (const [, name, id] of isa) if (!sourceNames.has(id)) sourceNames.set(id,name);
const manifest = {};
function objGeometry(text) {
  const vertices = [], faces = [];
  for (const line of text.split('\n')) {
    if (line.startsWith('v ')) {
      const [x,y,z] = line.slice(2).trim().split(/\s+/).map(Number);
      vertices.push(x,z,-y); // BodyParts3D: millimetres, Z up -> glTF Y up.
    } else if (line.startsWith('f ')) {
      const indices = line.slice(2).trim().split(/\s+/).map(v=>Number(v.split('/')[0])-1);
      for(let i=1;i<indices.length-1;i++) faces.push(indices[0],indices[i],indices[i+1]);
    }
  }
  const g = new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setIndex(faces);return g;
}
function clipPlane(g, axis, cut, greater, cap = true) {
  const p=g.getAttribute('position'),idx=g.index,vertices=[],segments=[];
  const value=v=>v[axis];const inside=v=>greater?value(v)>=cut:value(v)<=cut;
  const key=v=>v.map(n=>n.toFixed(4)).join(',');
  for(let i=0;i<idx.count;i+=3){
    const tri=[0,1,2].map(j=>{const k=idx.getX(i+j);return [p.getX(k),p.getY(k),p.getZ(k)];});
    const polygon=[],crossings=[];
    for(let j=0;j<3;j++){
      const a=tri[j],b=tri[(j+1)%3],ia=inside(a),ib=inside(b);
      if(ia)polygon.push(a);
      if(ia!==ib){const t=(cut-value(a))/(value(b)-value(a));const v=a.map((n,k)=>n+(b[k]-n)*t);v[axis]=cut;polygon.push(v);crossings.push(v);}
    }
    for(let j=1;j<polygon.length-1;j++)vertices.push(...polygon[0],...polygon[j],...polygon[j+1]);
    if(crossings.length===2)segments.push(crossings);
  }
  if(cap){
    const points=new Map(),edges=new Map();
    for(const [a,b] of segments){const ka=key(a),kb=key(b);if(ka===kb)continue;points.set(ka,a);points.set(kb,b);for(const [x,y] of [[ka,kb],[kb,ka]]){if(!edges.has(x))edges.set(x,new Set());edges.get(x).add(y);}}
    const visited=new Set();
    for(const start of edges.keys()){
      if(visited.has(start))continue;const loop=[];let current=start,previous='';
      while(current&&!visited.has(current)){visited.add(current);loop.push(points.get(current));const next=[...edges.get(current)].find(n=>n!==previous);previous=current;current=next;}
      if(loop.length<3||current!==start)continue;
      const axes=[0,1,2].filter(n=>n!==axis),contour=loop.map(v=>new THREE.Vector2(v[axes[0]],v[axes[1]]));
      for(const face of THREE.ShapeUtils.triangulateShape(contour,[])){
        const a=loop[face[0]],b=loop[face[1]],c=loop[face[2]];
        const n=new THREE.Vector3().crossVectors(new THREE.Vector3(...b).sub(new THREE.Vector3(...a)),new THREE.Vector3(...c).sub(new THREE.Vector3(...a)));
        const ordered=(n.getComponent(axis)>0)===!greater?[a,b,c]:[a,c,b];ordered.forEach(v=>vertices.push(...v));
      }
    }
  }
  const result=new THREE.BufferGeometry();result.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.dispose();
  const welded=mergeVertices(result,.0001);result.dispose();welded.computeVertexNormals();return welded;
}
function cropGeometry(g,low,high){const lower=clipPlane(g,1,low,true);return Number.isFinite(high)?clipPlane(lower,1,high,false):lower;}
function compact(g) {
  const old=g.getAttribute('position'), ids=g.index?Array.from(g.index.array):Array.from({length:old.count},(_,i)=>i);
  const remap=new Map(), positions=[], indices=[];
  for(const id of ids) {
    if(!remap.has(id)){remap.set(id,remap.size);positions.push(old.getX(id),old.getY(id),old.getZ(id));}
    indices.push(remap.get(id));
  }
  const result=new THREE.BufferGeometry();result.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));result.setIndex(indices);result.computeVertexNormals();g.dispose();return result;
}
async function exportGlb(name, parts, copyright) {
  const all=new THREE.Box3();
  for(const p of parts){p.geometry.computeBoundingBox();all.union(p.geometry.boundingBox);}
  const center=all.getCenter(new THREE.Vector3()),size=all.getSize(new THREE.Vector3());
  const scale=3.35/Math.max(size.x,size.y,size.z);
  const chunks=[],views=[],accessors=[],nodes=[],meshes=[],materials=[];let offset=0;
  function accessor(array,type,componentType,min,max,normalized=false,stride=0){
    const bytes=Buffer.from(array.buffer,array.byteOffset,array.byteLength);const view=views.length;
    views.push({buffer:0,byteOffset:offset,byteLength:bytes.length,...(stride?{byteStride:stride,target:34962}:{})});chunks.push(bytes);offset+=bytes.length;
    if(offset%4){const pad=Buffer.alloc(4-offset%4);chunks.push(pad);offset+=pad.length;}
    accessors.push({bufferView:view,componentType,count:stride?bytes.length/stride:array.length/(type==='VEC3'?3:1),type,...(normalized?{normalized:true}:{}),...(min?{min,max}:{})});return accessors.length-1;
  }
  for(const p of parts){
    const g=p.geometry;g.translate(-center.x,-center.y,-center.z);g.scale(scale,scale,scale);g.computeBoundingBox();g.computeVertexNormals();
    const b=g.boundingBox;const color=new THREE.Color(p.color);
    // Quantize vertex data with glTF's standard extension: no extra runtime decoder.
    // VEC3 values have a 4-byte-aligned stride (8 bytes for positions, 4 for normals).
    const count=g.attributes.position.count,positions=new Int16Array(count*4),normals=new Int8Array(count*4);
    for(let i=0;i<count;i++)for(let c=0;c<3;c++){
      positions[i*4+c]=Math.round(g.attributes.position.array[i*3+c]*32767/2);
      normals[i*4+c]=Math.round(g.attributes.normal.array[i*3+c]*127);
    }
    const POSITION=accessor(positions,'VEC3',5122,b.min.toArray().map(v=>Math.round(v*32767/2)),b.max.toArray().map(v=>Math.round(v*32767/2)),true,8);
    const NORMAL=accessor(normals,'VEC3',5120,undefined,undefined,true,4);
    const narrow=count<=65535;
    const indices=accessor(narrow?new Uint16Array(g.index.array):new Uint32Array(g.index.array),'SCALAR',narrow?5123:5125);
    materials.push({name:p.name,pbrMetallicRoughness:{baseColorFactor:[color.r,color.g,color.b,1],metallicFactor:0,roughnessFactor:.58},doubleSided:true});
    meshes.push({name:p.name,primitives:[{attributes:{POSITION,NORMAL},indices,material:materials.length-1}]});nodes.push({name:p.name,mesh:meshes.length-1,scale:[2,2,2]});
  }
  const doc={extensionsUsed:['KHR_mesh_quantization'],extensionsRequired:['KHR_mesh_quantization'],asset:{version:'2.0',generator:'Prathamaa anatomical mesh preparation',copyright},scene:0,scenes:[{nodes:nodes.map((_,i)=>i)}],nodes,meshes,materials,accessors,bufferViews:views,buffers:[{byteLength:offset}]};
  let json=Buffer.from(JSON.stringify(doc));if(json.length%4)json=Buffer.concat([json,Buffer.alloc(4-json.length%4,32)]);
  const bin=Buffer.concat(chunks),header=Buffer.alloc(20),binHeader=Buffer.alloc(8);
  header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(28+json.length+bin.length,8);header.writeUInt32LE(json.length,12);header.writeUInt32LE(0x4e4f534a,16);
  binHeader.writeUInt32LE(bin.length,0);binHeader.writeUInt32LE(0x004e4942,4);
  const result=Buffer.concat([header,json,binHeader,bin]);await writeFile(path.join(out,name+'.glb'),result);
  manifest[name]={bytes:result.length,vertices:parts.reduce((n,p)=>n+p.geometry.attributes.position.count,0),triangles:parts.reduce((n,p)=>n+p.geometry.index.count/3,0),parts:parts.map(p=>p.name),copyright};
  console.log(name,Math.round(result.length/1024)+' KiB',manifest[name].triangles+' triangles');
}
const bpCredit='BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International';
for(const [name,definition] of Object.entries(plan)) {
  if(name==='abdomen')continue;
  const parts=[],seen=new Set();
  for(const group of definition.parts)for(const id of group.ids){
    if(seen.has(id))continue;seen.add(id);
    let geometry=objGeometry(await readFile(path.join(root,'obj',id+'.obj'),'utf8'));
    if(group.clipSide){
      const jaw=objGeometry(await readFile(path.join(root,'obj','FJ3289.obj'),'utf8'));jaw.computeBoundingBox();
      geometry=cropGeometry(geometry,jaw.boundingBox.min.y-15,Infinity);
      geometry=clipPlane(geometry,0,0,true,false);
    }
    parts.push({geometry,name:id+' · '+sourceNames.get(id),color:group.color});
  }
  if(definition.crop==='ear')for(const p of parts)p.geometry=clipPlane(p.geometry,0,0,true,false);
  if(definition.crop==='knee'){
    const patella=parts.find(p=>p.name.startsWith('FJ3381')).geometry;patella.computeBoundingBox();
    const middle=patella.boundingBox.getCenter(new THREE.Vector3()).y;
    for(const p of parts)p.geometry=cropGeometry(p.geometry,middle-105,middle+105);
  }
  if(definition.crop==='head') {
    // Crop the atlas body surface above the base of the mandible; no invented geometry.
    const jaw=objGeometry(await readFile(path.join(root,'obj','FJ3289.obj'),'utf8'));jaw.computeBoundingBox();
    for(const p of parts)p.geometry=cropGeometry(p.geometry,jaw.boundingBox.min.y-15,Infinity);
  }
  for(const p of parts)p.geometry=compact(p.geometry);
  await exportGlb(name,parts,bpCredit);
}
async function hraParts(file,filter,color) {
  const b=await readFile(path.join(root,file));const gltf=await new GLTFLoader().parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');
  gltf.scene.updateMatrixWorld(true);const parts=[];
  gltf.scene.traverse(o=>{
    if(o.isMesh&&filter(o.name)) {
      const geometry=compact(o.geometry.clone().applyMatrix4(o.matrixWorld));
      parts.push({geometry,name:o.name,color:typeof color==='function'?color(o.name):color});
    }
  });return parts;
}
const hraCredit='Human Reference Atlas / HuBMAP, Kristen Browne and Heidi Schlehlein; Visible Human Dataset, National Library of Medicine. CC BY 4.0. Modified: selected meshes, recentered, recolored.';
const reproductive=[];
for(const file of [
 '3d-vh-f-uterus.glb',
 '3d-vh-f-fallopian-tube-l.glb',
 '3d-vh-f-fallopian-tube-r.glb',
 '3d-vh-f-ovary-l.glb',
 '3d-vh-f-ovary-r.glb',
])reproductive.push(...await hraParts(file,()=>true,n=>n.includes('ovary')?'#d9ba96':'#c18480'));
await exportGlb('reproductive',reproductive,hraCredit);
const lungs=await hraParts('3d-vh-f-lung.glb',n=>/bronchopulmonary_seg|lobar_bronchus/.test(n),n=>n.includes('seg')?'#cc9695':'#d7c4ad');
if(!lungs.length)throw new Error('Missing lung surfaces');
await exportGlb('lungs',lungs,hraCredit);
const liver=await hraParts('3d-vh-f-liver.glb',n=>/segment|quadrate_lobe|caudate_lobe/.test(n),'#ad6b56');
await exportGlb('liver',liver,hraCredit);
await writeFile(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');

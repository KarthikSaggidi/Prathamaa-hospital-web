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
import { compact, exportGlb as writeGlb } from './anatomy-glb-utils.mjs';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
const root = process.argv[2];
if (!root) throw new Error('Pass an anatomical source directory. See NOTICE.md.');
const out = path.resolve('public/models/anatomy');
await mkdir(out, { recursive: true });
const plan = JSON.parse(await readFile(path.join(root, 'resolved-plan.json'), 'utf8'));
const sourceNames = new Map();
const isa = (await readFile(path.join(root,'isa.tsv'),'utf8')).trim().split('\n').slice(1).map(line=>line.split('\t'));
for (const [, name, id] of isa) if (!sourceNames.has(id)) sourceNames.set(id,name);
const manifest = JSON.parse(await readFile(path.join(out, 'manifest.json'), 'utf8').catch(() => '{}'));
const exportGlb = (name, parts, copyright) => writeGlb(name, parts, copyright, out, manifest);
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

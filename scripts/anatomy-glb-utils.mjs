import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as THREE from 'three';
export function compact(g) {
  const old=g.getAttribute('position'), ids=g.index?Array.from(g.index.array):Array.from({length:old.count},(_,i)=>i);
  const remap=new Map(), positions=[], indices=[];
  for(const id of ids) {
    if(!remap.has(id)){remap.set(id,remap.size);positions.push(old.getX(id),old.getY(id),old.getZ(id));}
    indices.push(remap.get(id));
  }
  const result=new THREE.BufferGeometry();result.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));result.setIndex(indices);result.computeVertexNormals();g.dispose();return result;
}
export async function exportGlb(name, parts, copyright, out, manifest) {
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
    materials.push({name:p.name,pbrMetallicRoughness:{baseColorFactor:[color.r,color.g,color.b,1],metallicFactor:p.metalness ?? 0,roughnessFactor:p.roughness ?? .58},doubleSided:true});
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

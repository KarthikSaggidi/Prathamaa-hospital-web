// Geometry QA: rasterized front-view contact sheet, independent of browser/WebGL.
import {readFile,writeFile} from 'node:fs/promises';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
const files=Object.keys(JSON.parse(await readFile('public/models/anatomy/manifest.json','utf8')));
const cell=280,W=cell*4,H=cell*4,rgb=Buffer.alloc(W*H*3,246),depth=new Float32Array(W*H).fill(-Infinity);
for(let m=0;m<files.length;m++){
 const b=await readFile(`public/models/anatomy/${files[m]}.glb`),g=await new GLTFLoader().parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');
 const cx=(m%4)*cell+cell/2,cy=Math.floor(m/4)*cell+cell/2;
 const rot=new THREE.Matrix4().makeRotationY(-.2);const light=new THREE.Vector3(-.4,.5,1).normalize();
 g.scene.updateMatrixWorld(true);
 g.scene.traverse(o=>{
  if(!o.isMesh)return;
  const p=o.geometry.attributes.position,n=o.geometry.attributes.normal,idx=o.geometry.index;
  const verts=[];for(let i=0;i<p.count;i++){const v=new THREE.Vector3().fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld).applyMatrix4(rot);const normal=new THREE.Vector3().fromBufferAttribute(n,i).transformDirection(rot);verts.push([cx+v.x*65,cy-v.y*65,v.z,Math.max(.15,normal.dot(light))]);}
  const color=o.material.color.clone().convertLinearToSRGB();
  for(let i=0;i<idx.count;i+=3){const a=verts[idx.getX(i)],b=verts[idx.getX(i+1)],c=verts[idx.getX(i+2)];
   const area=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(area)<.01)continue;
   const x0=Math.max(Math.floor(cx-cell/2),Math.floor(Math.min(a[0],b[0],c[0]))),x1=Math.min(cx+cell/2-1,Math.ceil(Math.max(a[0],b[0],c[0])));
   const y0=Math.max(Math.floor(cy-cell/2),Math.floor(Math.min(a[1],b[1],c[1]))),y1=Math.min(cy+cell/2-1,Math.ceil(Math.max(a[1],b[1],c[1])));
   for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
    const u=((b[1]-c[1])*(x-c[0])+(c[0]-b[0])*(y-c[1]))/area,v=((c[1]-a[1])*(x-c[0])+(a[0]-c[0])*(y-c[1]))/area,w=1-u-v;
    if(u<0||v<0||w<0)continue;const z=u*a[2]+v*b[2]+w*c[2],pixel=y*W+x;
    if(z<=depth[pixel])continue;depth[pixel]=z;const shade=.5+.5*(u*a[3]+v*b[3]+w*c[3]);
    rgb[pixel*3]=Math.min(255,color.r*255*shade);rgb[pixel*3+1]=Math.min(255,color.g*255*shade);rgb[pixel*3+2]=Math.min(255,color.b*255*shade);
   }
  }
 });
 console.log(m,files[m]);
}
await writeFile('/tmp/prathamaa-anatomy/contact-sheet.ppm',Buffer.concat([Buffer.from(`P6\n${W} ${H}\n255\n`),rgb]));

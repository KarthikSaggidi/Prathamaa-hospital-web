/** Rebuild: python3 scripts/fetch-anatomy-sources.py /tmp/prathamaa-anatomy scripts/specialty-anatomy-plan.json
 * node scripts/build-specialty-models.mjs /tmp/prathamaa-anatomy
 * Atlas meshes retain their original spatial relationships. Skin and instruments are original illustrations.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { compact, exportGlb } from './anatomy-glb-utils.mjs';
const root = process.argv[2];
const out = path.resolve('public/models/anatomy');
const manifest = JSON.parse(await readFile(path.join(out, 'manifest.json'), 'utf8'));
const originalCredit = 'Original Prathamaa specialty illustration. Not a patient scan or a medical-device specification.';
const atlasCredit = 'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International';
const parts = [];
function add(name, geometry, color, position = [0,0,0], rotation = [0,0,0], finish = {}) {
  geometry.rotateX(rotation[0]); geometry.rotateY(rotation[1]); geometry.rotateZ(rotation[2]);
  geometry.translate(...position); parts.push({ name, geometry, color, ...finish });
}
function ball(name, position, size, color, finish) {
  const g = new T.SphereGeometry(1, 24, 16); g.scale(...size); add(name, g, color, position, undefined, finish);
}
function tube(name, points, radius, color, finish, segments = 72) {
  add(name, new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p))), segments, radius, 12, false), color, undefined, undefined, finish);
}
function cylinder(name, radius, depth, position, color, finish, rotation = [Math.PI/2,0,0]) {
  add(name, new T.CylinderGeometry(radius, radius, depth, 64), color, position, rotation, finish);
}
async function save(name) {
  // Batch repeated fine details by material to keep GPU draw calls low.
  const groups = new Map();
  for (const p of parts) {
    const key = [p.name,p.color,p.metalness,p.roughness].join('|');
    if (!groups.has(key)) groups.set(key, { ...p, geometries: [] });
    groups.get(key).geometries.push(p.geometry.index ? p.geometry.toNonIndexed() : p.geometry);
  }
  const batched = [...groups.values()].map(p => ({ ...p, geometry: compact(mergeVertices(mergeGeometries(p.geometries), .00001)) }));
  await exportGlb(name, batched, originalCredit, out, manifest); parts.length = 0;
}
// Pediatric examination: a small diaphragm, soft tubing, stainless binaurals and an infant thermometer.
const metal = { metalness: .86, roughness: .24 };
const rubber = { roughness: .78 };
tube('Soft pediatric stethoscope tubing', [[-.53,1.02,0],[-.48,.52,0],[-.6,-.38,0],[-.24,-.92,0],[.42,-.83,0],[.64,-.2,.02],[.66,.08,.04]], .065, '#4a9f9c', rubber);
tube('Left stainless binaural', [[-.53,1.02,0],[-.56,1.28,0],[-.47,1.55,.02],[-.3,1.69,.04]], .033, '#d4dce1', metal);
tube('Right stainless binaural', [[-.53,1.02,0],[-.19,1.1,0],[.04,1.4,.02],[.03,1.65,.04],[-.06,1.72,.04]], .033, '#d4dce1', metal);
tube('Binaural spring', [[-.53,1.06,0],[-.38,1.23,0],[-.13,1.24,0],[.01,1.4,0]], .018, '#c7d0d4', metal);
ball('Soft ear tips',[-.28,1.68,.04],[.082,.055,.06],'#324951',rubber);
ball('Soft ear tips',[-.07,1.73,.04],[.082,.055,.06],'#324951',rubber);
cylinder('Small pediatric chestpiece', .26,.11,[.66,.27,.04],'#cbd5dc',metal);
cylinder('Diaphragm retaining ring',.238,.025,[.66,.27,.111],'#e5edef',metal);
cylinder('Pediatric diaphragm',.209,.012,[.66,.27,.13],'#edf1ed',{roughness:.56});
cylinder('Diaphragm center',.055,.005,[.66,.27,.14],'#67aaa5',{roughness:.5});
// A separate rounded thermometer makes this an examination set, not a reused cardiology symbol.
ball('Infant thermometer body',[1.05,-.57,.05],[.12,.42,.075],'#eceee7',{roughness:.38});
ball('Thermometer grip',[1.05,-.76,.057],[.105,.17,.08],'#d8b878',{roughness:.6});
add('Thermometer display',new T.BoxGeometry(.13,.14,.015),'#738c83',[1.05,-.49,.125]);
add('Thermometer probe',new T.CylinderGeometry(.023,.032,.31,24),'#d1dade',[1.05,-.14,.05],undefined,metal);
ball('Thermometer sensor',[1.05,.02,.05],[.027,.035,.027],'#c0cbd1',metal);
await save('pediatric-examination');
// Dermatology: layered tissue block, embedded follicles, sebaceous glands, coiled sweat glands and vessels.
const width=2.6, depth=1.55;
add('Subcutaneous tissue',new T.BoxGeometry(width,.4,depth,32,4,20),'#d5ac68',[0,-.63,0]);
add('Reticular dermis',new T.BoxGeometry(width,.65,depth,32,6,20),'#bf7974',[0,-.105,0]);
add('Papillary dermis',new T.BoxGeometry(width,.21,depth,32,4,20),'#d99a91',[0,.325,0]);
add('Epidermis',new T.BoxGeometry(width,.11,depth,64,3,32),'#bf8f75',[0,.485,0]);
// Open the front tissue wall so the embedded structures are visible on arrival.
for (const p of parts) {
  const g=p.geometry, normals=g.attributes.normal;
  const indices=Array.from(g.index.array), visible=[];
  for(let i=0;i<indices.length;i+=3)if(normals.getZ(indices[i])<.9)visible.push(...indices.slice(i,i+3));
  g.setIndex(visible);g.clearGroups();
}
// Fine surface relief instead of a featureless slab.
const surface=new T.PlaneGeometry(width,depth,110,70); surface.rotateX(-Math.PI/2);
const positions=surface.attributes.position;
for(let i=0;i<positions.count;i++) {
  const x=positions.getX(i),z=positions.getZ(i);
  positions.setY(i,.546 + .006*Math.sin(x*53)*Math.cos(z*47) + .003*Math.sin(x*121+z*73));
}
surface.computeVertexNormals();add('Skin microrelief',surface,'#c79b80');
for(let x=-1.17;x<1.2;x+=.24)for(let z=-.63;z<.7;z+=.25) {
  ball('Adipose lobules',[x,-.64+.028*Math.sin(x*17+z*23),z],[.145,.145,.145],'#e2bd7f',{roughness:.8});
}
for(const [x,z,lean] of [[-.76,-.28,-.12],[.17,.17,.12],[.85,-.16,-.1]]) {
  tube('Hair follicle sheath',[[x,-.43,z],[x-.03,-.1,z],[x+lean,.25,z],[x+lean,.54,z]],.066,'#e4b3a0',undefined,40);
  ball('Hair bulb',[x,-.42,z],[.079,.105,.079],'#a96c63');
  tube('Hair shaft',[[x,-.42,z],[x-.03,0,z],[x+lean,.52,z],[x+lean*1.8,.92,z+.06]],.018,'#493b30',undefined,48);
  for(let k=0;k<6;k++)ball('Sebaceous gland',[x+.09+.036*Math.cos(k),.1+.06*Math.sin(k),z+.02*Math.sin(k*2)],[.055,.053,.05],'#e6bf86');
  tube('Arrector pili muscle',[[x+.34,-.08,z],[x+.23,.17,z],[x+lean,.37,z]],.025,'#ac5b59',undefined,24);
}
for(const [x,z] of [[-.38,.55],[.59,.53]]) {
  const coil=[];for(let i=0;i<=260;i++){const t=i/260*Math.PI*14;coil.push([x+.095*Math.cos(t),-.29+i/260*.16,z+.08*Math.sin(t)]);}
  tube('Coiled sweat gland',coil,.022,'#d6aea0',undefined,280);
  tube('Sweat duct',[[x+.095,-.13,z],[x+.05,.1,z],[x+.08,.35,z],[x+.08,.55,z]],.019,'#e4bcaa',undefined,48);
}
for(const [color,y,z] of [['#a5444b',-.38,.73],['#627e9e',-.47,.735]]) {
  tube('Dermal vessels', [[-1.27,y,z],[-.7,y+.025,z],[-.1,y,z],[.6,y+.025,z],[1.27,y,z]],.027,color);
  for(let x=-1.05;x<1.2;x+=.32)tube('Capillary loops',[[x,y,z],[x+.02,.12,z],[x+.06,.29,z],[x+.1,.12,z],[x+.12,y,z]],.009,color,undefined,32);
}
tube('Sensory nerve',[[-1.2,-.56,.76],[-.65,-.39,.76],[-.2,-.24,.76],[.4,-.18,.76],[1.2,-.05,.76]],.014,'#e4c577');
for(let x=-.8;x<1.1;x+=.4)tube('Sensory nerve endings',[[x,-.3,.76],[x+.07,.1,.76],[x+.15,.36,.76]],.008,'#edcf87',undefined,24);
await save('skin-cross-section');
if (!root) throw new Error('Pass the atlas source directory to build the remaining five models.');
const plan=JSON.parse(await readFile(path.join(root,'resolved-specialty-plan.json'),'utf8'));
const names = new Map();
for(const file of ['isa.tsv','partof.tsv'])for(const line of (await readFile(path.join(root,file),'utf8')).split('\n').slice(1)) {
  const [,name,id]=line.split('\t'); if(!names.has(id))names.set(id,name);
}
for(const [name,definition] of Object.entries(plan)) {
  const atlasParts=[],seen=new Set();
  for(const group of definition.parts) {
    const geometries=[], identifiers=[];
    for(const id of group.ids) {
    if(seen.has(id))continue;seen.add(id);
    const obj=new OBJLoader().parse(await readFile(path.join(root,'obj',id+'.obj'),'utf8'));
    obj.traverse(mesh=>{if(mesh.isMesh){const geometry=mesh.geometry.clone();geometry.rotateX(-Math.PI/2);geometries.push(geometry);identifiers.push(id+' · '+names.get(id));}});
  }
    if(name==='medicine-torso' && group.names.includes('left lung')) {
      // Register the HRA lung surfaces to the atlas lung-region bounds, preserving
      // the native positions of the remaining BodyParts3D organs.
      const target=new T.Box3();
      for(const geometry of geometries){geometry.computeBoundingBox();target.union(geometry.boundingBox);}
      const bytes=await readFile(path.join(out,'lungs.glb'));
      const gltf=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
      gltf.scene.updateMatrixWorld(true);
      const bounds=new T.Box3().setFromObject(gltf.scene);
      const sourceSize=bounds.getSize(new T.Vector3()),targetSize=target.getSize(new T.Vector3());
      const scale=Math.min(targetSize.x/sourceSize.x,targetSize.y/sourceSize.y);
      const center=bounds.getCenter(new T.Vector3()),destination=target.getCenter(new T.Vector3());
      const lungParts=[];
      gltf.scene.traverse(mesh=>{if(mesh.isMesh){
        const geometry=compact(mesh.geometry.clone()).applyMatrix4(mesh.matrixWorld);
        geometry.translate(-center.x,-center.y,-center.z);geometry.scale(scale,scale,scale);
        geometry.translate(destination.x,destination.y,destination.z);lungParts.push(geometry.toNonIndexed());
      }});
      atlasParts.push({geometry:compact(mergeVertices(mergeGeometries(lungParts),.00001)),name:'HRA / HuBMAP · lung surfaces and lobar bronchi',color:group.color});
      continue;
    }
    if(name==='anesthesia-airway' && group.names.includes('esophagus'))continue;
    if(geometries.length)atlasParts.push({geometry:compact(mergeVertices(mergeGeometries(geometries),.00001)),name:identifiers.join('; '),color:group.color});
  }
  await exportGlb(name,atlasParts,name==='medicine-torso' ? atlasCredit+'; Human Reference Atlas / HuBMAP, Kristen Browne and Heidi Schlehlein, Visible Human Dataset, National Library of Medicine, CC BY 4.0. Lung surfaces registered to atlas lung-region bounds.' : atlasCredit,out,manifest);
}
await writeFile(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');

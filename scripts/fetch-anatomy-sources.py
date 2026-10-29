"""Fetch selected CC BY 4.0 atlas meshes. See public/models/anatomy/NOTICE.md.
Usage: python3 scripts/fetch-anatomy-sources.py /tmp/prathamaa-anatomy
"""
import csv,json,concurrent.futures,pathlib,urllib.request,struct,zlib,io,zipfile,sys
BASE='https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/'
URL=BASE+'isa_BP3D_4.0_obj_99.zip'
class Remote(io.RawIOBase):
 def __init__(self):self.pos=0;self.size=int(urllib.request.urlopen(urllib.request.Request(URL,method='HEAD')).headers['Content-Length'])
 def seekable(self):return True
 def seek(self,n,w=0):
  self.pos=n if w==0 else self.pos+n if w==1 else self.size+n
  return self.pos
 def tell(self):return self.pos
 def read(self,n=-1):
  if n<0:n=self.size-self.pos
  if not n:return b''
  req=urllib.request.Request(URL,headers={'Range':f'bytes={self.pos}-{min(self.size-1,self.pos+n-1)}'})
  with urllib.request.urlopen(req,timeout=90) as r:
   if r.status!=206:raise RuntimeError('Range unsupported')
   b=r.read()
  self.pos+=len(b);return b
root=pathlib.Path(sys.argv[1]);(root/'obj').mkdir(parents=True,exist_ok=True)
for name,dest in [('isa_element_parts.txt','isa.tsv'),('partof_element_parts.txt','partof.tsv')]:
 if not (root/dest).exists():urllib.request.urlretrieve(BASE+name,root/dest)
z=zipfile.ZipFile(Remote())
json.dump([{'name':i.filename,'size':i.file_size,'compressed':i.compress_size,'offset':i.header_offset} for i in z.infolist()],open(root/'zip-index.json','w'))
isa=list(csv.reader(open(root/'isa.tsv'),delimiter='\t'))[1:];part=list(csv.reader(open(root/'partof.tsv'),delimiter='\t'))[1:]
plan_path=pathlib.Path(sys.argv[2]) if len(sys.argv)>2 else pathlib.Path(__file__).with_name('anatomy-plan.json')
plan=json.load(open(plan_path))

needed=set()
for model in plan.values():
 for group in model['parts']:
  ids=[]
  for name in group['names']:
   src=part if group.get('relation')=='partof' else isa
   matches=[r[2] for r in src if r[1]==name] or [r[2] for r in part if r[1]==name]
   if not matches:raise ValueError(name)
   ids+=matches
  group['ids']=sorted(set(ids));needed.update(ids)
resolved_name='resolved-specialty-plan.json' if len(sys.argv)>2 else 'resolved-plan.json'
json.dump(plan,open(root/resolved_name,'w'),indent=2)
index={p['name'].split('/')[-1].removesuffix('.obj'):p for p in json.load(open(root/'zip-index.json'))}
def fetch(id):
 dest=root/'obj'/f'{id}.obj'
 if dest.exists():return
 p=index[id];start=p['offset'];end=start+30+len(p['name'].encode())+2048+p['compressed']
 req=urllib.request.Request(URL,headers={'Range':f'bytes={start}-{end}'})
 with urllib.request.urlopen(req,timeout=120) as r:
  if r.status!=206:raise RuntimeError('Range not supported')
  b=r.read()
 n,e=struct.unpack_from('<HH',b,26);begin=30+n+e;method=struct.unpack_from('<H',b,8)[0]
 data=zlib.decompress(b[begin:begin+p['compressed']],-15) if method==8 else b[begin:begin+p['compressed']]
 assert len(data)==p['size']
 dest.write_bytes(data)
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as ex:list(ex.map(fetch,sorted(needed)))
print('Downloaded',len(needed),'anatomy components',flush=True)

if len(sys.argv)>2:sys.exit(0)

HRA_SOURCES = ['https://cdn.humanatlas.io/digital-objects/ref-organ/fallopian-tube-female-left/v1.2/assets/3d-vh-f-fallopian-tube-l.glb', 'https://cdn.humanatlas.io/digital-objects/ref-organ/fallopian-tube-female-right/v1.2/assets/3d-vh-f-fallopian-tube-r.glb', 'https://cdn.humanatlas.io/digital-objects/ref-organ/ovary-female-left/v1.3/assets/3d-vh-f-ovary-l.glb', 'https://cdn.humanatlas.io/digital-objects/ref-organ/ovary-female-right/v1.3/assets/3d-vh-f-ovary-r.glb', 'https://cdn.humanatlas.io/digital-objects/ref-organ/uterus-female/v1.2/assets/3d-vh-f-uterus.glb', 'https://cdn.humanatlas.io/digital-objects/ref-organ/lung-female/v1.4/assets/3d-vh-f-lung.glb', 'https://cdn.humanatlas.io/digital-objects/ref-organ/liver-female/v1.2/assets/3d-vh-f-liver.glb']
for url in HRA_SOURCES:
 dest=root/url.rsplit('/',1)[1]
 if not dest.exists():urllib.request.urlretrieve(url,dest)
print('All anatomical sources ready.')

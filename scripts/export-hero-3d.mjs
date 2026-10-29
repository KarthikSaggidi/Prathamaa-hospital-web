/** Export generated campaign sources as high-quality 3840×1800 WebP artwork.
 * node scripts/export-hero-3d.mjs /path/to/sources.json
 * Input: [{ "id": "hospital-intro", "source": "/path/to/generated.png" }, ...]
 * Sources are retained. The metadata records native and resampled dimensions.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const input = process.argv[2];
if (!input) throw new Error('Pass a JSON array of campaign IDs and generated source paths.');
const entries = JSON.parse(await readFile(input, 'utf8'));
const folder = path.resolve('public/images/hero-banners');
const assets = [];
for (const { id, source } of entries) {
  if (!/^[a-z]+(?:-[a-z]+)*$/.test(id)) throw new Error('Invalid campaign ID');
  const native = await sharp(source).metadata();
  const file = `${id}-3d-4k.webp`;
  const info = await sharp(source).rotate().resize(3840, 1800, { fit: 'fill', kernel: 'lanczos3' })
    .webp({ quality: 98, smartSubsample: true, effort: 6 }).toFile(path.join(folder, file));
  assets.push({ id, file, nativeWidth: native.width, nativeHeight: native.height,
    width: info.width, height: info.height, bytes: info.size,
    mode: 'built-in image_gen', export: 'Lanczos3 resample; WebP quality 98, smart chroma subsampling' });
  console.log(`${id}: ${native.width}×${native.height} source → ${info.width}×${info.height}, ${Math.round(info.size/1024)} KiB`);
}
await writeFile(path.join(folder, '3d-artwork.json'), JSON.stringify(assets, null, 2) + '\n');

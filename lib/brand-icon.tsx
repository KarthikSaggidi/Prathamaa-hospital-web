import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export async function brandIcon(size: number) {
  const image = await readFile(join(process.cwd(), 'public/images/prathamaa-hospital-symbol.png'));
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: Math.round(size * .07) }}>
      {/* This is a generated image, so next/image is not used here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${image.toString('base64')}`} alt="" width={Math.round(size * .86)} height={Math.round(size * .86)} style={{ objectFit: 'contain' }} />
    </div>,
    { width: size, height: size },
  );
}

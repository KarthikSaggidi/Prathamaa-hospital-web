import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = 'Prathamaa Hospital — multispeciality care in Hyderabad';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/images/prathamaa-hospital-logo.png'));
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '45px 62px', background: 'linear-gradient(120deg, #ffffff, #fff0e3)', color: '#092d52' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* ImageResponse requires a native image element rather than next/image. */}
        <img src={`data:image/png;base64,${logo.toString('base64')}`} width={390} height={130} alt="Prathamaa Hospital and First Cuddle" />
        <span style={{ fontSize: 20, color: '#526c89' }}>HYDERABAD, TELANGANA</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24 }}>
        <span style={{ fontSize: 63, fontWeight: 800, lineHeight: 1.15 }}>Your Health,</span>
        <span style={{ fontSize: 73, fontWeight: 800, lineHeight: 1.2, color: '#e54c18' }}>Our Priority.</span>
        <span style={{ fontSize: 25, lineHeight: 1.5, marginTop: 22, color: '#425d75' }}>Multispeciality care. Specialist doctors. Compassionate support.</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 22, borderTop: '1px solid #e7d5c8', fontSize: 21 }}>
        <span>{new URL(site.origin).hostname}</span>
        <span>24/7 Emergency Support · +91 800 900 2444</span>
      </div>
    </div>,
    size,
  );
}

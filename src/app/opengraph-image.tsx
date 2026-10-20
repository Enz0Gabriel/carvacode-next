import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

export const alt = 'CarvaCode: desenvolvimento de software sob medida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public', 'logo-carvacode.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          backgroundColor: '#0c1216',
          backgroundImage:
            'radial-gradient(circle at 85% 0%, rgba(0,168,232,0.22), transparent 55%), radial-gradient(circle at 0% 100%, rgba(255,105,77,0.14), transparent 50%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 72, fontWeight: 600, color: '#f4fbff' }}>
          <img src={logoSrc} width={85} height={80} alt="" style={{ marginRight: 24 }} />
          <span>Carva</span>
          <span style={{ color: '#00a8e8', fontWeight: 800 }}>Code</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#ffffff',
            maxWidth: 1010,
          }}
        >
          Desenvolvimento de software sob medida
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 32, color: '#a9b6c6' }}>
          Sites · Sistemas web · Aplicativos · Integrações
        </div>
        <div style={{ display: 'flex', marginTop: 56, width: 120, height: 8, backgroundColor: '#ff694d', borderRadius: 4 }} />
      </div>
    ),
    { ...size },
  );
}

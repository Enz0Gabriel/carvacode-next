import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0c1216',
          backgroundImage:
            'radial-gradient(circle at 25% 20%, rgba(0,168,232,0.25), transparent 55%), radial-gradient(circle at 75% 80%, rgba(255,105,77,0.2), transparent 55%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 600,
            color: '#f4fbff',
          }}
        >
          <span>Carva</span>
          <span
            style={{
              marginLeft: 16,
              color: '#00a8e8',
              fontWeight: 800,
            }}
          >
            Code
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 36,
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          Desenvolvimento de Sites, Sistemas e Apps
        </div>
      </div>
    ),
    { ...size }
  );
}

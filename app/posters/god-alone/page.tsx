import GodAlonePoster from './GodAlonePoster'

export default function GodAlonePage() {
  return (
    <main
      style={{
        height: '100dvh',
        background: '#0D0D0D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflow: 'hidden',
        gap: 16,
      }}
    >
      <GodAlonePoster />

      <a
        href="/api/download-god-alone-pdf"
        download="God-Alone-2026.pdf"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: '#FFEE00',
          border: '1px solid #FFEE0066',
          padding: '10px 20px',
          background: 'transparent',
          transition: 'background 0.15s',
          flexShrink: 0,
        }}
      >
        ↓ Download Print-Ready PDF
      </a>
    </main>
  )
}

import GodAlonePoster from './GodAlonePoster'

export default function GodAlonePage() {
  return (
    <main
      style={{
        height: '100dvh',
        background: '#0D0D0D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflow: 'hidden',
      }}
    >
      <GodAlonePoster />
    </main>
  )
}

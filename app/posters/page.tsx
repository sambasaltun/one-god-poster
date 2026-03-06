import { readFileSync } from 'fs'
import path from 'path'
import PosterLive from './PosterLive'

export const dynamic = 'force-dynamic'

export default function PostersPage() {
  const dataPath = path.join(process.cwd(), 'public', 'poster-data.json')
  const initialData = JSON.parse(readFileSync(dataPath, 'utf-8'))

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center py-8 px-4">
      {/* Live badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span
          className="text-white/50 text-xs font-semibold tracking-[3px] uppercase"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Live Preview
        </span>
      </div>

      <PosterLive initialData={initialData} />

      <p
        className="mt-6 text-white/25 text-xs tracking-widest uppercase text-center"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        Updates automatically · 50×70cm · Print Ready
      </p>
    </main>
  )
}

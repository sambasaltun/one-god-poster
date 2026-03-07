import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: 'God Alone · LDN 2026',
  description: 'Worship God Alone — the eternal truth. LDN 2026 street poster.',
}

export default function GodAloneLayout({ children }: { children: React.ReactNode }) {
  return <div className={oswald.variable}>{children}</div>
}

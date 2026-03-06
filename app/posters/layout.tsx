import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'One God · One Message',
  description: 'Worship God Alone — since the dawn of creation.',
}

export default function PostersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={spaceGrotesk.variable} style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
      {children}
    </div>
  )
}

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface PosterData {
  tagline: string
  headline1: string
  headline2: string
  cta: string
  footerLeft: string
  footerRight: string
  heroImage: string
  torahImage: string
  gospelImage: string
  quranImage: string
  logoImage: string
}

export default function PosterLive({ initialData }: { initialData: PosterData }) {
  const [data, setData] = useState<PosterData>(initialData)
  const versionRef = useRef<number>(0)
  const [imgVersion, setImgVersion] = useState<number>(0)

  const poll = useCallback(async () => {
    try {
      const res = await fetch('/api/poster-version', { cache: 'no-store' })
      const { version } = await res.json() as { version: number }

      if (version !== versionRef.current) {
        versionRef.current = version
        setImgVersion(version)
        const dataRes = await fetch('/api/poster-data', { cache: 'no-store' })
        const newData = await dataRes.json() as PosterData
        setData(newData)
      }
    } catch {
      // silently ignore network errors
    }
  }, [])

  useEffect(() => {
    poll()
    const id = setInterval(poll, 3000)
    return () => clearInterval(id)
  }, [poll])

  // Cache-bust images whenever version changes
  const img = (filename: string) => `/api/images/${filename}?v=${imgVersion}`

  const font = { fontFamily: 'var(--font-space-grotesk), sans-serif' }

  return (
    /* Responsive scale: render at 500px, scale down on small screens */
    <div className="w-full flex justify-center">
      <div
        style={{
          width: 'min(500px, calc(100vw - 2rem))',
          aspectRatio: '5 / 7',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 500,
            height: 700,
            transformOrigin: 'top left',
            transform: 'scale(var(--poster-scale, 1))',
            overflow: 'hidden',
            backgroundColor: '#0A1628',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
          }}
          ref={(el) => {
            if (!el) return
            const parent = el.parentElement
            if (!parent) return
            const scale = parent.clientWidth / 500
            el.style.setProperty('--poster-scale', String(scale))
            el.style.transform = `scale(${scale})`
          }}
        >
          {/* ── HERO SECTION ───────────────────────────────── */}
          <div style={{ position: 'relative', height: 256, flexShrink: 0, overflow: 'hidden' }}>
            {/* Background image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(data.heroImage)}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Dark gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(10,22,40,0.33) 0%, rgba(10,22,40,0.8) 65%, rgba(10,22,40,1) 100%)',
              }}
            />
            {/* Text */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '0 16px',
                ...font,
              }}
            >
              <p style={{ color: '#C9923A', fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
                {data.tagline}
              </p>
              <h1 style={{ color: '#FFFFFF', fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1, margin: 0, textAlign: 'center' }}>
                {data.headline1}
              </h1>
              <div style={{ width: 260, height: 3, backgroundColor: '#C9923A', flexShrink: 0 }} />
              <h2 style={{ color: '#FFFFFF', fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1, margin: 0, textAlign: 'center' }}>
                {data.headline2}
              </h2>
            </div>
          </div>

          {/* ── GOLD SEPARATOR ─────────────────────────────── */}
          <div style={{ height: 4, backgroundColor: '#C9923A', flexShrink: 0 }} />

          {/* ── BOOKS SECTION ──────────────────────────────── */}
          <div
            style={{
              height: 250,
              flexShrink: 0,
              backgroundColor: '#EDE7D9',
              display: 'flex',
              flexDirection: 'row',
              padding: 14,
              gap: 10,
            }}
          >
            {([
              { label: 'TORAH',  image: data.torahImage },
              { label: 'GOSPEL', image: data.gospelImage },
              { label: 'QURAN',  image: data.quranImage },
            ] as const).map(({ label, image }) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  overflow: 'hidden',
                  backgroundColor: '#0A1628',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(image)}
                  alt={label}
                  style={{ width: '100%', flex: 1, objectFit: 'cover' }}
                />
                <div
                  style={{
                    height: 44,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(to left, #1A2A48, #0A1628)',
                    ...font,
                  }}
                >
                  <span style={{ color: '#C9923A', fontSize: 20, fontWeight: 700, letterSpacing: 3 }}>
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA BAND ───────────────────────────────────── */}
          <div
            style={{
              height: 112,
              flexShrink: 0,
              backgroundColor: '#0D1B32',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              ...font,
            }}
          >
            <p style={{ color: '#E8B44A', fontSize: 46, fontWeight: 700, letterSpacing: 0, margin: 0, lineHeight: 1, textAlign: 'center' }}>
              {data.cta}
            </p>
            <div style={{ width: 200, height: 2, backgroundColor: '#C9923A' }} />
          </div>

          {/* ── FOOTER ─────────────────────────────────────── */}
          <div
            style={{
              height: 78,
              flexShrink: 0,
              backgroundColor: '#060C1A',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 22px',
              ...font,
            }}
          >
            {/* Left: GET A FREE QURAN */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <MailIcon />
              <span style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
                {data.footerLeft}
              </span>
            </div>

            {/* Center: Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(data.logoImage)}
              alt="Logo"
              style={{ width: 38, height: 38, borderRadius: 6, objectFit: 'contain' }}
            />

            {/* Right: website */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <GlobeIcon />
              <span style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
                {data.footerRight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9923A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9923A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

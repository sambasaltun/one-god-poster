'use client'

import { useEffect, useRef, useState } from 'react'

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

const px = (n: number) => `${(n * 0.1).toFixed(2)}cm`

export default function PosterPrint({ data }: { data: PosterData }) {
  const [ready, setReady] = useState(false)
  const imgRefs = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    const imgs = imgRefs.current.filter(Boolean)
    if (imgs.length === 0) { setReady(true); return }
    let loaded = 0
    const done = () => { loaded++; if (loaded >= imgs.length) setReady(true) }
    imgs.forEach(img => {
      if (img.complete) done()
      else { img.addEventListener('load', done); img.addEventListener('error', done) }
    })
  }, [])

  // Auto-trigger print as soon as all images are ready
  useEffect(() => {
    if (ready) window.print()
  }, [ready])

  const font = 'Space Grotesk, sans-serif'

  const bookItems = [
    { label: 'TORAH',  src: data.torahImage },
    { label: 'GOSPEL', src: data.gospelImage },
    { label: 'QURAN',  src: data.quranImage },
  ]

  return (
    <div style={{
      width: '50cm',
      height: '70cm',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0A1628',
      overflow: 'hidden',
      fontFamily: font,
    }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: '25.6cm', flexShrink: 0, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={el => { if (el) imgRefs.current[0] = el }}
          src={`/api/images/${data.heroImage}`}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,22,40,0.33) 0%, rgba(10,22,40,0.8) 65%, rgba(10,22,40,1) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: px(6), padding: `0 ${px(16)}`,
        }}>
          <p style={{ color: '#C9923A', fontSize: px(10), fontWeight: 700, letterSpacing: px(5), textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
            {data.tagline}
          </p>
          <h1 style={{ color: '#FFFFFF', fontSize: px(84), fontWeight: 700, letterSpacing: px(-3), lineHeight: 1, margin: 0, textAlign: 'center' }}>
            {data.headline1}
          </h1>
          <div style={{ width: px(260), height: px(3), backgroundColor: '#C9923A', flexShrink: 0 }} />
          <h2 style={{ color: '#FFFFFF', fontSize: px(64), fontWeight: 700, letterSpacing: px(-2), lineHeight: 1, margin: 0, textAlign: 'center' }}>
            {data.headline2}
          </h2>
        </div>
      </div>

      {/* GOLD SEPARATOR */}
      <div style={{ height: px(4), backgroundColor: '#C9923A', flexShrink: 0 }} />

      {/* BOOKS */}
      <div style={{
        height: px(250), flexShrink: 0,
        backgroundColor: '#EDE7D9',
        display: 'flex', flexDirection: 'row',
        padding: px(14), gap: px(10),
      }}>
        {bookItems.map(({ label, src }, i) => (
          <div key={label} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            borderRadius: px(4), overflow: 'hidden', backgroundColor: '#0A1628',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={el => { if (el) imgRefs.current[i + 1] = el }}
              src={`/api/images/${src}`}
              alt={label}
              style={{ width: '100%', flex: 1, objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              height: px(44), flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(to left, #1A2A48, #0A1628)',
            }}>
              <span style={{ color: '#C9923A', fontSize: px(20), fontWeight: 700, letterSpacing: px(3) }}>
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA BAND */}
      <div style={{
        height: px(112), flexShrink: 0,
        backgroundColor: '#0D1B32',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: px(6),
      }}>
        <p style={{ color: '#E8B44A', fontSize: px(46), fontWeight: 700, letterSpacing: 0, lineHeight: 1, margin: 0, textAlign: 'center' }}>
          {data.cta}
        </p>
        <div style={{ width: px(200), height: px(2), backgroundColor: '#C9923A' }} />
      </div>

      {/* FOOTER */}
      <div style={{
        height: px(78), flexShrink: 0,
        backgroundColor: '#060C1A',
        display: 'flex', flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between',
        padding: `0 ${px(22)}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: px(10) }}>
          <MailIcon size={px(14)} />
          <span style={{ color: '#FFFFFF', fontSize: px(10), fontWeight: 700, letterSpacing: px(3), textTransform: 'uppercase' }}>
            {data.footerLeft}
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={el => { if (el) imgRefs.current[4] = el }}
          src={`/api/images/${data.logoImage}`}
          alt="Logo"
          style={{ width: px(38), height: px(38), borderRadius: px(6), objectFit: 'contain' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: px(10) }}>
          <GlobeIcon size={px(14)} />
          <span style={{ color: '#FFFFFF', fontSize: px(10), fontWeight: 700, letterSpacing: px(1) }}>
            {data.footerRight}
          </span>
        </div>
      </div>
    </div>
  )
}

function MailIcon({ size }: { size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#C9923A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function GlobeIcon({ size }: { size: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#C9923A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

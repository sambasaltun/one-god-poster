'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export default function GodAlonePoster() {
  const posterRef = useRef<HTMLDivElement>(null)
  const [scaled, setScaled] = useState({ w: 500, h: 700 })

  const recalc = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const CHROME = 80 // space for download button below
    const scaleW = Math.min((vw - 32) / 500, 1)
    const scaleH = Math.min((vh - CHROME) / 700, 1)
    const scale = Math.min(scaleW, scaleH)
    if (posterRef.current) posterRef.current.style.transform = `scale(${scale})`
    setScaled({ w: Math.round(500 * scale), h: Math.round(700 * scale) })
  }, [])

  useEffect(() => {
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [recalc])

  const serif = "var(--font-oswald), Impact, 'Arial Narrow', sans-serif"
  const sans = "var(--font-space-grotesk), 'Space Grotesk', sans-serif"

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: scaled.w, height: scaled.h, position: 'relative', flexShrink: 0 }}>
        <div
          ref={posterRef}
          style={{
            width: 500,
            height: 700,
            transformOrigin: 'top left',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
          }}
        >

          {/* ── HERO 300px ── */}
          <div style={{
            height: 300,
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #FF6F00, #BF360C)',
          }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: '100%', background: '#FFD700' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 6, background: '#FFEE00' }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 52,
              paddingRight: 24,
              gap: 2,
            }}>
              <h1 style={{ color: '#FFFFFF', fontSize: 140, fontWeight: 700, letterSpacing: -5, lineHeight: 0.88, margin: 0, fontFamily: serif }}>
                GOD
              </h1>
              <h2 style={{ color: '#FFEE00', fontSize: 140, fontWeight: 700, letterSpacing: -5, lineHeight: 0.88, margin: 0, fontFamily: serif }}>
                ALONE
              </h2>
              <div style={{ width: 80, height: 5, background: 'rgba(255,255,255,0.55)', marginTop: 4 }} />
            </div>
          </div>

          {/* ── ORANGE SEPARATOR 4px ── */}
          <div style={{ height: 4, flexShrink: 0, background: '#E65100' }} />

          {/* ── VERSE SECTION 116px ── */}
          <div style={{
            height: 116,
            flexShrink: 0,
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '14px 28px',
            gap: 8,
          }}>
            <p style={{ color: '#111111', fontSize: 30, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.1, margin: 0, fontFamily: serif }}>
              &ldquo;There is no god except the ONE God&rdquo;
            </p>
            <p style={{ color: '#888888', fontSize: 9, letterSpacing: 3, fontWeight: 600, margin: 0, fontFamily: sans, textTransform: 'uppercase' }}>
              Deuteronomy 6:4-5&nbsp;&nbsp;·&nbsp;&nbsp;Luke 12:29-30&nbsp;&nbsp;·&nbsp;&nbsp;Quran 3:18
            </p>
          </div>

          {/* ── IMAGE SECTION 94px ── */}
          <div style={{ height: 94, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/images/generated-1772868349064.png"
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))' }} />
          </div>

          {/* ── CTA BAND 110px ── */}
          <div style={{
            height: 110,
            flexShrink: 0,
            background: '#FFEE00',
            borderTop: '4px solid #0D0D0D',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
          }}>
            <p style={{ color: '#0D0D0D', fontSize: 48, fontWeight: 700, letterSpacing: -2, lineHeight: 1, margin: 0, fontFamily: serif, textAlign: 'center' }}>
              WORSHIP GOD ALONE
            </p>
            <p style={{ color: 'rgba(13,13,13,0.55)', fontSize: 9, fontWeight: 700, letterSpacing: 5, margin: 0, fontFamily: sans, textAlign: 'center', textTransform: 'uppercase' }}>
              One Creator&nbsp;&nbsp;·&nbsp;&nbsp;One Truth&nbsp;&nbsp;·&nbsp;&nbsp;One Path
            </p>
          </div>

          {/* ── FOOTER 76px ── */}
          <div style={{
            height: 76,
            flexShrink: 0,
            background: '#1A237E',
            borderTop: '4px solid #FFEE00',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
          }}>
            {/* QR Code */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=52x52&data=https%3A%2F%2Fwikisubmission.org&margin=3&color=000000&bgcolor=FFFFFF"
                alt="QR — wikisubmission.org"
                style={{ width: 52, height: 52, border: '2px solid #FFEE00', display: 'block' }}
              />
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 7, fontWeight: 700, letterSpacing: 4, fontFamily: sans, textTransform: 'uppercase' }}>
                Scan QR
              </span>
            </div>

            {/* Center — logo + website */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/api/images/logo-transparent.png" alt="WikiSubmission" style={{ width: 30, height: 30, objectFit: 'contain' }} />
              <span style={{ color: '#FFEE00', fontSize: 10, fontWeight: 700, letterSpacing: 1, fontFamily: sans }}>
                wikisubmission.org
              </span>
            </div>

            {/* Right — submitters logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/images/submitterslogo.png"
              alt="Submitters"
              style={{ width: 44, height: 44, objectFit: 'contain' }}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export default function GodAlonePoster() {
  const posterRef = useRef<HTMLDivElement>(null)
  const [scaled, setScaled] = useState({ w: 500, h: 700 })

  const recalc = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const CHROME = 32
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
            {/* Golden vertical strip */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: '100%', background: '#FFD700' }} />
            {/* Yellow bottom accent */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 6, background: '#FFEE00' }} />
            {/* Text */}
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
              <p style={{ color: '#FFEE00', fontSize: 9, fontWeight: 700, letterSpacing: 8, textTransform: 'uppercase', margin: 0, fontFamily: sans }}>
                LDN&nbsp;&nbsp;·&nbsp;&nbsp;2026&nbsp;&nbsp;·&nbsp;&nbsp;ETERNAL TRUTH&nbsp;&nbsp;·&nbsp;&nbsp;GOD ALONE
              </p>
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
          <div style={{ height: 4, flexShrink: 0, background: '#FF6F00' }} />

          {/* ── VERSE SECTION 100px ── */}
          <div style={{
            height: 100,
            flexShrink: 0,
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '12px 28px',
            gap: 6,
          }}>
            <p style={{ color: '#111111', fontSize: 22, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.15, margin: 0, fontFamily: serif }}>
              &ldquo;There is no god except the ONE God&rdquo;
            </p>
            <p style={{ color: '#888888', fontSize: 9, letterSpacing: 3, fontWeight: 600, margin: 0, fontFamily: sans, textTransform: 'uppercase' }}>
              Quran 3:18&nbsp;&nbsp;·&nbsp;&nbsp;Bible Deuteronomy 6:4&nbsp;&nbsp;·&nbsp;&nbsp;Torah Shema
            </p>
            <p style={{ color: '#E65100', fontSize: 10, letterSpacing: 3, fontWeight: 500, margin: 0, fontFamily: sans }}>
              لا إله إلا الله&nbsp;&nbsp;·&nbsp;&nbsp;There is no god but God
            </p>
          </div>

          {/* ── IMAGE SECTION 110px ── */}
          <div style={{ height: 110, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/images/generated-1772866597238.png"
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))' }} />
          </div>

          {/* ── CTA BAND 110px (border-box, incl. 4px top border) ── */}
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

          {/* ── FOOTER 76px (border-box, incl. 4px top border) ── */}
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
            {/* QR Code — real scannable code via QR Server API */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=52x52&data=https%3A%2F%2Fwikisubmission.org&margin=3&color=000000&bgcolor=FFFFFF"
                alt="QR code — wikisubmission.org"
                style={{ width: 52, height: 52, border: '2px solid #FFEE00', display: 'block' }}
              />
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 7, fontWeight: 700, letterSpacing: 4, fontFamily: sans, textTransform: 'uppercase' }}>
                Scan QR
              </span>
            </div>

            {/* Center — website */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/api/images/submitterslogo.png" alt="Submitters" style={{ width: 26, height: 26, objectFit: 'contain' }} />
              <span style={{ color: '#FFEE00', fontSize: 10, fontWeight: 700, letterSpacing: 1, fontFamily: sans }}>
                wikisubmission.org
              </span>
            </div>

            {/* Right — large logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/images/submitterslogo.png"
              alt="Submitters Logo"
              style={{ width: 44, height: 44, objectFit: 'contain' }}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

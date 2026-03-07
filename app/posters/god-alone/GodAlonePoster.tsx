'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// ─── Shared design tokens ────────────────────────────────────────────────────
export const PALETTE = {
  heroBgTop:    '#BAE6FD',
  heroBgBot:    '#7DD3FC',
  strip:        '#0C2D5A',  // left vertical accent
  accent:       '#FBBF24',  // gold
  godText:      '#0C2D5A',  // deep navy
  aloneText:    '#D97706',  // amber
  sepColor:     '#FBBF24',
  verseBg:      '#FFFFFF',
  quoteText:    '#111827',
  citationText: '#6B7280',
  ctaBg:        '#0C2D5A',
  ctaText:      '#FFFFFF',
  ctaSub:       'rgba(255,255,255,0.55)',
  footerBg:     '#0C2D5A',
  footerBorder: '#FBBF24',
  qrBorder:     '#FBBF24',
  websiteText:  '#FBBF24',
}

export default function GodAlonePoster() {
  const posterRef = useRef<HTMLDivElement>(null)
  const [scaled, setScaled] = useState({ w: 500, h: 700 })

  const recalc = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const CHROME = 80
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
  const sans  = "var(--font-space-grotesk), 'Space Grotesk', sans-serif"
  const p     = PALETTE

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: scaled.w, height: scaled.h, position: 'relative', flexShrink: 0 }}>
        <div
          ref={posterRef}
          style={{
            width: 500, height: 700,
            transformOrigin: 'top left',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
          }}
        >

          {/* ── HERO 300px ── */}
          <div style={{
            height: 300, flexShrink: 0,
            position: 'relative', overflow: 'hidden',
            background: `linear-gradient(to bottom, ${p.heroBgTop}, ${p.heroBgBot})`,
          }}>
            {/* Navy left strip */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: '100%', background: p.strip }} />
            {/* Gold bottom accent */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 6, background: p.accent }} />
            {/* Text — centered for full consistency with PDF */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
              gap: 0,
            }}>
              <h1 style={{ color: p.godText, fontSize: 140, fontWeight: 700, letterSpacing: -4, lineHeight: 0.75, margin: 0, fontFamily: serif }}>
                GOD
              </h1>
              <h2 style={{ color: p.aloneText, fontSize: 140, fontWeight: 700, letterSpacing: -4, lineHeight: 0.75, margin: 0, fontFamily: serif }}>
                ALONE
              </h2>
              <div style={{ width: 120, height: 5, background: p.aloneText, marginTop: 10, opacity: 0.6 }} />
            </div>
          </div>

          {/* ── GOLD SEPARATOR 4px ── */}
          <div style={{ height: 4, flexShrink: 0, background: p.sepColor }} />

          {/* ── VERSE SECTION 116px ── */}
          <div style={{
            height: 116, flexShrink: 0,
            background: p.verseBg,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            padding: '14px 28px', gap: 8,
          }}>
            <p style={{ color: p.quoteText, fontSize: 30, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.1, margin: 0, fontFamily: serif }}>
              &ldquo;There is no god except the ONE God&rdquo;
            </p>
            <p style={{ color: p.citationText, fontSize: 9, letterSpacing: 3, fontWeight: 600, margin: 0, fontFamily: sans, textTransform: 'uppercase' }}>
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
          </div>

          {/* ── CTA BAND 110px ── */}
          <div style={{
            height: 110, flexShrink: 0,
            background: p.ctaBg,
            borderTop: `4px solid ${p.accent}`,
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 6,
          }}>
            <p style={{ color: p.ctaText, fontSize: 46, fontWeight: 700, letterSpacing: -1, lineHeight: 1, margin: 0, fontFamily: serif, textAlign: 'center' }}>
              WORSHIP GOD ALONE
            </p>
            <p style={{ color: p.ctaSub, fontSize: 9, fontWeight: 700, letterSpacing: 5, margin: 0, fontFamily: sans, textAlign: 'center', textTransform: 'uppercase' }}>
              One Creator&nbsp;&nbsp;·&nbsp;&nbsp;One Truth&nbsp;&nbsp;·&nbsp;&nbsp;One Path
            </p>
          </div>

          {/* ── FOOTER 76px ── */}
          <div style={{
            height: 76, flexShrink: 0,
            background: p.footerBg,
            borderTop: `4px solid ${p.footerBorder}`,
            boxSizing: 'border-box',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
          }}>
            {/* QR Code */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=52x52&data=https%3A%2F%2Fwikisubmission.org&margin=3"
                alt="QR — wikisubmission.org"
                style={{ width: 52, height: 52, border: `2px solid ${p.qrBorder}`, display: 'block' }}
              />
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 7, fontWeight: 700, letterSpacing: 4, fontFamily: sans, textTransform: 'uppercase' }}>
                Scan QR
              </span>
            </div>
            {/* Center — logo + website */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/api/images/logo-transparent.png" alt="WikiSubmission" style={{ width: 30, height: 30, objectFit: 'contain' }} />
              <span style={{ color: p.websiteText, fontSize: 10, fontWeight: 700, letterSpacing: 1, fontFamily: sans }}>
                wikisubmission.org
              </span>
            </div>
            {/* Right — submitters logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/api/images/submitterslogo.png" alt="Submitters" style={{ width: 44, height: 44, objectFit: 'contain' }} />
          </div>

        </div>
      </div>
    </div>
  )
}

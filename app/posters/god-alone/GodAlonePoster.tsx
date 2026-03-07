'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PALETTE, TEXT, IMAGES, LAYOUT } from './poster-config'

// Re-export for any legacy imports
export { PALETTE }

const { posterW: W, posterH: H, heroH, sepH, verseH, imageH, ctaH, footerH,
        titleSize, titleLine, quoteSize, ctaSize, citationSize, ctaSubSize, websiteSize } = LAYOUT
const p = PALETTE
const t = TEXT

export default function GodAlonePoster() {
  const posterRef = useRef<HTMLDivElement>(null)
  const [scaled, setScaled] = useState({ w: W, h: H })

  const recalc = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const CHROME = 80
    const scaleW = Math.min((vw - 32) / W, 1)
    const scaleH = Math.min((vh - CHROME) / H, 1)
    const scale = Math.min(scaleW, scaleH)
    if (posterRef.current) posterRef.current.style.transform = `scale(${scale})`
    setScaled({ w: Math.round(W * scale), h: Math.round(H * scale) })
  }, [])

  useEffect(() => {
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [recalc])

  const serif = "var(--font-oswald), Impact, 'Arial Narrow', sans-serif"
  const sans  = "var(--font-space-grotesk), 'Space Grotesk', sans-serif"
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=52x52&data=${encodeURIComponent(t.qrUrl)}&margin=3`

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: scaled.w, height: scaled.h, position: 'relative', flexShrink: 0 }}>
        <div
          ref={posterRef}
          style={{
            width: W, height: H,
            transformOrigin: 'top left',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
          }}
        >

          {/* ── HERO ── */}
          <div style={{
            height: heroH, flexShrink: 0,
            position: 'relative', overflow: 'hidden',
            background: `linear-gradient(to bottom, ${p.heroBgTop}, ${p.heroBgBot})`,
          }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: '100%', background: p.strip }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 6, background: p.accent }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
              <h1 style={{ color: p.godText, fontSize: titleSize, fontWeight: 700, letterSpacing: -4, lineHeight: titleLine, margin: 0, fontFamily: serif }}>
                {t.heroTitle}
              </h1>
              <h2 style={{ color: p.aloneText, fontSize: titleSize, fontWeight: 700, letterSpacing: -4, lineHeight: titleLine, margin: 0, fontFamily: serif }}>
                {t.heroSubtitle}
              </h2>
              <div style={{ width: 120, height: 5, background: p.aloneText, marginTop: 10, opacity: 0.6 }} />
            </div>
          </div>

          {/* ── SEPARATOR ── */}
          <div style={{ height: sepH, flexShrink: 0, background: p.sepColor }} />

          {/* ── VERSE ── */}
          <div style={{ height: verseH, flexShrink: 0, background: p.verseBg, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '14px 28px', gap: 8 }}>
            <p style={{ color: p.quoteText, fontSize: quoteSize, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.1, margin: 0, fontFamily: serif }}>
              {t.quote}
            </p>
            <p style={{ color: p.citationText, fontSize: citationSize, letterSpacing: 3, fontWeight: 600, margin: 0, fontFamily: sans, textTransform: 'uppercase' }}>
              {t.citations}
            </p>
          </div>

          {/* ── IMAGE ── */}
          <div style={{ height: imageH, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/api/images/${IMAGES.hero}`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* ── CTA ── */}
          <div style={{ height: ctaH, flexShrink: 0, background: p.ctaBg, borderTop: `4px solid ${p.accent}`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <p style={{ color: p.ctaText, fontSize: ctaSize, fontWeight: 700, letterSpacing: -1, lineHeight: 1, margin: 0, fontFamily: serif, textAlign: 'center' }}>
              {t.cta}
            </p>
            <p style={{ color: p.ctaSub, fontSize: ctaSubSize, fontWeight: 700, letterSpacing: 5, margin: 0, fontFamily: sans, textAlign: 'center', textTransform: 'uppercase' }}>
              {t.ctaSub}
            </p>
          </div>

          {/* ── FOOTER ── */}
          <div style={{ height: footerH, flexShrink: 0, background: p.footerBg, borderTop: `4px solid ${p.footerBorder}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrSrc} alt={`QR — ${t.website}`} style={{ width: 52, height: 52, border: `2px solid ${p.qrBorder}`, display: 'block' }} />
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 7, fontWeight: 700, letterSpacing: 4, fontFamily: sans, textTransform: 'uppercase' }}>{t.qrLabel}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/images/${IMAGES.logo}`} alt="WikiSubmission" style={{ width: 30, height: 30, objectFit: 'contain' }} />
              <span style={{ color: p.websiteText, fontSize: websiteSize, fontWeight: 700, letterSpacing: 1, fontFamily: sans }}>{t.website}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/api/images/${IMAGES.submitters}`} alt="Submitters" style={{ width: 44, height: 44, objectFit: 'contain' }} />
          </div>

        </div>
      </div>
    </div>
  )
}

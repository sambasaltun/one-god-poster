import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import React from 'react'
import { Document, Font, Page, View, Text, Image, renderToBuffer } from '@react-pdf/renderer'
import { PALETTE, TEXT, IMAGES, LAYOUT } from '../../posters/god-alone/poster-config'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

let oswaldRegistered = false
function ensureOswaldRegistered(): boolean {
  if (oswaldRegistered) return true
  try {
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Oswald-Bold.woff')
    if (existsSync(fontPath)) {
      Font.register({ family: 'Oswald', src: fontPath, fontWeight: 700 })
      oswaldRegistered = true
      return true
    }
  } catch {
    // fall back to Helvetica-Bold
  }
  return false
}

// 50cm × 70cm in points (1cm = 28.3465pt)
const CM = 28.3465
const PW = 50 * CM   // page width in points
const PH = 70 * CM   // page height in points
// scale design-px → PDF points (design is 500px wide, PDF is 50cm = 1417pt wide)
const s = (px: number) => px * 0.1 * CM

const p = PALETTE
const t = TEXT

function loadImage(filename: string): string {
  const safe = path.basename(filename)
  const candidates = [
    path.join(process.cwd(), 'images', safe),
    path.join(process.cwd(), safe),
    path.join(process.cwd(), 'public', safe),
  ]
  const found = candidates.find(existsSync)
  if (!found) return ''
  const buf = readFileSync(found)
  const ext = path.extname(safe).toLowerCase()
  const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png'
  return `data:${mime};base64,${buf.toString('base64')}`
}

async function fetchQRCode(url: string): Promise<string> {
  try {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}&margin=5&color=000000&bgcolor=FFFFFF`
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(8000) })
    const buf = await res.arrayBuffer()
    return `data:image/png;base64,${Buffer.from(buf).toString('base64')}`
  } catch {
    return ''
  }
}

function GodAloneDoc({ heroSrc, logoSrc, submittersSrc, qrSrc, useOswald }: {
  heroSrc: string; logoSrc: string; submittersSrc: string; qrSrc: string; useOswald: boolean
}) {
  const font  = useOswald ? 'Oswald' : 'Helvetica-Bold'
  const heroH = s(LAYOUT.heroH)
  const sepH  = s(LAYOUT.sepH)
  const verseH  = s(LAYOUT.verseH)
  const imageH  = s(LAYOUT.imageH)
  const ctaH    = s(LAYOUT.ctaH)
  const footerH = s(LAYOUT.footerH)

  return (
    <Document>
      <Page size={[PW, PH]} style={{ margin: 0, padding: 0, backgroundColor: p.heroBgTop }}>

        {/* ── HERO — text in normal flow, decorations absolute ── */}
        <View style={{ height: heroH, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ position: 'absolute', top: 0, left: 0, width: PW, height: heroH, backgroundColor: p.heroBgTop }} />
          <View style={{ position: 'absolute', top: heroH * 0.5, left: 0, width: PW, height: heroH * 0.5, backgroundColor: p.heroBgBot }} />
          <View style={{ position: 'absolute', top: 0, left: 0, width: s(8), height: heroH, backgroundColor: p.strip }} />
          <View style={{ position: 'absolute', bottom: 0, left: 0, width: PW, height: s(6), backgroundColor: p.accent }} />
          <Text style={{ color: p.godText, fontSize: s(LAYOUT.titleSize), fontFamily: font, fontWeight: 700, lineHeight: LAYOUT.titleLine, textAlign: 'center', width: PW }}>
            {t.heroTitle}
          </Text>
          <Text style={{ color: p.aloneText, fontSize: s(LAYOUT.titleSize), fontFamily: font, fontWeight: 700, lineHeight: LAYOUT.titleLine, textAlign: 'center', width: PW }}>
            {t.heroSubtitle}
          </Text>
          <View style={{ width: s(120), height: s(5), backgroundColor: p.aloneText, marginTop: s(10), opacity: 0.6 }} />
        </View>

        {/* ── SEPARATOR ── */}
        <View style={{ height: sepH, backgroundColor: p.sepColor }} />

        {/* ── VERSE ── */}
        <View style={{ height: verseH, backgroundColor: p.verseBg, flexDirection: 'column', justifyContent: 'center', paddingTop: s(14), paddingBottom: s(14), paddingLeft: s(28), paddingRight: s(28), gap: s(8) }}>
          <Text style={{ color: p.quoteText, fontSize: s(LAYOUT.quoteSize), fontFamily: font, fontWeight: 700, lineHeight: 1.1 }}>
            {t.quote}
          </Text>
          <Text style={{ color: p.citationText, fontSize: s(LAYOUT.citationSize), letterSpacing: s(3), fontWeight: 'bold' }}>
            {t.citations}
          </Text>
        </View>

        {/* ── IMAGE ── */}
        <View style={{ height: imageH }}>
          {heroSrc
            ? <Image src={heroSrc} style={{ width: PW, height: imageH, objectFit: 'cover' }} />
            : <View style={{ height: imageH, backgroundColor: '#E0F2FE' }} />}
        </View>

        {/* ── CTA ── */}
        <View style={{ height: ctaH, backgroundColor: p.ctaBg, borderTopWidth: s(4), borderTopColor: p.accent, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s(6) }}>
          <Text style={{ color: p.ctaText, fontSize: s(LAYOUT.ctaSize), fontFamily: font, fontWeight: 700, lineHeight: 1, textAlign: 'center' }}>
            {t.cta}
          </Text>
          <Text style={{ color: p.ctaSub, fontSize: s(LAYOUT.ctaSubSize), fontWeight: 'bold', letterSpacing: s(5), textAlign: 'center' }}>
            {t.ctaSub}
          </Text>
        </View>

        {/* ── FOOTER ── */}
        <View style={{ height: footerH, backgroundColor: p.footerBg, borderTopWidth: s(4), borderTopColor: p.footerBorder, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: s(28), paddingRight: s(28) }}>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: s(4) }}>
            {qrSrc
              ? <Image src={qrSrc} style={{ width: s(52), height: s(52), borderWidth: s(2), borderColor: p.qrBorder }} />
              : <View style={{ width: s(52), height: s(52), backgroundColor: '#FFF' }} />}
            <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: s(7), letterSpacing: s(4) }}>{t.qrLabel}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: s(4) }}>
            {logoSrc && <Image src={logoSrc} style={{ width: s(30), height: s(30) }} />}
            <Text style={{ color: p.websiteText, fontSize: s(LAYOUT.websiteSize), fontWeight: 'bold', letterSpacing: s(1) }}>
              {t.website}
            </Text>
          </View>
          {submittersSrc
            ? <Image src={submittersSrc} style={{ width: s(44), height: s(44) }} />
            : <View style={{ width: s(44), height: s(44) }} />}
        </View>

      </Page>
    </Document>
  )
}

export async function GET() {
  const useOswald = ensureOswaldRegistered()

  const [heroSrc, logoSrc, submittersSrc, qrSrc] = await Promise.all([
    Promise.resolve(loadImage(IMAGES.hero)),
    Promise.resolve(loadImage(IMAGES.logo)),
    Promise.resolve(loadImage(IMAGES.submitters)),
    fetchQRCode(TEXT.qrUrl),
  ])

  let pdfArrayBuffer: ArrayBuffer
  try {
    const buf = await renderToBuffer(
      <GodAloneDoc heroSrc={heroSrc} logoSrc={logoSrc} submittersSrc={submittersSrc} qrSrc={qrSrc} useOswald={useOswald} />
    )
    pdfArrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer
  } catch (err) {
    const msg = err instanceof Error ? err.stack ?? err.message : String(err)
    console.error('[PDF] renderToBuffer failed:', msg)
    return new NextResponse(`PDF generation failed:\n${msg}`, { status: 500 })
  }

  return new Response(pdfArrayBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': "attachment; filename=\"God-Alone-2026.pdf\"; filename*=UTF-8''God%20Alone%20%C2%B7%202026.pdf",
    },
  })
}

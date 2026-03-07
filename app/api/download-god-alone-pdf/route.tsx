import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import React from 'react'
import { Document, Font, Page, View, Text, Image, renderToBuffer } from '@react-pdf/renderer'

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
    // fall back to Helvetica
  }
  return false
}

// 50cm × 70cm in points (1cm = 28.3465pt)
const CM = 28.3465
const W = 50 * CM
const H = 70 * CM
const s = (px: number) => px * 0.1 * CM  // design-px → PDF points

// Palette — matches GodAlonePoster.tsx PALETTE
const p = {
  heroBgTop:    '#BAE6FD',
  heroBgBot:    '#7DD3FC',
  strip:        '#0C2D5A',
  accent:       '#FBBF24',
  godText:      '#0C2D5A',
  aloneText:    '#D97706',
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
  heroSrc: string
  logoSrc: string
  submittersSrc: string
  qrSrc: string
  useOswald: boolean
}) {
  const font = useOswald ? 'Oswald' : 'Helvetica'
  const heroH   = s(300)
  const sepH    = s(4)
  const verseH  = s(116)
  const imageH  = s(94)
  const ctaH    = s(110)
  const footerH = s(76)

  return (
    <Document>
      <Page size={[W, H]} style={{ margin: 0, padding: 0, backgroundColor: p.heroBgTop }}>

        {/* ── HERO ── */}
        {/* Text is in normal flex flow so Yoga constrains it within heroH.
            Background decorations are absolute (out of flow). */}
        <View style={{ height: heroH, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* Sky-blue background */}
          <View style={{ position: 'absolute', top: 0, left: 0, width: W, height: heroH, backgroundColor: p.heroBgTop }} />
          {/* Slightly darker bottom half */}
          <View style={{ position: 'absolute', top: heroH * 0.5, left: 0, width: W, height: heroH * 0.5, backgroundColor: p.heroBgBot }} />
          {/* Navy left strip */}
          <View style={{ position: 'absolute', top: 0, left: 0, width: s(8), height: heroH, backgroundColor: p.strip }} />
          {/* Gold bottom accent */}
          <View style={{ position: 'absolute', bottom: 0, left: 0, width: W, height: s(6), backgroundColor: p.accent }} />
          {/* GOD */}
          <Text style={{ color: p.godText, fontSize: s(125), fontFamily: font, fontWeight: 700, lineHeight: 0.85, textAlign: 'center', width: W }}>
            GOD
          </Text>
          {/* ALONE */}
          <Text style={{ color: p.aloneText, fontSize: s(125), fontFamily: font, fontWeight: 700, lineHeight: 0.85, textAlign: 'center', width: W }}>
            ALONE
          </Text>
          {/* Divider */}
          <View style={{ width: s(120), height: s(5), backgroundColor: p.aloneText, marginTop: s(10), opacity: 0.6 }} />
        </View>

        {/* ── GOLD SEPARATOR ── */}
        <View style={{ height: sepH, backgroundColor: p.sepColor }} />

        {/* ── VERSE SECTION ── */}
        <View style={{ height: verseH, backgroundColor: p.verseBg, flexDirection: 'column', justifyContent: 'center', paddingTop: s(14), paddingBottom: s(14), paddingLeft: s(28), paddingRight: s(28), gap: s(8) }}>
          <Text style={{ color: p.quoteText, fontSize: s(30), fontFamily: font, fontWeight: 700, lineHeight: 1.1 }}>
            {'\u201c'}There is no god except the ONE God{'\u201d'}
          </Text>
          <Text style={{ color: p.citationText, fontSize: s(9), letterSpacing: s(3), fontWeight: 'bold' }}>
            Deuteronomy 6:4-5  ·  Luke 12:29-30  ·  Quran 3:18
          </Text>
        </View>

        {/* ── IMAGE SECTION ── */}
        <View style={{ height: imageH, position: 'relative', overflow: 'hidden' }}>
          {heroSrc ? (
            <Image src={heroSrc} style={{ position: 'absolute', top: 0, left: 0, width: W, height: imageH, objectFit: 'cover' }} />
          ) : (
            <View style={{ height: imageH, backgroundColor: '#E0F2FE' }} />
          )}
        </View>

        {/* ── CTA BAND ── */}
        <View style={{ height: ctaH, backgroundColor: p.ctaBg, borderTopWidth: s(4), borderTopColor: p.accent, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s(6) }}>
          <Text style={{ color: p.ctaText, fontSize: s(46), fontFamily: font, fontWeight: 700, lineHeight: 1, textAlign: 'center' }}>
            WORSHIP GOD ALONE
          </Text>
          <Text style={{ color: p.ctaSub, fontSize: s(9), fontWeight: 'bold', letterSpacing: s(5), textAlign: 'center' }}>
            One Creator  ·  One Truth  ·  One Path
          </Text>
        </View>

        {/* ── FOOTER ── */}
        <View style={{ height: footerH, backgroundColor: p.footerBg, borderTopWidth: s(4), borderTopColor: p.footerBorder, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: s(28), paddingRight: s(28) }}>
          {/* QR Code */}
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: s(4) }}>
            {qrSrc ? (
              <Image src={qrSrc} style={{ width: s(52), height: s(52), borderWidth: s(2), borderColor: p.qrBorder }} />
            ) : (
              <View style={{ width: s(52), height: s(52), backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#000', fontSize: s(7), textAlign: 'center' }}>wikisubmission{'\n'}.org</Text>
              </View>
            )}
            <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: s(7), letterSpacing: s(4) }}>SCAN QR</Text>
          </View>

          {/* Center — logo + website */}
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: s(4) }}>
            {logoSrc ? (
              <Image src={logoSrc} style={{ width: s(30), height: s(30) }} />
            ) : null}
            <Text style={{ color: p.websiteText, fontSize: s(10), fontWeight: 'bold', letterSpacing: s(1) }}>
              wikisubmission.org
            </Text>
          </View>

          {/* Right — submitters logo */}
          {submittersSrc ? (
            <Image src={submittersSrc} style={{ width: s(44), height: s(44) }} />
          ) : (
            <View style={{ width: s(44), height: s(44) }} />
          )}
        </View>

      </Page>
    </Document>
  )
}

export async function GET() {
  const useOswald = ensureOswaldRegistered()

  const [heroSrc, logoSrc, submittersSrc, qrSrc] = await Promise.all([
    Promise.resolve(loadImage('generated-1772868349064.png')),
    Promise.resolve(loadImage('logo-transparent.png')),
    Promise.resolve(loadImage('submitterslogo.png')),
    fetchQRCode('https://wikisubmission.org'),
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

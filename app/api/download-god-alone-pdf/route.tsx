import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import React from 'react'
import { Document, Page, View, Text, Image, renderToStream } from '@react-pdf/renderer'
import { Readable } from 'stream'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// 50cm × 70cm in points (1cm = 28.3465pt)
const CM = 28.3465
const W = 50 * CM
const H = 70 * CM
const s = (px: number) => px * 0.1 * CM  // design-px → PDF points

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

function GodAloneDoc({ heroSrc, logoSrc, submittersSrc, qrSrc }: {
  heroSrc: string
  logoSrc: string
  submittersSrc: string
  qrSrc: string
}) {
  const heroH   = s(300)
  const sepH    = s(4)
  const verseH  = s(116)
  const imageH  = s(94)
  const ctaH    = s(110)
  const footerH = s(76)

  return (
    <Document>
      <Page size={[W, H]} style={{ margin: 0, padding: 0, backgroundColor: '#FF6F00' }}>

        {/* ── HERO ── */}
        <View style={{ height: heroH, position: 'relative', backgroundColor: '#FF6F00' }}>
          {/* Dark overlay to deepen toward bottom */}
          <View style={{ position: 'absolute', top: 0, left: 0, width: W, height: heroH, backgroundColor: '#BF360C', opacity: 0.45 }} />
          {/* Golden left strip */}
          <View style={{ position: 'absolute', top: 0, left: 0, width: s(8), height: heroH, backgroundColor: '#FFD700' }} />
          {/* Yellow bottom accent */}
          <View style={{ position: 'absolute', bottom: 0, left: 0, width: W, height: s(6), backgroundColor: '#FFEE00' }} />
          {/* Text — centered so Helvetica (wide) never overflows */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: heroH, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s(2) }}>
            <Text style={{ color: '#FFFFFF', fontSize: s(110), fontWeight: 'bold', lineHeight: 0.9, textAlign: 'center' }}>
              GOD
            </Text>
            <Text style={{ color: '#FFEE00', fontSize: s(110), fontWeight: 'bold', lineHeight: 0.9, textAlign: 'center' }}>
              ALONE
            </Text>
            <View style={{ width: s(120), height: s(5), backgroundColor: 'rgba(255,255,255,0.55)', marginTop: s(6) }} />
          </View>
        </View>

        {/* ── ORANGE SEPARATOR ── */}
        <View style={{ height: sepH, backgroundColor: '#E65100' }} />

        {/* ── VERSE SECTION ── */}
        <View style={{ height: verseH, backgroundColor: '#FFFFFF', flexDirection: 'column', justifyContent: 'center', padding: s(14), paddingLeft: s(28), paddingRight: s(28), gap: s(6) }}>
          <Text style={{ color: '#111111', fontSize: s(30), fontWeight: 'bold', lineHeight: 1.1, letterSpacing: s(-0.5) }}>
            {'"'}There is no god except the ONE God{'"'}
          </Text>
          <Text style={{ color: '#888888', fontSize: s(9), letterSpacing: s(3), fontWeight: 'bold' }}>
            Deuteronomy 6:4-5  ·  Luke 12:29-30  ·  Quran 3:18
          </Text>
        </View>

        {/* ── IMAGE SECTION ── */}
        <View style={{ height: imageH, position: 'relative', overflow: 'hidden' }}>
          {heroSrc ? (
            <Image src={heroSrc} style={{ position: 'absolute', top: 0, left: 0, width: W, height: imageH, objectFit: 'cover' }} />
          ) : (
            <View style={{ height: imageH, backgroundColor: '#1A1A1A' }} />
          )}
          <View style={{ position: 'absolute', top: 0, left: 0, width: W, height: imageH, backgroundColor: '#000000', opacity: 0.25 }} />
        </View>

        {/* ── CTA BAND ── */}
        <View style={{ height: ctaH, backgroundColor: '#FFEE00', borderTopWidth: s(4), borderTopColor: '#0D0D0D', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: s(5) }}>
          <Text style={{ color: '#0D0D0D', fontSize: s(48), fontWeight: 'bold', lineHeight: 1, letterSpacing: s(-2), textAlign: 'center' }}>
            WORSHIP GOD ALONE
          </Text>
          <Text style={{ color: 'rgba(13,13,13,0.55)', fontSize: s(9), fontWeight: 'bold', letterSpacing: s(5), textAlign: 'center' }}>
            ONE CREATOR  ·  ONE TRUTH  ·  ONE PATH
          </Text>
        </View>

        {/* ── FOOTER ── */}
        <View style={{ height: footerH, backgroundColor: '#1A237E', borderTopWidth: s(4), borderTopColor: '#FFEE00', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: s(28) }}>
          {/* QR Code */}
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: s(4) }}>
            {qrSrc ? (
              <Image src={qrSrc} style={{ width: s(52), height: s(52), borderWidth: s(2), borderColor: '#FFEE00' }} />
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
            <Text style={{ color: '#FFEE00', fontSize: s(10), fontWeight: 'bold', letterSpacing: s(1) }}>
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
  const [heroSrc, logoSrc, submittersSrc, qrSrc] = await Promise.all([
    Promise.resolve(loadImage('generated-1772868349064.png')),
    Promise.resolve(loadImage('logo-transparent.png')),
    Promise.resolve(loadImage('submitterslogo.png')),
    fetchQRCode('https://wikisubmission.org'),
  ])

  const nodeStream = await renderToStream(
    <GodAloneDoc heroSrc={heroSrc} logoSrc={logoSrc} submittersSrc={submittersSrc} qrSrc={qrSrc} />
  )

  const webStream = new ReadableStream({
    start(controller) {
      const readable = nodeStream as unknown as Readable
      readable.on('data', (chunk: Buffer) => controller.enqueue(chunk))
      readable.on('end', () => controller.close())
      readable.on('error', (err: Error) => controller.error(err))
    },
  })

  return new NextResponse(webStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': "attachment; filename=\"God-Alone-2026.pdf\"; filename*=UTF-8''God%20Alone%20%C2%B7%202026.pdf",
    },
  })
}

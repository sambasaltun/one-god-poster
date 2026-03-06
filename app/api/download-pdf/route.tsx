import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import React from 'react'
import { Document, Page, View, Text, Image, renderToStream } from '@react-pdf/renderer'
import { Readable } from 'stream'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

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

// 50cm × 70cm in points (1cm = 28.3465pt)
const CM = 28.3465
const W = 50 * CM
const H = 70 * CM
const scale = (designPx: number) => designPx * 0.1 * CM

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

function PosterDoc({ data, imgs }: { data: PosterData; imgs: Record<string, string> }) {
  const heroH = scale(256)
  const sepH = scale(4)
  const booksH = scale(250)
  const ctaH = scale(112)
  const footerH = scale(78)

  const books = [
    { label: 'TORAH', src: imgs.torah },
    { label: 'GOSPEL', src: imgs.gospel },
    { label: 'QURAN', src: imgs.quran },
  ]

  return (
    <Document>
      <Page size={[W, H]} style={{ margin: 0, padding: 0, backgroundColor: '#0A1628' }}>

        {/* HERO */}
        <View style={{ height: heroH, position: 'relative' }}>
          <Image src={imgs.hero} style={{ position: 'absolute', top: 0, left: 0, width: W, height: heroH, objectFit: 'cover' }} />
          <View style={{ position: 'absolute', top: 0, left: 0, width: W, height: heroH, backgroundColor: '#0A1628', opacity: 0.72 }} />
          <View style={{ position: 'absolute', top: 0, left: 0, width: W, height: heroH, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#C9923A', fontSize: scale(10), fontWeight: 'bold', letterSpacing: scale(4), textTransform: 'uppercase', textAlign: 'center', marginBottom: scale(6) }}>
              {data.tagline}
            </Text>
            <Text style={{ color: '#FFFFFF', fontSize: scale(84), fontWeight: 'bold', lineHeight: 1, textAlign: 'center', marginBottom: scale(6) }}>
              {data.headline1}
            </Text>
            <View style={{ width: scale(260), height: scale(3), backgroundColor: '#C9923A', marginBottom: scale(6) }} />
            <Text style={{ color: '#FFFFFF', fontSize: scale(64), fontWeight: 'bold', lineHeight: 1, textAlign: 'center' }}>
              {data.headline2}
            </Text>
          </View>
        </View>

        {/* GOLD SEPARATOR */}
        <View style={{ height: sepH, backgroundColor: '#C9923A' }} />

        {/* BOOKS */}
        <View style={{ height: booksH, backgroundColor: '#EDE7D9', flexDirection: 'row', padding: scale(14) }}>
          {books.map(({ label, src }, i) => (
            <View
              key={label}
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#0A1628',
                borderRadius: scale(4),
                overflow: 'hidden',
                marginLeft: i > 0 ? scale(10) : 0,
              }}
            >
              <Image src={src} style={{ flex: 1, objectFit: 'cover' }} />
              <View style={{ height: scale(44), backgroundColor: '#0A1628', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#C9923A', fontSize: scale(20), fontWeight: 'bold', letterSpacing: scale(3) }}>
                  {label}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA BAND */}
        <View style={{ height: ctaH, backgroundColor: '#0D1B32', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#E8B44A', fontSize: scale(46), fontWeight: 'bold', lineHeight: 1, textAlign: 'center', marginBottom: scale(6) }}>
            {data.cta}
          </Text>
          <View style={{ width: scale(200), height: scale(2), backgroundColor: '#C9923A' }} />
        </View>

        {/* FOOTER */}
        <View style={{ height: footerH, backgroundColor: '#060C1A', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: scale(22) }}>
          <Text style={{ color: '#FFFFFF', fontSize: scale(10), fontWeight: 'bold', letterSpacing: scale(3), textTransform: 'uppercase' }}>
            {data.footerLeft}
          </Text>
          <Image src={imgs.logo} style={{ width: scale(38), height: scale(38), borderRadius: scale(6) }} />
          <Text style={{ color: '#FFFFFF', fontSize: scale(10), fontWeight: 'bold', letterSpacing: scale(1) }}>
            {data.footerRight}
          </Text>
        </View>

      </Page>
    </Document>
  )
}

export async function GET() {
  const dataPath = path.join(process.cwd(), 'public', 'poster-data.json')
  const data: PosterData = JSON.parse(readFileSync(dataPath, 'utf-8'))

  const imgs = {
    hero: loadImage(data.heroImage),
    torah: loadImage(data.torahImage),
    gospel: loadImage(data.gospelImage),
    quran: loadImage(data.quranImage),
    logo: loadImage(data.logoImage),
  }

  const nodeStream = await renderToStream(<PosterDoc data={data} imgs={imgs} />)

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
      'Content-Disposition': "attachment; filename=\"One-God-One-Message.pdf\"; filename*=UTF-8''One%20God%20%C2%B7%20One%20Message.pdf",
    },
  })
}

import { readFileSync } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET() {
  const pdfPath = path.join(process.cwd(), 'public', 'one-god-one-message.pdf')
  const file = readFileSync(pdfPath)

  return new NextResponse(file, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="One God · One Message.pdf"',
    },
  })
}

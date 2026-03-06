import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

// Serves images from ./images/ (Pencil-generated) and project root (logo, etc.)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params

  // Sanitise — no path traversal
  const safe = path.basename(filename)

  const candidates = [
    path.join(process.cwd(), 'images', safe),
    path.join(process.cwd(), safe),
    path.join(process.cwd(), 'public', safe),
  ]

  const found = candidates.find(fs.existsSync)
  if (!found) return new NextResponse('Not found', { status: 404 })

  const buffer = fs.readFileSync(found)
  const ext = path.extname(safe).toLowerCase()
  const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.svg' ? 'image/svg+xml' : 'image/png'

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': mime,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}

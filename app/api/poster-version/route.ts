import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const dynamic = 'force-dynamic'

// Returns a version number based on the latest mtime of images + poster-data.json.
// The client polls this every 3s — when it changes, it refetches everything.
export async function GET() {
  let version = 0

  const imagesDir = path.join(process.cwd(), 'images')
  if (fs.existsSync(imagesDir)) {
    for (const file of fs.readdirSync(imagesDir)) {
      const stat = fs.statSync(path.join(imagesDir, file))
      version = Math.max(version, stat.mtimeMs)
    }
  }

  const dataPath = path.join(process.cwd(), 'public', 'poster-data.json')
  if (fs.existsSync(dataPath)) {
    const stat = fs.statSync(dataPath)
    version = Math.max(version, stat.mtimeMs)
  }

  return NextResponse.json({ version: Math.floor(version) })
}

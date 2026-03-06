import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const dynamic = 'force-dynamic'

export async function GET() {
  const dataPath = path.join(process.cwd(), 'public', 'poster-data.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  return NextResponse.json(data)
}

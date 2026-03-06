import { readFileSync } from 'fs'
import path from 'path'
import PosterPrint from './PosterPrint'

export const dynamic = 'force-dynamic'

export default function PrintPage() {
  const dataPath = path.join(process.cwd(), 'public', 'poster-data.json')
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'))

  return (
    <>
      <style>{`
        @page {
          size: 50cm 70cm;
          margin: 0;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          box-sizing: border-box;
        }
        html, body {
          margin: 0;
          padding: 0;
          background: #0A1628;
        }
      `}</style>
      <PosterPrint data={data} />
    </>
  )
}

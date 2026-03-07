/**
 * GOD ALONE POSTER — Single Source of Truth
 *
 * This file drives BOTH the website preview and the print-ready PDF.
 * To sync a Pencil design change: ask Claude Code "sync god-alone design"
 * → it reads design.pen, updates this file, commits & pushes
 * → Vercel auto-deploys (~1 min) → website and PDF are updated.
 */

export const PALETTE = {
  heroBgTop:    '#BAE6FD',  // sky blue top
  heroBgBot:    '#7DD3FC',  // sky blue bottom
  strip:        '#0C2D5A',  // navy left accent strip
  accent:       '#FBBF24',  // gold
  godText:      '#0C2D5A',  // deep navy
  aloneText:    '#D97706',  // amber
  sepColor:     '#FBBF24',  // gold separator
  verseBg:      '#FFFFFF',
  quoteText:    '#111111',
  citationText: '#888888',
  ctaBg:        '#0C2D5A',  // navy
  ctaText:      '#FFFFFF',
  ctaSub:       'rgba(255,255,255,0.53)',
  footerBg:     '#0C2D5A',
  footerBorder: '#FBBF24',
  qrBorder:     '#FFEE00',
  websiteText:  '#FBBF24',
}

export const TEXT = {
  heroTitle:    'GOD',
  heroSubtitle: 'ALONE',
  quote:        '\u201cThere is no god except the ONE God\u201d',
  citations:    'Deuteronomy 6:4-5  \u00b7  Luke 12:29-30  \u00b7  Quran 3:18',
  cta:          'WORSHIP GOD ALONE',
  ctaSub:       'ONE CREATOR  \u00b7  ONE TRUTH  \u00b7  ONE PATH',
  website:      'wikisubmission.org',
  qrLabel:      'SCAN QR',
  qrUrl:        'https://wikisubmission.org',
}

export const IMAGES = {
  hero:         'generated-1772868349064.png',
  logo:         'logo-transparent.png',
  submitters:   'submitterslogo.png',
}

// Layout — design is 500×700px; sections must sum to 700
export const LAYOUT = {
  posterW:      500,
  posterH:      700,
  heroH:        300,
  sepH:         4,
  verseH:       116,
  imageH:       94,
  ctaH:         110,   // border-box (includes 4px top border)
  footerH:      76,    // border-box (includes 4px top border)

  // Typography (px in web, scaled to PDF points via s())
  // titleLine: used by PDF renderer (react-pdf uses numeric lineHeight)
  // Web uses titleSize * 0.72 px (cap height) to eliminate CSS line-box padding.
  titleSize:    140,
  titleLine:    0.85,
  quoteSize:    30,
  ctaSize:      48,
  citationSize: 9,
  ctaSubSize:   9,
  websiteSize:  10,
}

/**
 * Product data — from the Candela Wholesale Catalogue (assets/brand/Candela
 * Wholesale Catalogue FINAL.pdf), the current source of truth for pricing,
 * collection line-ups, and wholesale program terms. Supersedes the earlier
 * transcription from candela_drive_context.md, which had two documents
 * disagreeing on pricing and terms.
 *
 * Last synced against the Aug 2026 revision of that catalogue. Prices and
 * line-ups were unchanged in that revision; what changed:
 *   - Case packs: every collection now ships in cases of 12. Previously only
 *     jars did, and cans and reed diffusers had no case pack minimum.
 *   - Payment Terms (Net 30 / prepayment) and Territory consideration were
 *     both dropped from the Wholesale Program page, so they are not asserted
 *     here. Absence in the catalogue is not proof they no longer apply —
 *     confirm before publishing either one again.
 *
 * Note the jar fill is 198 g (7 oz), per both catalogue editions. CLAUDE.md and
 * candela_drive_context.md both say 298 g; they are wrong.
 *
 * DELIBERATE DEPARTURES FROM THE CATALOGUE — confirmed by the user 2026-08-05,
 * do not "fix" these back:
 *   - Atelier and Pop are each a SINGLE product, not three scents. The catalogue
 *     lists Atelier as Golden Hour / Zen Garden / Coastal Light and Pop as
 *     Matcha Latte / Cloud Mochi / Peach Tea; those scents do not exist as
 *     separate SKUs. Atelier is the black fluted diffuser, Pop the amber/golden
 *     one. DL002/DL003 and DP002/DP003 (with UPCs in the Drive master list) are
 *     therefore stale — worth reconciling with the barcode records.
 *
 * Travel SKU codes come from the Drive master SKU list, which is the only source
 * that carries codes and UPCs at all — the catalogue lists the six cities but
 * assigns no codes. An earlier transcription had TR004/5/6 as Tokyo/London/Seoul;
 * the master list says London/Seoul/Tokyo.
 */

export type Format = 'jar' | 'can' | 'diffuser'

export const FORMATS: Record<Format, { name: string; spec: string; blurb: string }> = {
  jar: {
    name: 'Glass Jar',
    spec: '198 g · 7 oz',
    blurb:
      'The core format. Clear straight-sided glass with a gold lid — stacks cleanly on a shelf and reads as a gift without wrapping.',
  },
  can: {
    name: 'Soda Can',
    spec: '300 g',
    blurb:
      'Full-aperture printed can — the entire top opens away rather than a small pour hole, exposing the full wax pool for a bigger burn and stronger shelf presence.',
  },
  diffuser: {
    name: 'Fluted Bottle',
    spec: '150 ml · reed diffuser',
    blurb:
      'Flame-free counterpart to the jar programme. Boxed and shelf-ready for the higher price tier.',
  },
}

/** One scent. `code` is the SKU code from the master list and doubles as the
 *  photo filename — src/assets/products/KW001.png and so on. */
export interface Sku {
  code: string
  name: string
}

export interface Collection {
  slug: string
  name: string
  format: Format
  description: string
  skus: Sku[]
  /** Buyer-facing reason this collection earns its shelf space. */
  pitch: string
  /** SKU whose photo represents the collection's vessel in the Formats section. */
  hero?: string
  /** CAD suggested retail. */
  msrp: number
  /** CAD wholesale price. */
  wholesale: number
  /** Case pack requirement, per the catalogue. */
  casePack: string
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'kawaii',
    name: 'Kawaii',
    format: 'jar',
    description:
      'Playful fragrances inspired by beloved Asian desserts, café favourites, and nostalgic treats.',
    pitch: 'Collectible gifting with Gen Z pull — the widest range in the line.',
    msrp: 25,
    wholesale: 12.5,
    casePack: '12 units per case — mix and match scents freely within the case',
    skus: [
      { code: 'KW001', name: 'Matcha Latte' },
      { code: 'KW002', name: 'Brown Sugar Boba' },
      { code: 'KW003', name: 'Coffee Jelly' },
      { code: 'KW004', name: 'Ube Cake' },
      { code: 'KW005', name: 'Mango Pudding' },
      { code: 'KW006', name: 'Mochi' },
      { code: 'KW007', name: 'Peach Soju' },
      { code: 'KW008', name: 'Melona' },
      { code: 'KW009', name: 'Banana Milk' },
    ],
  },
  {
    slug: 'travel',
    name: 'Travel',
    format: 'jar',
    description:
      'Destination-inspired fragrances capturing the spirit, culture, and memories of iconic cities.',
    pitch: 'Souvenir and tourist retail. Toronto sells locally; the rest travel.',
    msrp: 25,
    wholesale: 12.5,
    casePack: '12 units per case — mix and match scents freely within the case',
    skus: [
      { code: 'TR001', name: 'Toronto' },
      { code: 'TR002', name: 'Paris' },
      { code: 'TR003', name: 'Milan' },
      { code: 'TR004', name: 'London' },
      { code: 'TR005', name: 'Seoul' },
      { code: 'TR006', name: 'Tokyo' },
    ],
  },
  {
    slug: 'home',
    name: 'Home',
    format: 'jar',
    description:
      'Everyday fragrances with timeless retail appeal, curated to suit a wide range of homes.',
    pitch: 'The safe repeat purchase. Broad appeal, no occasion required.',
    hero: 'HM001',
    msrp: 25,
    wholesale: 12.5,
    casePack: '12 units per case — mix and match scents freely within the case',
    skus: [
      { code: 'HM001', name: 'Sunday Clean' },
      { code: 'HM003', name: 'Azure Coast' },
      { code: 'HM004', name: 'Greenhouse' },
      { code: 'HM005', name: 'Velvet Smoke' },
      { code: 'HM006', name: 'Forest Calm' },
    ],
  },
  {
    slug: 'moments',
    name: 'Moments',
    format: 'jar',
    description:
      "Fragrances designed for life's meaningful occasions — birthdays, milestones, and everyday appreciation.",
    pitch: 'Message-based gifting. The customer already knows who it is for.',
    msrp: 25,
    wholesale: 12.5,
    casePack: '12 units per case — mix and match scents freely within the case',
    skus: [
      { code: 'MM001', name: 'Happy Birthday' },
      { code: 'MM002', name: 'Congratulations' },
      { code: 'MM004', name: 'Thinking of You' },
      { code: 'MM005', name: 'Thank You' },
      { code: 'MM003', name: 'Love You' },
    ],
  },
  {
    slug: 'intentions',
    name: 'Intentions',
    format: 'jar',
    description:
      'Crystal-infused candles built around a meaningful intention — beautifully packaged and quietly symbolic.',
    pitch: 'Wellness and spiritual gifting, at a step up from the core jar tier.',
    msrp: 28,
    wholesale: 14,
    casePack: '12 units per case — mix and match scents freely within the case',
    skus: [
      { code: 'IN001', name: 'Love' },
      { code: 'IN002', name: 'New Beginnings' },
      { code: 'IN003', name: 'Abundance' },
      { code: 'IN004', name: 'Peace' },
      { code: 'IN005', name: 'Protection' },
    ],
  },
  {
    slug: 'bar',
    name: 'Bar',
    format: 'can',
    description:
      'Cocktail-inspired candles hand-poured into a full-aperture signature beverage can.',
    pitch: 'Lifestyle and RTD-beverage aesthetics. Strongest display impact in the line.',
    hero: 'CB001',
    msrp: 35,
    wholesale: 17.5,
    casePack: '12 units per case — mix and match scents freely within the case',
    skus: [
      { code: 'CB001', name: 'Mimosa' },
      { code: 'CB002', name: 'Espresso Martini' },
      { code: 'CB003', name: 'Peach Bellini' },
      { code: 'CB004', name: 'Piña Colada' },
      { code: 'CB005', name: 'Rum Punch' },
      { code: 'CB006', name: 'Mojito' },
      { code: 'CB007', name: 'Muskoka Mule' },
    ],
  },
  {
    slug: 'rituals',
    name: 'Rituals',
    format: 'can',
    description:
      'Everyday moments turned into intentional self-care — each can infused with a thoughtfully chosen keepsake crystal.',
    pitch: 'Extends the can programme past cocktails into wellness, at its own price tier.',
    msrp: 37,
    wholesale: 18.5,
    casePack: '12 units per case — mix and match scents freely within the case',
    skus: [
      { code: 'RT002', name: 'Love Spell (Rose Quartz)' },
      { code: 'RT001', name: 'New Moon (Labradorite)' },
    ],
  },
  {
    slug: 'winter',
    name: 'Winter',
    format: 'jar',
    description:
      'A timeless winter collection built for holiday gifting, festive window displays, and effortless seasonal merchandising.',
    pitch: 'Q4 volume driver on the familiar jar format, priced above the core tier.',
    msrp: 28,
    wholesale: 14,
    casePack: '12 units per case — mix and match scents freely within the case',
    skus: [
      { code: 'HD002', name: 'Winter Parlour' },
      { code: 'HD003', name: 'Gilded Noel' },
      { code: 'HD001', name: 'Midnight Fir' },
    ],
  },
  {
    slug: 'bar-holidays',
    name: 'Bar Holidays',
    format: 'can',
    description:
      "Inspired by the season's most beloved holiday beverages — hand-poured into the signature full-aperture can.",
    pitch: 'Pairs with Bar for a full holiday endcap.',
    msrp: 35,
    wholesale: 17.5,
    casePack: '12 units per case — mix and match scents freely within the case',
    skus: [
      { code: 'CBH001', name: 'Eggnog' },
      { code: 'CBH002', name: 'Gingerbread Latte' },
      { code: 'CBH003', name: 'Holiday Sangria' },
      { code: 'CBH004', name: 'Candy Cane Cocoa' },
      { code: 'CBH005', name: 'Grinchmas' },
    ],
  },
  {
    slug: 'atelier',
    name: 'Atelier',
    format: 'diffuser',
    description:
      'Sophisticated fragrance in a beautifully fluted black glass vessel — continuous, long-lasting scent for an everyday-luxury category.',
    pitch: 'Flame-free gifting at the top of the range.',
    hero: 'DL001',
    msrp: 48,
    wholesale: 24,
    casePack: '12 units per case',
    skus: [{ code: 'DL001', name: 'Atelier' }],
  },
  {
    slug: 'pop',
    name: 'Pop',
    format: 'diffuser',
    description:
      "A playful reed diffuser inspired by today's café culture, carrying the Kawaii design language.",
    pitch: 'The Kawaii customer, upgraded to the diffuser price point.',
    msrp: 48,
    wholesale: 24,
    casePack: '12 units per case',
    skus: [{ code: 'DP001', name: 'Pop' }],
  },
]

export const SKU_COUNT = COLLECTIONS.reduce((n, c) => n + c.skus.length, 0)
export const COLLECTION_COUNT = COLLECTIONS.length

/** Wholesale program terms, per the catalogue's "Wholesale Program" page. */
export const WHOLESALE_TERMS = [
  { term: 'Opening Order', detail: '$250 minimum — mix and match any collection' },
  { term: 'New Retailer Discount', detail: '10% off your first opening order' },
  { term: 'Reorders', detail: 'No minimum order required' },
  { term: 'Case Packs', detail: 'Every collection ships in cases of 12 — mix and match scents within a case' },
  { term: 'Production Time', detail: '5–10 business days' },
  { term: 'Free Delivery', detail: 'GTA orders of $500+ ship free' },
  { term: 'Made In', detail: 'Canada' },
]

export const CONTACT_EMAIL = 'contact@candelacanada.ca'

/**
 * Product data — transcribed from candela_drive_context.md (Master SKU List).
 * No prices here by design: the site sends buyers to request a line sheet
 * instead, because the master list and the "NEW CANDELA 2026" draft disagree
 * on wholesale pricing. Do not add prices without confirming which set is live.
 */

export type Format = 'jar' | 'can' | 'diffuser'

export const FORMATS: Record<Format, { name: string; spec: string; blurb: string }> = {
  jar: {
    name: 'Glass Jar',
    spec: '298 g · 7 oz',
    blurb:
      'The core format. Clear straight-sided glass with a gold lid — stacks cleanly on a shelf and reads as a gift without wrapping.',
  },
  can: {
    name: 'Soda Can',
    spec: '300 g',
    blurb:
      'Full-wrap printed can, built for display impact. The format customers pick up because it does not look like a candle.',
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
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'kawaii',
    name: 'Kawaii',
    format: 'jar',
    description:
      'Playful fragrances inspired by beloved Asian desserts, café favourites, and nostalgic treats.',
    pitch: 'Collectible gifting with Gen Z pull — the widest range in the line.',
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
      'Sophisticated fragrances inspired by beautiful spaces, everyday rituals, and comforts of home.',
    pitch: 'The safe repeat purchase. Broad appeal, no occasion required.',
    hero: 'HM001',
    skus: [
      { code: 'HM001', name: 'Sunday Clean' },
      { code: 'HM002', name: 'Quiet Studio' },
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
      "Thoughtfully curated candles celebrating life's milestones and meaningful connections.",
    pitch: 'Message-based gifting. The customer already knows who it is for.',
    skus: [
      { code: 'MM001', name: 'Happy Birthday' },
      { code: 'MM002', name: 'Congratulations' },
      { code: 'MM003', name: 'Love You' },
      { code: 'MM004', name: 'Thinking of You' },
      { code: 'MM005', name: 'Thank You' },
    ],
  },
  {
    slug: 'intentions',
    name: 'Intentions',
    format: 'jar',
    description:
      'Crystal-infused candles for setting an intention — each poured with a tumbled stone.',
    pitch: 'Wellness and spiritual gifting, at a step up from the core jar tier.',
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
      'Cocktail-inspired fragrances in a full-wrap printed can, built to merchandise like a drinks fridge.',
    pitch: 'Lifestyle and RTD-beverage aesthetics. Strongest display impact in the line.',
    hero: 'CB001',
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
    description: 'Ritual and moon-phase fragrances in the printed can format.',
    pitch: 'Extends the can programme past cocktails into wellness.',
    skus: [
      { code: 'RT001', name: 'New Moon' },
      { code: 'RT002', name: 'Love Spell' },
    ],
  },
  {
    slug: 'holidays',
    name: 'Holidays',
    format: 'jar',
    description: 'Christmas in a jar — the seasonal core-tier assortment.',
    pitch: 'Q4 volume driver on the familiar jar format.',
    skus: [
      { code: 'HD001', name: 'Midnight Fir' },
      { code: 'HD002', name: 'Winter Parlour' },
      { code: 'HD003', name: 'Gilded Noel' },
    ],
  },
  {
    slug: 'bar-holidays',
    name: 'Bar Holidays',
    format: 'can',
    description: 'Seasonal cocktails in a can — the festive extension of the Bar line.',
    pitch: 'Pairs with Bar for a full holiday endcap.',
    skus: [
      { code: 'CBH001', name: 'Eggnog' },
      { code: 'CBH002', name: 'Gingerbread Latte' },
      { code: 'CBH003', name: 'Holiday Sangria' },
      { code: 'CBH004', name: 'Candy Cane Cocoa' },
    ],
  },
  {
    slug: 'atelier',
    name: 'Atelier',
    format: 'diffuser',
    description: 'Reed diffusers in a dark fluted bottle, boxed for the premium tier.',
    pitch: 'Flame-free gifting at the top of the range.',
    hero: 'DL001',
    skus: [
      { code: 'DL001', name: 'Golden Hour' },
      { code: 'DL002', name: 'Zen Garden' },
      { code: 'DL003', name: 'Coastal Light' },
    ],
  },
  {
    slug: 'pop',
    name: 'Pop',
    format: 'diffuser',
    description:
      'Reed diffusers in a light fluted bottle, carrying the Kawaii fragrance language.',
    pitch: 'The Kawaii customer, upgraded to the diffuser price point.',
    skus: [
      { code: 'DP001', name: 'Matcha Latte' },
      { code: 'DP002', name: 'Rice Milk' },
      { code: 'DP003', name: 'Peach Tea' },
    ],
  },
]

export const SKU_COUNT = COLLECTIONS.reduce((n, c) => n + c.skus.length, 0)
export const COLLECTION_COUNT = COLLECTIONS.length

/**
 * Wholesale terms shown publicly.
 *
 * Deliberately excludes opening-order minimum, reorder minimum and lead time:
 * the master list says $250 / $150 / 1–3 weeks, the 2026 draft says
 * $300 / $200 / 5–10 business days. Those go in the line sheet once confirmed.
 */
export const WHOLESALE_TERMS = [
  { term: 'Case Pack', detail: 'Open stock — mix and match freely' },
  { term: 'Payment', detail: 'Credit card or e-transfer' },
  { term: 'Shipping', detail: 'Calculated at time of order' },
  { term: 'Testers', detail: 'Available on request' },
  { term: 'Private Label', detail: 'Minimum 100 units per scent' },
  { term: 'Made In', detail: 'Canada' },
]

export const CONTACT_EMAIL = 'thebohochic.ca@gmail.com'

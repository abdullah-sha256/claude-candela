/**
 * Product and program data for OnlyCans — Grow in a Can, Collection No. 01.
 *
 * Source: onlycans-wholesale-brochure FINAL.pdf (the brochure the user
 * supplied). Copy below is transcribed from it; do not invent numbers or
 * claims that aren't in that document.
 *
 * `slug` is an internal identifier for photo-mapping purposes only — the
 * brochure does not publish SKU codes or UPCs, so this is not a real SKU
 * code. Don't present it as one on the page.
 *
 * DEPARTURE FROM THE BROCHURE: the brochure lists a 5th SKU, plain "Plant in
 * a Can" (distinct from "My First Plant in a Can"). Dropped per the user
 * (2026-08-08) — "extra" — not an oversight. It also had no photo (no can of
 * that design was ever shot), which is likely why it read as redundant.
 * Don't re-add it from the PDF without checking with the user first.
 */

export type Badge = 'mystery' | 'catnip'

export interface Product {
  slug: string
  name: string
  badge: Badge
  badgeLabel: string
  blurb: string
  /** Accent used by the CanMock illustration for this SKU. */
  accent: 'sprout-light' | 'sprout' | 'pop' | 'kraft' | 'tin'
}

export const PRODUCTS: Product[] = [
  {
    slug: 'first-plant',
    name: 'My First Plant in a Can',
    badge: 'mystery',
    badgeLabel: 'Mystery Seed',
    blurb:
      "Still a surprise every time — just the entry point to the collection. The one to hand a first-time grower, a classroom, or a kid who's never successfully kept a plant alive.",
    accent: 'sprout-light',
  },
  {
    slug: 'flower',
    name: 'Flower in a Can',
    badge: 'mystery',
    badgeLabel: 'Mystery Seed',
    blurb:
      'A surprise flowering variety every time — colourful, unpredictable, and an easy grab for anyone buying "just because."',
    accent: 'pop',
  },
  {
    slug: 'herb',
    name: 'Herb in a Can',
    badge: 'mystery',
    badgeLabel: 'Mystery Seed',
    blurb:
      'A surprise culinary herb every time — useful enough to justify the purchase, surprising enough that they still tell someone about it.',
    accent: 'kraft',
  },
  {
    // The photo wired to this slug (src/assets/products/catnip.png, sourced
    // from Candela-087.jpg) is a can printed "CAT GRASS IN A CAN" with
    // cat-grass copy — a different plant from catnip. Kept as "Catnip" per
    // the user's explicit call (2026-08-08), not an oversight. See the
    // README's "Product photography" section before changing either the
    // name/copy here or the photo it's paired with.
    slug: 'catnip',
    name: 'Catnip in a Can',
    badge: 'catnip',
    badgeLabel: 'Always Catnip · Fixed Variety',
    blurb:
      "No mystery, no maybe — just real, grow-your-own catnip. The instant sell next to any pet product, for the one shopper who already knows exactly who it's for.",
    accent: 'tin',
  },
]

export const WHOLESALE_PRICE = 10
export const RETAIL_PRICE = 20

export interface Reason {
  n: string
  title: string
  body: string
}

export const WHY_PARTNER: Reason[] = [
  {
    n: '01',
    title: 'A 50% margin, not a promise of one',
    body: '$20 CAD suggested retail, with wholesale pricing available on request. Straight keystone pricing — no tiered games, no volume math required to know what you’re making.',
  },
  {
    n: '02',
    title: '$250 gets you in. Nothing locks you in after that',
    body: "One $250 CAD order puts a full assortment on your shelf. From then on there's no reorder minimum — you restock exactly what sells and never carry what doesn't.",
  },
  {
    n: '03',
    title: 'Retail-ready before it reaches you',
    body: 'UPC-coded and ready to scan into your POS the moment it’s on the shelf — no labelling, no setup, no extra work on your end.',
  },
  {
    n: '04',
    title: 'Merchandising support, not just a shipment',
    body: "We'll work with you on shelf and counter placement, display setup, and seasonal merchandising ideas — so Grow in a Can earns its spot at the front of the store instead of getting lost at the back.",
  },
  {
    n: '05',
    title: 'Built to be picked up, not scrolled past',
    body: 'The can format is compact enough for a checkout counter, bold enough to anchor a dedicated display, and different enough that customers stop to figure out what it actually is.',
  },
  {
    n: '06',
    title: 'A gift for every occasion on the calendar',
    body: 'Birthdays, teacher gifts, housewarmings, thank-yous, Mother’s and Father’s Day, office grab bags — one $20 retail SKU that answers "what do I get them" all year long.',
  },
  {
    n: '07',
    title: 'One display, three customer bases',
    body: "Kids want the surprise, adults want the payoff of watching it grow, cat owners want the can that's made just for their cat. You're not stocking a niche product — you're stocking three of them in one SKU set.",
  },
  {
    n: '08',
    title: 'Sells itself, explains itself',
    body: 'Grow steps are printed right on the can, and a seed-specific grow card is sealed inside. Nobody needs to ask your staff how it works — it tells them.',
  },
  {
    n: '09',
    title: 'Get in as Collection No. 01, not collection No. 4',
    body: "Grow in a Can is the first release from OnlyCans — a house brand built to keep launching new \"in a Can\" collections. Stock it now and you're the retailer we call first when the next one drops.",
  },
]

/** Wholesale price is intentionally never printed on the site — the
 *  'Wholesale Price' stat points to the inquiry form instead of a number.
 *  Rendered specially in index.astro to turn its value into a link. */
export const ORDERING_STATS = [
  { label: 'Retail Price', value: `$${RETAIL_PRICE} CAD` },
  { label: 'Wholesale Price', value: 'Email us', wholesale: true },
  { label: 'Min. Opening Order', value: '$250 CAD' },
  { label: 'Reorders', value: 'No Minimum' },
  { label: 'GTA Delivery', value: 'Free on $500+' },
]

export interface InfoItem {
  title: string
  body: string
  icon: 'bilingual' | 'clock' | 'barcode' | 'seed' | 'support'
}

export const IMPORTANT_INFO: InfoItem[] = [
  {
    title: 'Bilingual Packaging',
    body: "Every can and every insert card is printed in both English and French, so it's ready for shelves across Canada.",
    icon: 'bilingual',
  },
  {
    title: 'Shipping Times',
    body: 'Wholesale orders ship within 5–10 business days of order placement.',
    icon: 'clock',
  },
  {
    title: 'Barcode Ready',
    body: 'Every product is UPC-coded and ready to scan straight into your POS system for easy inventory management and checkout.',
    icon: 'barcode',
  },
  {
    title: 'Seed Viability',
    body: 'Seeds are a living product. Store cans in a cool, dry spot and plant within a year of receiving for the best germination results.',
    icon: 'seed',
  },
  {
    title: 'Support',
    body: 'Reach out anytime at info@shoponlycans.ca — we’re happy to help with orders, reorders, or any questions along the way.',
    icon: 'support',
  },
]

export const CONTACT_EMAIL = 'info@shoponlycans.ca'
export const BUSINESS_ADDRESS = 'Toronto, ON M8V 1L4'
export const HST_NOTE = 'HST (13%) is added at checkout on Ontario orders.'

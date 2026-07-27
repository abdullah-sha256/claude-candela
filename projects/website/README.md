# Candela — Wholesale Landing Page

Single-page static site aimed at wholesale buyers. No ecommerce, no cart, no backend.

Astro 5 · Tailwind 4 · shadcn/ui (new-york, stone base) · React 19 islands.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
```

`dist/` is plain HTML/CSS/JS — deploy anywhere (Cloudflare Pages, Netlify, S3).

## Swap points

Three places to change when the real brand material lands. Nothing else should need editing.

### 1. Design system → `src/styles/global.css`

The current palette is a **placeholder** (warm candlelight: parchment / espresso / brass).
Everything visual flows from the `:root` block at the top. Replace those hex values and the
`--font-display` / `--font-sans` tokens and the whole site re-skins. Components only ever
reference semantic tokens (`bg-background`, `text-brass`, `border-sand`), never raw colours.

Fonts are currently Fraunces + Inter loaded from Google Fonts in `src/layouts/Layout.astro`.

### 2. Logo → `.wordmark` in `global.css`

The mark is CSS-set letterspaced lowercase (`candēla`) standing in for the real logo. Drop the
asset into `assets/brand/`, copy it to `public/`, and replace the two `.wordmark` spans in
`src/components/Nav.tsx` and `src/pages/index.astro`.

### 3. Photography → `src/assets/products/`

Drop one photo per SKU, named after its SKU code (`KW001.png`, `CB007.jpg`). They are picked up
automatically — no code change, no import list to maintain. Any SKU without a photo falls back
to a drawn vessel silhouette, so you can add them in batches. See the
[README in that folder](src/assets/products/README.md) for specs.

Photos sit in a `.photo-tile` whose background is the `--photo-bg` token, currently `#f6f3ee`.
Sample the actual off-white sweep from a delivered photo and set that token to match — the tile
edge then disappears completely.

## Content

All product data lives in `src/data/collections.ts`, transcribed from
`candela_drive_context.md`. 53 SKUs across 11 collections, each with its SKU code — the code
doubles as the photo filename. `LE001 Grinch` is excluded — the master list has no vessel,
size, or price for it.

**There are deliberately no prices on the site.** The master SKU list and the "NEW CANDELA 2026"
draft disagree on wholesale pricing, order minimums, and lead time, so the page routes buyers to
a line-sheet request instead. `WHOLESALE_TERMS` only publishes the terms both documents agree
on. Once you confirm which set is live, the omitted terms (opening order, reorder minimum, lead
time) can go back in.

## Inquiry form

`src/components/InquiryForm.tsx` composes a pre-filled `mailto:` in the visitor's own mail
client — nothing is posted, since there is no backend. To capture submissions properly, point
the form at Formspree / Netlify Forms and delete the `onSubmit` handler.

Contact address is `CONTACT_EMAIL` in `src/data/collections.ts`, currently the
`thebohochic.ca@gmail.com` address from the business docs. Worth replacing with a
`@candelacanada.ca` address before this goes in front of buyers.

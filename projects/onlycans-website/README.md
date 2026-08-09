# OnlyCans — Grow in a Can, Wholesale Brochure

Single-page static site aimed at wholesale buyers, for OnlyCans (a *different* brand from
Candela — this is a separate project on purpose, not a re-skin).

Astro 5 · Tailwind 4. No UI framework: the only interactivity (mobile nav toggle, the mailto
inquiry form) is small enough for plain `<script>` tags, so there's no islands runtime to ship.

```bash
npm install
npm run dev      # http://localhost:4321 (or next free port)
npm run build    # static output to dist/
```

## ⚠️ Not launch-ready

Two staging guards are in place and **must be removed before this goes live** on
shoponlycans.ca:

- `public/_headers` — `X-Robots-Tag: noindex, nofollow`
- `public/robots.txt` — `Disallow: /`

Both keep an unlisted-but-reachable staging URL out of search results. Removing them is exactly
the launch step the Candela site went through — see `../website/README.md`'s "Indexing" section
for how that played out there.

## Product line-up: 4 SKUs, not 5

The brochure lists a 5th SKU, plain **"Plant in a Can"** (distinct from "My First Plant in a
Can"). Dropped from the site per the user (2026-08-08) as redundant — it also had no photo, since
no can of that design was ever shot, which is likely why it read that way. If it comes back,
check with the user first rather than re-adding it from the PDF; see the comment on `PRODUCTS`
in `src/data/onlycans.ts`.

## Product photography

All four remaining SKUs use real photos from `../../assets/candles/onlycans/`
(`Candela-081/084/087/090.jpg` — filenames are leftover from the shared photo shoot, not a
naming convention). `scripts/build-product-photos.sh` cuts each one out and normalises it into
`src/assets/products/`; `ProductPhoto.astro` picks up whatever exists there by slug and falls
back to the `CanMock` illustration for anything missing — currently nothing, but the fallback
stays in place for whenever a new SKU launches ahead of its photography.

**"Cat Grass in a Can" is named after what's actually printed on the can.** The brochure calls
this SKU "Catnip in a Can," but the physical can (and its copy — supports digestion, reduces
hairballs) is Cat Grass, a different plant with different effects on cats. An earlier pass kept
the brochure's "Catnip" name anyway; corrected 2026-08-08 to match the can instead. If real
Catnip is introduced as its own SKU later, it needs its own photo — don't reuse this one.

## Swap points

### 1. Design system → `src/styles/global.css`

Palette is a **placeholder**: kraft-paper base, sprout green accent, a rust "pop" accent used
sparingly. Deliberately not Candela's palette, since this is a different brand. Replace the
`:root` values and the two `--font-*` tokens when the real OnlyCans brand kit lands.

### 2. Logo → `.wordmark` in `global.css`

Currently CSS-set uppercase "OnlyCans" text. Replace the two `.wordmark` elements
(`Nav.astro`, footer in `index.astro`) with the real mark once it exists.

## Content

All copy and pricing is transcribed from `onlycans-wholesale-brochure FINAL.pdf` (supplied by
the user, not committed to this repo — ask for it again if it needs re-checking) into
`src/data/onlycans.ts`. That file is the single source for product names, prices, the nine
"why partner" reasons, ordering terms, and the important-info list — update it, not the page,
if the brochure changes.

**No real SKU codes or UPCs are in the brochure.** `Product.slug` in `onlycans.ts` is an
internal identifier for mapping mock art (and eventually real photos) to products — it is not
a real SKU code and shouldn't be presented as one on a line sheet.

## Inquiry form

`src/components/InquiryForm.astro` composes a pre-filled `mailto:` to `info@shoponlycans.ca` in
the visitor's own mail client — nothing is posted, since there is no backend. To capture
submissions properly, point the form at Formspree / Netlify Forms and delete the submit
handler in that file.

## Deploying

Served by **Cloudflare Workers static assets** — config in `wrangler.toml`, same pattern as
`../website` (Candela).

```bash
npm run deploy   # build + deploy (needs `wrangler login` first)
```

**Connecting the repo (Workers Builds).** In the Cloudflare dashboard: Workers & Pages →
Create → Connect to Git → `abdullah-sha256/claude-candela`, then:

| Setting | Value |
|---|---|
| Worker name | `onlycans-website` — **must** match `name` in `wrangler.toml` or builds fail |
| Root directory | `projects/onlycans-website` — this is a monorepo subdirectory |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (the default) |

Pushes to `main` then deploy automatically. Other branches run `npx wrangler versions upload`,
publishing a preview version without touching production.

`npm run deploy:preview` is a separate escape hatch: `--temporary` deploys to an anonymous
throwaway Cloudflare account with no login, useful for a quick shareable link, but the result
lives in an account you can't manage and expires on its own.

> **Before pointing a real domain at this**, remove `public/_headers` and `public/robots.txt` —
> see "Not launch-ready" above.

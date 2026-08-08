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

There's also a real content **mismatch**, confirmed with the user 2026-08-08 rather than
silently patched over — see "Product photography" below before this goes to a buyer.

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

**"Catnip in a Can" shows a photo of a can printed "CAT GRASS IN A CAN,"** with cat-grass copy
(supports digestion, reduces hairballs) — not catnip. Cat grass and catnip are different plants
with different effects on cats. The user's explicit call (2026-08-08) was to keep the brochure's
"Catnip" name and copy anyway and use the photo as-is. That means **the product photo and the
on-page name/description don't match** — flagging again here because it's the kind of mismatch
a retailer notices immediately on unboxing, not because it needs to be re-litigated. If the can
art gets reprinted to say "Catnip," or the site copy gets changed to "Cat Grass" instead,
`onlycans.ts` (the `catnip` entry) and the script comment above it are both marked for the
update.

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
> see "Not launch-ready" above. Both block search indexing on purpose while this build has the
> Catnip/Cat Grass mismatch and no dropped-SKU cleanup pass from a buyer's perspective.

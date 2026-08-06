# Candela — Workspace

Working directory for **Candela** (styled `c a n d ē l a`), a Toronto-based candle brand focused on modern gifting, strong visual merchandising, and scalable wholesale. Made in Canada. Site: candelacanada.ca.

Typical tasks here: building websites and landing pages, product/label/packaging design, line sheets, wholesale materials, and marketing assets.

## Key context

**`assets/brand/Candela Wholesale Catalogue FINAL.pdf` is the source of truth** for collection
line-ups, pricing, vessel specs, and wholesale terms. Where it disagrees with anything else in
this workspace, the catalogue wins. It does *not* carry SKU codes or UPCs — for those, the master
SKU list below is the only source.

Read [candela_drive_context.md](candela_drive_context.md) before any brand-related task. It contains:

- **Master SKU list** — every collection, SKU code, product name, vessel, size, MSRP, wholesale price, and UPC. **The authority for SKU codes and UPCs**, which the catalogue omits.
- **Collection descriptions** — Kawaii (Asian desserts), Travel (cities), Home (everyday spaces), Moments (occasion gifting), Intentions (crystal-infused), Bar (cocktails), Rituals (crystal cans), Winter (holiday jars), Bar Holidays (holiday cans), Atelier/Pop (reed diffusers)
- **Wholesale program terms** — reconciled against the catalogue 2026-08-05; the original Google Sheet values are preserved alongside for provenance
- **Costing breakdowns** per vessel type, MOQs, scent profiles
- **Supplier/expense records** and design asset inventory from Google Drive

## Brand quick facts

- 53 SKUs across 11 collections
- Core jar candles: MSRP $25 / wholesale $12.50 (Home, Moments, Travel, Kawaii)
- Intentions & Winter (jars): $28 / $14 · Bar & Bar Holidays (cans): $35 / $17.50 · Rituals (cans): $37 / $18.50 · Reed diffusers: $48 / $24
- Vessels: glass jar (**198 g** / 7 oz), soda can (300 g), fluted diffuser bottles (150 ml). The jar is 198 g per the catalogue and the physical labels — an earlier 298 g figure in this file and the Drive extract was wrong.
- Wholesale: $250 opening order, 10% off the first one, no reorder minimum, every collection ships in mix-and-match cases of 12, 5–10 business day production, free GTA delivery on $500+
- Voice: warm, playful-premium, emotional storytelling; bilingual EN/FR labels appear on packaging ("scented soy candle / bougie de soja parfumée")
- Buyer-facing contact: `contact@candelacanada.ca`, candelacanada.ca, @candelacanada.ca, Toronto ON. Business/supplier paperwork uses Karen Furet, Mississauga ON, thebohochic.ca@gmail.com.

## Workspace layout

- `assets/brand/Candela Wholesale Catalogue FINAL.pdf` — **source of truth** for line-ups, pricing, specs, terms
- `candela_drive_context.md` — brand/business data extracted from Google Drive. Reconciled against the catalogue where the two conflicted; original Drive values kept inline for provenance. Don't otherwise hand-edit — ask to re-extract instead.
- `assets/brand/` — logos, fonts, product photos, label artwork (drop files here)
- `projects/` — one subfolder per deliverable (e.g. `projects/website/`, `projects/line-sheet/`)

## Conventions

- Start each new deliverable in its own `projects/<name>/` folder.
- For websites: static-first (plain HTML/CSS/JS or a light build) unless a framework is requested; mobile-responsive; preview with the browser tools before calling it done.
- Use real SKU names, prices, and collection copy from the context file — never invent product data.
- Prices in the context file are CAD unless marked USD (supplier expenses are USD).

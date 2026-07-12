# Candela — Workspace

Working directory for **Candela** (styled `c a n d ē l a`), a Toronto-based candle brand focused on modern gifting, strong visual merchandising, and scalable wholesale. Made in Canada. Site: candelacanada.ca.

Typical tasks here: building websites and landing pages, product/label/packaging design, line sheets, wholesale materials, and marketing assets.

## Key context

Read [candela_drive_context.md](candela_drive_context.md) before any brand-related task. It contains:

- **Master SKU list** — every collection, SKU code, product name, vessel, size, MSRP, wholesale price, and UPC
- **Collection descriptions** — Kawaii (Asian desserts), Travel (cities), Home (everyday spaces), Moments (occasion gifting), Intentions (crystal-infused), Bar (cocktails), Rituals, Holidays, Atelier/Pop (reed diffusers)
- **Wholesale program terms** — current published terms plus a draft "2026" version with updated minimums (note: the two conflict; ask which applies if a task depends on it)
- **Costing breakdowns** per vessel type, MOQs, scent profiles
- **Supplier/expense records** and design asset inventory from Google Drive

## Brand quick facts

- Core jar candles: MSRP $25 / wholesale $12.50 (Home, Moments, Travel, Kawaii)
- Intentions: $28 / $14 · Soda-can lines (Bar, Rituals, Holiday cans): $35 / $17.50 · Reed diffusers: $48 / $24
- Vessels: glass jar (298 g / 7 oz), soda can (300 g), fluted diffuser bottles (150 ml)
- Voice: warm, playful-premium, emotional storytelling; bilingual EN/FR labels appear on packaging ("scented soy candle / bougie de soja parfumée")
- Contact on business docs: Karen Furet, Mississauga ON; business email thebohochic.ca@gmail.com

## Workspace layout

- `candela_drive_context.md` — source-of-truth brand/business data (extracted from Google Drive; don't edit, ask to refresh instead)
- `assets/brand/` — logos, fonts, product photos, label artwork (drop files here)
- `projects/` — one subfolder per deliverable (e.g. `projects/website/`, `projects/line-sheet/`)

## Conventions

- Start each new deliverable in its own `projects/<name>/` folder.
- For websites: static-first (plain HTML/CSS/JS or a light build) unless a framework is requested; mobile-responsive; preview with the browser tools before calling it done.
- Use real SKU names, prices, and collection copy from the context file — never invent product data.
- Prices in the context file are CAD unless marked USD (supplier expenses are USD).

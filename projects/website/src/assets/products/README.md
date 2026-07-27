# Product photos

Drop one photo per SKU here, named after its SKU code from the master list:

    KW001.png   Kawaii — Matcha Latte
    CB007.jpg   Bar — Muskoka Mule
    DP002.webp  Pop — Rice Milk

Case-insensitive; `.png`, `.jpg`, `.jpeg`, `.webp`, and `.avif` all work.
Any SKU without a file falls back to a drawn vessel silhouette, so you can
add them in batches without the page breaking.

Naming by SKU code rather than scent name is deliberate: "Matcha Latte" exists
in both Kawaii (KW001, a jar) and Pop (DP001, a diffuser).

## Specs

- **Square-ish**, subject centred with ~10% breathing room. Tiles are 1:1 in the
  collection grid and 4:3 in the Formats section, and images are contained
  rather than cropped, so a little extra margin is safe.
- **~1200px on the long edge** is plenty — Astro downsizes and converts to webp
  at build time. Larger sources just slow the build.
- **Off-white backdrop**, consistent across the set. Then sample that exact
  colour and set `--photo-bg` in `src/styles/global.css` so the tile matches
  the sweep and the edge disappears.

Source/master artwork belongs in the repo-level `assets/brand/`, not here.

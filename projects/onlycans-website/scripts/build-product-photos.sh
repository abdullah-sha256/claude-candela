#!/usr/bin/env bash
# Cut out and normalise real OnlyCans product photos into the site's
# per-slug photo set. Same pattern as the Candela site's script of the same
# name: crop to the subject's alpha bounding box, scale to a fixed height,
# and centre on a fixed square canvas, so every photo renders at the same
# scale regardless of source framing.
#
# Requires a rembg install (not a repo dependency — see the Candela script
# for the one-off venv setup this mirrors). Re-run only when new source
# photos are added; output is committed, this script is not part of the
# build.
#
# Usage: ./scripts/build-product-photos.sh
set -euo pipefail

SRC="$(cd "$(dirname "$0")/../../.." && pwd)/assets/candles/onlycans"
OUT="$(cd "$(dirname "$0")/.." && pwd)/src/assets/products"
REMBG="${REMBG_BIN:-rembg}"   # override with REMBG_BIN=/path/to/venv/bin/rembg

CANVAS=1200
SUBJECT=960   # 80% of canvas => 10% margin each side

# slug -> source JPEG in assets/candles/onlycans (filenames are leftover from
# the shared photo shoot, not a naming convention).
#
# The brochure's plain "Plant in a Can" (distinct from "My First Plant in a
# Can") has no entry here — no can of that design was ever shot, and the
# user dropped the SKU from the site entirely rather than leave it on a
# mock illustration. See onlycans.ts if it needs to come back.
#
# "cat-grass" was briefly listed as "Catnip in a Can" (the brochure's name)
# despite the can itself being printed "CAT GRASS IN A CAN" — corrected
# 2026-08-08 to match what's actually on the can.
MAP="
first-plant Candela-084
herb        Candela-081
flower      Candela-090
cat-grass   Candela-087
"

count=0
while read -r slug src; do
  [ -z "${slug:-}" ] && continue
  in="$SRC/$src.jpg"
  if [ ! -f "$in" ]; then
    echo "MISSING SOURCE: $slug <- $src.jpg" >&2
    continue
  fi

  tmp=$(mktemp -d)
  "$REMBG" i -m u2net "$in" "$tmp/cut.png" >/dev/null 2>&1

  bbox=$(magick "$tmp/cut.png" -alpha extract -threshold 8% -format '%@' info:)

  magick "$tmp/cut.png" -crop "$bbox" +repage \
    -resize "x${SUBJECT}" \
    -background none -gravity center -extent "${CANVAS}x${CANVAS}" \
    -strip -define png:compression-level=9 \
    "$OUT/$slug.png"

  rm -rf "$tmp"
  printf '%-14s <- %-16s %s\n' "$slug" "$src.jpg" "$bbox"
  count=$((count + 1))
done <<< "$MAP"

echo "wrote $count photos to src/assets/products/" >&2

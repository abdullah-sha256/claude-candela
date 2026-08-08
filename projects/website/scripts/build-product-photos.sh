#!/usr/bin/env bash
# Normalise cut-out product photos into the site's per-SKU photo set.
#
# The source PNGs are already transparent but every one has a different canvas
# and a different amount of margin, so tiles would render the vessels at
# inconsistent sizes. For each SKU we crop to the subject's alpha bounding box,
# scale it, and centre it on a fixed square canvas.
#
# Jars and cans are scaled to TRUE RELATIVE SIZE: a can really is taller than a
# jar, so they are scaled by real-world height rather than each being stretched
# to fill its tile. The heights below come from two independent measurements
# that agree within 3%:
#
#   1. Same-session pixel ratio. Candela-003..045 (bar cans) and Candela-112..123
#      (travel jars) were shot in one session on the same sweep at the same
#      camera distance, so their subject heights are directly comparable:
#      can 1882px : jar 1531px = 1.229.
#   2. Documented label size. The jar label sticker is 3 in W x 2.25 in H, so
#      57.15mm tall; measured at 804px on travel-seoul.png => 14.07 px/mm,
#      putting the jar at ~109mm. Cans measure 66.3mm across (standard 355ml
#      can diameter) => ~130mm tall as photographed, including the lid.
#
# Note the shoot spanned two sessions at different magnifications (travel jars
# 1531px vs DSC-session jars 1368px for the same physical jar), so scaling by
# real height per format — not by source pixels — is what makes the set
# consistent.
#
# Diffusers are fit to the tile rather than scaled truly: the reeds make total
# height a styling choice, and at true scale (283.5mm box) every jar would
# shrink to ~360px and look lost in its tile.
#
# Usage: ./scripts/build-product-photos.sh
set -euo pipefail

SRC="$(cd "$(dirname "$0")/../../.." && pwd)/assets/png"
OUT="$(cd "$(dirname "$0")/.." && pwd)/src/assets/products"

CANVAS=1200   # square output, per README "~1200px on the long edge"
TALLEST=960   # 80% of canvas => 10% margin on the tallest vessel

# Real-world heights, mm (see derivation above). The tallest candle format fills
# TALLEST; everything else is scaled proportionally from it.
MM_JAR=106
MM_CAN=130

px_for() { # format -> target subject height in px
  case "$1" in
    jar)      echo $(( TALLEST * MM_JAR / MM_CAN )) ;;
    can)      echo "$TALLEST" ;;
    diffuser) echo "$TALLEST" ;;   # fit to tile, see note above
  esac
}

# SKU code -> vessel format -> source file in assets/png.
# Jars identified by reading the label on each shot; cans by filename, using the
# -01 variant throughout (-01/-02 are front views, -03 is generally the back
# with the candle-facts panel and barcode) — except RT001 New Moon, where -01 is
# the sealed lid and -03 is the open-top front the user asked for.
#
# Atelier is the BLACK fluted diffuser (Candela-127); Pop is the amber/golden one
# (Candela-128). Each is a single product, so one photo per collection.
MAP="
KW001  jar      DSC_1397
KW002  jar      DSC_1376
KW003  jar      DSC_1380
KW004  jar      DSC_1406
KW005  jar      DSC_1392
KW006  jar      DSC_1416
KW007  jar      DSC_1389
KW008  jar      1403
KW009  jar      DSC_1378
TR001  jar      travel-toronto
TR002  jar      travel-paris
TR003  jar      travel-milan
TR004  jar      travel-london
TR005  jar      travel-seoul
TR006  jar      travel-tokyo
HM001  jar      DSC_1371
HM003  jar      DSC_1374
HM004  jar      DSC_1367
HM005  jar      DSC_1365
HM006  jar      DSC_1361
MM001  jar      DSC_1434
MM002  jar      DSC_1424
MM003  jar      DSC_1432
MM004  jar      DSC_1440
MM005  jar      DSC_1420
IN001  jar      DSC_1446
IN002  jar      DSC_1451
IN003  jar      DSC_1473
IN004  jar      DSC_1459
IN005  jar      Protection
CB001  can      can-mimosa-01
CB002  can      can-espresso-01
CB003  can      can-peach-01
CB004  can      can-pina-01
CB005  can      can-rampunch-01
CB006  can      can-mojito-01
CB007  can      can-muskoka-01
RT001  can      can-moon-03
RT002  can      can-love-01
HD001  jar      1346
HD002  jar      DSC_1351
HD003  jar      DSC_1355
CBH001 can      can-eggnon-01
CBH002 can      can-gingerbread-01
CBH003 can      can-holiday-sangria-01
CBH004 can      candela-candy-01
CBH005 can      can-grinch-01
DL001  diffuser Candela-127
DL002  diffuser Candela-127
DL003  diffuser Candela-127
DP001  diffuser Candela-128
DP002  diffuser Candela-128
DP003  diffuser Candela-128
"
# Atelier (DL00x) and Pop (DP00x) each have one photographed bottle design —
# only the fill/scent differs between the three SKUs in each collection, and
# that isn't visible from outside the bottle. All three SKU codes in each
# collection map to the same source photo rather than falling back to the
# drawn silhouette for two of every three tiles.

count=0
while read -r sku format src; do
  [ -z "${sku:-}" ] && continue
  in="$SRC/$src.png"
  if [ ! -f "$in" ]; then
    echo "MISSING SOURCE: $sku <- $src.png" >&2
    continue
  fi

  target=$(px_for "$format")

  # Alpha bounding box, thresholded so faint edge pixels don't inflate the crop.
  bbox=$(magick "$in" -alpha extract -threshold 8% -format '%@' info:)

  # Scale by HEIGHT so relative size is governed by the vessel's real height.
  magick "$in" -crop "$bbox" +repage \
    -resize "x${target}" \
    -background none -gravity center -extent "${CANVAS}x${CANVAS}" \
    -strip -define png:compression-level=9 \
    "$OUT/$sku.png"

  printf '%-7s %-9s <- %-24s %-16s h=%spx\n' "$sku" "$format" "$src.png" "$bbox" "$target"
  count=$((count + 1))
done <<< "$MAP"

echo "wrote $count photos to src/assets/products/" >&2

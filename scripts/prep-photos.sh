#!/usr/bin/env bash
#
# Resize the selected stills for Cloudinary.
#
# The masters run up to 7000×8756 / ~20 MB, well past what Cloudinary's free
# tier accepts and far past what the site ever serves. Everything is capped at
# a 2600px long edge at q88 — still oversized for the largest slot on the page,
# so Cloudinary's own f_auto,q_auto resizing has room to work from.
#
# The selection is deliberate: one or two frames per shoot, not whole galleries.
# Aspect ratios are left alone — the mix of 4:5, 3:2 and square is what makes
# the photo index read as a spread rather than a grid.
#
# Usage: scripts/prep-photos.sh [outdir]

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${SRC:-$ROOT/UPDATEDMANDOCONTENT}"
OUT="${1:-$ROOT/build/media}"

mkdir -p "$OUT"

MAX=2600

# source-relative-path::slug
PHOTOS=(
  # Jaelan Phillips — Panthers signing
  "PICS/JAELAN PHILLIPS/jp-2.jpg::jaelan-phillips-jersey"
  "PICS/JAELAN PHILLIPS/1A7A4713.jpg::jaelan-phillips-signing"
  # Matthew Stafford — hospital visit essay
  "PICS/MATTHEW STAFFORD/1A7A8100-3.jpg::stafford-visit"
  "PICS/MATTHEW STAFFORD/1A7A9024.jpg::stafford-ball"
  # 35mm scans
  "PICS/000000010002 3.jpg::film-tunnel"
  "PICS/000000010005 2.jpg::film-portrait"
  # Grad portraits
  "PICS/1A7A0607-2.jpg::grad-hepner"
  "PICS/1A7A6054.jpg::grad-champagne"
  # JUUN
  "PICS/1A7A1891-2.jpg::juun-can"
  "PICS/1A7A1178.jpg::juun-court"
  # Aztec basketball portraits
  "PICS/1A7A4152.jpg::aztec-hood"
  "PICS/1A7A5070.jpg::aztec-profile"
  # Weight room
  "PICS/1A7A5797.jpg::weights-plate"
  "PICS/1A7A5816.jpg::weights-rope"
  # Studio
  "PICS/1A7A9120.jpg::studio-football"
  # Coast
  "PICS/1A7A0058-2.jpg::coast-portrait"
  # Campus
  "PICS/1A7A4535.jpg::campus-walk"
  # Game night
  "PICS/1A7A6586.jpg::game-night"
  # Community visit
  "PICS/1A7A2039 2.jpg::community-visit"
  # Camp
  "PICS/1A7A6067.jpg::camp-ball"

  # Him. These are the only personal frames that stay, and they only run on /me.
  "PERSONAL/000000010010 2.jpg::me-portrait-shoot"
  "PERSONAL/000000010013-3-2.jpg::me-monitor"
  "PERSONAL/20260312_mbb_mwc_sdsu_v_csu_dtuskan_00171.jpg::me-locker-room"
  "PERSONAL/20260313_mbb_mwc_sdsu_v_newmexico_dtuskan_00006.jpg::me-tunnel"
  "PERSONAL/Photo Dec 31 2004, 11 00 00 PM.jpg::me-rig"
  "PERSONAL/Photo Jun 05 2026, 11 09 35 AM.jpg::me-ncaa"
)

for entry in "${PHOTOS[@]}"; do
  rel="${entry%%::*}"
  slug="${entry##*::}"
  in="$SRC/$rel"

  if [[ ! -f "$in" ]]; then
    echo "!! missing: $rel" >&2
    continue
  fi

  magick "$in" \
    -auto-orient \
    -resize "${MAX}x${MAX}>" \
    -strip \
    -quality 88 \
    -interlace Plane \
    "$OUT/$slug.jpg"

  echo "==> $slug"
done

echo
echo "done -> $OUT"

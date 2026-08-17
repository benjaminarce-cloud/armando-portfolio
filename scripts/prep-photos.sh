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
#
# Two sources: the hand-picked PHOTOS list reads the 2026 drop, the FOLDERS
# list reads whole shoots out of the August one.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OLD="${SRC:-$ROOT/UPDATEDMANDOCONTENT}"
NEW="${NEW_SRC:-$ROOT/NEWCONTENT}"
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

# -----------------------------------------------------------------------
# Whole shoots, from the August drop.
#
# The list above is a hand-picked frame per slug, which is the right shape
# when the site shows one or two pictures per shoot. The project pages show
# the shoot, so these folders come across wholesale — a hundred-odd frames
# that nobody wants to name one at a time.
#
# The slug is derived from the master's own filename rather than from a
# counter, so adding or dropping one frame never renumbers the rest and every
# slug on the site can be traced back to the file it came from:
#
#   GRAD PICS/1A7A0438.jpg  ->  grad-1a7a0438.jpg
#
# folder :: slug prefix
FOLDERS=(
  "GRAD PICS::grad"
  "JAELAN PHILLIPS::jaelan"
  "MATTHEW STAFFORD PICS::stafford"
  "EXTRA BASKETBALL PICS::bball"
  "MISC PICS::locker"
)

# Frames that are already on the site under a curated slug from the list
# above. Without this they would go up a second time under a folder slug and
# show twice on the page. Matched on basename, within their own folder.
ALREADY_LIVE=(
  "EXTRA BASKETBALL PICS/1A7A0058-2.jpg"   # coast-portrait
  "EXTRA BASKETBALL PICS/1A7A0607-2.jpg"   # grad-hepner
  "EXTRA BASKETBALL PICS/1A7A2039 2.jpg"   # community-visit
  "EXTRA BASKETBALL PICS/1A7A6054.jpg"     # grad-champagne
  "EXTRA BASKETBALL PICS/1A7A6586.jpg"     # game-night
  "EXTRA BASKETBALL PICS/1A7A9120.jpg"     # studio-football
  "JAELAN PHILLIPS/jp-2.jpg"               # jaelan-phillips-jersey
  "JAELAN PHILLIPS/1A7A4713.jpg"           # jaelan-phillips-signing
  "MATTHEW STAFFORD PICS/1A7A8100-3.jpg"   # stafford-visit
  "MATTHEW STAFFORD PICS/1A7A9024.jpg"     # stafford-ball
  "MISC PICS/1A7A5070.jpg"                 # aztec-profile
)

is_live() {
  local rel="$1" entry
  for entry in "${ALREADY_LIVE[@]}"; do
    [[ "$entry" == "$rel" ]] && return 0
  done
  return 1
}

# A frame delivered more than once is delivered as grades, not as crops:
# 1A7A0438.jpg is the colour master, -2 a warmer pass, -3 black and white.
# The colour master is the one the site runs, so a suffixed file is kept only
# when the frame it belongs to has no unsuffixed version of its own.
is_alternate_grade() {
  local dir="$1" base="$2" stem
  [[ "$base" =~ ^(.*)-[0-9]+$ ]] || return 1
  stem="${BASH_REMATCH[1]}"
  [[ -f "$dir/$stem.jpg" ]]
}

slugify() { # basename -> lowercase, anything not a letter or digit becomes a dash
  # -E because this also has to run under BSD sed, where \+ is a literal plus
  # and the run would silently pass spaces straight through into the filename.
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E -e 's/[^a-z0-9]+/-/g' -e 's/^-//' -e 's/-$//'
}

resize() { # $1 = source file, $2 = slug
  magick "$1" \
    -auto-orient \
    -resize "${MAX}x${MAX}>" \
    -strip \
    -quality 88 \
    -interlace Plane \
    "$OUT/$2.jpg"
}

for entry in "${PHOTOS[@]}"; do
  rel="${entry%%::*}"
  slug="${entry##*::}"
  in="$OLD/$rel"

  if [[ ! -f "$in" ]]; then
    echo "!! missing: $rel" >&2
    continue
  fi

  resize "$in" "$slug"
  echo "==> $slug"
done

for entry in "${FOLDERS[@]}"; do
  folder="${entry%%::*}"
  prefix="${entry##*::}"
  dir="$NEW/$folder"

  if [[ ! -d "$dir" ]]; then
    echo "!! missing folder: $folder" >&2
    continue
  fi

  kept=0
  skipped=0

  # A plain glob, sorted, so the run is the same every time.
  while IFS= read -r -d '' file; do
    base="$(basename "$file" .jpg)"

    if is_live "$folder/$(basename "$file")" || is_alternate_grade "$dir" "$base"; then
      skipped=$((skipped + 1))
      continue
    fi

    resize "$file" "$prefix-$(slugify "$base")"
    kept=$((kept + 1))
  done < <(find "$dir" -maxdepth 1 -name '*.jpg' -print0 | sort -z)

  echo "==> $folder: $kept frames ($skipped skipped)"
done

echo
echo "done -> $OUT"

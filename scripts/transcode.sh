#!/usr/bin/env bash
#
# Prepare the Dropbox drop for Cloudinary.
#
# The masters are 4K/near-4K exports up to ~1 GB each, which Cloudinary won't
# take and a browser won't stream. For each clip this writes three things into
# build/media:
#
#   <slug>.mp4          1080p H.264, faststart — the film itself
#   <slug>-preview.mp4  ~6s muted 720p loop — what plays under the cursor
#   <slug>-poster.jpg   a frame ~30% in — the still behind both
#
# Aspect ratio is never changed: the long edge is capped and the other edge
# follows. The vertical and 4:3 pieces stay vertical and 4:3, which is what
# gives the grid its mixed sizes.
#
# Usage: scripts/transcode.sh [outdir] [slug filters...]
#
# SKIP_EXISTING=1 leaves any clip whose three outputs are already in the outdir
# alone. Encoding the whole table is roughly an hour of CPU, so that is how you
# add a drop to an outdir that already holds the previous one.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/build/media}"

# Two drops, two folders. OLD is the 2026 drop the current site was built from;
# NEW is the August package, which is where everything added since comes from.
# An entry names its own root so both can be listed in one table.
OLD="${SRC:-$ROOT/UPDATEDMANDOCONTENT}"
NEW="${NEW_SRC:-$ROOT/NEWCONTENT}"

mkdir -p "$OUT"

# root :: source-relative-path :: slug
CLIPS=(
  # The full-screen hero. Delivered loose rather than inside a drop, so it
  # reads from the repo root. It is muted in the browser — autoplay with
  # sound is blocked everywhere — so the audio track is dropped here too
  # rather than shipping 60s of stereo nobody can hear.
  "ROOT::INTROREELB.mov::intro-hero"

  "OLD::VIDS/BYRDTRAILERMANDOINGGG.mov::miles-byrd-doc-trailer"
  "OLD::VIDS/TATEFINAL22.mov::carnell-tate"
  "OLD::VIDS/BYRDINTROCLIP.mov::byrd-intro-clip"
  "OLD::VIDS/CAMWARD-UA.mov::cam-ward"
  "OLD::VIDS/WCFINAL2.mov::west-coast-final"
  "OLD::VIDS/TRELLMICUP.mov::trell-mic-up"
  "OLD::VIDS/ELZIE20PTS.mov::elzie-20"
  "OLD::VIDS/TAEDUNK.mov::tae-dunk"
  "OLD::VIDS/byrdstealandone.mov::byrd-steal-and-one"
  "OLD::VIDS/marchmadnesshyper.mov::march-madness"
  "OLD::VIDS/shootaroundnevada.mov::nevada-shootaround"
  "OLD::VIDS/PRACTICE727.mov::practice-727"
  "OLD::VIDS/ghosttown.mov::ghost-town"
  "OLD::VIDS/COLORSOFTBALL.mov::softball-colors"
  "OLD::VIDS/STRICLY FINALE.mov::strictly-finale"
  "OLD::VIDS/STRICTLYFALL25RECAP.mov::strictly-fall-recap"
  "OLD::VIDS/lilgrades.mov::color-grades"
  "OLD::VIDS/track25.mov::track-25"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/nattty5.mov::golf-natty"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/teamlove.mov::golf-team"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/ethandrives.mov::golf-drives"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/vhsshots.mov::golf-vhs"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/puttstills.mov::golf-putts"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/still3.mov::golf-still-3"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/still4.mov::golf-still-4"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/box1.mov::golf-box"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/board.mov::golf-board"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/still1.mov::golf-still-1"
  "OLD::VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/still2.mov::golf-still-2"

  # --- August drop ------------------------------------------------------
  # The new reel. It supersedes the 2026 one, which is no longer built.
  "NEW::VIDEOGRAPHYREEL-ARMANDOAGUILAR.mov::reel-2026"

  "NEW::MILESBYRD-SPOTLIGHT.mp4::byrd-spotlight"
  "NEW::CHASEFINALTRAILER5.mov::chase-trailer"

  "NEW::SEASONTRAILER-2024-25.mp4::season-trailer-2425"
  "NEW::SEASONTRAILER-2025-26.mov::season-trailer-2526"
  "NEW::ittsjustbasketball.mov::its-just-basketball"
  "NEW::mbbpracticesept2.mov::practice-sept-2"

  # A second postcard set, shot the way the golf one was: locked-off
  # observational holds. Unlike the golf masters these are true 4:3 — no
  # pillarbox — so they take no crop.
  "NEW::PRACTICE POSTCARDS/1.mov::practice-postcard-1"
  "NEW::PRACTICE POSTCARDS/2.mov::practice-postcard-2"
  "NEW::PRACTICE POSTCARDS/3.mov::practice-postcard-3"
  "NEW::PRACTICE POSTCARDS/4.mov::practice-postcard-4"
  "NEW::PRACTICE POSTCARDS/5.mov::practice-postcard-5"
  "NEW::PRACTICE POSTCARDS/6.mov::practice-postcard-6"
  "NEW::PRACTICE POSTCARDS/7.mov::practice-postcard-7"
  "NEW::PRACTICE POSTCARDS/8.mov::practice-postcard-8"

  # Offseason. offszn45.mov and OFFSZNRECAP.mov are the same cut delivered
  # at 4:5 and 4:3 — identical to the frame, both 26.47s — so only the 4:5
  # is built; a mosaic wants the vertical.
  "NEW::Offszn_WK1.mov::offszn-wk1"
  "NEW::offszn45.mov::offszn-recap"
  "NEW::VHSoffszn.mov::offszn-vhs"

  "NEW::strictweek7.mov::strictly-week-7"
  "NEW::trackmediaday2.mov::track-media-day"
  "NEW::btsvolley.mov::volleyball-media-day"
  "NEW::FOODDRIVEHOOVER2.mov::food-drive"
  "NEW::SUITSTATE.mov::suit-state"
  "NEW::axofinal820.mov::axo-formal"
  "NEW::looks.mov::intro-looks"
  "NEW::ELZIEDUMP2.mov::elzie-dump"
  "NEW::dumppersoo.mov::perso-dump"
  "NEW::jazzdump.mov::jazz-dump"
)

# Long edge cap for the film, and for the hover preview.
FILM_MAX=1920
PREVIEW_MAX=720
PREVIEW_SECONDS=6

# Some masters carry their framing as baked-in black bars rather than as a
# frame size: the golf postcards are 4:3 pillarboxed inside a 16:9 export, and
# the softball piece is a square inside 4:3. Left alone they render as a letterbox
# in a letterbox. These crops (found with ffmpeg cropdetect, in master
# coordinates) recover the real frame, so the ratios declared in lib/films.ts
# are the ratios actually delivered.
#
# slug::crop=w:h:x:y
CROPS=(
  "golf-natty::crop=2880:2160:480:0"
  "golf-team::crop=2880:2160:480:0"
  "golf-drives::crop=2880:2160:480:0"
  "golf-vhs::crop=2880:2160:480:0"
  "golf-putts::crop=2880:2160:480:0"
  "golf-still-1::crop=2880:2160:480:0"
  "golf-still-2::crop=2880:2160:480:0"
  "golf-still-3::crop=2880:2160:480:0"
  "golf-still-4::crop=2880:2160:480:0"
  "golf-box::crop=2880:2160:480:0"
  "golf-board::crop=2880:2160:480:0"
  "softball-colors::crop=2160:2160:360:0"
  # Ships 3840x2880 with the square framing pillarboxed inside it.
  "byrd-spotlight::crop=2880:2880:480:0"
  # The hero came off the same export pipeline as the golf postcards: 4:3
  # framing pillarboxed inside 16:9. Left alone it plays full-screen with
  # black bars down both sides.
  "intro-hero::crop=2880:2160:480:0"
)

crop_for() {
  local slug="$1" entry
  for entry in "${CROPS[@]}"; do
    if [[ "${entry%%::*}" == "$slug" ]]; then
      echo "${entry##*::},"
      return
    fi
  done
}

fit() { # $1 = cap, $2 = optional leading crop
  echo "${2}scale=w=$1:h=$1:force_original_aspect_ratio=decrease:force_divisible_by=2"
}

# Optional slug filters: scripts/transcode.sh out/ golf softball
FILTERS=("${@:2}")

matches() {
  [[ ${#FILTERS[@]} -eq 0 ]] && return 0
  local f
  for f in "${FILTERS[@]}"; do
    [[ "$1" == *"$f"* ]] && return 0
  done
  return 1
}

for entry in "${CLIPS[@]}"; do
  root="${entry%%::*}"
  slug="${entry##*::}"
  # What's left once the root and the slug are stripped off either end.
  rel="${entry#*::}"
  rel="${rel%::*}"

  case "$root" in
    OLD) in="$OLD/$rel" ;;
    NEW) in="$NEW/$rel" ;;
    ROOT) in="$ROOT/$rel" ;;
    *) echo "!! unknown root '$root' for $slug" >&2; continue ;;
  esac

  matches "$slug" || continue

  if [[ "${SKIP_EXISTING:-0}" == "1" ]] &&
     [[ -f "$OUT/$slug.mp4" && -f "$OUT/$slug-preview.mp4" && -f "$OUT/$slug-poster.jpg" ]]; then
    echo "--  $slug (already built)"
    continue
  fi

  if [[ ! -f "$in" ]]; then
    echo "!! missing: $rel" >&2
    continue
  fi

  crop="$(crop_for "$slug")"

  duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
  # A frame 30% in: past the fade-up, before the tail.
  poster_at=$(awk -v d="$duration" 'BEGIN { printf "%.2f", d * 0.30 }')
  # Take the preview from the same place, so hover continues the poster.
  preview_at=$(awk -v d="$duration" -v n="$PREVIEW_SECONDS" \
    'BEGIN { s = d * 0.30; if (s + n > d) s = (d > n ? d - n : 0); printf "%.2f", s }')

  echo "==> $slug  (${duration}s)"

  ffmpeg -nostdin -v error -y -i "$in" \
    -vf "$(fit $FILM_MAX "$crop")" \
    -c:v libx264 -profile:v high -preset slow -crf 20 -pix_fmt yuv420p \
    -movflags +faststart \
    -c:a aac -b:a 128k -ac 2 \
    "$OUT/$slug.mp4"

  ffmpeg -nostdin -v error -y -ss "$preview_at" -t "$PREVIEW_SECONDS" -i "$in" \
    -vf "$(fit $PREVIEW_MAX "$crop")" \
    -c:v libx264 -profile:v main -preset slow -crf 26 -pix_fmt yuv420p \
    -movflags +faststart -an \
    "$OUT/$slug-preview.mp4"

  ffmpeg -nostdin -v error -y -ss "$poster_at" -i "$in" -frames:v 1 \
    -vf "$(fit $FILM_MAX "$crop")" -q:v 3 \
    "$OUT/$slug-poster.jpg"
done

echo
echo "done -> $OUT"
ls -lh "$OUT" | tail -n +2 | awk '{ print $9, $5 }'

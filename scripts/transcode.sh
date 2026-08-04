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
# Usage: scripts/transcode.sh [outdir]

set -euo pipefail

SRC="${SRC:-$(cd "$(dirname "$0")/.." && pwd)/UPDATEDMANDOCONTENT}"
OUT="${1:-$(cd "$(dirname "$0")/.." && pwd)/build/media}"

mkdir -p "$OUT"

# source-relative-path :: slug
CLIPS=(
  "VIDS/BYRDTRAILERMANDOINGGG.mov::miles-byrd-doc-trailer"
  "VIDS/TATEFINAL22.mov::carnell-tate"
  "VIDS/BYRDINTROCLIP.mov::byrd-intro-clip"
  "VIDS/REEL(INCLUDESOMEWHEREINFRONTPAGE?.mov::reel"
  "VIDS/CAMWARD-UA.mov::cam-ward"
  "VIDS/WCFINAL2.mov::west-coast-final"
  "VIDS/TRELLMICUP.mov::trell-mic-up"
  "VIDS/ELZIE20PTS.mov::elzie-20"
  "VIDS/TAEDUNK.mov::tae-dunk"
  "VIDS/byrdstealandone.mov::byrd-steal-and-one"
  "VIDS/marchmadnesshyper.mov::march-madness"
  "VIDS/shootaroundnevada.mov::nevada-shootaround"
  "VIDS/PRACTICE727.mov::practice-727"
  "VIDS/ghosttown.mov::ghost-town"
  "VIDS/COLORSOFTBALL.mov::softball-colors"
  "VIDS/STRICLY FINALE.mov::strictly-finale"
  "VIDS/STRICTLYFALL25RECAP.mov::strictly-fall-recap"
  "VIDS/lilgrades.mov::color-grades"
  "VIDS/track25.mov::track-25"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/nattty5.mov::golf-natty"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/teamlove.mov::golf-team"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/ethandrives.mov::golf-drives"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/vhsshots.mov::golf-vhs"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/puttstills.mov::golf-putts"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/still3.mov::golf-still-3"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/still4.mov::golf-still-4"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/box1.mov::golf-box"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/board.mov::golf-board"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/still1.mov::golf-still-1"
  "VIDS/NCAA GOLF CHAMPIONSHIPS POSTCARDS/still2.mov::golf-still-2"
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
  rel="${entry%%::*}"
  slug="${entry##*::}"
  in="$SRC/$rel"

  matches "$slug" || continue

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

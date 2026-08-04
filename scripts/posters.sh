#!/usr/bin/env bash
#
# Re-cut posters and hover previews at hand-picked timestamps.
#
# transcode.sh grabs its poster at a flat 30% of the runtime, which is only a
# starting point — on a third of the clips it lands on a title card, a slate,
# or a blank frame. The Byrd trailer's 30% mark is a tweet screenshot, which is
# not what should front the lead film.
#
# The seconds below were chosen by pulling six candidate frames from every clip
# and looking at them. Re-running transcode.sh resets posters to the flat 30%,
# so run this afterwards.
#
# Reads from build/media (already 1080p) rather than the masters, so it is fast.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="${1:-$ROOT/build/media}"

PREVIEW_SECONDS=6
PREVIEW_MAX=720

# slug::seconds
POSTERS=(
  "miles-byrd-doc-trailer::8.75"   # the roar, not the tweet screenshot
  "carnell-tate::11.22"            # helmet on, holding the ball
  # This film changes shape partway through: scope for the opening, Academy
  # (pillarboxed) for the body. A poster from the body sits in the tile with
  # black bars down both sides and looks broken, so it comes from the opening —
  # full width, flags strung over the street, bars top and bottom where they
  # read as scope.
  "west-coast-final::4.20"
  "trell-mic-up::56.36"            # he's actually on camera here
  "cam-ward::24.37"
  "elzie-20::25.27"
  "strictly-finale::15.82"         # the overhead of the pack
  "practice-727::23.77"            # jump shot under I BELIEVE THAT
  "ghost-town::6.70"               # wing at dusk
  "byrd-steal-and-one::10.30"
  "softball-colors::18.92"
  "tae-dunk::6.63"                 # mid-air, which is the whole point
  "track-25::2.58"
  "nevada-shootaround::2.47"
  "strictly-fall-recap::30.63"     # the pack in the street
  "march-madness::7.04"
  "color-grades::5.72"
  "byrd-intro-clip::8.29"          # BYRD 21 down the handshake line
  "reel::17.58"                    # the walkout, flares up
  "golf-natty::10.15"              # trophy — this fronts the whole set
  "golf-team::7.47"
  "golf-drives::3.08"
  "golf-vhs::4.40"
  "golf-putts::2.94"
  "golf-still-1::2.50"
  "golf-still-2::2.30"
  "golf-still-3::7.11"
  "golf-still-4::3.15"
  "golf-box::2.48"
  "golf-board::0.68"
)

for entry in "${POSTERS[@]}"; do
  slug="${entry%%::*}"
  at="${entry##*::}"
  film="$DIR/$slug.mp4"

  if [[ ! -f "$film" ]]; then
    echo "!! missing: $slug.mp4" >&2
    continue
  fi

  ffmpeg -nostdin -v error -y -ss "$at" -i "$film" -frames:v 1 -q:v 3 \
    "$DIR/$slug-poster.jpg"

  # Start the hover loop on the poster frame, so moving onto a tile continues
  # the still rather than cutting to an unrelated moment.
  ffmpeg -nostdin -v error -y -ss "$at" -t "$PREVIEW_SECONDS" -i "$film" \
    -vf "scale=w=$PREVIEW_MAX:h=$PREVIEW_MAX:force_original_aspect_ratio=decrease:force_divisible_by=2" \
    -c:v libx264 -profile:v main -preset slow -crf 26 -pix_fmt yuv420p \
    -movflags +faststart -an \
    "$DIR/$slug-preview.mp4"

  echo "==> $slug @ ${at}s"
done

echo
echo "done -> $DIR"

# Mando — Armando Aguilar

Portfolio site. Next.js (App Router) on Vercel, media on Cloudinary.

```bash
npm run dev
```

## Structure

`lib/` holds the content, `app/` only renders it — to change what is on the
site, edit the data, not the pages.

| Route      | Content source                 |
| ---------- | ------------------------------ |
| `/`        | `lib/films.ts`, `lib/photos.ts` |
| `/video`   | `lib/films.ts`                 |
| `/photo`   | `lib/photos.ts`                |
| `/me`      | `lib/photos.ts` (`mePhotos`)   |
| `/socials` | `lib/socials.ts`               |

Nav is `lib/tabs.ts` — three tabs, Video / Photo / Me. Socials keeps a page but
is reached from the footer and from `/me`.

### Layout

`films` and `photos` each carry a `span` (columns out of 12) and an optional
`drop`. `lib/layout.ts` cuts the flat list into explicit rows, so a wide piece
sits beside a tall one with air left over instead of CSS grid auto-filling
every gap and flattening the page back into a uniform grid. Recomposing an
index means changing `span`/`drop`, not the JSX.

## Media pipeline

Masters are 4K-ish `.mov` files up to ~1 GB — past what Cloudinary accepts and
unstreamable in a browser. Two steps:

```bash
# 1. Transcode + resize into build/media (needs ffmpeg and imagemagick)
npm run media:build

# 2. Point .env.local at Cloudinary (see .env.example), then upload
npm run cloudinary:upload
```

`scripts/transcode.sh` writes three files per clip — a 1080p H.264 film, a ~6s
muted 720p hover preview, and a poster frame — and never changes the aspect
ratio, because the mix of 16:9 / 4:3 / 4:5 / 9:16 is what the layout is built
on. `scripts/prep-photos.sh` caps stills at 2600px.

`scripts/upload.js` pushes `build/media` into the `mando/` folder, so
`build/media/reel.mp4` becomes public id `mando/reel` — exactly what
`lib/media.ts` builds URLs for. It skips assets already present unless given
`--force`, and takes a substring to push one clip:

```bash
npm run cloudinary:upload -- reel --force
```

`build/` and `UPDATEDMANDOCONTENT/` are gitignored; only Cloudinary ids live in
the repo.

### Previewing before upload

```bash
ln -s ../build/media public/mando
NEXT_PUBLIC_LOCAL_MEDIA=1 npm run dev
```

Serves the local transcodes instead of the CDN.

## Playback

Two things keep video smooth, and both are easy to undo by accident:

- **Previews load on hover only.** `components/HoverPreview.tsx` renders no
  `<video>` until a pointer enters the tile, and drops the src on leave. An
  earlier build put an `autoPlay` video on every tile, which started ~30
  simultaneous downloads on `/video` and made all of them stutter.
- **Images are not double-optimized.** `next.config.ts` sets
  `images.unoptimized` because `lib/media.ts` already requests `f_auto,q_auto`
  at a capped width. Turning the Next optimizer back on re-encodes an
  already-optimal file and bills for it.

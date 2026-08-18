# Mando — Armando Aguilar

Portfolio site. Next.js (App Router) on Vercel, media on Cloudinary.

```bash
npm run dev
```

## Structure

`lib/` holds the content, `app/` only renders it — to change what is on the
site, edit the data, not the pages.

| Route          | Content source                          |
| -------------- | --------------------------------------- |
| `/`            | `lib/projects.ts` — every project        |
| `/video`       | `lib/projects.ts` — every clip, singly   |
| `/photo`       | `lib/projects.ts` — every frame, singly  |
| `/work/[slug]` | one project, whole                       |
| `/me`          | `lib/photos.ts` (`mePhotos`)             |
| `/socials`     | `lib/socials.ts`                         |

### Projects

The unit is a **project** — a shoot, a tournament, a season — not a single
finished piece. A project has a cover, and it has media: any mix of clips from
`lib/clips.ts` and stills from `lib/photo-manifest.ts`. Some hold forty frames
and eleven clips; plenty hold exactly one, and a project of one is not a
special case.

Adding work means adding an entry to `projects` in `lib/projects.ts`. Nothing
in `app/` needs to change.

The index opens on a near-full-screen hero (`components/Hero.tsx`,
`intro-hero`). It stops a band short of the viewport on purpose — a hero that
fills the screen exactly gives no sign there is a page under it, and people
were missing the rest of the site.

It starts muted because autoplay with sound is blocked everywhere, and the
speaker button is the visitor's gesture, which is what a browser wants before
it lets sound through. Two traps live in that button: React sets `muted` as a
DOM property and never reflects it to the attribute the autoplay check reads,
so `video.muted = true` is set imperatively before `play()` — without it the
hero sits on its poster the moment the file has an audio track. And unmuting
can cost the playback outright, so a refused `play()` falls back to muted
rather than leaving a frozen hero.

It goes out through `heroUrl()` rather than `filmUrl()` — capped and
`q_auto:eco`, which is ~18 MB instead of 30 for a cover-cropped background
nobody inspects.

**Collections live on `/` only.** A tile on the index is a whole shoot. On
`/video` and `/photo` the same work is unpacked to one tile per piece —
`pieceTiles()` — so those pages read as the work itself rather than as a second,
shorter list of the same collections. They deal round-robin across shoots,
because concatenating them puts four screens of graduation portraits at the top
of `/photo`.

Clicking one of those tiles opens the **piece**, not the shoot
(`components/Lightbox.tsx`) — otherwise the collection is back on screen and
showing single frames achieved nothing. The shoot is one link away inside it.
Project covers on `/` stay plain links, since there the shoot *is* the subject.

Everything on the site sits in one measure, `.frame` — the mark, the filters,
the wall and every project page — so the nav lines up with the left edge of the
work instead of running to the viewport while the wall sits centred.

### Layout

The index is one gapless block of tiles — `.mosaic` in `app/globals.css`,
rendered by `components/Mosaic.tsx`. There are no spans to set: every tile keeps
the shape its master was delivered at, so the stagger comes from the work
itself.

The block is a **centred rectangle**, which is why the columns are packed in JS
rather than by CSS multi-column. Multi-column balances by splitting a flow and a
tile cannot be split, so one column always ended short and the bottom came out
stepped. `packColumns()` places the tallest pieces first — when every column is
still empty enough to take one — then fills in around them and restores authored
order within each column. That holds raggedness under ~6% at every breakpoint
(2 / 3 / 5 / 6 columns); `RATIO_HEIGHT` is what makes it possible without
measuring, since every shape is known before anything loads.

Project pages (`components/Breakdown.tsx`) run wide pieces full measure and
pair verticals two-up — three-up once a project passes twenty pieces, so the
long galleries stay a reasonable scroll.

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
on. It reads two drops: `UPDATEDMANDOCONTENT/` and `NEWCONTENT/`, with each
entry naming its own root. A full pass is about an hour of CPU, so adding a
drop to an outdir that already holds the last one is:

```bash
SKIP_EXISTING=1 scripts/transcode.sh
```

`scripts/prep-photos.sh` caps stills at 2600px. It takes hand-picked frames
one at a time (`PHOTOS`) *and* whole shoot folders wholesale (`FOLDERS`) —
project pages want the shoot, not a selection. Folder slugs are derived from
the master's filename, not a counter, so culling one frame never renumbers the
rest. Where a frame ships more than once it ships as grades (`-2` warm, `-3`
black and white); the colour master wins and the rest are skipped.

Then regenerate the manifest that tells the site each still's shape:

```bash
node scripts/photo-manifest.js   # -> lib/photo-manifest.ts
```

`build/media` is gitignored, so that generated file is the only record of a
photo's dimensions the site has at build time. It is committed on purpose.

`scripts/upload.js` pushes `build/media` into the `mando/` folder, so
`build/media/reel-2026.mp4` becomes public id `mando/reel-2026` — exactly what
`lib/media.ts` builds URLs for. It skips assets already present unless given
`--force`, and takes a substring to push one clip:

```bash
npm run cloudinary:upload -- reel --force
```

`build/`, `UPDATEDMANDOCONTENT/` and `NEWCONTENT/` are gitignored; only
Cloudinary ids live in the repo.

### Previewing before upload

```bash
ln -s ../build/media public/mando
NEXT_PUBLIC_LOCAL_MEDIA=1 npm run dev
```

Serves the local transcodes instead of the CDN.

## Playback

Two things keep video smooth, and both are easy to undo by accident:

- **Previews are bounded to what is on screen.** `components/TilePreview.tsx`
  has two modes. `hover` (used on `/video` and `/photo`) renders no `<video>`
  until a pointer enters the tile and drops the src on leave. `auto` (the index)
  plays every loop without interaction, as asked — but mounts a tile's video
  only when it comes within half a screen of the viewport and unmounts it once
  it is well past, so the number in flight tracks the window rather than the
  length of the page. Removing that observer puts ~23 videos on the wire at once
  and they all stutter; an earlier build did exactly that.
- **Images are not double-optimized.** `next.config.ts` sets
  `images.unoptimized` because `lib/media.ts` already requests `f_auto,q_auto`
  at a capped width. Turning the Next optimizer back on re-encodes an
  already-optimal file and bills for it.

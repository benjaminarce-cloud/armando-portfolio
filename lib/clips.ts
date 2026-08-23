import { filmUrl, imageUrl, previewUrl } from "@/lib/media";

/**
 * Every moving piece the site can show, as an asset rather than as a page.
 *
 * This used to be lib/films.ts, where each record also carried the title, the
 * year and the column span it took on the index — because a film *was* an entry
 * on the index. Projects changed that: a piece is now something a project
 * shows, and it is the project that has a title, a year and a place in the
 * mosaic. What is left here is what is true of the file itself — its shape, and
 * where its bytes are.
 *
 * `ratio` is the clip's real shape as delivered by scripts/transcode.sh, which
 * caps the long edge and leaves the aspect alone. The masters run 16:9, 4:3,
 * 1:1, 4:5 and 9:16, and a couple ship their framing pillarboxed inside a wider
 * export — the transcode crops those back, so what is declared here is what
 * actually arrives.
 */

export type Ratio = "16:9" | "4:3" | "1:1" | "4:5" | "9:16";

export type Clip = {
  slug: string;
  /** The line under it on a project page. */
  title: string;
  ratio: Ratio;
  posterId: string;
  filmId: string;
  previewId?: string;
};

export const RATIO_CLASS: Record<Ratio, string> = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "9:16": "aspect-[9/16]",
};

/** Shorthand: everything transcoded by this build lands at `mando/<slug>`. */
const clip = (slug: string, title: string, ratio: Ratio): Clip => ({
  slug,
  title,
  ratio,
  posterId: `mando/${slug}-poster`,
  filmId: `mando/${slug}`,
  previewId: `mando/${slug}-preview`,
});

/** The eleven NCAA golf postcards, and the eight from practice. */
const postcards = (
  entries: [slug: string, title: string][],
  ratio: Ratio = "4:3"
) => entries.map(([slug, title]) => clip(slug, title, ratio));

export const clips: Clip[] = [
  // The full-screen opener on the index. It is not a project and never appears
  // in the wall — it is here because this is where a moving piece's ids live.
  clip("intro-hero", "Intro", "4:3"),

  // Reels
  clip("reel-2026", "Reel", "16:9"),

  // Miles Byrd
  clip("miles-byrd-doc-trailer", "Beyond the Jersey — Trailer", "4:3"),
  clip("byrd-spotlight", "Spotlight", "1:1"),
  clip("byrd-steal-and-one", "Steal and One", "9:16"),
  clip("byrd-intro-clip", "Starting Lineup", "16:9"),

  // Aztec basketball — the season
  clip("season-trailer-2526", "Season Trailer, '25–26", "4:3"),
  clip("season-trailer-2425", "Season Trailer, '24–25", "16:9"),
  clip("its-just-basketball", "It's Just Basketball", "4:3"),
  clip("march-madness", "March Madness", "4:5"),
  clip("nevada-shootaround", "Nevada Shootaround", "9:16"),
  clip("intro-looks", "Intros", "16:9"),

  // Aztec basketball — practice
  clip("practice-727", "Practice, 7/27", "9:16"),
  clip("practice-sept-2", "Practice, 9/2", "9:16"),
  ...postcards([
    ["practice-postcard-1", "The Jam Center"],
    ["practice-postcard-2", "Center Court"],
    ["practice-postcard-3", "Scrimmage"],
    ["practice-postcard-4", "We Will Win"],
    ["practice-postcard-5", "Shooting"],
    ["practice-postcard-6", "Drills"],
    ["practice-postcard-7", "The Line"],
    ["practice-postcard-8", "Full Court"],
  ]),

  // Offseason
  clip("offszn-wk1", "Week One", "16:9"),
  clip("offszn-recap", "Recap", "4:5"),
  clip("offszn-vhs", "VHS", "4:3"),

  // NCAA golf championships
  ...postcards([
    ["golf-natty", "National Champion"],
    ["golf-team", "The Embrace"],
    ["golf-drives", "Drives"],
    ["golf-vhs", "VHS"],
    ["golf-putts", "Putts"],
    ["golf-still-1", "Championship Box"],
    ["golf-still-2", "Duke and Florida"],
    ["golf-still-3", "Flags"],
    ["golf-still-4", "Auburn"],
    ["golf-box", "Tee Marker"],
    ["golf-board", "Leaderboard"],
  ]),

  // Strictly Run Club
  clip("strictly-finale", "Finale", "4:3"),
  clip("strictly-week-7", "Week Seven", "16:9"),
  clip("strictly-fall-recap", "Fall '25 Recap", "9:16"),

  // Everything else, one or two to a project
  clip("carnell-tate", "Carnell Tate", "9:16"),
  clip("cam-ward", "QB Academy", "4:3"),
  clip("west-coast-final", "World Cup Final", "16:9"),
  clip("trell-mic-up", "Mic'd Up", "9:16"),
  clip("elzie-20", "Twenty Points", "9:16"),
  clip("elzie-dump", "Highlights", "4:5"),
  clip("ghost-town", "Ghost Town", "4:3"),
  clip("track-25", "Portraits", "4:5"),
  clip("track-media-day", "Media Day", "4:3"),
  clip("volleyball-media-day", "Media Day", "9:16"),
  clip("softball-colors", "Colors", "1:1"),
  clip("tae-dunk", "The Dunk", "9:16"),
  clip("chase-trailer", "Trailer", "9:16"),
  clip("food-drive", "Food Drive", "16:9"),
  clip("suit-state", "Suit State", "9:16"),
  clip("axo-formal", "Recap", "16:9"),
  clip("color-grades", "Grades", "4:5"),
  clip("perso-dump", "Friends", "4:5"),
  clip("jazz-dump", "Jazz", "4:5"),

  // Kept from the build before the 2026 drop at his request, so it still
  // carries its original Cloudinary ids rather than a `mando/` slug.
  {
    slug: "san-jose-state-recap",
    title: "San Jose State Recap",
    ratio: "16:9",
    posterId: "Basketball-15-poster_t0jacv",
    filmId: "Basketball-15_1080p-cld_kt3fav",
    previewId: "Basketball-15-preview_md5hcj",
  },
];

const bySlug = new Map(clips.map((c) => [c.slug, c]));

export function clipBySlug(slug: string): Clip {
  const found = bySlug.get(slug);
  // A project naming a clip that does not exist is an authoring mistake, and a
  // silent undefined would surface as a blank tile halfway down the mosaic.
  if (!found) throw new Error(`Unknown clip: ${slug}`);
  return found;
}

/** Resolved URLs for a clip. */
export const clipSources = (c: Clip) => ({
  poster: imageUrl(c.posterId, 1600),
  src: filmUrl(c.filmId),
  preview: c.previewId ? previewUrl(c.previewId) : undefined,
});

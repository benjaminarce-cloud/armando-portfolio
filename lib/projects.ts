import { clipBySlug, clipSources, type Ratio } from "@/lib/clips";
import { imageUrl } from "@/lib/media";
import { PHOTO_MANIFEST, photosByPrefix, type PhotoRatio } from "@/lib/photo-manifest";

/**
 * The index, as projects rather than as pieces.
 *
 * The old build listed films and photographs separately and flat: every tile
 * was one finished thing, and clicking it gave you that one thing. What he
 * actually shoots is shoots — a tournament, a hospital visit, a season — and
 * what he asked for is the tile that opens into the whole of one. So a project
 * is the unit here, and a piece is something a project contains.
 *
 * Some projects hold thirty frames and eleven clips; plenty hold exactly one.
 * A project of one is not a special case — it is a single-piece shoot, and it
 * gets the same tile and the same page as the rest.
 *
 * Order is the order of the mosaic, and the mosaic fills column by column, so
 * the list is written to alternate tall against wide. Nothing about that is
 * load-bearing: reordering changes only how the columns stack.
 */

export type ProjectMedia =
  | { kind: "video"; slug: string }
  | { kind: "photo"; slug: string };

export type Project = {
  slug: string;
  title: string;
  /** The small line above the title — who or where. */
  subject?: string;
  year: number;
  /** Which of the two filters it answers to. */
  kind: "video" | "photo";
  /** What he did on it, shown as the credit on the project page. */
  role: string;
  /** A sentence, only where there is something to say that the frames don't. */
  note?: string;
  /** The piece whose still becomes the tile. Must be in `media`. */
  cover: string;
  media: ProjectMedia[];
};

// Both dedupe, because a shoot is usually written as "these frames lead, then
// the rest of the folder" — and the folder still contains the ones that lead.
// First mention wins, so the hand-picked openers keep their place at the top.
const video = (...slugs: string[]): ProjectMedia[] =>
  [...new Set(slugs)].map((slug) => ({ kind: "video", slug }));

const photo = (...slugs: string[]): ProjectMedia[] =>
  [...new Set(slugs)].map((slug) => ({ kind: "photo", slug }));

const DIRECTOR = "Director / Editor";
const DP = "Director of Photography / Editor";
const PHOTOGRAPHER = "Photographer";

export const projects: Project[] = [
  {
    slug: "reel",
    title: "Reel",
    subject: "Selected Work",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "reel-2026",
    media: video("reel-2026"),
  },

  {
    slug: "miles-byrd",
    title: "Beyond the Jersey",
    subject: "Miles Byrd",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    note: "A documentary on the Aztec guard, cut down to a trailer, a spotlight and the nights either side of them.",
    cover: "miles-byrd-doc-trailer",
    media: video(
      "miles-byrd-doc-trailer",
      "byrd-spotlight",
      "byrd-steal-and-one",
      "byrd-intro-clip"
    ),
  },

  {
    slug: "graduation",
    title: "Graduation",
    subject: "San Diego State",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    cover: "grad-hepner",
    media: photo("grad-hepner", "grad-champagne", "coast-portrait", "campus-walk", ...photosByPrefix("grad")),
  },

  {
    slug: "ncaa-golf",
    title: "NCAA Golf Championships",
    subject: "Postcards — Eleven Parts",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    note: "The championships shot as a set of held frames rather than as a recap. They play in sequence.",
    cover: "golf-natty",
    media: video(
      "golf-natty",
      "golf-team",
      "golf-drives",
      "golf-vhs",
      "golf-putts",
      "golf-still-1",
      "golf-still-2",
      "golf-still-3",
      "golf-still-4",
      "golf-box",
      "golf-board"
    ),
  },

  {
    slug: "jaelan-phillips",
    title: "Loma Linda",
    subject: "Jaelan Phillips",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    note: "A hospital visit that was about more than signed jerseys — showing up for kids facing what no child should have to, and reminding them they are not fighting it alone.",
    cover: "jaelan-phillips-jersey",
    media: photo("jaelan-phillips-jersey", "jaelan-phillips-signing", ...photosByPrefix("jaelan")),
  },

  {
    slug: "carnell-tate",
    title: "Carnell Tate",
    subject: "Portrait",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "carnell-tate",
    media: video("carnell-tate"),
  },

  {
    slug: "aztec-season",
    title: "Aztec Basketball",
    subject: "The Season",
    year: 2026,
    kind: "video",
    role: DP,
    cover: "season-trailer-2526",
    media: video(
      "season-trailer-2526",
      "season-trailer-2425",
      "its-just-basketball",
      "intro-looks",
      "march-madness",
      "nevada-shootaround",
      "san-jose-state-recap"
    ),
  },

  {
    slug: "matthew-stafford",
    title: "Miller Children's",
    subject: "Matthew Stafford",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    note: "Shot in black and white, start to finish.",
    cover: "stafford-visit",
    media: photo("stafford-visit", "stafford-ball", ...photosByPrefix("stafford")),
  },

  {
    slug: "trell",
    title: "Mic'd Up",
    subject: "Trell",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "trell-mic-up",
    media: video("trell-mic-up"),
  },

  {
    slug: "aztec-practice",
    title: "Practice",
    subject: "Aztec Basketball — Postcards",
    year: 2026,
    kind: "video",
    role: DP,
    note: "The same held-frame idea as the golf set, turned on a practice gym.",
    cover: "practice-postcard-1",
    media: video(
      "practice-postcard-1",
      "practice-postcard-2",
      "practice-postcard-3",
      "practice-postcard-4",
      "practice-postcard-5",
      "practice-postcard-6",
      "practice-postcard-7",
      "practice-postcard-8",
      "practice-727",
      "practice-sept-2"
    ),
  },

  {
    slug: "chase",
    title: "Chase",
    subject: "Documentary Trailer",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "chase-trailer",
    media: video("chase-trailer"),
  },

  {
    slug: "offseason",
    title: "Offseason",
    subject: "Aztec Basketball",
    year: 2026,
    kind: "video",
    role: DP,
    cover: "offszn-wk1",
    media: video("offszn-wk1", "offszn-recap", "offszn-vhs"),
  },

  {
    slug: "cam-ward",
    title: "Cam Ward",
    subject: "Under Armour QB Academy",
    year: 2025,
    kind: "video",
    role: DIRECTOR,
    cover: "cam-ward",
    media: video("cam-ward"),
  },

  {
    slug: "suit-state",
    title: "Suit State",
    subject: "Aztec Basketball",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "suit-state",
    media: video("suit-state"),
  },

  {
    slug: "strictly-run-club",
    title: "Strictly Run Club",
    subject: "San Diego",
    year: 2025,
    kind: "video",
    role: DIRECTOR,
    cover: "strictly-finale",
    media: video("strictly-finale", "strictly-week-7", "strictly-fall-recap"),
  },

  {
    slug: "aztec-stills",
    title: "Aztec Basketball",
    subject: "Stills",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    cover: "aztec-hood",
    media: photo(
      "aztec-hood",
      "aztec-profile",
      "game-night",
      "camp-ball",
      "studio-football",
      "community-visit",
      ...photosByPrefix("bball"),
      "locker-1a7a5461-2",
      "locker-1a7a5476",
      "locker-syd"
    ),
  },

  {
    slug: "world-cup-final",
    title: "World Cup Final",
    subject: "New York City",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "west-coast-final",
    media: video("west-coast-final"),
  },

  {
    slug: "elzie",
    title: "Elzie",
    subject: "Aztec Basketball",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "elzie-20",
    media: video("elzie-20", "elzie-dump"),
  },

  {
    slug: "track-field",
    title: "Track & Field",
    subject: "Aztec Athletics",
    year: 2025,
    kind: "video",
    role: DIRECTOR,
    cover: "track-media-day",
    media: video("track-media-day", "track-25"),
  },

  {
    slug: "ghost-town",
    title: "Ghost Town",
    subject: "Short",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "ghost-town",
    media: video("ghost-town"),
  },

  {
    slug: "volleyball",
    title: "Volleyball",
    subject: "Media Day — Behind the Scenes",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "volleyball-media-day",
    media: video("volleyball-media-day"),
  },

  {
    slug: "food-drive",
    title: "Food Drive",
    subject: "Hoover High School",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "food-drive",
    media: video("food-drive"),
  },

  {
    slug: "softball",
    title: "Colors",
    subject: "Aztec Softball",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "softball-colors",
    media: video("softball-colors"),
  },

  {
    slug: "axo",
    title: "Formal",
    subject: "Alpha Chi Omega",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "axo-formal",
    media: video("axo-formal"),
  },

  {
    slug: "tae",
    title: "The Dunk",
    subject: "Tae",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "tae-dunk",
    media: video("tae-dunk"),
  },

  {
    slug: "35mm",
    title: "35mm",
    subject: "Scans",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    cover: "film-tunnel",
    media: photo(
      "film-tunnel",
      "film-portrait",
      "locker-000000010002-3",
      "locker-000000010003-3",
      "locker-000000010022-3"
    ),
  },

  {
    slug: "dumps",
    title: "Dumps",
    subject: "Personal",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "perso-dump",
    media: video("perso-dump", "jazz-dump"),
  },

  {
    slug: "juun",
    title: "JUUN",
    subject: "Brand",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    cover: "juun-court",
    media: photo("juun-court", "juun-can"),
  },

  {
    slug: "color-grades",
    title: "Color Grades",
    subject: "Reel",
    year: 2026,
    kind: "video",
    role: "Colorist",
    cover: "color-grades",
    media: video("color-grades"),
  },

  {
    slug: "weight-room",
    title: "Weight Room",
    subject: "Aztec Basketball",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    cover: "weights-plate",
    media: photo("weights-plate", "weights-rope"),
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsOfKind = (kind: Project["kind"]) =>
  projects.filter((p) => p.kind === kind);

/** A still's URL and true shape, straight off the generated manifest. */
export const photoSources = (slug: string, w = 1600) => ({
  src: imageUrl(`mando/${slug}`, w),
  ratio: PHOTO_MANIFEST[slug] ?? ("4:5" as PhotoRatio),
});

export const PHOTO_RATIO_CLASS: Record<PhotoRatio, string> = {
  "4:5": "aspect-[4/5]",
  "2:3": "aspect-[2/3]",
  "3:2": "aspect-[3/2]",
};

/**
 * What the mosaic needs to draw one tile: the still, the loop that replaces it
 * under the cursor, and the shape to reserve for both. A photo project has no
 * loop, which is what makes the mosaic read as a mix of moving and still.
 */
export function tile(project: Project): {
  poster: string;
  preview?: string;
  ratio: Ratio | PhotoRatio;
} {
  const entry = project.media.find((m) => m.slug === project.cover);
  if (!entry) {
    throw new Error(`${project.slug}: cover "${project.cover}" is not in media`);
  }

  if (entry.kind === "video") {
    const clip = clipBySlug(entry.slug);
    const { poster, preview } = clipSources(clip);
    return { poster, preview, ratio: clip.ratio };
  }

  const { src, ratio } = photoSources(entry.slug, 1200);
  return { poster: src, ratio };
}

/** Every tile shape the mosaic can be handed, video or still. */
export const TILE_RATIO_CLASS: Record<Ratio | PhotoRatio, string> = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "9:16": "aspect-[9/16]",
  "2:3": "aspect-[2/3]",
  "3:2": "aspect-[3/2]",
};

/** The count under the mark. */
export const totalPieces = projects.reduce((n, p) => n + p.media.length, 0);

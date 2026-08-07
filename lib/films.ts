import { filmUrl, imageUrl, previewUrl } from "@/lib/media";

/**
 * The film index.
 *
 * Everything here comes from the 2026 drop, with one deliberate exception:
 * San Jose State Recap, which he asked to keep from the previous build and so
 * still points at its original Cloudinary ids.
 *
 * `ratio` is the clip's true shape — the masters run 16:9, 4:3, 4:5 and 9:16,
 * and that mix is what stops the index reading as a uniform grid. `span` is
 * how many of the 12 columns the piece takes, and `drop` nudges it down a
 * beat so neighbours don't line up on a shelf. Order is the order he asked
 * for: the Byrd trailer, then Carnell Tate, then whatever composes best.
 */

export type Ratio = "16:9" | "4:3" | "1:1" | "4:5" | "9:16";

export type Clip = {
  slug: string;
  title: string;
  ratio: Ratio;
  posterId: string;
  filmId: string;
};

export type Film = {
  slug: string;
  title: string;
  /** The small line above the title — who or what it is. */
  subject?: string;
  year: number;
  ratio: Ratio;
  /** Columns out of 12 on the index. */
  span: 4 | 5 | 6 | 7 | 8 | 12;
  /** Sit this one lower than its neighbour. */
  drop?: boolean;
  posterId: string;
  filmId: string;
  previewId?: string;
  fullVideoUrl?: string;
  /** A postcard set plays as a sequence on its own page. */
  clips?: Clip[];
};

/** True shape. Used wherever a real player has to fit the frame. */
export const RATIO_CLASS: Record<Ratio, string> = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "9:16": "aspect-[9/16]",
};

/**
 * Shape on the index.
 *
 * Below `lg` every tile is a full-width row, so a 9:16 piece would stand 178%
 * of the screen's width tall and a phone would show one and a half films per
 * scroll. Small screens therefore hold every tile to the horizontal 4:3 the
 * rest of the page is built on, and the poster is cropped to it; the true
 * shape comes back at `lg`, where tiles sit side by side and a tall piece is
 * the point. Detail pages keep RATIO_CLASS at every width — a video letterboxes
 * rather than crops, so there is nothing to gain by reshaping its container.
 */
export const TILE_RATIO_CLASS: Record<Ratio, string> = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-[4/3] lg:aspect-square",
  "4:5": "aspect-[4/3] lg:aspect-[4/5]",
  "9:16": "aspect-[4/3] lg:aspect-[9/16]",
};

const golfClips: Clip[] = [
  ["golf-natty", "Natty"],
  ["golf-team", "Team"],
  ["golf-drives", "Drives"],
  ["golf-vhs", "VHS"],
  ["golf-putts", "Putts"],
  ["golf-still-1", "Still I"],
  ["golf-still-2", "Still II"],
  ["golf-still-3", "Still III"],
  ["golf-still-4", "Still IV"],
  ["golf-box", "Box"],
  ["golf-board", "Board"],
].map(([slug, title]) => ({
  slug,
  title,
  // The postcards were shot 4:3 and exported pillarboxed into 16:9;
  // scripts/transcode.sh crops the bars back off.
  ratio: "4:3" as const,
  posterId: `mando/${slug}-poster`,
  filmId: `mando/${slug}`,
}));

/** Shorthand for the 2026 drop, where every id is `mando/<slug>`. */
const drop = (
  slug: string,
  rest: Omit<Film, "slug" | "posterId" | "filmId" | "previewId">
): Film => ({
  slug,
  posterId: `mando/${slug}-poster`,
  filmId: `mando/${slug}`,
  previewId: `mando/${slug}-preview`,
  ...rest,
});

export const films: Film[] = [
  // Asked for first.
  drop("miles-byrd-doc-trailer", {
    title: "Beyond the Jersey",
    subject: "Miles Byrd — Documentary Trailer",
    year: 2026,
    ratio: "4:3",
    span: 8,
    fullVideoUrl: "https://www.youtube.com/watch?v=PEtrScv564s",
  }),
  // Asked for second.
  drop("carnell-tate", {
    title: "Carnell Tate",
    subject: "Portrait",
    year: 2026,
    ratio: "9:16",
    span: 4,
    drop: true,
  }),

  // From here the order is composition: verticals against wides, so no two
  // neighbouring pieces share a shape.
  drop("west-coast-final", {
    title: "World Cup Final",
    subject: "New York City",
    year: 2026,
    ratio: "16:9",
    span: 7,
  }),
  drop("trell-mic-up", {
    title: "Mic'd Up",
    subject: "Trell",
    year: 2026,
    ratio: "9:16",
    span: 4,
    drop: true,
  }),

  // Subject is what the signage in the film actually says; the name comes from
  // the source filename (CAMWARD-UA) and is unconfirmed on screen.
  drop("cam-ward", {
    title: "Cam Ward",
    subject: "Under Armour QB Academy",
    year: 2025,
    ratio: "4:3",
    span: 6,
  }),
  drop("elzie-20", {
    title: "Twenty Points",
    subject: "Elzie",
    year: 2026,
    ratio: "9:16",
    span: 4,
    drop: true,
  }),

  drop("strictly-finale", {
    title: "Strictly Finale",
    subject: "Strictly Run Club",
    year: 2025,
    ratio: "4:3",
    span: 7,
    drop: true,
  }),
  drop("practice-727", {
    title: "Practice, 7/27",
    subject: "Aztec Basketball",
    year: 2026,
    ratio: "9:16",
    span: 4,
  }),

  drop("ghost-town", {
    title: "Ghost Town",
    subject: "Short",
    year: 2026,
    ratio: "4:3",
    span: 6,
  }),
  drop("byrd-steal-and-one", {
    title: "Steal and One",
    subject: "Miles Byrd",
    year: 2026,
    ratio: "9:16",
    span: 4,
    drop: true,
  }),

  // The golf championships ran as a set of postcards; they play as one piece.
  {
    slug: "ncaa-golf-postcards",
    title: "NCAA Golf Championships",
    subject: "Postcards — Eleven Parts",
    year: 2026,
    ratio: "4:3",
    span: 8,
    posterId: "mando/golf-natty-poster",
    filmId: "mando/golf-natty",
    previewId: "mando/golf-natty-preview",
    clips: golfClips,
  },

  // Cut square, and cropped back to square by the transcode.
  drop("softball-colors", {
    title: "Colors",
    subject: "Aztec Softball",
    year: 2026,
    ratio: "1:1",
    span: 6,
  }),
  drop("tae-dunk", {
    title: "The Dunk",
    subject: "Tae",
    year: 2026,
    ratio: "9:16",
    span: 4,
    drop: true,
  }),

  drop("track-25", {
    title: "Track '25",
    subject: "Aztec Track & Field",
    year: 2025,
    ratio: "4:5",
    span: 5,
  }),
  drop("nevada-shootaround", {
    title: "Nevada Shootaround",
    subject: "Aztec Basketball",
    year: 2026,
    ratio: "9:16",
    span: 4,
    drop: true,
  }),

  drop("strictly-fall-recap", {
    title: "Fall '25 Recap",
    subject: "Strictly Run Club",
    year: 2025,
    ratio: "9:16",
    span: 4,
  }),
  drop("march-madness", {
    title: "March Madness",
    subject: "Aztec Basketball",
    year: 2025,
    ratio: "4:5",
    span: 5,
    drop: true,
  }),

  // Kept from the previous build at his request — original ids, not the drop.
  {
    slug: "san-jose-state-recap",
    title: "San Jose State Recap",
    subject: "Aztec Basketball",
    year: 2025,
    ratio: "16:9",
    span: 7,
    posterId: "Basketball-15-poster_t0jacv",
    filmId: "Basketball-15_1080p-cld_kt3fav",
    previewId: "Basketball-15-preview_md5hcj",
  },
  drop("color-grades", {
    title: "Color Grades",
    subject: "Reel",
    year: 2026,
    ratio: "4:5",
    span: 4,
    drop: true,
  }),

  drop("byrd-intro-clip", {
    title: "Starting Lineup",
    subject: "Color Grade",
    year: 2026,
    ratio: "16:9",
    span: 6,
  }),
  drop("reel", {
    title: "Reel",
    subject: "Selected Work",
    year: 2026,
    ratio: "16:9",
    span: 6,
    drop: true,
  }),
];

export const filmBySlug = (slug: string) => films.find((f) => f.slug === slug);

/** Resolved URLs for a film or one of its clips. */
export const filmSources = (f: Pick<Film, "posterId" | "filmId"> & { previewId?: string }) => ({
  poster: imageUrl(f.posterId, 1600),
  src: filmUrl(f.filmId),
  preview: f.previewId ? previewUrl(f.previewId) : undefined,
});

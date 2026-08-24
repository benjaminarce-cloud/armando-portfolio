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
  /**
   * Only where there is something to say that the frames don't. An array is
   * rendered as separate paragraphs, so copy written in beats keeps them.
   */
  note?: string | string[];
  /** Where the finished piece lives in full, when it is published elsewhere. */
  link?: { label: string; href: string };
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
  // The order of the wall.
  //
  // The first five are the ones he asked for by name, in his order. What
  // follows is strongest first: the pieces that stop you, then the shoots
  // with depth behind them, then the quieter one-offs, then the studies.
  // Nothing here is load-bearing — reordering only changes how the columns
  // stack, because packColumns deals by height, not by position.

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
    slug: "miles-byrd",
    title: "Beyond the Jersey",
    subject: "Miles Byrd",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    link: {
      label: "Watch on YouTube",
      href: "https://www.youtube.com/watch?v=PEtrScv564s&t=1s",
    },
    cover: "miles-byrd-doc-trailer",
    media: [
      ...video(
        "miles-byrd-doc-trailer",
        "byrd-spotlight",
        "byrd-steal-and-one",
        "byrd-intro-clip"
      ),
      // Him crossing campus with a bag. It was filed under graduation, where
      // it was the only frame of a subject the rest of that shoot never shows.
      ...photo("campus-walk"),
    ],
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
    slug: "chase",
    title: "Blenders Eyewear",
    subject: "Chase Fisher — Documentary Trailer",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    link: {
      label: "Watch on YouTube",
      href: "https://www.youtube.com/watch?v=X4s6ZiFHgpk",
    },
    cover: "chase-trailer",
    media: video("chase-trailer"),
  },

  {
    slug: "nascar",
    title: "NASCAR San Diego",
    subject: "Official Livestream",
    year: 2026,
    kind: "photo",
    // Not shot as a photographer: the stills are what came back from a weekend
    // spent operating a camera. One frame carries the role burned across it —
    // "NASCAR SAN DIEGO / ROLE: LIVESTREAM CAM OP."
    role: "Camera Operator",
    note: [
      "Spent last weekend as a cam op for the official livestream of the NASCAR San Diego race. Covered the garage and pits area, for a live behind the scenes look at the teams, mechanics, and cars before the race, while also capturing interviews throughout the event.",
      "A historic race celebrating America's 250th anniversary.",
    ],
    cover: "nascar-000000010025-5",
    media: photo(
      "nascar-000000010025-5", // in the garage, black and white
      "nascar-img-7072-9",     // the Haas Factory Team pit
      "nascar-img-6877-5",     // shooting down onto the grid
      "nascar-img-6878",       // over the pit wall
      "nascar-img-7085-5",     // the paddock, flags up
      "nascar-img-7100-5",     // the 00 car
      "nascar-img-7112-5",     // a crew member and the car
      "nascar-img-7101-5",     // the case, packed
      "nascar-img-7105-5"      // the bodies, black and white
    ),
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
    slug: "jaelan-phillips",
    title: "Loma Linda",
    subject: "Jaelan Phillips",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    note: "A hospital visit that was about more than signed jerseys — showing up for kids facing what no child should have to, and reminding them they are not fighting it alone.",
    cover: "jaelan-phillips-jersey",
    media: photo(
      "jaelan-phillips-jersey",
      "jaelan-phillips-signing",
      ...photosByPrefix("jaelan"),
      // A second visit, in a Dolphins jersey rather than a Panthers one.
      "community-visit",
      // His own football camp, in Redlands.
      "bball-1a7a8620",
      "bball-1a7a8681"
    ),
  },

  {
    slug: "matthew-stafford",
    title: "Miller Children's",
    subject: "Matthew Stafford",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    cover: "stafford-visit",
    media: photo("stafford-visit", "stafford-ball", ...photosByPrefix("stafford")),
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
    slug: "graduation",
    title: "Graduation",
    subject: "San Diego State",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    cover: "grad-hepner",
    // Named one at a time rather than taken wholesale off the folder.
    //
    // The shoot delivered forty-six frames and they are genuinely different
    // exposures, but they are not different pictures: one subject gave ten
    // near-identical frames on the same ledge, another six on the same step.
    // Run in full it read as a proof sheet someone forgot to edit. So each run
    // of near-identical frames is down to its best one, and what survives is
    // the frames that differ — a pose, a location, a black-and-white pass.
    //
    // Eighteen of forty-six. The rest are still built and still on the CDN;
    // they are simply not shown, so restoring one is a line here.
    media: photo(
      "grad-hepner",       // Hepner Hall, black and white — the cover
      "grad-champagne",    // two graduates, champagne on the lawn
      "coast-portrait",    // black and white, on the rocks
      "bball-1a7a5519",    // seated on the steps, red stole
      "grad-1a7a0419",     // standing on the lawn
      "grad-1a7a0597",     // Hepner Hall in colour
      "grad-1a7a4914",     // against the brick wall, cap in hand
      "grad-1a7a4937",     // seated on the steps, cap in hand
      "grad-1a7a5230",     // the arcade, standing
      "grad-1a7a5265",     // walking, the garden
      "grad-1a7a5289",     // the bench, with flowers
      "grad-1a7a5510",     // seated on the steps
      "grad-1a7a5600"      // seated on the steps, leaning back
    ),
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
    slug: "track-field",
    title: "Track & Field",
    subject: "Aztec Athletics",
    year: 2025,
    kind: "video",
    role: DIRECTOR,
    cover: "track-media-day",
    media: [
      ...video("track-media-day", "track-25"),
      // A media-day portrait, in the kit the film above is shooting.
      ...photo("locker-syd"),
    ],
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
    slug: "axo",
    title: "Alpha Chi Omega",
    subject: "Recap",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "axo-formal",
    media: video("axo-formal"),
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
    slug: "aztec-stills",
    title: "Aztec Basketball",
    subject: "Stills",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    cover: "aztec-hood",
    // Named one at a time rather than taken off the `bball` folder wholesale.
    // The folder was a mixed best-of, not a shoot: it also held the Jaelan
    // Phillips camp, a graduation portrait, the studio session and a track
    // media-day frame, all of which now sit with their own shoots.
    media: photo(
      "aztec-hood",
      "aztec-profile",
      "game-night",
      "camp-ball",
      "bball-1a7a3861",
      "bball-1a7a4067",
      "locker-1a7a5461-2",
      "locker-1a7a5476"
    ),
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
    slug: "studio",
    title: "Studio",
    subject: "Portraits",
    year: 2026,
    kind: "photo",
    role: PHOTOGRAPHER,
    // Two setups from one session — the black-and-white with the ball, and
    // the colour frame on the olive backdrop. They were filed under Aztec
    // basketball, which is neither the sport nor the shoot.
    cover: "studio-football",
    media: photo("studio-football", "bball-1a7a8575"),
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
    slug: "dumps",
    title: "Dumps",
    subject: "Personal",
    year: 2026,
    kind: "video",
    role: DIRECTOR,
    cover: "perso-dump",
    media: video("perso-dump", "jazz-dump"),
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

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

/* ---------------------------------------------------------------------- *
 * Tiles
 *
 * The mosaic draws two different things now. On the index a tile is a whole
 * project, and clicking it opens the shoot. On /video and /photo a tile is a
 * single piece — one clip, one frame — because those two are meant to read as
 * the work itself rather than as a second set of collections. Both collapse to
 * the same shape so one component can lay out either.
 * ---------------------------------------------------------------------- */

export type MosaicItem = {
  /** Unique within a list; React key and nothing else. */
  key: string;
  /** Where the tile goes when it is a link — the shoot it belongs to. */
  href: string;
  /** The shoot it came from. Lets the lightbox offer its siblings. */
  project?: string;
  poster: string;
  /** Present only for moving pieces. A still has nothing to play. */
  preview?: string;
  ratio: Ratio | PhotoRatio;
  title: string;
  subject?: string;
  /**
   * The piece at full size, for opening it in place.
   *
   * Set on single pieces and not on project covers: clicking a shoot on the
   * index should open the shoot, but clicking one frame on /photo should open
   * that frame, which is the whole reason those pages stopped showing
   * collections. `href` stays either way, so the shoot is still one step from
   * the piece.
   */
  full?: {
    kind: "video" | "photo";
    /** The film, or the still at a size worth looking at. */
    src: string;
    poster: string;
  };
};

/** The index: one tile per project. */
/**
 * Pieces strong enough to stand on the index on their own.
 *
 * The index shows shoots, which is right for a body of work but buries the
 * single frames that actually stop someone scrolling — the square Byrd
 * portrait, the March Madness floor, the aerial over the run. Those sat behind
 * a cover that was never going to be as arresting as they were.
 *
 * So a handful are promoted and run beside the collections rather than inside
 * them. They are chosen for the wall, not for completeness: a spread of shapes
 * (1:1, 9:16, 4:5, 16:9, 4:3) and no two from the same shoot unless both earn
 * it. A featured tile opens the piece in place, and the lightbox still offers
 * the shoot it came from, so promoting one costs the collection nothing.
 */
const FEATURED: string[] = [
  "byrd-spotlight",
  "march-madness",
  "strictly-week-7",
  "practice-727",
  "track-25",
  "elzie-dump",
  "golf-vhs",
  "byrd-steal-and-one",
];

/** The featured pieces as tiles, in the order named above. */
const featuredTiles = (): MosaicItem[] =>
  FEATURED.map((slug) => {
    const project = projects.find((p) => p.media.some((m) => m.slug === slug));
    if (!project) throw new Error(`Featured piece belongs to no project: ${slug}`);

    const clip = clipBySlug(slug);
    const { poster, preview, src } = clipSources(clip);

    return {
      key: `featured-${slug}`,
      href: `/work/${project.slug}`,
      project: project.slug,
      poster,
      preview,
      ratio: clip.ratio,
      title: clip.title,
      subject: project.title,
      full: { kind: "video" as const, src, poster },
    };
  });

/**
 * The index: shoots, with the featured pieces woven through them.
 *
 * Appending the featured tiles would leave eight single pieces in a block at
 * the bottom, which reads as an afterthought and undoes the point of promoting
 * them. Spacing them evenly through the collections puts one every few tiles,
 * so the wall alternates between a shoot and a frame the whole way down.
 */
export const indexTiles = (): MosaicItem[] => {
  const collections = projectTiles();
  const featured = featuredTiles();
  if (featured.length === 0) return collections;

  const out: MosaicItem[] = [];
  const every = Math.max(1, Math.floor(collections.length / featured.length));
  let next = 0;

  collections.forEach((tile, i) => {
    out.push(tile);
    if ((i + 1) % every === 0 && next < featured.length) {
      out.push(featured[next]);
      next += 1;
    }
  });

  // Anything the spacing did not reach still goes on rather than being lost.
  out.push(...featured.slice(next));
  return out;
};

export const projectTiles = (): MosaicItem[] =>
  projects.map((project) => {
    const { poster, preview, ratio } = tile(project);
    return {
      key: project.slug,
      href: `/work/${project.slug}`,
      project: project.slug,
      poster,
      preview,
      ratio,
      title: project.title,
      subject: project.subject,
    };
  });

/**
 * /video and /photo: one tile per piece, dealt round-robin across the shoots.
 *
 * Concatenating the projects is the obvious way to flatten them and it reads
 * terribly: graduation alone is forty-six frames, so a straight run puts four
 * screens of near-identical portraits at the top of /photo before anything else
 * appears, and the eleven golf postcards do the same to /video. Taking one
 * piece from each project in turn instead spreads every shoot over the whole
 * page, which is the point of showing single frames — the range reads at a
 * glance rather than shoot by shoot.
 *
 * Within a shoot the pieces keep their authored order, so a set that was cut to
 * run in sequence still runs in sequence, just spaced out.
 */
export const pieceTiles = (kind: ProjectMedia["kind"]): MosaicItem[] => {
  const perProject = projects
    .map((project) =>
      project.media
        .filter((m) => m.kind === kind)
        .map((m): MosaicItem => {
          if (m.kind === "video") {
            const clip = clipBySlug(m.slug);
            const { poster, preview } = clipSources(clip);
            return {
              key: m.slug,
              href: `/work/${project.slug}`,
              project: project.slug,
              poster,
              preview,
              ratio: clip.ratio,
              title: clip.title,
              subject: project.title,
              full: { kind: "video", src: clipSources(clip).src, poster },
            };
          }

          const { src, ratio } = photoSources(m.slug, 1200);
          return {
            key: m.slug,
            href: `/work/${project.slug}`,
            project: project.slug,
            poster: src,
            ratio,
            title: project.title,
            subject: project.subject,
            full: {
              kind: "photo",
              src: photoSources(m.slug, 2400).src,
              poster: src,
            },
          };
        })
    )
    .filter((pieces) => pieces.length > 0);

  const out: MosaicItem[] = [];
  const deepest = Math.max(0, ...perProject.map((p) => p.length));

  for (let i = 0; i < deepest; i++) {
    for (const pieces of perProject) {
      if (i < pieces.length) out.push(pieces[i]);
    }
  }

  return out;
};

/**
 * Height as a multiple of width, for packing columns.
 *
 * The mosaic has to come out as a rectangle, which means the columns have to
 * end level, which means something has to know how tall a tile will be before
 * it is on screen. Every shape the site delivers is known up front, so this is
 * a lookup rather than a measurement — no images have to load first, and the
 * server can pack the same way the browser will.
 */
export const RATIO_HEIGHT: Record<Ratio | PhotoRatio, number> = {
  "16:9": 9 / 16,
  "4:3": 3 / 4,
  "1:1": 1,
  "3:2": 2 / 3,
  "2:3": 3 / 2,
  "4:5": 5 / 4,
  "9:16": 16 / 9,
};

/**
 * Deal tiles into `columns` columns so the columns end level.
 *
 * CSS multi-column balances by splitting a flow, and a tile cannot be split, so
 * it leaves one column short and the block ends ragged — a stepped edge rather
 * than the rectangle he asked for. Packing by known height instead gets the
 * bottom flat.
 *
 * Taking the tiles in authored order and dropping each into the shortest column
 * is the obvious way to do that, and it is good enough at two or three columns.
 * At six it is not: thirty tiles over six columns is five apiece, and one 9:16
 * landing late has nothing left to balance it — that ran about 13% out. So the
 * tall pieces are placed first, when every column is still empty enough to take
 * one, and the short ones fill in around them. Each column is then put back
 * into authored order, because the packing decides *where* a tile goes and the
 * author still decides what follows what.
 */
export function packColumns(items: MosaicItem[], columns: number): MosaicItem[][] {
  const cols: MosaicItem[][] = Array.from({ length: columns }, () => []);
  const heights = new Array<number>(columns).fill(0);
  const order = new Map(items.map((item, i) => [item.key, i]));

  const tallestFirst = [...items].sort(
    (a, b) => RATIO_HEIGHT[b.ratio] - RATIO_HEIGHT[a.ratio]
  );

  for (const item of tallestFirst) {
    let shortest = 0;
    for (let i = 1; i < columns; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    cols[shortest].push(item);
    heights[shortest] += RATIO_HEIGHT[item.ratio];
  }

  for (const col of cols) {
    col.sort((a, b) => order.get(a.key)! - order.get(b.key)!);
  }

  return cols;
}

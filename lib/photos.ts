import { imageUrl } from "@/lib/media";

/**
 * The photo index, cut as a spread rather than a gallery.
 *
 * One or two frames per shoot, never the whole take — the point is that the
 * range reads at a glance: a jersey signing, a hospital essay, brand work,
 * grads, the weight room, 35mm scans, game night. Twelve shoots, twenty frames.
 *
 * `span` (of 12 columns) is what makes it editorial. Nearly every master is
 * 4:5, so variety has to come from how large each frame is set, not from its
 * shape — a full-column portrait next to a quarter-column detail.
 */

export type Photo = {
  slug: string;
  /** The shoot or project it belongs to — the small line under the frame. */
  shoot: string;
  title: string;
  year: number;
  ratio: "4:5" | "2:3" | "3:2";
  span: 3 | 4 | 5 | 6 | 7 | 8;
  /** Sit this one lower than its neighbour. */
  drop?: boolean;
};

export const PHOTO_RATIO_CLASS: Record<Photo["ratio"], string> = {
  "4:5": "aspect-[4/5]",
  "2:3": "aspect-[2/3]",
  "3:2": "aspect-[3/2]",
};

export const photos: Photo[] = [
  // Opens on the two quietest frames, set against each other.
  { slug: "coast-portrait", shoot: "Coast", title: "On the Rocks", year: 2026, ratio: "4:5", span: 5 },
  { slug: "studio-football", shoot: "Studio", title: "Tank", year: 2026, ratio: "4:5", span: 4, drop: true },

  // Jaelan Phillips — Panthers signing.
  { slug: "jaelan-phillips-jersey", shoot: "Jaelan Phillips", title: "Number Five", year: 2026, ratio: "4:5", span: 6 },
  { slug: "jaelan-phillips-signing", shoot: "Jaelan Phillips", title: "Signing", year: 2026, ratio: "4:5", span: 4, drop: true },

  // Matthew Stafford — hospital visit. The essay page, then the detail.
  { slug: "stafford-visit", shoot: "Matthew Stafford", title: "Hospital Visit", year: 2026, ratio: "4:5", span: 7 },
  { slug: "stafford-ball", shoot: "Matthew Stafford", title: "To Jasmyn", year: 2026, ratio: "4:5", span: 3, drop: true },

  // Aztec basketball portraits.
  { slug: "aztec-hood", shoot: "Aztec Basketball", title: "Hood Up", year: 2026, ratio: "4:5", span: 4 },
  { slug: "aztec-profile", shoot: "Aztec Basketball", title: "Profile", year: 2026, ratio: "4:5", span: 5, drop: true },

  // Game night — set large, it is the only crowd in the run.
  { slug: "game-night", shoot: "Game Night", title: "Warmup", year: 2026, ratio: "4:5", span: 8 },
  { slug: "camp-ball", shoot: "Camp", title: "Coach", year: 2026, ratio: "4:5", span: 3, drop: true },

  // Brand work.
  { slug: "juun-can", shoot: "JUUN", title: "Rackets", year: 2026, ratio: "4:5", span: 5 },
  { slug: "juun-court", shoot: "JUUN", title: "Courtside", year: 2026, ratio: "4:5", span: 6, drop: true },

  // 35mm scans.
  { slug: "film-tunnel", shoot: "35mm", title: "Tunnel", year: 2026, ratio: "2:3", span: 4 },
  { slug: "film-portrait", shoot: "35mm", title: "Sleeve", year: 2026, ratio: "4:5", span: 5, drop: true },

  // Weight room.
  { slug: "weights-plate", shoot: "Weight Room", title: "Plate", year: 2026, ratio: "4:5", span: 6 },
  { slug: "weights-rope", shoot: "Weight Room", title: "Rope", year: 2026, ratio: "4:5", span: 5, drop: true },

  // Graduation.
  { slug: "grad-hepner", shoot: "Graduation", title: "Hepner Hall", year: 2026, ratio: "4:5", span: 5 },
  { slug: "grad-champagne", shoot: "Graduation", title: "Champagne", year: 2026, ratio: "4:5", span: 6, drop: true },

  // Closes wide.
  { slug: "community-visit", shoot: "Community", title: "Ward Round", year: 2026, ratio: "4:5", span: 7 },
  { slug: "campus-walk", shoot: "Campus", title: "Crossing", year: 2026, ratio: "4:5", span: 4, drop: true },
];

/** Distinct shoots, for the count under the masthead. */
export const shootCount = new Set(photos.map((p) => p.shoot)).size;

export const photoUrl = (p: Photo, w = 1400) => imageUrl(`mando/${p.slug}`, w);

/** Him, on the job. These only ever run on /me. */
export const mePhotos = [
  { slug: "me-portrait-shoot", ratio: "3:2" as const, alt: "Shooting a player portrait on set" },
  { slug: "me-rig", ratio: "4:5" as const, alt: "Operating a cinema rig" },
  { slug: "me-locker-room", ratio: "3:2" as const, alt: "Filming in the locker room" },
  { slug: "me-ncaa", ratio: "4:5" as const, alt: "Credentialed at the NCAA championships" },
  { slug: "me-monitor", ratio: "3:2" as const, alt: "At the monitor" },
  { slug: "me-tunnel", ratio: "3:2" as const, alt: "In the tunnel before tip-off" },
];

export const mePhotoUrl = (slug: string, w = 1200) => imageUrl(`mando/${slug}`, w);

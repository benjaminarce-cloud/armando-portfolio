import { imageUrl } from "@/lib/media";

/**
 * Him, on the job. These only ever run on /me.
 *
 * The site's own photo index used to live here as a hand-written list of
 * twenty frames with a column span each. It doesn't any more: projects own
 * their frames now, and the slugs and shapes come off lib/photo-manifest.ts,
 * which is generated from what scripts/prep-photos.sh actually built. What is
 * left is the one set that belongs to a page rather than to a shoot.
 */

export const mePhotos = [
  { slug: "me-portrait-shoot", ratio: "3:2" as const, alt: "Shooting a player portrait on set" },
  { slug: "me-rig", ratio: "4:5" as const, alt: "Operating a cinema rig" },
  { slug: "me-locker-room", ratio: "3:2" as const, alt: "Filming in the locker room" },
  { slug: "me-ncaa", ratio: "4:5" as const, alt: "Credentialed at the NCAA championships" },
  { slug: "me-monitor", ratio: "3:2" as const, alt: "At the monitor" },
  { slug: "me-tunnel", ratio: "3:2" as const, alt: "In the tunnel before tip-off" },
];

export const mePhotoUrl = (slug: string, w = 1200) => imageUrl(`mando/${slug}`, w);

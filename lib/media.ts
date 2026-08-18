/**
 * Cloudinary URL builders.
 *
 * Everything from the 2026 drop is uploaded under the `mando/` folder by
 * scripts/upload.js, so the public id is just the slug. A couple of assets
 * predate that folder and carry their original ids — those pass through here
 * unchanged by starting with a slash-free absolute id.
 */

const CLOUD = "dzjcndphq";

/**
 * Set NEXT_PUBLIC_LOCAL_MEDIA=1 to read from public/mando instead of the CDN.
 * Symlink public/mando at build/media and the whole site runs off the local
 * transcodes — useful for judging a layout before anything is uploaded.
 */
const LOCAL = process.env.NEXT_PUBLIC_LOCAL_MEDIA === "1";

const base = (kind: "video" | "image", transform: string, id: string) =>
  LOCAL
    ? `/${id}`
    : `https://res.cloudinary.com/${CLOUD}/${kind}/upload/${transform}/${id}`;

/** The film itself, streamed at whatever the browser handles best. */
export const filmUrl = (id: string) => base("video", "f_auto,q_auto", `${id}.mp4`);

/** The muted loop that plays under the cursor. Small on purpose. */
export const previewUrl = (id: string) =>
  base("video", "f_auto,q_auto:eco,w_720", `${id}.mp4`);

/**
 * The full-screen opener.
 *
 * Deliberately not `filmUrl`. The hero is a muted, cover-cropped background
 * that starts downloading before anything else on the site, and at full quality
 * Cloudinary hands back 30 MB for it. Capped at 1600 and at `q_auto:eco` it is
 * 16.5 MB for a picture nobody is inspecting — it is moving, it is cropped on
 * every axis, and half of it is off-screen. A film you actually sit and watch
 * still goes through `filmUrl` at full quality.
 */
export const heroUrl = (id: string) =>
  base("video", "f_auto,q_auto:eco,w_1600", `${id}.mp4`);

/** A still. `w` caps the delivered width so the grid never pulls a 2600px file. */
export const imageUrl = (id: string, w = 1400) =>
  base("image", `f_auto,q_auto,w_${w},c_limit`, `${id}.jpg`);

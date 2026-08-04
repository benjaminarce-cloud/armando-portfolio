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

/** A still. `w` caps the delivered width so the grid never pulls a 2600px file. */
export const imageUrl = (id: string, w = 1400) =>
  base("image", `f_auto,q_auto,w_${w},c_limit`, `${id}.jpg`);

const CLOUD = "dzjcndphq";

/** Near-duplicates and frames that don't hold up at size. */
const EXCLUDED = new Set([6, 7, 29, 31, 32]);

/**
 * Personal and behind-the-scenes photos — him on the floor, on set, and
 * growing up. They run as a contact sheet under the bio on /contact.
 */
export const lifePhotos: string[] = Array.from({ length: 35 }, (_, i) => i + 1)
  .filter((n) => !EXCLUDED.has(n))
  .map(
    (n) =>
      `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_600,c_fill,ar_3:2/about-${n}.jpg`
  );

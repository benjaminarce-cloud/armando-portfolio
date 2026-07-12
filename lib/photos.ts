import { projects } from "@/lib/projects";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  title: string;
  year: number;
  /** The film this frame was pulled from, if it came from one. */
  filmSlug?: string;
};

/**
 * Seeded from frames lifted out of the films — every cover in projects.ts is
 * a still Cloudinary pulled at a given timestamp, so these are genuinely his
 * frames rather than filler.
 *
 * To publish real photography instead, replace the body of this file with a
 * literal Photo[] array. Nothing downstream needs to change: /photo renders
 * whatever this exports.
 */
export const photos: Photo[] = projects
  .filter((p) => Boolean(p.coverSrc))
  .map((p, i) => ({
    id: `frame-${String(i + 1).padStart(3, "0")}`,
    src: p.coverSrc,
    alt: p.coverAlt ?? `Still frame from ${p.title}`,
    title: p.title,
    year: p.year,
    filmSlug: p.slug,
  }));

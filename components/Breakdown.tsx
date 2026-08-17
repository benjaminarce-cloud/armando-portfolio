import Image from "next/image";
import FilmPlayer from "@/components/FilmPlayer";
import { clipBySlug, clipSources, RATIO_CLASS } from "@/lib/clips";
import {
  photoSources,
  PHOTO_RATIO_CLASS,
  type Project,
  type ProjectMedia,
} from "@/lib/projects";

/**
 * Everything in a project, down the page.
 *
 * This is the half he asked for by name: click the golf tile and get the
 * tournament, not one clip off it. So the run is deliberately long and plain —
 * a shoot of forty frames should feel like forty frames.
 *
 * Two shapes only. A wide piece takes the full measure; verticals share a row,
 * because a 9:16 at full width is a screen and a half of scrolling for one clip
 * and the pairing is what keeps a long gallery moving. How many share it is
 * `columnsFor`, below.
 *
 * Nothing on this page autoplays. Hovering a tile in the mosaic already showed
 * a loop; arriving here is the point at which the visitor gets to choose.
 */

const isTall = (ratio: string) =>
  ratio === "9:16" || ratio === "4:5" || ratio === "2:3";

/**
 * How many verticals sit on a row.
 *
 * Two, normally — big enough that a frame is still a photograph rather than a
 * thumbnail. But a shoot like the graduation set runs forty-six frames, and at
 * two-up that is twenty-odd screens of scrolling before the page ends. Past
 * twenty pieces the run tightens to three, which halves the depth without
 * dropping anything. Landscape pieces always take the full measure.
 */
const columnsFor = (count: number) => (count > 20 ? 3 : 2);

const TALL_ROW_CLASS: Record<number, string> = {
  2: "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6",
  3: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3",
};

type Row = { tall: boolean; items: ProjectMedia[] };

/** Group the run into full-width singles and rows of verticals. */
function toRows(
  media: ProjectMedia[],
  shapeOf: (m: ProjectMedia) => string,
  columns: number
) {
  const rows: Row[] = [];

  for (const item of media) {
    const tall = isTall(shapeOf(item));
    const last = rows[rows.length - 1];

    if (tall && last?.tall && last.items.length < columns) {
      last.items.push(item);
    } else {
      rows.push({ tall, items: [item] });
    }
  }

  return rows;
}

export default function Breakdown({ project }: { project: Project }) {
  const shapeOf = (m: ProjectMedia) =>
    m.kind === "video" ? clipBySlug(m.slug).ratio : photoSources(m.slug).ratio;

  const columns = columnsFor(project.media.length);
  const rows = toRows(project.media, shapeOf, columns);

  return (
    <div className="space-y-4 sm:space-y-6">
      {rows.map((row) => (
        <div
          key={row.items[0].slug}
          className={
            row.tall ? TALL_ROW_CLASS[columns] : "mx-auto max-w-5xl"
          }
        >
          {row.items.map((item, i) => (
            <Piece
              key={item.slug}
              item={item}
              shape={shapeOf(item)}
              columns={columns}
              priority={rows[0] === row && i === 0}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Piece({
  item,
  shape,
  columns,
  priority,
}: {
  item: ProjectMedia;
  shape: string;
  columns: number;
  priority: boolean;
}) {
  if (item.kind === "video") {
    const clip = clipBySlug(item.slug);
    const { poster, src } = clipSources(clip);

    return (
      <figure>
        <div
          className={`overflow-hidden bg-black ${RATIO_CLASS[clip.ratio]}`}
        >
          <FilmPlayer src={src} poster={poster} autoStart={false} />
        </div>
        <figcaption className="caps-xs mt-2 text-[color:var(--muted)]">
          {clip.title}
        </figcaption>
      </figure>
    );
  }

  // A three-up frame is never delivered at the width a full-bleed one is.
  const { src, ratio } = photoSources(item.slug, columns === 3 ? 1400 : 2000);

  const sizes = !isTall(shape)
    ? "100vw"
    : columns === 3
      ? "(max-width: 640px) 50vw, 33vw"
      : "(max-width: 640px) 100vw, 50vw";

  return (
    <div
      className={`relative overflow-hidden bg-[color:var(--rule)] ${
        PHOTO_RATIO_CLASS[ratio] ?? PHOTO_RATIO_CLASS["4:5"]
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}

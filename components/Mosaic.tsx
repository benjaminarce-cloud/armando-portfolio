import Link from "next/link";
import HoverPreview from "@/components/HoverPreview";
import {
  tile,
  TILE_RATIO_CLASS,
  type Project,
} from "@/lib/projects";

/**
 * The index, as one dense block of tiles.
 *
 * It is a CSS multi-column masonry rather than a grid: tiles keep their own
 * shape, fill a column top to bottom, and butt straight against each other with
 * no gap and no caption. That is the whole effect — a wall of work where a 9:16
 * next to a 16:9 next to a square does the composing, so nothing has to be
 * sized by hand the way the old twelve-column index was.
 *
 * Columns flow down and then across, which means the authored order in
 * lib/projects.ts reads down column one before it reaches column two. For a
 * wall with no reading order that is fine, and it is what the layout he pointed
 * at does too.
 */
export default function Mosaic({ projects }: { projects: Project[] }) {
  return (
    <div className="mosaic">
      {projects.map((project, i) => (
        <Tile key={project.slug} project={project} priority={i < 4} />
      ))}
    </div>
  );
}

function Tile({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const { poster, preview, ratio } = tile(project);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden"
    >
      <div className={TILE_RATIO_CLASS[ratio]}>
        <HoverPreview
          poster={poster}
          preview={preview}
          alt={`${project.title} — ${project.subject ?? "cover frame"}`}
          // Tiles are one column wide, and the column count steps 2 / 3 / 5 / 6.
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1400px) 20vw, 17vw"
          priority={priority}
        />
      </div>

      {/* The mosaic is silent until you point at it. The label is the only
          thing that says what a tile is, so it carries its own scrim rather
          than relying on whatever happens to be behind it. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <p className="caps text-white">{project.title}</p>
        {project.subject ? (
          <p className="caps-xs mt-0.5 text-white/70">{project.subject}</p>
        ) : null}
      </div>
    </Link>
  );
}

import Link from "next/link";
import HoverPreview from "@/components/HoverPreview";
import PageShell from "@/components/PageShell";
import { films, filmSources, RATIO_CLASS, type Film } from "@/lib/films";
import { SPAN_CLASS, toRows } from "@/lib/layout";

export const metadata = {
  title: "Video — Mando",
};

function Tile({ film, priority = false }: { film: Film; priority?: boolean }) {
  const { poster, preview } = filmSources(film);

  return (
    <article className={`row ${SPAN_CLASS[film.span]} ${film.drop ? "lg:mt-20" : ""}`}>
      <Link href={`/video/${film.slug}`} className="group block">
        <div className={RATIO_CLASS[film.ratio]}>
          <HoverPreview
            poster={poster}
            preview={preview}
            alt={`${film.title} — cover frame`}
            sizes={`(max-width: 1024px) 100vw, ${Math.round((film.span / 12) * 100)}vw`}
            priority={priority}
          />
        </div>

        <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-[color:var(--rule)] pt-2">
          <div className="min-w-0">
            {film.subject ? (
              <p className="caps-xs truncate text-[color:var(--muted)]">
                {film.subject}
              </p>
            ) : null}
            <h2 className="caps mt-1 truncate">{film.title}</h2>
          </div>
          <span className="caps-xs shrink-0 tabular-nums text-[color:var(--muted)]">
            {film.year}
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function VideoPage() {
  const rows = toRows(films);

  return (
    <PageShell title="Video" slate={`${films.length} Films`}>
      <div className="index space-y-16 lg:space-y-24">
        {rows.map((row, i) => (
          <div
            key={row[0].slug}
            className="grid grid-cols-1 items-start gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-0"
          >
            {row.map((film, j) => (
              <Tile key={film.slug} film={film} priority={i === 0 && j === 0} />
            ))}
          </div>
        ))}
      </div>
    </PageShell>
  );
}

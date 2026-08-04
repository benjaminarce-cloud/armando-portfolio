import Link from "next/link";
import { notFound } from "next/navigation";
import FilmPlayer from "@/components/FilmPlayer";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import { films, filmBySlug, filmSources, RATIO_CLASS } from "@/lib/films";

export function generateStaticParams() {
  return films.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = filmBySlug(slug);
  return { title: film ? `${film.title} — Mando` : "Mando" };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = filmBySlug(slug);
  if (!film) notFound();

  const { poster, src } = filmSources(film);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 py-6 sm:px-8 lg:px-12">
      <PageHeader />

      <main className="flex-1 pt-14 lg:pt-20">
        {/* Masthead */}
        <div className="flex items-end justify-between gap-6 border-b border-[color:var(--rule)] pb-4">
          <div className="min-w-0">
            {film.subject ? (
              <p className="caps-xs text-[color:var(--muted)]">{film.subject}</p>
            ) : null}
            <h1 className="display mt-2 text-[clamp(30px,6vw,80px)]">
              {film.title}
            </h1>
          </div>
          <p className="caps-xs shrink-0 pb-1 tabular-nums text-[color:var(--muted)]">
            {film.year}
          </p>
        </div>

        {film.clips ? (
          /* A postcard set: every clip in sequence, none of them auto-starting.
             They are seconds long each, so they read as a spread of moving
             stills rather than as a film you sit through. */
          <div className="mt-10 space-y-10 lg:mt-14 lg:space-y-16">
            {film.clips.map((clip, i) => {
              const clipSrc = filmSources(clip);
              return (
                <figure key={clip.slug}>
                  <div
                    className={`bg-black ${RATIO_CLASS[clip.ratio]} overflow-hidden`}
                  >
                    <FilmPlayer
                      src={clipSrc.src}
                      poster={clipSrc.poster}
                      autoStart={false}
                    />
                  </div>
                  <figcaption className="mt-2 flex items-baseline justify-between border-t border-[color:var(--rule)] pt-2">
                    <span className="caps">{clip.title}</span>
                    <span className="caps-xs tabular-nums text-[color:var(--muted)]">
                      {String(i + 1).padStart(2, "0")} / {String(film.clips!.length).padStart(2, "0")}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        ) : (
          <div
            className={`mx-auto mt-10 bg-black lg:mt-14 ${RATIO_CLASS[film.ratio]} ${
              film.ratio === "9:16" || film.ratio === "4:5"
                ? "max-w-[min(100%,420px)]"
                : "max-w-6xl"
            } overflow-hidden`}
          >
            <FilmPlayer src={src} poster={poster} />
          </div>
        )}

        <div className="mt-12 flex flex-col items-start gap-5 border-t border-[color:var(--rule)] pt-5 sm:flex-row sm:items-baseline sm:justify-between">
          <Link
            href="/video"
            className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            &larr; All Films
          </Link>

          {film.fullVideoUrl ? (
            <a
              href={film.fullVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="caps u transition-opacity hover:opacity-55"
            >
              Watch the full film on YouTube
            </a>
          ) : null}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

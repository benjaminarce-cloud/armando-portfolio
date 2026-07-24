import Link from "next/link";
import { notFound } from "next/navigation";
import FilmPlayer from "@/components/FilmPlayer";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = projects.find((p) => p.slug === slug);
  return { title: film ? `${film.title} — Armando Aguilar` : "Armando Aguilar" };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = projects.find((p) => p.slug === slug);
  if (!film) notFound();

  const src = film.videoSrc ?? film.previewSrc ?? null;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 py-8 sm:px-10 lg:px-14">
      <PageHeader />

      <main className="flex-1 pt-16 lg:pt-24">
        {/* Masthead */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="caps text-[color:var(--muted)]">{film.category}</p>
          <h1 className="display mt-6 text-[clamp(28px,4.2vw,52px)]">
            {film.title}
          </h1>
        </div>

        {/* Film */}
        <div className="mx-auto mt-14 max-w-6xl border border-[color:var(--rule)] bg-black">
          {src ? (
            <FilmPlayer src={src} poster={film.coverSrc} />
          ) : (
            <div className="grid aspect-video place-items-center">
              <p className="caps text-[color:var(--muted)]">No feed</p>
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center gap-8">
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

          <Link
            href="/video"
            className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            &larr; All films
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

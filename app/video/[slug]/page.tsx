import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
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
    <>
      <PageHeader />

      <main className="min-h-screen px-14 pb-32 pt-[168px]">
        <Link
          href="/video"
          className="hud lock inline-block px-2 py-1 text-[color:var(--dim)] transition-colors hover:text-white"
        >
          ← All films
        </Link>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-6 border-b border-[color:var(--line)] pb-5">
          <h1 className="mark text-[clamp(24px,3.4vw,40px)]">{film.title}</h1>
          <p className="hud text-[color:var(--dim)]">
            {film.category} · {film.year}
          </p>
        </div>

        <div className="mt-10 border border-[color:var(--line)] bg-black">
          {src ? (
            <video
              className="h-full w-full"
              controls
              playsInline
              preload="metadata"
              poster={film.coverSrc}
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div className="grid aspect-video place-items-center">
              <p className="hud text-[color:var(--dim)]">No feed</p>
            </div>
          )}
        </div>

        {film.fullVideoUrl ? (
          <a
            href={film.fullVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lock group mt-10 inline-flex items-baseline gap-5 px-3 py-2"
          >
            <span className="text-[clamp(20px,2.6vw,32px)] uppercase tracking-[-0.01em] text-white">
              Watch the full film
            </span>
            <span className="hud text-[color:var(--rec)]">YouTube ↗</span>
          </a>
        ) : null}
      </main>
    </>
  );
}

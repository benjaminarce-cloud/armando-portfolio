// app/work/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();

  // Prefer full video, else preview, else nothing
  const src = p.videoSrc ?? p.previewSrc ?? null;

  return (
    <main className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        {/* Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/work"
            className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)] hover:text-[color:var(--page-fg)]"
          >
            Back to work
          </Link>

          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
            {p.category} • {p.year}
          </p>
        </div>

        {/* Title */}
        <div className="mt-10">
          <h1 className="editorial-title text-[clamp(44px,6vw,84px)]">
            {p.title}
          </h1>

          {p.role ? (
            <p className="mt-4 max-w-2xl text-sm text-[color:var(--page-muted)]">
              {p.role}
            </p>
          ) : null}

          {p.tags?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[color:var(--page-border)] px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Video */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[color:var(--page-border)] bg-[color:var(--page-card)]">
          {src ? (
            <video
              className="h-full w-full"
              controls
              playsInline
              preload="metadata"
              poster={p.coverSrc}
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div className="aspect-video grid place-items-center">
              <p className="text-sm text-[color:var(--page-muted)]">
                Video coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// app/work/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { WORK_GROUPS } from "@/lib/workGroups";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — Armando Aguilar` : "Work" };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const src = p.videoSrc ?? p.previewSrc ?? null;
  const group = WORK_GROUPS.find((g) => g.id === p.group);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      {/* Meta */}
      <div className="lg:col-span-2">
        <Link
          href={group?.href ?? "/work"}
          className="u text-[13px] text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
        >
          Back
        </Link>

        <dl className="mt-12 space-y-6">
          <div>
            <dt className="label">Category</dt>
            <dd className="mt-1 text-[13px] italic">{p.category}</dd>
          </div>
          <div>
            <dt className="label">Year</dt>
            <dd className="mt-1 text-[13px] italic tabular-nums">{p.year}</dd>
          </div>
          {p.role ? (
            <div>
              <dt className="label">Role</dt>
              <dd className="mt-1 text-[13px] italic">{p.role}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      {/* Film */}
      <div className="lg:col-span-8 lg:col-start-4">
        <h1 className="max-w-[24ch] text-[22px] leading-tight sm:text-[26px]">
          {p.title}
        </h1>

        <div className="mt-8">
          {src ? (
            <video
              className="w-full bg-[color:var(--rule)]"
              controls
              playsInline
              preload="metadata"
              poster={p.coverSrc}
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div className="grid aspect-video place-items-center bg-[color:var(--rule)]">
              <p className="text-[13px] text-[color:var(--muted)]">
                Video coming soon.
              </p>
            </div>
          )}
        </div>

        {p.fullVideoUrl ? (
          <a
            href={p.fullVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="u mt-6 inline-block text-[13px] transition-colors hover:text-[color:var(--muted)]"
          >
            Watch the full film on YouTube
          </a>
        ) : null}
      </div>
    </div>
  );
}

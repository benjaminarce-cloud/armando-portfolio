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

  const meta = [
    { label: "Category", value: p.category },
    { label: "Year", value: String(p.year) },
    ...(p.role ? [{ label: "Role", value: p.role }] : []),
  ];

  return (
    <article className="mx-auto max-w-6xl">
      {/* Title block */}
      <div className="text-center">
        <p className="caps text-[color:var(--muted)]">{p.category}</p>
        <h1 className="display mx-auto mt-6 max-w-3xl text-[clamp(28px,4.2vw,52px)]">
          {p.title}
        </h1>
      </div>

      {/* Film */}
      <div className="mt-14">
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
            <p className="caps text-[color:var(--muted)]">Video coming soon</p>
          </div>
        )}
      </div>

      {/* Meta */}
      <dl className="mt-10 grid gap-8 border-t border-[color:var(--rule)] pt-8 sm:grid-cols-3">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="caps text-[color:var(--muted)]">{item.label}</dt>
            <dd className="caps-sm mt-3">{item.value}</dd>
          </div>
        ))}
      </dl>

      {p.fullVideoUrl ? (
        <div className="mt-12 text-center">
          <a
            href={p.fullVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="caps inline-block border-b border-[color:var(--fg)] pb-1 transition-opacity hover:opacity-55"
          >
            Watch the full film
          </a>
        </div>
      ) : null}

      <div className="mt-20 border-t border-[color:var(--rule)] pt-6">
        <Link
          href={group?.href ?? "/work"}
          className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
        >
          &larr; Back to {group?.label ?? "Work"}
        </Link>
      </div>
    </article>
  );
}

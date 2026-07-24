import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { projects } from "@/lib/projects";
import { isGroupId, WORK_GROUPS } from "@/lib/workGroups";

export const metadata = {
  title: "Video — Armando Aguilar",
};

export default async function VideoPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const sp = await searchParams;
  const activeGroup = isGroupId(sp.group ?? null) ? sp.group : null;

  const films = activeGroup
    ? projects.filter((p) => p.group === activeGroup)
    : projects;

  const filterClass = (active: boolean) =>
    [
      "caps transition-opacity",
      active
        ? "u text-[color:var(--fg)]"
        : "text-[color:var(--muted)] hover:text-[color:var(--fg)]",
    ].join(" ");

  return (
    <PageShell title="Video" slate={`${films.length} Films`}>
      {/* Reel select */}
      <div className="-mt-4 mb-14 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3">
        <Link href="/video" className={filterClass(!activeGroup)}>
          All
        </Link>

        {WORK_GROUPS.map((group) => (
          <Link
            key={group.id}
            href={`/video?group=${group.id}`}
            className={filterClass(activeGroup === group.id)}
          >
            {group.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {films.map((film) => (
          <article key={film.slug}>
            <Link href={`/video/${film.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--rule)]">
                <Image
                  src={film.coverSrc}
                  alt={film.coverAlt ?? `${film.title} cover frame`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                />

                {film.previewSrc ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={film.coverSrc}
                    autoPlay
                  >
                    <source src={film.previewSrc} type="video/mp4" />
                  </video>
                ) : null}
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-[color:var(--rule)] pt-4">
                <div>
                  <p className="caps text-[color:var(--muted)]">
                    {film.category}
                  </p>
                  <h2 className="mt-2 text-[13px] uppercase tracking-[0.1em]">
                    {film.title}
                  </h2>
                </div>
                <span className="caps tabular-nums text-[color:var(--muted)]">
                  {film.year}
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

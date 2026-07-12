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

  return (
    <PageShell title="Video" slate={`${films.length} films`}>
      {/* Reel select */}
      <div className="-mt-4 mb-10 flex flex-wrap items-center gap-1">
        <Link
          href="/video"
          className={[
            "lock px-4 py-1 text-[11px] uppercase tracking-[0.16em] transition-colors",
            !activeGroup
              ? "lock-on text-white"
              : "text-[color:var(--dim)] hover:text-white",
          ].join(" ")}
        >
          All
        </Link>

        {WORK_GROUPS.map((group) => (
          <Link
            key={group.id}
            href={`/video?group=${group.id}`}
            className={[
              "lock px-4 py-1 text-[11px] uppercase tracking-[0.16em] transition-colors",
              activeGroup === group.id
                ? "lock-on text-white"
                : "text-[color:var(--dim)] hover:text-white",
            ].join(" ")}
          >
            {group.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {films.map((film) => (
          <article key={film.slug}>
            <Link href={`/video/${film.slug}`} className="group block">
              <div className="lock lock-tile relative aspect-[4/5] overflow-hidden bg-black">
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

                <span className="hud-num absolute left-3 top-3 z-10 text-[10px] uppercase tracking-[0.14em] text-white/70">
                  {film.year}
                </span>
              </div>

              <div className="mt-5">
                <p className="hud text-[color:var(--dim)]">{film.category}</p>
                <h2 className="mt-2 text-[15px] uppercase tracking-[0.04em] text-white transition-colors">
                  {film.title}
                </h2>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

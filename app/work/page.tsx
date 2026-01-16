// app/work/page.tsx
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { isGroupId, WORK_GROUPS } from "@/lib/workGroups";

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const sp = await searchParams;
  const groupParam = sp.group ?? null;
  const activeGroup = isGroupId(groupParam) ? groupParam : null;

  const filtered = activeGroup
    ? projects.filter((p) => p.group === activeGroup)
    : projects;

  const heading = activeGroup
    ? WORK_GROUPS.find((g) => g.id === activeGroup)?.label ?? "Work"
    : "Work";

  const subcopy = activeGroup
    ? `Selected projects in ${heading}.`
    : "All films & campaigns.";

  return (
    <main className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mt-10">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
            Work
          </p>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h1 className="editorial-title text-[clamp(44px,6vw,84px)]">
              {heading}
            </h1>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.28em]">
              <Link
                href="/work"
                className={[
                  "rounded-full border px-3 py-2 transition-colors",
                  !activeGroup
                    ? "border-[color:var(--page-border)] bg-[color:var(--page-card)] text-[color:var(--page-fg)]"
                    : "border-[color:var(--page-border)] text-[color:var(--page-muted)] hover:text-[color:var(--page-fg)]",
                ].join(" ")}
              >
                All
              </Link>

              {WORK_GROUPS.map((g) => (
                <Link
                  key={g.id}
                  href={g.href}
                  className={[
                    "rounded-full border px-3 py-2 transition-colors",
                    activeGroup === g.id
                      ? "border-[color:var(--page-border)] bg-[color:var(--page-card)] text-[color:var(--page-fg)]"
                      : "border-[color:var(--page-border)] text-[color:var(--page-muted)] hover:text-[color:var(--page-fg)]",
                  ].join(" ")}
                >
                  {g.label}
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm text-[color:var(--page-muted)]">
            {subcopy}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.slug}>
              <Link href={`/work/${p.slug}`} className="group block">
                <div className="relative">
                  {/* Poster + hover preview */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
                    {/* Poster image */}
                    <Image
                      src={p.coverSrc}
                      alt={p.coverAlt ?? `${p.title} cover frame`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                    />

                    {/* Hover preview (only if previewSrc exists) */}
                    {p.previewSrc ? (
                      <video
                        className="
                          absolute inset-0 h-full w-full object-cover
                          opacity-0 transition-opacity duration-300
                          group-hover:opacity-100
                        "
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={p.coverSrc}
                        // autoPlay is okay here, but some browsers only start on hover anyway
                        autoPlay
                      >
                        <source src={p.previewSrc} type="video/mp4" />
                      </video>
                    ) : null}

                    {/* Subtle overlay so text area feels intentional */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Meta */}
                  <div className="mt-6">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)]">
                      {p.category} • {p.year}
                    </p>

                    <h2 className="editorial-title mt-3 text-3xl">
                      {p.title}
                    </h2>

                    {p.role ? (
                      <p className="mt-3 text-sm text-[color:var(--page-muted)]">
                        {p.role}
                      </p>
                    ) : null}

                    <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)]">
                      <span className="h-px w-10 bg-[color:var(--page-border)]" />
                      <span className="group-hover:text-[color:var(--page-fg)] transition-colors">
                        View
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

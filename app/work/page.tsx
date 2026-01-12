import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { filterProjectsByGroup } from "@/lib/workGroups";

export default async function WorkPage({
  searchParams,
}: {
  searchParams?: Promise<{ group?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const group = sp.group;

  const filtered = filterProjectsByGroup(projects, group);

  return (
    <main className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mt-10">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
            Work
            {group ? (
              <span className="ml-3 text-[color:var(--page-muted)]/80">
                / {String(group).toUpperCase()}
              </span>
            ) : null}
          </p>

          <h1 className="editorial-title mt-4 text-[clamp(44px,6vw,84px)]">
            Films & Campaigns
          </h1>

          <p className="mt-6 max-w-2xl text-[color:var(--page-muted)]">
            Sports marketing films, social-first edits, and run culture stories —
            built for replay.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <article key={p.slug} className={tileOffset(i)}>
              <Link href={`/work/${p.slug}`} className="group block">
                <div className="relative">
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
                    <Image
                      src={p.coverSrc}
                      alt={p.coverAlt ?? `${p.title} cover frame`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                    />
                  </div>

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
                      <span className="group-hover:text-[color:var(--page-fg)]">
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

function tileOffset(i: number) {
  const map: Record<number, string> = {
    1: "lg:translate-y-10",
    2: "lg:-translate-y-4",
    4: "lg:translate-y-6",
    5: "lg:-translate-y-8",
  };
  return map[i % 6] ?? "";
}

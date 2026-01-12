import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.28em] opacity-60 transition-opacity hover:opacity-100"
          >
            Armando Aguilar
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.28em] opacity-60">
            <a
              href="https://instagram.com/armandoaguilare"
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-100"
            >
              Instagram
            </a>
            <Link href="/contact" className="transition-opacity hover:opacity-100">
              Contact
            </Link>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-14">
          <p className="text-[11px] uppercase tracking-[0.32em] opacity-55">
            Work
          </p>
          <h1 className="editorial-title mt-4 text-[clamp(44px,6vw,84px)]">
            Films & Campaigns
          </h1>
          <p className="mt-6 max-w-2xl opacity-60">
            Sports marketing films, social-first edits, and run culture stories —
            built for replay.
          </p>
        </div>

        {/* A24-ish grid */}
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article key={p.slug} className={tileOffset(i)}>
              <Link href={`/work/${p.slug}`} className="group block">
                <div className="relative">
                  {/* Poster image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
                    <Image
                      src={p.coverSrc}
                      alt={`${p.title} cover frame`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Minimal meta */}
                  <div className="mt-6">
                    <p className="text-[11px] uppercase tracking-[0.28em] opacity-50">
                      {p.category} • {p.year}
                    </p>

                    <h2 className="editorial-title mt-3 text-3xl">{p.title}</h2>

                    {p.role ? (
                      <p className="mt-3 text-sm opacity-60">{p.role}</p>
                    ) : null}

                    <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] opacity-55">
                      <span className="h-px w-10 bg-current/15" />
                      <span className="transition-opacity group-hover:opacity-100">
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

/**
 * Offsets mimic the “curated wall” feel (not a uniform catalog).
 * Subtle, responsive-safe.
 */
function tileOffset(i: number) {
  // Only offset on large screens so mobile stays clean.
  const map: Record<number, string> = {
    1: "lg:translate-y-10",
    2: "lg:-translate-y-4",
    4: "lg:translate-y-6",
    5: "lg:-translate-y-8",
  };
  return map[i % 6] ?? "";
}

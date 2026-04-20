// app/about/page.tsx
import Link from "next/link";
import { LifePhotosGrid } from "@/components/about/LifePhotosGrid";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      {/* TOP */}
      <section className="border-t border-[color:var(--page-border)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
            About
          </p>

          {/* Bio - Centered */}
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="editorial-title text-[clamp(44px,6vw,72px)] leading-[0.92] tracking-[-0.05em]">
              Cinematic work
              <br />
              thoughtfully made.
            </h1>

            <div className="mt-10 border-t border-[color:var(--page-border)] pt-8">
              <p className="text-base leading-relaxed text-[color:var(--page-muted)] sm:text-lg">
                Born in Mexico, raised between two languages.
              </p>

              <p className="mt-6 text-base leading-relaxed text-[color:var(--page-muted)] sm:text-lg">
                Found my voice through a camera.
              </p>

              <p className="mt-3 text-base leading-relaxed text-[color:var(--page-muted)] sm:text-lg">
                Lead producer for Aztec Men&apos;s Basketball + freelance filmmaker
                creating high-end, cinematic visuals.
              </p>

              <p className="mt-3 text-base leading-relaxed text-[color:var(--page-muted)] sm:text-lg">
                Film major, based in San Diego.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/work"
                  className="rounded-full border border-[color:var(--page-border)] bg-[color:var(--page-card)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-fg)] transition-colors hover:bg-transparent"
                >
                  View work
                </Link>

                <a
                  href="/contact"
                  className="rounded-full border border-[color:var(--page-border)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)] transition-colors hover:text-[color:var(--page-fg)]"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Contact Sheet Grid - Full Width */}
          <div className="mt-16">
            <LifePhotosGrid />
          </div>
        </div>
      </section>
    </main>
  );
}

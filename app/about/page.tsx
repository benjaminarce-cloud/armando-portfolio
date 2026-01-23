// app/about/page.tsx
import Image from "next/image";
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
              Films that feel
              <br />
              like opening shots.
            </h1>

            <div className="mt-10 border-t border-[color:var(--page-border)] pt-8">
              <p className="text-base leading-relaxed text-[color:var(--page-muted)] sm:text-lg">
                Born in Mexico, raised between two languages. Moved to the U.S. in 7th grade 
                and found my voice through a camera. Now lead producer for Aztec Men's Basketball 
                and SDSU Media Relations, building stories that sit somewhere between sports 
                and cinema.
              </p>

              <p className="mt-6 text-base leading-relaxed text-[color:var(--page-muted)] sm:text-lg">
                Produced work for Sports Illustrated. Film major, 4.0 GPA. Based in San Diego.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/work"
                  className="rounded-full border border-[color:var(--page-border)] bg-[color:var(--page-card)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-fg)] transition-colors hover:bg-transparent"
                >
                  View work
                </Link>

                <a
                  href="#contact"
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

      {/* SELECTED CREDITS */}
      <section className="border-t border-[color:var(--page-border)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
            Selected Credits
          </p>

          <div className="mt-10 max-w-4xl">
            <div className="space-y-6 border-t border-[color:var(--page-border)] pt-10">
              <CreditRow 
                title="Aztec Men's Basketball" 
                role="Lead Producer" 
              />
              <CreditRow 
                title="SDSU Media Relations" 
                role="Video Intern" 
              />
              <CreditRow 
                title="Sports Illustrated" 
                role="Feature Producer" 
              />
              <CreditRow 
                title="MESA Foundation" 
                role="Lead Producer" 
              />
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-3">
              <a
                href="mailto:armandirix@gmail.com"
                className="rounded-full border border-[color:var(--page-border)] bg-[color:var(--page-card)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-fg)] transition-colors hover:bg-transparent"
              >
                Email
              </a>

              <a
                href="https://www.instagram.com/armandoaguilare/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[color:var(--page-border)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)] transition-colors hover:text-[color:var(--page-fg)]"
              >
                Instagram
              </a>

              <a
                href="https://www.tiktok.com/@armandoaguilarr"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[color:var(--page-border)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)] transition-colors hover:text-[color:var(--page-fg)]"
              >
                TikTok
              </a>
            </div>

            <div className="mt-8 text-sm text-[color:var(--page-muted)]">
              Available 2–4 week lead
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CreditRow({ title, role }: { title: string; role: string }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="text-lg tracking-[-0.01em] text-[color:var(--page-fg)]">
        {title}
      </span>
      <span className="text-sm uppercase tracking-[0.24em] text-[color:var(--page-muted)]">
        {role}
      </span>
    </div>
  );
}

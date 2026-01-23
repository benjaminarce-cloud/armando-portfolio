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
      <section className="border-t border-[color:var(--page-border)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
            About
          </p>

          <div className="mt-10 grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-7">
              <h1 className="editorial-title text-[clamp(44px,6vw,86px)] leading-[0.92] tracking-[-0.05em]">
                Films that feel
                <br />
                like opening shots.
              </h1>

              <div className="mt-10 border-t border-[color:var(--page-border)] pt-8">
                <p className="max-w-2xl text-base leading-relaxed text-[color:var(--page-muted)] sm:text-lg">
                  I'm a filmmaker focused on sports, culture, and documentary
                  work—built around rhythm, texture, and restraint. I like clean
                  compositions, strong sound design, and edits that breathe.
                </p>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--page-muted)] sm:text-lg">
                  Available for short docs, campaigns, and team content. Based in
                  San Diego—open to travel.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
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

            <div className="col-span-12 lg:col-span-5">
              <LifePhotosGrid />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--page-border)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                What I do
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <div className="border-t border-[color:var(--page-border)]">
                <Row label="Directing" value="Story-first, minimal coverage." />
                <Row
                  label="Cinematography"
                  value="Texture, motion, clean frames."
                />
                <Row label="Editing" value="Rhythm, restraint, sound-led cuts." />
                <Row
                  label="Deliverables"
                  value="Short docs, recaps, campaigns, social cutdowns."
                  isLast
                />
              </div>

              <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[color:var(--page-muted)] sm:text-base">
                I'm happiest when the piece feels like a film—no template pacing,
                no forced transitions. If the story is real, the style should be
                quiet enough to let it hit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--page-border)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                Process
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <div className="grid gap-6 border-t border-[color:var(--page-border)] pt-10 sm:grid-cols-2">
                <ProcessCard
                  n="01"
                  title="Intent"
                  body="Define the feeling first. Then build shots and sound around it."
                />
                <ProcessCard
                  n="02"
                  title="Capture"
                  body="Clean coverage, strong close-ups, controlled movement."
                />
                <ProcessCard
                  n="03"
                  title="Edit"
                  body="Let moments breathe. Cut on meaning, not on habit."
                />
                <ProcessCard
                  n="04"
                  title="Finish"
                  body="Color, texture, sound—final polish that stays invisible."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-[color:var(--page-border)]"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                Contact
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <div className="border-t border-[color:var(--page-border)] pt-10">
                <h2 className="editorial-title text-[clamp(28px,3.4vw,44px)] leading-[0.98] tracking-[-0.03em]">
                  Tell me what you're making.
                </h2>

                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[color:var(--page-muted)] sm:text-base">
                  Include timeline, location, and references if you have them.
                  If you don't, a one-paragraph idea is enough.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:hello@example.com"
                    className="rounded-full border border-[color:var(--page-border)] bg-[color:var(--page-card)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-fg)] transition-colors hover:bg-transparent"
                  >
                    Email
                  </a>

                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[color:var(--page-border)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)] transition-colors hover:text-[color:var(--page-fg)]"
                  >
                    Instagram
                  </a>

                  <a
                    href="https://vimeo.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[color:var(--page-border)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)] transition-colors hover:text-[color:var(--page-fg)]"
                  >
                    Vimeo
                  </a>
                </div>

                <div className="mt-12 border-t border-[color:var(--page-border)] pt-8 text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                  <div className="flex items-center justify-between">
                    <span>Availability</span>
                    <span className="text-[color:var(--page-fg)]">
                      2–4 week lead
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Row({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={[
        "flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between",
        !isLast ? "border-b border-[color:var(--page-border)]" : "",
      ].join(" ")}
    >
      <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
        {label}
      </span>
      <span className="text-sm text-[color:var(--page-fg)] sm:text-base">
        {value}
      </span>
    </div>
  );
}

function ProcessCard({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl border border-[color:var(--page-border)] bg-[color:var(--page-card)] p-6">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
          {n}
        </span>
        <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
          Process
        </span>
      </div>
      <h3 className="mt-6 text-2xl tracking-[-0.02em]">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-[color:var(--page-muted)] sm:text-base">
        {body}
      </p>
    </div>
  );
}

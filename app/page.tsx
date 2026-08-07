import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import Wordmark from "@/components/Wordmark";
import { filmBySlug, filmSources } from "@/lib/films";
import { photos, photoUrl } from "@/lib/photos";
import { TABS } from "@/lib/tabs";

/**
 * The front page.
 *
 * It opens on the mark, runs the Byrd intro clip full width underneath it, and
 * then falls into an editorial rhythm — the reel set small and offset against
 * the index of tabs, a row of frames at mixed widths below. Nothing is the
 * same size as the thing next to it, which is the whole point.
 *
 * The intro clip is the only thing on the site that loads a video unasked, so
 * it is the only one delivered at a capped width.
 */

const ROLES = ["Videographer", "Editor", "Photographer"];

export default function Page() {
  const intro = filmBySlug("byrd-intro-clip");
  const reel = filmBySlug("reel");

  const introSrc = intro ? filmSources(intro) : null;
  const reelSrc = reel ? filmSources(reel) : null;

  // Three frames off the photo index, at deliberately unequal widths.
  const strip = [photos[2], photos[8], photos[10]];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 py-6 sm:px-8 lg:px-12">
      <PageHeader />

      <main className="flex-1">
        {/* Mark — sits straight under the header rule, no lead-in space. */}
        <section className="pt-4">
          <Wordmark hero />

          <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[color:var(--rule)] pt-4">
            {ROLES.map((role) => (
              <span key={role} className="caps-xs text-[color:var(--muted)]">
                {role}
              </span>
            ))}
            <span className="caps-xs ml-auto text-[color:var(--muted)]">
              San Diego, California
            </span>
          </div>
        </section>

        {/* Byrd intro clip, full width */}
        {intro && introSrc ? (
          <section className="mt-10 lg:mt-14">
            <Link href={`/video/${intro.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <video
                  className="h-full w-full object-cover"
                  poster={introSrc.poster}
                  src={introSrc.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-[color:var(--rule)] pt-2">
                <p className="caps">
                  {intro.subject} — {intro.title}
                </p>
                <span className="caps-xs text-[color:var(--muted)]">
                  {intro.year}
                </span>
              </div>
            </Link>
          </section>
        ) : null}

        {/* Index of tabs against the reel */}
        <section className="mt-20 grid gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-8">
          <nav className="index lg:col-span-5" aria-label="Sections">
            <p className="caps-xs border-b border-[color:var(--rule)] pb-3 text-[color:var(--muted)]">
              Index
            </p>
            <ul>
              {TABS.map((tab) => (
                <li key={tab.href} className="row">
                  <Link
                    href={tab.href}
                    className="display block border-b border-[color:var(--rule)] py-4 text-[clamp(26px,4vw,52px)] transition-opacity hover:opacity-55"
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {reel && reelSrc ? (
            <div className="lg:col-span-6 lg:col-start-7 lg:mt-16">
              <Link href={`/video/${reel.slug}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden bg-[color:var(--rule)]">
                  <Image
                    src={reelSrc.poster}
                    alt="Reel — cover frame"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-[color:var(--rule)] pt-2">
                  <p className="caps">Reel — Selected Work</p>
                  <span className="caps-xs text-[color:var(--muted)]">
                    {reel.year}
                  </span>
                </div>
              </Link>
            </div>
          ) : null}
        </section>

        {/* Frames, at unequal widths */}
        <section className="mt-20 lg:mt-32">
          <div className="flex items-baseline justify-between border-b border-[color:var(--rule)] pb-3">
            <p className="caps-xs text-[color:var(--muted)]">Frames</p>
            <Link
              href="/photo"
              className="caps-xs text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
            >
              All Photo &rarr;
            </Link>
          </div>

          <div className="index mt-8 grid grid-cols-2 items-start gap-x-6 gap-y-10 lg:grid-cols-12">
            {strip.map((photo, i) => (
              <Link
                key={photo.slug}
                href="/photo"
                className={[
                  "row block",
                  i === 0 ? "lg:col-span-5" : "",
                  i === 1 ? "lg:col-span-3 lg:mt-20" : "",
                  i === 2 ? "lg:col-span-4 lg:mt-8" : "",
                ].join(" ")}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--rule)]">
                  <Image
                    src={photoUrl(photo, 1200)}
                    alt={`${photo.title} — ${photo.shoot}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="caps-xs mt-2 text-[color:var(--muted)]">
                  {photo.shoot}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

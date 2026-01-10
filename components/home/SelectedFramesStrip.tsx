import Image from "next/image";
import Link from "next/link";
import { selectedFrames } from "@/lib/frames";

function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M16.5 7.5h.01M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4A4.8 4.8 0 0 1 16.2 21H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M12 16.3A4.3 4.3 0 1 0 12 7.7a4.3 4.3 0 0 0 0 8.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M17.2 7.1h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SelectedFramesStrip() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
              Selected
            </p>
            <h2 className="mt-3 text-2xl tracking-[-0.02em] sm:text-3xl">
              Frames & Moments
            </h2>
          </div>

          <Link
            href="/work"
            className="hidden text-[11px] uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-white md:block"
          >
            View all work
          </Link>
        </div>

        {/* Mobile: scroll deck */}
        <div className="mt-8 md:hidden">
          <div
            className="flex gap-3 overflow-x-auto pb-2 pr-6 snap-x snap-mandatory
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {selectedFrames.map((it) => (
              <div key={it.id} className="w-[78%] shrink-0 snap-start">
                <FrameCard {...it} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="mt-8 hidden gap-3 md:grid md:grid-cols-3">
          {selectedFrames.slice(0, 6).map((it) => (
            <FrameCard key={it.id} {...it} />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link
            href="/work"
            className="inline-flex text-[11px] uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-white"
          >
            View all work
          </Link>
        </div>
      </div>
    </section>
  );
}

type CardProps = (typeof selectedFrames)[number];

function FrameCard({ title, subtitle, year, imageSrc, imageAlt, href, igUrl }: CardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 80vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            priority={false}
          />

          {/* Shape light + vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_15%,rgba(255,255,255,0.10),transparent_55%)] opacity-70" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                {year}
              </p>
              <p className="mt-2 text-lg tracking-[-0.02em] text-[#F3F2EE]">
                {title}
              </p>
              <p className="mt-1 text-sm leading-snug text-white/60">
                {subtitle}
              </p>
            </div>

            {igUrl ? (
              <a
                href={igUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${title} on Instagram`}
                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full
                           bg-black/35 text-white/70 ring-1 ring-white/10 transition-colors
                           hover:bg-black/55 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <InstagramGlyph className="h-5 w-5" />
              </a>
            ) : null}
          </div>
        </div>
      </Link>

      {/* Hover edge highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-white/15" />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { selectedFrames } from "@/lib/frames";

export default function SelectedFramesStrip() {
  const featured = selectedFrames[0];
  const rest = selectedFrames.slice(1, 5);

  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
              Selected
            </p>
            <h2 className="mt-4 max-w-3xl text-[clamp(34px,4.2vw,56px)] leading-[0.95] tracking-[-0.03em]">
              Frames that feel like opening shots.
            </h2>
          </div>

          <Link
            href="/work"
            className="hidden text-[11px] uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-white md:block"
          >
            View all work
          </Link>
        </div>

        {/* Feature layout */}
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {/* BIG feature */}
          <FeatureCard
            title={featured.title}
            subtitle={featured.subtitle}
            year={featured.year}
            imageSrc={featured.imageSrc}
            imageAlt={featured.imageAlt}
            href={featured.href}
            className="lg:col-span-8"
            aspect="aspect-[16/10] sm:aspect-[16/9]"
          />

          {/* Supporting frames */}
          <div className="grid gap-4 lg:col-span-4">
            {rest.map((it) => (
              <SupportCard
                key={it.id}
                title={it.title}
                year={it.year}
                imageSrc={it.imageSrc}
                imageAlt={it.imageAlt}
                href={it.href}
              />
            ))}
          </div>
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

function FeatureCard({
  title,
  subtitle,
  year,
  imageSrc,
  imageAlt,
  href,
  className = "",
  aspect = "aspect-[16/9]",
}: {
  title: string;
  subtitle: string;
  year: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-black ${className}`}
    >
      <div className={`relative ${aspect}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />

        {/* cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_50%_10%,rgba(255,255,255,0.10),transparent_55%)] opacity-70" />

        {/* bottom info */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
            {year}
          </p>

          <p className="mt-3 text-[clamp(26px,3.1vw,44px)] leading-[0.95] tracking-[-0.03em] text-[#F3F2EE]">
            {title}
          </p>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            {subtitle}
          </p>

          <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/55">
            <span className="h-px w-10 bg-white/15" />
            <span className="transition-colors group-hover:text-white">
              Watch project
            </span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 transition duration-700 group-hover:ring-white/15" />
    </Link>
  );
}

function SupportCard({
  title,
  year,
  imageSrc,
  imageAlt,
  href,
}: {
  title: string;
  year: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
          {year}
        </p>
        <p className="mt-2 text-lg tracking-[-0.02em] text-[#F3F2EE]">
          {title}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition duration-700 group-hover:ring-white/15" />
    </Link>
  );
}

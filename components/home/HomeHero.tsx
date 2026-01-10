import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#0A0A0C] text-[#F3F2EE]">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/img/hero-poster.jpg"
        >
          <source
            src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || ""}
            type="video/mp4"
          />
        </video>

        {/* Dark cinematic wash */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
      </div>

      {/* Top nav */}
      <header className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Left: location + descriptor */}
            <div className="flex items-baseline gap-3">
              <span className="text-[11px] uppercase tracking-[0.32em] text-white/55">
                San Diego
              </span>
              <span className="text-[11px] uppercase tracking-[0.32em] text-white/35">
                Film Student
              </span>
            </div>

            {/* Right: nav only */}
            <nav className="flex items-center gap-6">
              <Link
                href="/work"
                className="text-[11px] uppercase tracking-[0.32em] text-white/55 hover:text-white"
              >
                Work
              </Link>
              <Link
                href="/about"
                className="text-[11px] uppercase tracking-[0.32em] text-white/55 hover:text-white"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-[11px] uppercase tracking-[0.32em] text-white/55 hover:text-white"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero copy */}
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-32">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
            Sports film • Social-first campaigns • Run culture
          </p>

          {/* Headline */}
          <h1 className="mt-6 text-[clamp(52px,7vw,92px)] leading-[0.92] tracking-[-0.04em]">
            Armando Aguilar
          </h1>

          {/* Supporting line */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Cinematic sports stories for teams, brands, and athletes — built for
            reels, drops, and game-day energy.
          </p>

          {/* Minimal cue (no buttons) */}
          <div className="mt-14">
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-white/40">
              <span className="h-px w-10 bg-white/15" />
              <span>Selected frames below</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

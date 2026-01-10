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

        {/* Keep the image vibrant:
            1) remove the full-screen dark wash
            2) only add a localized bottom-left gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
      </div>

      {/* Foreground layout */}
      <div className="relative z-10 flex min-h-[92vh] flex-col">
        {/* Top nav */}
        <header>
          <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] uppercase tracking-[0.32em] text-white/70">
                  San Diego
                </span>
                <span className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                  Film Student
                </span>
              </div>

              <nav className="flex items-center gap-6 font-[var(--font-sans)]">
                <Link
                  href="/work"
                  className="text-[11px] uppercase tracking-[0.32em] text-white/70 hover:text-white"
                >
                  Work
                </Link>
                <Link
                  href="/about"
                  className="text-[11px] uppercase tracking-[0.32em] text-white/70 hover:text-white"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-[11px] uppercase tracking-[0.32em] text-white/70 hover:text-white"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Bottom-left title card */}
        <div className="mt-auto">
          <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-14">
            <h1
              className="
                font-[var(--font-serif)]
                text-[clamp(64px,8.5vw,120px)]
                leading-[0.86]
                tracking-[-0.03em]
                font-semibold
                text-white
                drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]
              "
            >
              Armando Aguilar
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

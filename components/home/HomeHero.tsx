export default function HomeHero() {
  return (
    
    <section
      data-hero="true"
      className="relative min-h-[92vh] overflow-hidden bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="hero-video h-full w-full object-cover"
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

        <div className="hero-lids" aria-hidden="true" />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Foreground */}
      <div className="relative z-10 flex min-h-[92vh] flex-col">
        {/* leave room for fixed header */}
        <div className="h-20 sm:h-24" />

        {/* Bottom-left title card */}
        <div className="mt-auto">
          <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
            <div className="relative inline-block">
              <div
                aria-hidden="true"
                className="
                  absolute -top-[0.06em] left-[0.02em]
                  font-[var(--font-serif)]
                  text-[clamp(56px,8.2vw,124px)]
                  leading-[0.82]
                  tracking-[-0.02em]
                  text-white/22
                  select-none pointer-events-none whitespace-nowrap
                "
              >
                Armando Aguilar
              </div>

              <h1
                className="
                  relative
                  font-[var(--font-serif)]
                  text-[clamp(56px,8.2vw,124px)]
                  leading-[0.82]
                  tracking-[-0.02em]
                  text-white
                  drop-shadow-[0_18px_60px_rgba(0,0,0,0.65)]
                  whitespace-nowrap
                  pb-[0.08em]
                "
              >
                Armando Aguilar
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

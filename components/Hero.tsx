"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The full-screen opener: one reel, edge to edge, before the wall.
 *
 * `100svh` rather than `100vh` — on mobile Safari `vh` is the viewport with the
 * browser chrome *hidden*, so a `100vh` hero is taller than the screen on
 * arrival and the first thing a visitor does is scroll past a crop of it.
 * `svh` is the small viewport, chrome showing, which is what "covers the
 * screen" actually means on a phone.
 *
 * Muted is not a style choice: autoplay with sound is blocked in every browser,
 * and an unmuted <video autoplay> simply never starts. The file has no audio
 * track at all (see SILENT in scripts/transcode.sh), so there is nothing to
 * unmute and no control to offer.
 *
 * The poster carries the frame until the video can paint, so the hero is never
 * a white screen on a cold load. If playback is refused outright the poster is
 * what stays, which is a still hero rather than a broken one.
 */
export default function Hero({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Muted autoplay is allowed everywhere, but a rejected promise is still
    // possible (low power mode, reduced data). Swallow it and keep the poster.
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[color:var(--bg)]">
      <video
        ref={ref}
        src={src}
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Showreel"
      />

      {/* A quiet cue that there is a page under this, since a full-bleed video
          with no chrome gives no other sign. It fades out once you move. */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 bottom-8 flex justify-center transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        {/* White with the type in ink, like everything else — the footage
            underneath swings from a dark arena to a bright course, so the cue
            cannot rely on the frame behind it for contrast. */}
        <span className="caps-xs rounded-full bg-[color:var(--bg)] px-3 py-1.5 text-[color:var(--fg)]">
          Scroll
        </span>
      </div>
    </section>
  );
}

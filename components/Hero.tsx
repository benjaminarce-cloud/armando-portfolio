"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The opener: one reel, edge to edge, above the wall.
 *
 * It stops short of the full screen on purpose. A hero that fills the viewport
 * exactly gives a visitor no reason to believe there is anything under it, and
 * people were missing the rest of the site — so a band of white is left showing
 * at the bottom. It is the page itself peeking through rather than a cue drawn
 * on top, which is why the arrow that used to sit here is gone.
 *
 * `100svh` rather than `100vh` — on mobile Safari `vh` is the viewport with the
 * browser chrome *hidden*, so a `100vh` hero is taller than the screen on
 * arrival and the strip of white would be scrolled off before anyone saw it.
 *
 * Sound starts off and has to stay that way: autoplay with audio is blocked in
 * every browser, and an unmuted `<video autoplay>` simply never starts. The
 * control is the visitor's gesture, which is exactly what the browser wants
 * before it will let sound through.
 */

const BAND = "4.5rem";

export default function Hero({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Set muted on the element itself, not just via the prop. React assigns
    // `muted` as a DOM property and does not reflect it to the attribute, and
    // the browser's autoplay check reads the attribute — so with an audio
    // track present the play() below is refused and the hero sits on its
    // poster. It worked right up until the reel grew a sound toggle and got
    // its audio back, which is exactly what makes this easy to miss.
    video.muted = true;

    // Muted autoplay is allowed everywhere, but a rejected promise is still
    // possible (low power mode, reduced data). Swallow it and keep the poster.
    video.play().catch(() => {});
  }, []);

  const toggle = async () => {
    const video = ref.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    if (nextMuted) return;

    // Turning sound on can cost you the playback: a browser that does not
    // count this as a user gesture will pause rather than let audio through,
    // and a frozen hero is a worse outcome than a silent one. If it will not
    // play with sound, put it back the way it was.
    try {
      await video.play();
    } catch {
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[color:var(--bg)]"
      style={{ height: `calc(100svh - ${BAND})` }}
    >
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

      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--bg)] text-[color:var(--fg)] transition-opacity hover:opacity-70 sm:bottom-6 sm:right-6"
      >
        <SoundIcon muted={muted} />
      </button>
    </section>
  );
}

/**
 * A speaker, with the waves swapped for a cross when it is off. Drawn rather
 * than pulled from a font so it sits on the same hairline weight as the rules
 * everywhere else.
 */
function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9.5h3.2L11.5 6v12L7.2 14.5H4z" fill="currentColor" stroke="none" />
      {muted ? (
        <>
          <path d="M15.5 9.5l5 5" />
          <path d="M20.5 9.5l-5 5" />
        </>
      ) : (
        <>
          <path d="M15 9.2a4 4 0 0 1 0 5.6" />
          <path d="M17.8 6.9a7.5 7.5 0 0 1 0 10.2" />
        </>
      )}
    </svg>
  );
}

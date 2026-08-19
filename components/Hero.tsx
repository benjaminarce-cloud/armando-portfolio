"use client";

import { useEffect, useRef, useState } from "react";

import { RATIO_CLASS, type Ratio } from "@/lib/clips";

/**
 * The opener: the reel at its own shape, with the mark over it.
 *
 * The reel is never cropped. It used to be `object-cover`, which filled the
 * screen by scaling the 4:3 master until it covered a much wider box and threw
 * the top and bottom away — on a phone that cost about 62% of every frame's
 * width. `object-contain` shows the frame that was cut and lets the page show
 * either side of it instead, which is the trade he asked for: leave the format
 * alone, even if that means bars.
 *
 * The surround is the page's own white rather than black. It is the one place
 * a dark panel would have been defensible, but a black band here would be the
 * only black surface on the site and would read as a player chrome rather than
 * as part of the page.
 *
 * On a phone the section is the reel's shape exactly, so there is nothing
 * either side and the bars never appear. Above `sm` it is capped to the
 * viewport so the wall below stays reachable in one scroll.
 *
 * The hero stops short of the full screen on purpose: a hero that fills the
 * viewport exactly gives a visitor no reason to believe there is anything
 * under it, and people were missing the rest of the site. The band of page
 * left showing at the bottom is that cue.
 *
 * `100svh` rather than `100vh` — on mobile Safari `vh` is the viewport with the
 * browser chrome *hidden*, so a `100vh` hero is taller than the screen on
 * arrival and the strip would be scrolled off before anyone saw it.
 *
 * Sound starts off and has to stay that way: autoplay with audio is blocked in
 * every browser, and an unmuted `<video autoplay>` simply never starts.
 */

/**
 * Whether to offer the sound control.
 *
 * Off, because the reel we were sent has no sound to offer. Its audio track is
 * not missing — INTROREELB.mov carries a real AAC stereo track at 319 kb/s that
 * measures -91.0 dB both mean and peak, which is the floor: digital silence end
 * to end. A master from the same drop measures -12.2 dB mean and peaks at 0.0,
 * and comes through the transcode intact, so the pipeline is not eating it. The
 * reel was exported with the audio disabled.
 *
 * Everything below still works; a control that does nothing when clicked is
 * just worse than no control. Flip this back to `true` the moment a reel with
 * a real mix lands and gets re-encoded.
 */
const HAS_SOUND = false;

export default function Hero({
  src,
  poster,
  /** The reel's true shape, so nothing has to be cropped to hold it. */
  ratio,
}: {
  src: string;
  poster: string;
  ratio: Ratio;
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
    // poster.
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
    // and a frozen hero is a worse outcome than a silent one.
    try {
      await video.play();
    } catch {
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
    }
  };

  // The 4.5rem is the band of page left showing under the tall hero. It is
  // written out rather than held in a const because Tailwind reads arbitrary
  // values straight out of the source and cannot see one assembled at runtime.
  return (
    <section
      className={`relative w-full overflow-hidden bg-[color:var(--bg)] ${RATIO_CLASS[ratio]} sm:aspect-auto sm:h-[calc(100svh-4.5rem)]`}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        className="absolute inset-0 h-full w-full object-contain"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Showreel"
      />

      {/* The mark, centred on the reel — the brand over the work rather than
          a caption under it. The reel runs from a black arena to daylight, so
          the wordmark cannot rely on the footage staying dark: it carries its
          own soft scrim, sized to the type rather than drawn across the frame,
          which keeps it legible on a bright cut without becoming a panel. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="px-12 py-10 [background:radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.34)_45%,rgba(0,0,0,0.12)_70%,transparent_85%)]">
          <span className="wordmark block text-center text-[clamp(34px,8vw,104px)] leading-[0.95] text-white drop-shadow-[0_2px_22px_rgba(0,0,0,0.55)]">
            Mando
          </span>
          <span className="byline mt-3 block text-center text-[10px] text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)] sm:text-[12px]">
            Armando Aguilar
          </span>
        </div>
      </div>

      {HAS_SOUND ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!muted}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--bg)] text-[color:var(--fg)] transition-opacity hover:opacity-70 sm:bottom-6 sm:right-6"
        >
          <SoundIcon muted={muted} />
        </button>
      ) : null}
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

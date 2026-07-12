"use client";

import { useEffect, useRef, useState } from "react";

const FPS = 24;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * The frame around every page: AF corner brackets, a running 24fps
 * timecode, a REC light, and a battery that actually drains.
 */
export default function MonitorChrome() {
  const tcRef = useRef<HTMLSpanElement>(null);
  const [battery, setBattery] = useState(76);

  // Timecode runs off rAF and writes straight to the DOM — re-rendering
  // React 24 times a second to paint eight characters would be silly.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const start = performance.now();
    let raf = 0;

    const tick = () => {
      const el = tcRef.current;
      if (el) {
        const frames = Math.floor((performance.now() - start) / (1000 / FPS));
        const seconds = Math.floor(frames / FPS);
        const minutes = Math.floor(seconds / 60);
        el.textContent = [
          pad(Math.floor(minutes / 60)),
          pad(minutes % 60),
          pad(seconds % 60),
          pad(frames % FPS),
        ].join(":");
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const glitch = setInterval(() => {
      const el = tcRef.current;
      if (!el) return;
      el.classList.remove("tc-glitch");
      void el.offsetWidth;
      el.classList.add("tc-glitch");
    }, 4200);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(glitch);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setBattery((b) => (b <= 20 ? 76 : b - 1));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="vignette" />

      {/* Scrims: content scrolls under the HUD, so darken behind it — the
          readouts have to stay legible over a moving image. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[35] h-[195px] bg-gradient-to-b from-[color:var(--bg)] via-[color:var(--bg)]/85 to-transparent sm:h-[150px]" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[35] h-[80px] bg-gradient-to-t from-[color:var(--bg)] to-transparent" />

      <span className="af af-tl" />
      <span className="af af-tr" />
      <span className="af af-bl" />
      <span className="af af-br" />

      {/* Timecode */}
      <span
        ref={tcRef}
        className="hud-num fixed left-14 top-[22px] z-40 text-[11px] tracking-[0.06em] text-white/80"
      >
        00:00:00:00
      </span>

      {/* REC + battery */}
      <div className="fixed right-14 top-[22px] z-40 flex flex-col items-end gap-2">
        <span className="hud flex items-center gap-[7px] text-[10px] tracking-[0.2em] text-[color:var(--rec)]">
          <span className="rec-dot" />
          Rec
        </span>

        <span className="hud-num flex items-center gap-[6px] text-[10px] text-[color:var(--dim)]">
          <span className="relative block h-[9px] w-[20px] border border-[color:var(--dim)] after:absolute after:-right-[3px] after:top-[2px] after:bottom-[2px] after:w-[2px] after:bg-[color:var(--dim)]">
            <span
              className="absolute bottom-[1px] left-[1px] top-[1px] bg-[color:var(--dim)] transition-[width] duration-700 ease-out"
              style={{ width: `${battery}%` }}
            />
          </span>
          {battery}%
        </span>
      </div>

      {/* Standing camera-report info */}
      <span className="hud fixed bottom-[26px] left-[52px] z-40 text-white/75">
        San Diego, CA
      </span>
      <span className="hud fixed bottom-[26px] right-[52px] z-40 text-white/75">
        2026
      </span>
    </>
  );
}

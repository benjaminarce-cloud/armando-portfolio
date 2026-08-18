"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A still that becomes a muted loop — either under the cursor, or on its own.
 *
 * `hover` is the cheap mode: nothing is requested until a pointer lands on the
 * tile, and on leave the src is dropped and the element unmounted so the buffer
 * is released rather than left holding memory. An earlier build put an
 * `autoPlay` <video> on every tile unconditionally, which started thirty
 * simultaneous downloads and made all of them stutter.
 *
 * `auto` is what the index asks for now: every loop playing at once, no
 * interaction. That is the same trap, so it is bounded by only ever playing
 * what is actually on screen. An IntersectionObserver mounts the <video> when
 * the tile comes within a screen of the viewport and unmounts it once it is
 * well past, so the count in flight tracks the window rather than the length of
 * the page. Scrolling releases as much as it starts.
 *
 * Touch devices get no loop in `hover` mode — there is no hover to justify the
 * bytes — but they do in `auto`, because there it is the design rather than a
 * response to the pointer.
 */
export default function TilePreview({
  poster,
  preview,
  alt,
  sizes,
  mode = "hover",
  priority = false,
}: {
  poster: string;
  preview?: string;
  alt: string;
  sizes: string;
  mode?: "hover" | "auto";
  priority?: boolean;
}) {
  const [armed, setArmed] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(hover: hover)").matches;

  const release = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      // Drop the source before unmounting so the fetch is abandoned and the
      // decoded buffer is freed straight away.
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    setArmed(false);
  }, []);

  const enter = useCallback(() => {
    if (mode === "hover" && preview && canHover()) setArmed(true);
  }, [mode, preview]);

  const leave = useCallback(() => {
    if (mode === "hover") release();
  }, [mode, release]);

  useEffect(() => {
    if (mode !== "auto" || !preview) return;

    const host = hostRef.current;
    if (!host) return;

    // No IntersectionObserver means no loop and the poster stands in. Every
    // browser this ships to has had it since 2019, and degrading to a still is
    // a far better failure than mounting every video on the page at once.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setArmed(true);
        else release();
      },
      // Half a screen of margin either way: enough that a tile is already
      // playing by the time it scrolls in, and that it does not flicker off at
      // the boundary, without a phone opening a dozen videos it never shows.
      { rootMargin: "50% 0px" }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [mode, preview, release]);

  return (
    <div
      ref={hostRef}
      className="relative h-full w-full overflow-hidden bg-[color:var(--bg)]"
      onPointerEnter={enter}
      onPointerLeave={leave}
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
        priority={priority}
      />

      {armed && preview ? (
        <video
          ref={videoRef}
          src={preview}
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : null}
    </div>
  );
}

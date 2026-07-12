"use client";

import { useEffect, useRef } from "react";

/**
 * You only reach a film by clicking it, so it starts itself: play, then go
 * fullscreen. Both can be refused by the browser (sound-on playback and
 * fullscreen each need a user gesture, and the gesture may not survive the
 * navigation), so every step falls back instead of throwing — worst case the
 * film sits there playing inline with its controls.
 */
export default function FilmPlayer({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let cancelled = false;

    const goFullscreen = () => {
      // iOS Safari only fullscreens the video element itself.
      const webkitEnter = (
        video as HTMLVideoElement & { webkitEnterFullscreen?: () => void }
      ).webkitEnterFullscreen;

      if (video.requestFullscreen) {
        video.requestFullscreen().catch(() => {});
      } else if (webkitEnter) {
        try {
          webkitEnter.call(video);
        } catch {
          /* stays inline */
        }
      }
    };

    const start = async () => {
      if (cancelled) return;

      try {
        await video.play();
      } catch {
        // Autoplay with sound was blocked — retry muted, which is always allowed.
        video.muted = true;
        try {
          await video.play();
        } catch {
          return; // Can't play at all; leave the poster and controls.
        }
      }

      if (!cancelled) goFullscreen();
    };

    if (video.readyState >= 2) {
      start();
    } else {
      video.addEventListener("loadedmetadata", start, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", start);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full"
      controls
      playsInline
      preload="metadata"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

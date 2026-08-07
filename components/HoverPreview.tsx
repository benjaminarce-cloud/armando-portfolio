"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

/**
 * A still that becomes a muted loop under the cursor.
 *
 * The previous build put an `autoPlay` <video> on every tile, so opening the
 * index started ~30 simultaneous downloads and every one of them stuttered —
 * that is the choppiness, not the connection. Here nothing is requested until
 * a pointer actually lands on a tile: the <video> is only rendered on enter,
 * and on leave its src is dropped and the element unmounted so the buffer is
 * released rather than left holding memory.
 *
 * Touch devices never load a preview at all — there is no hover to justify the
 * bytes, and a tap goes straight to the film.
 */
export default function HoverPreview({
  poster,
  preview,
  alt,
  sizes,
  priority = false,
}: {
  poster: string;
  preview?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const [armed, setArmed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(hover: hover)").matches;

  const enter = useCallback(() => {
    if (preview && canHover()) setArmed(true);
  }, [preview]);

  const leave = useCallback(() => {
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

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[color:var(--rule)]"
      onPointerEnter={enter}
      onPointerLeave={leave}
    >
      {/* Below lg the tall tiles are reshaped to a horizontal 4:3 (see
          TILE_RATIO_CLASS), so the crop is biased above centre — subjects stand
          in the upper half of a vertical frame and a centred crop takes their
          heads off. At lg the tile matches its source and this is a no-op. */}
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-[50%_28%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] lg:object-center"
        priority={priority}
      />

      {armed && preview ? (
        <video
          ref={videoRef}
          src={preview}
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%] lg:object-center"
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

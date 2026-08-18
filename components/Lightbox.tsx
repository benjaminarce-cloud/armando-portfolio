"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { RATIO_CLASS } from "@/lib/clips";
import { PHOTO_RATIO_CLASS, type MosaicItem } from "@/lib/projects";

/**
 * One piece, opened in place.
 *
 * /video and /photo stopped showing collections, but clicking a tile still
 * opened the shoot behind it, so a single frame was two clicks from being seen
 * and the collection was back on screen either way. This is the missing half:
 * the frame you clicked, at size, over the page — and a way through to the
 * shoot for anyone who wants it.
 *
 * White rather than the usual black scrim, because the site is white and a
 * black overlay would be the one dark surface on it.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onMove,
}: {
  items: MosaicItem[];
  index: number;
  onClose: () => void;
  onMove: (next: number) => void;
}) {
  const item = items[index];

  const prev = useCallback(
    () => onMove((index - 1 + items.length) % items.length),
    [index, items.length, onMove]
  );
  const next = useCallback(
    () => onMove((index + 1) % items.length),
    [index, items.length, onMove]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // The page behind must not scroll under the overlay.
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  if (!item?.full) return null;

  const shapeClass =
    item.full.kind === "video"
      ? RATIO_CLASS[item.ratio as keyof typeof RATIO_CLASS]
      : PHOTO_RATIO_CLASS[item.ratio as keyof typeof PHOTO_RATIO_CLASS];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex flex-col bg-[color:var(--bg)]"
    >
      <div className="frame flex shrink-0 items-baseline justify-between gap-6 py-4">
        <div className="min-w-0">
          <p className="caps truncate">{item.title}</p>
          {item.subject ? (
            <p className="caps-xs truncate text-[color:var(--muted)]">
              {item.subject}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-baseline gap-5">
          <span className="caps-xs tabular-nums text-[color:var(--muted)]">
            {index + 1} / {items.length}
          </span>
          <Link
            href={item.href}
            className="caps-xs text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            The shoot &rarr;
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            Close
          </button>
        </div>
      </div>

      {/* The piece gets whatever height is left, and is fitted into it rather
          than cropped — this is the one place on the site showing the frame
          whole rather than as a tile. */}
      <div className="frame flex min-h-0 flex-1 items-center justify-center pb-4">
        <div className={`relative max-h-full ${shapeClass ?? ""} max-w-full`}>
          {item.full.kind === "video" ? (
            <video
              key={item.key}
              src={item.full.src}
              poster={item.full.poster}
              className="h-full max-h-full w-full object-contain"
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              key={item.key}
              src={item.full.src}
              alt={item.title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          )}
        </div>
      </div>

      <div className="frame flex shrink-0 items-center justify-between py-4">
        <button
          type="button"
          onClick={prev}
          className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
        >
          &larr; Prev
        </button>
        <button
          type="button"
          onClick={next}
          className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

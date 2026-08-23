"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { type MosaicItem } from "@/lib/projects";

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

  // Everything else from the same shoot, with the index it sits at in `items`
  // so a click is a move rather than a lookup. Keyed on the project the tile
  // was built from, not the URL, so a featured tile and a plain one agree.
  const siblings = items
    .map((candidate, at) => ({ item: candidate, index: at }))
    .filter(
      ({ item: candidate, index: at }) =>
        at !== index &&
        candidate.project !== undefined &&
        candidate.project === item?.project
    );

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
          whole rather than as a tile.

          It fills the space and lets `object-contain` do the letterboxing,
          instead of sizing a box to the piece's aspect ratio. That box used to
          wrap an `<Image fill>`, which is absolutely positioned and so left
          nothing in flow to give the box a width: it resolved to `auto`, came
          out 0px wide, and the aspect ratio then made it 0px tall. The photo
          was loading correctly and rendering at 0×0, so opening a frame looked
          like a click that did nothing. Video escaped it only because a
          `<video>` element carries its own intrinsic size. */}
      <div className="frame relative min-h-0 flex-1 pb-4">
        {item.full.kind === "video" ? (
          <video
            key={item.key}
            src={item.full.src}
            poster={item.full.poster}
            className="absolute inset-0 h-full w-full object-contain"
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

      {/* The rest of the shoot, under the piece. This replaces the link out to
          the project page: the point of clicking a single frame was never to
          be sent somewhere else, and the sibling pieces are already in `items`
          — /video and /photo list every piece — so moving between them is a
          change of index rather than a navigation. A piece whose shoot holds
          nothing else shows no strip at all. */}
      {siblings.length > 0 ? (
        <div className="frame shrink-0 border-t border-[color:var(--rule)] py-3">
          <p className="caps-xs mb-2 text-[color:var(--muted)]">
            {siblings.length + 1} in this shoot
          </p>
          <ul className="flex gap-2 overflow-x-auto pb-1">
            {siblings.map(({ item: sib, index: at }) => (
              <li key={sib.key} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onMove(at)}
                  aria-label={sib.title}
                  className="relative block h-14 w-20 overflow-hidden opacity-60 transition-opacity hover:opacity-100 sm:h-16 sm:w-24"
                >
                  <Image
                    src={sib.poster}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

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

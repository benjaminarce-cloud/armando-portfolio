"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TilePreview from "@/components/TilePreview";
import {
  packColumns,
  TILE_RATIO_CLASS,
  type MosaicItem,
} from "@/lib/projects";

/**
 * The index, as one dense block of tiles.
 *
 * Tiles keep their own shape and butt straight against each other with no gap
 * and no caption — a wall of work where a 9:16 next to a 16:9 next to a square
 * does the composing, so nothing is sized by hand.
 *
 * The block is a centred rectangle rather than a full-bleed spread. That is the
 * part CSS multi-column could not do: it balances by splitting a flow, a tile
 * cannot be split, so one column always ended short and the bottom edge came
 * out stepped. Columns are packed here instead — each tile goes to whichever
 * column is currently shortest, measured in known aspect ratios — which lands
 * the columns level to within one tile and gives the block a clean edge on all
 * four sides.
 *
 * Because the packing depends on how many columns there are, and that is a
 * media query, the arrangement is computed on the client after mount. The
 * server renders the widest packing so there is real markup in the HTML; a
 * narrow screen re-deals once on load.
 */

const BREAKPOINTS: [minWidth: number, columns: number][] = [
  [1400, 6],
  [1024, 5],
  [640, 3],
  [0, 2],
];

const WIDEST = BREAKPOINTS[0][1];

const columnsFor = (width: number) =>
  BREAKPOINTS.find(([min]) => width >= min)?.[1] ?? WIDEST;

export default function Mosaic({
  items,
  /** Play every loop on arrival instead of waiting for a cursor. */
  autoplay = false,
}: {
  items: MosaicItem[];
  autoplay?: boolean;
}) {
  const [columns, setColumns] = useState(WIDEST);

  useEffect(() => {
    const measure = () => setColumns(columnsFor(window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const packed = packColumns(items, columns);

  return (
    <div className="mosaic-frame">
      <div className="mosaic">
        {packed.map((column, i) => (
          <div key={i} className="mosaic-col">
            {column.map((item, row) => (
              <Tile
                key={item.key}
                item={item}
                autoplay={autoplay}
                // The top tile of every column — the first thing on screen.
                priority={row === 0}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Tile({
  item,
  autoplay,
  priority,
}: {
  item: MosaicItem;
  autoplay: boolean;
  priority: boolean;
}) {
  return (
    <Link href={item.href} className="group relative block overflow-hidden">
      <div className={TILE_RATIO_CLASS[item.ratio]}>
        <TilePreview
          poster={item.poster}
          preview={item.preview}
          alt={`${item.title}${item.subject ? ` — ${item.subject}` : ""}`}
          mode={autoplay ? "auto" : "hover"}
          // One column wide, and the count steps 2 / 3 / 5 / 6.
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1400px) 20vw, 17vw"
          priority={priority}
        />
      </div>

      {/* The wall is silent until you point at it. The label is the only thing
          that says what a tile is, so it carries its own scrim rather than
          relying on whatever happens to be behind it — and the scrim is white
          like the rest of the site, with the type in ink, rather than the dark
          panel that would otherwise be the one black surface on the page. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--bg)] via-[color:var(--bg)]/85 to-transparent p-3 pt-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <p className="caps text-[color:var(--fg)]">{item.title}</p>
        {item.subject ? (
          <p className="caps-xs mt-0.5 text-[color:var(--muted)]">{item.subject}</p>
        ) : null}
      </div>
    </Link>
  );
}

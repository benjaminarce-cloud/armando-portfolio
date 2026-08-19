"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The top of every page: the wordmark, and the links into the sections.
 *
 * Two arrangements, and the index is the reason there are two.
 *
 * `page` is the plain one and the one the site had before the reel arrived:
 * the wordmark centred with air around it, the links flush left under it, the
 * work under those.
 *
 * `index` is the same thing at desktop width — because the reel is a phone-only
 * opener now — and something different on a phone, where the reel *is* there
 * and already carries the wordmark on top of it. So on a phone the wordmark
 * here would be the second one on screen: it is dropped, and the links move to
 * the middle and tuck up under the reel, where they double as the hint that
 * the page keeps going. Everything switches at `sm` on a media query alone, so
 * the markup is the same server-side and there is nothing to hydrate.
 */

const FILTERS = [
  { label: "All", href: "/" },
  { label: "Video", href: "/video" },
  { label: "Photo", href: "/photo" },
  { label: "Me", href: "/me" },
];

export default function SiteMark({
  filters = true,
  variant = "page",
}: {
  filters?: boolean;
  variant?: "page" | "index";
}) {
  const pathname = usePathname();
  const index = variant === "index";

  return (
    <header
      className={
        index
          ? // Tight to the reel on a phone; the usual air once the reel is gone.
            "frame pt-4 sm:pt-10 lg:pt-14"
          : "frame pt-10 lg:pt-14"
      }
    >
      <Link
        href="/"
        aria-label="Mando — Armando Aguilar, home"
        className={[
          "mx-auto w-fit text-center transition-opacity hover:opacity-55",
          // On the index below `sm` the reel is carrying the mark already.
          index ? "hidden sm:block" : "block",
        ].join(" ")}
      >
        <span className="wordmark block text-[22px] sm:text-[26px]">Mando</span>
        <span className="byline mt-1 block text-[color:var(--muted)]">
          Armando Aguilar
        </span>
      </Link>

      {filters ? (
        <nav
          aria-label="Sections"
          // The gap clears the wordmark. Where the wordmark is not there — the
          // index on a phone — it would be a hole instead.
          className={index ? "mt-0 sm:mt-14 lg:mt-20" : "mt-14 lg:mt-20"}
        >
          {/* Flush left, which is where they sit under a centred wordmark.
              The exception is the index on a phone: no wordmark above them and
              a centred mark on the reel, so centred is what lines up. */}
          <ul
            className={[
              "flex items-baseline gap-5 sm:gap-6",
              index ? "justify-center sm:justify-start" : "",
            ].join(" ")}
          >
            {FILTERS.map((filter) => {
              const active =
                filter.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(filter.href);

              return (
                <li key={filter.href}>
                  <Link
                    href={filter.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "caps-xs transition-colors",
                      active
                        ? "u text-[color:var(--fg)]"
                        : "text-[color:var(--muted)] hover:text-[color:var(--fg)]",
                    ].join(" ")}
                  >
                    {filter.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

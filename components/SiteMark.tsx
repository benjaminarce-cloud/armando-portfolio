"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The top of every page: the mark, small and centred, with a lot of air under
 * it, then the filters set flush left just above the mosaic.
 *
 * The old header ran a nav bar with a rule under it and the wordmark at 190px
 * on the home page. Both are gone — the reference he pointed at gives the mark
 * about forty pixels and lets the work carry the screen, and that restraint is
 * most of what he was reacting to.
 *
 * The filters are real routes, not client-side state: /video and /photo render
 * their own subset on the server, so they are linkable, cached and work with
 * no JavaScript. Only the current-page underline needs the pathname.
 */

const FILTERS = [
  { label: "All", href: "/" },
  { label: "Video", href: "/video" },
  { label: "Photo", href: "/photo" },
  { label: "Me", href: "/me" },
];

export default function SiteMark({
  filters = true,
  /**
   * The index carries the wordmark on the reel itself, so it asks for the
   * links alone. Every other page has no hero to carry it and keeps both.
   */
  mark = true,
}: {
  filters?: boolean;
  mark?: boolean;
}) {
  const pathname = usePathname();

  return (
    <header className="frame pt-10 lg:pt-14">
      {mark ? (
        <Link
          href="/"
          aria-label="Mando — Armando Aguilar, home"
          className="mx-auto block w-fit text-center transition-opacity hover:opacity-55"
        >
          <span className="wordmark block text-[22px] sm:text-[26px]">Mando</span>
          <span className="byline mt-1 block text-[color:var(--muted)]">
            Armando Aguilar
          </span>
        </Link>
      ) : null}

      {filters ? (
        <nav
          aria-label="Sections"
          // The gap exists to clear the wordmark. With the wordmark on the reel
          // instead, the links sit just under it and the gap would be a hole.
          className={mark ? "mt-14 lg:mt-20" : "mt-1"}
        >
          <ul className="flex items-baseline gap-5 sm:gap-6">
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

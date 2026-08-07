"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/Wordmark";
import { HEADER_SOCIALS, socials } from "@/lib/socials";
import { TABS } from "@/lib/tabs";

const headerSocials = HEADER_SOCIALS.map((name) =>
  socials.find((s) => s.name === name)
).filter((s): s is (typeof socials)[number] => Boolean(s));

/**
 * Tabs at top left; the social marks and the wordmark together at top right,
 * a rule under all of it. Static — the page scrolls beneath it. On a phone it
 * stacks: marks and wordmark on top, tabs under.
 */
export default function PageHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[color:var(--rule)] pb-4">
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <nav aria-label="Primary">
          <ul className="flex items-baseline gap-5 sm:gap-7">
            {TABS.map((tab) => {
              const active = pathname.startsWith(tab.href);
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "caps transition-colors",
                      active
                        ? "u text-[color:var(--fg)]"
                        : "text-[color:var(--muted)] hover:text-[color:var(--fg)]",
                    ].join(" ")}
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* The right-hand cluster. The marks sit on the wordmark's baseline so
            the two read as one block in the corner rather than two. */}
        <div className="flex items-end gap-5 sm:gap-6">
          <ul className="flex items-center gap-4 pb-[3px]">
            {headerSocials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${social.name} — ${social.handle}`}
                  className="block"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-[15px] w-[15px] fill-[color:var(--muted)] transition-colors hover:fill-[color:var(--fg)]"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <div className="text-right">
            <Wordmark />
          </div>
        </div>
      </div>
    </header>
  );
}

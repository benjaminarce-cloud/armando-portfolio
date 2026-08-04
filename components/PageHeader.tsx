"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/Wordmark";
import { TABS } from "@/lib/tabs";

/**
 * Three tabs at top left, the mark at top right, a rule under both. Static —
 * the page scrolls beneath it. On a phone it stacks: mark on top, tabs under.
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

        <div className="text-center sm:text-right">
          <Wordmark />
        </div>
      </div>
    </header>
  );
}

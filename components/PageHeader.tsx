"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TABS } from "@/lib/tabs";

/**
 * Inner-page header: the four tabs at top left, the wordmark at top right,
 * under a full-width rule. Static — the page scrolls beneath it. On a phone
 * it stacks: wordmark centred on top, tabs centred underneath.
 */
export default function PageHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[color:var(--rule)] pb-5">
      <div className="flex flex-col-reverse items-center gap-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <nav aria-label="Primary">
          <ul className="flex items-baseline gap-6 sm:gap-8">
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
                        ? "text-[color:var(--fg)]"
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

        <Link
          href="/"
          className="wordmark text-[13px] sm:text-[15px]"
          aria-label="Armando Aguilar — home"
        >
          Armando Aguilar
        </Link>
      </div>
    </header>
  );
}

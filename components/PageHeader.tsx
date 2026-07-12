"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TABS } from "@/lib/tabs";

/**
 * Inner-page nav. Sits below the monitor chrome's top row so the
 * timecode and REC light stay clear.
 */
export default function PageHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-[88px] z-40 flex items-center justify-between px-14">
      <Link href="/" className="lock mark px-2 py-1 text-[13px] text-white">
        Armando Aguilar
      </Link>

      <nav className="flex items-center gap-1">
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={[
                "lock px-4 py-1 text-[11px] uppercase tracking-[0.16em] transition-colors",
                active
                  ? "lock-on text-white"
                  : "text-[color:var(--dim)] hover:text-white",
              ].join(" ")}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

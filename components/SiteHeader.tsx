"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[color:var(--rule)] pb-5">
      <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <nav aria-label="Primary">
          <ul className="flex items-baseline gap-7">
            {LINKS.map((link) => {
              const active = pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "caps transition-colors",
                      active
                        ? "text-[color:var(--fg)]"
                        : "text-[color:var(--muted)] hover:text-[color:var(--fg)]",
                    ].join(" ")}
                  >
                    {link.label}
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

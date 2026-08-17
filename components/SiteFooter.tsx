import Link from "next/link";
import { HEADER_SOCIALS, socials } from "@/lib/socials";

export const EMAIL = "a.mando.film@gmail.com";

const marks = HEADER_SOCIALS.map((name) =>
  socials.find((s) => s.name === name)
).filter((s): s is (typeof socials)[number] => Boolean(s));

/**
 * The bottom of every page: the address, the marks, and the way to /me.
 *
 * The old footer set "Email Me" at 86px, which was the largest type on the
 * site and sat under every page of work shouting past it. The address is the
 * whole point and it fits on one line, so it gets one line.
 */
export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[color:var(--rule)] px-5 py-8 sm:px-6 lg:mt-28">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
        <a
          href={`mailto:${EMAIL}`}
          className="caps u w-fit transition-opacity hover:opacity-55"
        >
          {EMAIL}
        </a>

        <div className="flex items-center gap-5">
          {marks.map((social) => (
            <a
              key={social.name}
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
          ))}

          <Link
            href="/socials"
            className="caps-xs text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            All
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="caps-xs text-[color:var(--muted)]">
          San Diego, California
        </p>
        <p className="caps-xs text-[color:var(--muted)]">&copy; 2026 Mando</p>
      </div>
    </footer>
  );
}

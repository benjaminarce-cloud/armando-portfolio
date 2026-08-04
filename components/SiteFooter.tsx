import Link from "next/link";

export const EMAIL = "a.mando.film@gmail.com";

/**
 * The bottom of every page. Email Me is the point of it — set at display
 * scale so it reads as the call, with the address spelled out underneath so
 * it can be copied without opening a mail client.
 */
export default function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-[color:var(--rule)] pt-10 lg:mt-40">
      <a
        href={`mailto:${EMAIL}`}
        className="block transition-opacity hover:opacity-55"
      >
        <span className="display block text-[clamp(30px,6.5vw,86px)]">
          Email Me
        </span>
        <span className="caps mt-3 block text-[color:var(--muted)]">
          {EMAIL}
        </span>
      </a>

      <div className="mt-12 flex flex-col items-start gap-3 border-t border-[color:var(--rule)] pt-5 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="caps-xs text-[color:var(--muted)]">
          San Diego, California
        </p>

        <div className="flex items-baseline gap-6">
          <Link
            href="/socials"
            className="caps-xs text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            Socials
          </Link>
          <span className="caps-xs text-[color:var(--muted)]">
            &copy; 2026 Mando
          </span>
        </div>
      </div>
    </footer>
  );
}

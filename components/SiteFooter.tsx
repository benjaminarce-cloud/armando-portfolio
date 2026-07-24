import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-[color:var(--rule)] pt-6 lg:mt-40">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="caps text-[color:var(--muted)]">San Diego, California</p>

        <div className="flex items-baseline gap-7">
          <a
            href="mailto:a.mando.film@gmail.com"
            className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            Email
          </a>
          <Link
            href="/socials"
            className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            Socials
          </Link>
          <span className="caps text-[color:var(--muted)]">2026</span>
        </div>
      </div>
    </footer>
  );
}

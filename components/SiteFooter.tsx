import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-[color:var(--rule)] pt-6 lg:mt-40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="caps text-[color:var(--muted)]">
          San Diego, California
        </p>

        <div className="flex items-baseline gap-7">
          <a
            href="mailto:armandirix@gmail.com"
            className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            Email
          </a>
          <a
            href="https://instagram.com/armandoaguilare"
            target="_blank"
            rel="noreferrer"
            className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            Instagram
          </a>
          <Link
            href="/contact"
            className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

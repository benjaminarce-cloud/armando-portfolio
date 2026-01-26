import Link from "next/link";

const LINKS = [
  { label: "Instagram", href: "https://instagram.com/armandoaguilare" },
  { label: "Email", href: "mailto:armandirix@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/armandoaguilarr/" },
  { label: "TikTok", href: "https://www.tiktok.com/@armandoaguilarr" },
];

export default function HomeEndCard() {
  return (
    <section className="bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between border-t border-[color:var(--page-border)] pt-6">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
            <span>End</span>
            <span className="h-[1px] w-10 bg-[color:var(--page-border)]" />
            <span>Available</span>
          </div>

          <Link
            href="/contact"
            className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)] hover:text-[color:var(--page-fg)]"
          >
            Contact
          </Link>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-5">
            <h2 className="font-[var(--font-serif)] text-[clamp(34px,4.4vw,56px)] leading-[0.95] tracking-[-0.03em]">
              Let&apos;s make something worth replaying.
            </h2>

            <p className="mt-5 max-w-md text-sm text-[color:var(--page-muted)]">
              Email is best.
            </p>
          </div>

          {/* Social links (labels only) */}
          <div className="lg:col-span-5">
            <div className="border-t border-[color:var(--page-border)]">
              {LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block border-b border-[color:var(--page-border)] py-5"
                >
                  {/* inset hover slab */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute inset-x-0 inset-y-2
                      rounded-2xl bg-transparent
                      transition-colors duration-200
                      group-hover:bg-[color:var(--page-fg)]
                    "
                  />

                  <div className="relative flex items-center justify-between gap-6 px-6">
                    <div className="font-[var(--font-sans)] text-[18px] tracking-[-0.01em] transition-colors group-hover:text-[color:var(--page-bg)] sm:text-[20px]">
                      {item.label}
                    </div>

                    <div className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)] transition-colors group-hover:text-[color:var(--page-bg)]">
                      <span className="inline-flex items-center gap-2">
                        Open
                        <span className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
              Based in
            </div>
            <div className="mt-2 text-sm opacity-85">San Diego, CA</div>

            <div className="mt-8 text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
              Work
            </div>
            <div className="mt-2 text-sm opacity-85">Film • Edit • Photo</div>
          </div>
        </div>
      </div>
    </section>
  );
}

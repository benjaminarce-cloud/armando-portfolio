const CONTACT_LINKS = [
  { label: "Instagram", href: "https://instagram.com/armandoaguilare" },
  { label: "Email", href: "mailto:armandirix@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/armandoaguilarr/" },
  { label: "TikTok", href: "https://www.tiktok.com/@armandoaguillarr" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      {/* Spacer for fixed global header */}
      <div className="h-20 sm:h-24" />

      <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 lg:px-12">
        {/* headline */}
        <div className="mt-10">
          <h1 className="font-[var(--font-serif)] text-[clamp(48px,6.6vw,96px)] leading-[0.95] tracking-[-0.03em]">
            Let&apos;s talk.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-[color:var(--page-muted)]">
            Serious inquiries only.
          </p>
        </div>

        {/* rows */}
        <div className="mt-12 border-t border-[color:var(--page-border)]">
          {CONTACT_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block border-b border-[color:var(--page-border)] py-6"
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
                <div className="font-[var(--font-sans)] text-[22px] leading-tight tracking-[-0.01em] transition-colors group-hover:text-[color:var(--page-bg)] sm:text-[26px]">
                  <span className="opacity-85 transition-opacity group-hover:opacity-100">
                    {item.label}
                  </span>
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
    </main>
  );
}

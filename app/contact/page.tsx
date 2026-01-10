import Link from "next/link";

const CONTACT_LINKS = [
  {
    label: "Instagram",
    value: "armandoaguilare",
    href: "https://instagram.com/armandoaguilare",
  },
  {
    label: "Email",
    value: "armandirix@gmail.com",
    href: "mailto:armandirix@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/armandoaguillarr",
    href: "https://www.linkedin.com/in/armandoaguillarr",
  },
  {
    label: "TikTok",
    value: "@armandoaguillarr",
    href: "https://www.tiktok.com/@armandoaguillarr",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F3F2EE] text-[#0A0A0C]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-12">
        {/* top bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-black/55">
            <span>Contact</span>
            <span className="h-[1px] w-10 bg-black/15" />
            <span>Available for projects</span>
          </div>

          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.32em] text-black/55 hover:text-black"
          >
            Home
          </Link>
        </header>

        {/* headline */}
        <div className="mt-16">
          <h1 className="font-[var(--font-serif)] text-[clamp(48px,6.6vw,96px)] leading-[0.95] tracking-[-0.03em]">
            Let&apos;s talk.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-black/55">
            For bookings, collaborations, or edits — email works best.
          </p>
        </div>

        {/* rows */}
        <div className="mt-12 border-t border-black/10">
          {CONTACT_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group block border-b border-black/10 py-6 transition-colors hover:bg-[#0A0A0C]"
            >
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.32em] text-black/55 transition-colors group-hover:text-white/55">
                    {item.label}
                  </div>

                  <div className="mt-2 font-[var(--font-sans)] text-[22px] leading-tight text-black transition-colors group-hover:text-[#F3F2EE] sm:text-[26px]">
                    {item.value}
                  </div>
                </div>

                <div className="pb-1 text-[11px] uppercase tracking-[0.32em] text-black/45 transition-colors group-hover:text-white/60">
                  Open →
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* footer note */}
        <div className="mt-10 text-[11px] uppercase tracking-[0.32em] text-black/45">
          Response time varies. Serious inquiries only.
        </div>
      </div>
    </main>
  );
}

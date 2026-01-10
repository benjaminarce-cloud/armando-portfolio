import Link from "next/link";

const LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/USERNAME",
    sub: "armandoaguilare",
  },
  {
    label: "Email",
    href: "armandirix@gmail.com",
    sub: "armandirix@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/USERNAME",
    sub: "linkedin.com/in/armandoaguilarr",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/armandoaguilarr",
    sub: "@armandoaguilarr",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F3F2EE] text-[#0A0A0C]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
        {/* Top line */}
        <div className="flex items-baseline justify-between gap-6">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] uppercase tracking-[0.32em] text-black/55">
              Contact
            </span>
            <span className="text-[11px] uppercase tracking-[0.32em] text-black/30">
              Available for projects
            </span>
          </div>

          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.32em] text-black/55 hover:text-black"
          >
            Home
          </Link>
        </div>

        {/* Title */}
        <h1 className="mt-12 font-[var(--font-serif)] text-[clamp(44px,6.5vw,96px)] leading-[0.95] tracking-[-0.02em]">
          Let’s build something
          <br />
          loud.
        </h1>

        {/* Links */}
        <div className="mt-14 grid gap-3 sm:max-w-xl">
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="
                group relative flex items-center justify-between
                rounded-2xl border border-black/10 bg-white/40
                px-5 py-4
                transition
                hover:border-black/20 hover:bg-white/60
              "
            >
              <div>
                <div className="text-[13px] uppercase tracking-[0.28em] text-black/60">
                  {item.label}
                </div>
                <div className="mt-1 text-base text-black/90">
                  {item.sub}
                </div>
              </div>

              <div
                className="
                  text-[11px] uppercase tracking-[0.28em]
                  text-black/45
                  transition
                  group-hover:text-black
                "
              >
                Open
              </div>

              {/* subtle underline accent */}
              <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-black/0 transition group-hover:bg-black/10" />
            </a>
          ))}
        </div>

        {/* Small footer note */}
        <p className="mt-10 text-sm text-black/55">
          Prefer email for inquiries. Social for quick context.
        </p>
      </div>
    </main>
  );
}

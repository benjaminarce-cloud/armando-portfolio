import Link from "next/link";

const LINKS = [
  {
    label: "Instagram",
    desc: "Reels + BTS",
    value: "@armandoaguilare",
    href: "https://instagram.com/armandoaguilare",
  },
  {
    label: "TikTok",
    desc: "Cuts + highlights",
    value: "@armandoaguillarr",
    href: "https://www.tiktok.com/@armandoaguillarr",
  },
  {
    label: "Email",
    desc: "Bookings / collabs",
    value: "armandirix@gmail.com",
    href: "mailto:armandirix@gmail.com",
  },
  {
    label: "LinkedIn",
    desc: "Credits / experience",
    value: "linkedin.com/in/armandoaguillarr",
    href: "https://www.linkedin.com/in/armandoaguillarr/",
  },
];

export default function HomeEndCard() {
  return (
    <section className="bg-[#F3F2EE] text-[#0A0A0C]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between border-t border-black/10 pt-6">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-black/55">
            <span>End</span>
            <span className="h-[1px] w-10 bg-black/15" />
            <span>Available for projects</span>
          </div>

          <Link
            href="/contact"
            className="text-[11px] uppercase tracking-[0.32em] text-black/55 hover:text-black"
          >
            Contact
          </Link>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-5">
            <h2 className="font-[var(--font-serif)] text-[clamp(36px,4.4vw,56px)] leading-[0.95] tracking-[-0.03em]">
              Let&apos;s make something that moves.
            </h2>
            <p className="mt-5 max-w-md text-sm text-black/60">
              Sports, athletes, culture — shot clean, cut loud. Email is best for
              serious inquiries.
            </p>
          </div>

          {/* Middle */}
          <div className="lg:col-span-5">
            <div className="border-t border-black/10">
              {LINKS.map((x) => (
                <a
                  key={x.label}
                  href={x.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block border-b border-black/10 py-5"
                >
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.32em] text-black/55">
                        {x.label}
                      </div>
                      <div className="mt-2 font-[var(--font-sans)] text-[18px] text-black leading-tight">
                        {x.desc}
                      </div>
                      <div className="mt-1 text-xs text-black/50">{x.value}</div>
                    </div>

                    <div className="pb-1 text-[11px] uppercase tracking-[0.32em] text-black/45 transition-colors group-hover:text-black">
                      Open →
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.32em] text-black/55">
              Based in
            </div>
            <div className="mt-2 text-sm text-black/70">San Diego, CA</div>

            <div className="mt-8 text-[11px] uppercase tracking-[0.32em] text-black/55">
              Response
            </div>
            <div className="mt-2 text-sm text-black/70">1–3 days</div>

            <div className="mt-8 text-[11px] uppercase tracking-[0.32em] text-black/45">
              Serious inquiries only.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

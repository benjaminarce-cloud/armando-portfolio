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
   {/* End card (white A24-ish footer) */}
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
          Let&apos;s make something worth replaying.
        </h2>

        <p className="mt-5 max-w-md text-sm text-black/60">
          For bookings and collaborations, email works best.
        </p>
      </div>

      {/* Social links */}
      <div className="lg:col-span-5">
        <div className="border-t border-black/10">
          {[
            { label: "Instagram", href: "https://instagram.com/armandoaguilare" },
            { label: "Email", href: "mailto:armandirix@gmail.com" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/armandoaguillarr/" },
            { label: "TikTok", href: "https://www.tiktok.com/@armandoaguillarr" },
          ].map((x) => (
            <a
              key={x.label}
              href={x.href}
              target="_blank"
              rel="noreferrer"
              className="
                group block border-b border-black/10
                px-0 py-6
                transition-colors
                hover:bg-[#0A0A0C]
              "
            >
              <div className="flex items-center justify-between gap-6">
                <div className="text-[11px] uppercase tracking-[0.32em] text-black/70 transition-colors group-hover:text-[#F3F2EE]">
                  {x.label}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-black/35 transition-colors group-hover:text-white/70">
                    Open
                  </span>
                  <span
                    className="
                      translate-x-0 text-black/35 transition-all
                      group-hover:translate-x-1 group-hover:text-white/70
                    "
                  >
                    →
                  </span>
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
          Work
        </div>
        <div className="mt-2 text-sm text-black/70">Film • Edit • Photo</div>
      </div>
    </div>
  </div>
</section>

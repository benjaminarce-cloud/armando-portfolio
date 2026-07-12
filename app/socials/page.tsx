import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Socials — Armando Aguilar",
};

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@armandoaguilare",
    href: "https://instagram.com/armandoaguilare",
  },
  {
    label: "TikTok",
    handle: "@armandoaguilarr",
    href: "https://www.tiktok.com/@armandoaguilarr",
  },
  {
    label: "LinkedIn",
    handle: "armandoaguilarr",
    href: "https://www.linkedin.com/in/armandoaguilarr/",
  },
];

export default function SocialsPage() {
  return (
    <PageShell title="Socials" slate={`${SOCIALS.length} channels`}>
      <div className="border-t border-[color:var(--line)]">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-baseline justify-between gap-6 border-b border-[color:var(--line)] py-8 transition-colors"
          >
            <span className="mark text-[clamp(28px,4.4vw,56px)] text-[color:var(--dim)] transition-colors group-hover:text-white">
              {social.label}
            </span>

            <span className="flex items-baseline gap-6">
              <span className="hud text-[color:var(--dim)] transition-colors group-hover:text-white/70">
                {social.handle}
              </span>
              <span className="hud text-[color:var(--rec)] opacity-0 transition-opacity group-hover:opacity-100">
                Open ↗
              </span>
            </span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}

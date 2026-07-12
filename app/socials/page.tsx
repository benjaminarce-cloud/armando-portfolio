import PageShell from "@/components/PageShell";
import { socials } from "@/lib/socials";

export const metadata = {
  title: "Socials — Armando Aguilar",
};

export default function SocialsPage() {
  return (
    <PageShell title="Socials" slate={`${socials.length} channels`}>
      <div className="flex flex-wrap items-center gap-x-12 gap-y-10">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${social.name} — ${social.handle}`}
            className="group relative block"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-8 w-8 fill-[color:var(--dim)] transition-colors duration-300 group-hover:fill-white"
            >
              <path d={social.path} />
            </svg>

            {/* Handle only shows up when you're actually on the mark. */}
            <span className="hud absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-[10px] text-white/0 transition-colors duration-300 group-hover:text-white/60">
              {social.handle}
            </span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}

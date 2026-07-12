import PageShell from "@/components/PageShell";
import { socials } from "@/lib/socials";

export const metadata = {
  title: "Socials — Armando Aguilar",
};

export default function SocialsPage() {
  return (
    <PageShell title="Socials" slate={`${socials.length} channels`}>
      {/* Each account reads as an input channel on the monitor: CH 01–04, a
          mark, and nothing else until you hover it. */}
      <div className="grid max-w-5xl grid-cols-2 gap-px bg-[color:var(--line-soft)] lg:grid-cols-4">
        {socials.map((social, i) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${social.name} — ${social.handle}`}
            className="lock lock-tile group relative grid aspect-square place-items-center bg-[color:var(--bg)]"
          >
            <span className="hud-num absolute left-4 top-4 text-[10px] tracking-[0.16em] text-[color:var(--dimmer)] transition-colors group-hover:text-[color:var(--rec)]">
              CH {String(i + 1).padStart(2, "0")}
            </span>

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-11 w-11 fill-[color:var(--dim)] transition-colors duration-300 group-hover:fill-white"
            >
              <path d={social.path} />
            </svg>

            <span className="hud absolute bottom-4 left-0 right-0 text-center text-[10px] text-white/0 transition-colors duration-300 group-hover:text-white/60">
              {social.handle}
            </span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}

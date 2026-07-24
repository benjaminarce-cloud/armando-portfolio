import PageShell from "@/components/PageShell";
import { socials } from "@/lib/socials";

export const metadata = {
  title: "Socials — Armando Aguilar",
};

export default function SocialsPage() {
  return (
    <PageShell title="Socials" slate={`${socials.length} Channels`}>
      <div className="mx-auto flex max-w-2xl flex-wrap items-start justify-center gap-x-16 gap-y-12">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${social.name} — ${social.handle}`}
            className="group flex flex-col items-center gap-4"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-7 w-7 fill-[color:var(--muted)] transition-colors duration-300 group-hover:fill-[color:var(--fg)]"
            >
              <path d={social.path} />
            </svg>

            <span className="caps text-[color:var(--muted)] transition-colors duration-300 group-hover:text-[color:var(--fg)]">
              {social.handle}
            </span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}

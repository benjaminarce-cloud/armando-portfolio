import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { socials } from "@/lib/socials";

export const metadata = {
  title: "Socials — Mando",
};

export default function SocialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteMark filters={false} />

      <main className="mt-12 flex-1 px-5 sm:px-6 lg:mt-16">
        <div className="flex items-end justify-between gap-6 border-b border-[color:var(--rule)] pb-5">
          <h1 className="display text-[clamp(30px,6vw,72px)]">Socials</h1>
          <p className="caps-xs shrink-0 pb-1 text-[color:var(--muted)]">
            {socials.length} Channels
          </p>
        </div>

        <div className="index mt-16 flex flex-wrap items-start justify-center gap-x-16 gap-y-12">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${social.name} — ${social.handle}`}
              className="row group flex flex-col items-center gap-4"
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
      </main>

      <SiteFooter />
    </div>
  );
}

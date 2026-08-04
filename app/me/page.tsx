import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { EMAIL } from "@/components/SiteFooter";
import { mePhotos, mePhotoUrl } from "@/lib/photos";
import { socials } from "@/lib/socials";

export const metadata = {
  title: "Me — Mando",
};

const RATIO_CLASS = {
  "3:2": "aspect-[3/2]",
  "4:5": "aspect-[4/5]",
} as const;

/**
 * Him: two facts and the frames of him working. Nothing else — the copy he
 * asked for is his age and his major, and the pictures carry the rest.
 *
 * The frames are the only personal photos left on the site; the old contact
 * sheet that ran under the home page bio is gone.
 */
export default function MePage() {
  const [lead, ...rest] = mePhotos;

  return (
    <PageShell title="Me" slate="Armando Aguilar">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="text-[13px] leading-[1.6]">
            21 years old. Film major at San Diego State University.
          </p>

          <div className="mt-10 space-y-1 border-t border-[color:var(--rule)] pt-5">
            <p className="caps-xs text-[color:var(--muted)]">Reach me</p>
            <a
              href={`mailto:${EMAIL}`}
              className="caps block transition-opacity hover:opacity-55"
            >
              {EMAIL}
            </a>
          </div>

          <div className="mt-8 space-y-1 border-t border-[color:var(--rule)] pt-5">
            <p className="caps-xs text-[color:var(--muted)]">Elsewhere</p>
            <ul className="index space-y-1">
              {socials.map((social) => (
                <li key={social.name} className="row">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="caps flex items-baseline justify-between gap-6"
                  >
                    <span>{social.name}</span>
                    <span className="text-[color:var(--muted)]">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/socials"
              className="caps-xs mt-3 inline-block text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
            >
              All socials &rarr;
            </Link>
          </div>
        </div>

        {/* The lead frame runs large and offset; the rest fall in under it. */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div
            className={`relative overflow-hidden bg-[color:var(--rule)] ${RATIO_CLASS[lead.ratio]}`}
          >
            <Image
              src={mePhotoUrl(lead.slug, 1600)}
              alt={lead.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 items-start gap-x-6 gap-y-10 lg:mt-24 lg:grid-cols-10">
        {rest.map((photo, i) => (
          <div
            key={photo.slug}
            className={[
              "relative overflow-hidden bg-[color:var(--rule)]",
              RATIO_CLASS[photo.ratio],
              // Alternating widths and a drop on every other one, so the run
              // reads as a contact sheet that was laid out rather than dumped.
              i % 2 === 0 ? "lg:col-span-4" : "lg:col-span-5",
              i % 2 === 1 ? "lg:mt-16" : "",
            ].join(" ")}
          >
            <Image
              src={mePhotoUrl(photo.slug, 1200)}
              alt={photo.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 40vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </PageShell>
  );
}

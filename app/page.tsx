import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import { lifePhotos } from "@/lib/lifePhotos";

/**
 * The home page is his info: who he is, how he shoots, and how to reach him,
 * all on one screen. Contact lives here rather than on its own tab.
 *
 * The name is set once, as the headline — the wordmark up top already carries
 * it — and the roles are stated once, under it. The bio never repeats either.
 */

const ROLES = ["Videographer", "Post Production Editor", "Photographer"];

const BIO =
  "Born in Mexico, raised between two languages. Lead producer for Aztec Men's Basketball, freelance across sport, brand and documentary.";

export default function Page() {
  // A portrait cluster on the right, and a wider strip of frames below.
  const cluster = lifePhotos.slice(0, 3);
  const strip = lifePhotos.slice(3, 9);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 py-8 sm:px-10 lg:px-14">
      <PageHeader />

      <main className="flex-1 pt-16 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Identity + bio + contact */}
          <div className="lg:col-span-5 xl:col-span-4">
            <h1 className="display text-[clamp(40px,5.6vw,84px)] leading-[0.98]">
              Armando
              <br />
              Aguilar
            </h1>

            <ul className="mt-8 space-y-1.5">
              {ROLES.map((role) => (
                <li key={role} className="caps text-[color:var(--muted)]">
                  {role}
                </li>
              ))}
            </ul>

            <p className="mt-10 max-w-[42ch] text-[13px] leading-[1.75]">
              {BIO}
            </p>

            {/* Contact, folded into the info page */}
            <div className="mt-14 border-t border-[color:var(--rule)] pt-8">
              <p className="caps text-[color:var(--muted)]">Get in touch</p>
              <div className="mt-5 space-y-2">
                <a
                  href="mailto:a.mando.film@gmail.com"
                  className="block text-[15px] transition-opacity hover:opacity-55"
                >
                  a.mando.film@gmail.com
                </a>
                <a
                  href="https://instagram.com/armandoaguilare"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[13px] text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
                >
                  @armandoaguilare
                </a>
                <p className="caps-sm mt-3 text-[color:var(--muted)]">
                  San Diego, California &middot; Available worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Portrait cluster — offset down for an editorial feel */}
          <div className="lg:col-span-6 lg:col-start-7 lg:mt-16 xl:col-span-5 xl:col-start-8">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative col-span-2 aspect-[3/2] overflow-hidden bg-[color:var(--rule)]">
                <Image
                  src={cluster[0]}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
              {cluster.slice(1).map((src) => (
                <div
                  key={src}
                  className="relative aspect-[3/2] overflow-hidden bg-[color:var(--rule)]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Frame strip — his eye, run as a contact sheet */}
        <section className="mt-24 lg:mt-32">
          <div className="flex items-baseline justify-between gap-6 border-t border-[color:var(--rule)] pt-6">
            <h2 className="caps">Selected Frames</h2>
            <Link
              href="/photo"
              className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
            >
              All Photo &rarr;
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {strip.map((src) => (
              <div
                key={src}
                className="relative aspect-[3/2] overflow-hidden bg-[color:var(--rule)]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

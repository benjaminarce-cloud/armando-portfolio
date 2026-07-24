import Image from "next/image";
import PageShell from "@/components/PageShell";
import { lifePhotos } from "@/lib/lifePhotos";

export const metadata = {
  title: "Contact — Armando Aguilar",
};

const BIO = [
  "Born in Mexico, raised between two languages.",
  "Found my voice through a camera.",
  "Lead producer for Aztec Men's Basketball and a freelance filmmaker making high-end, cinematic work.",
  "Film major, based in San Diego.",
];

export default function ContactPage() {
  return (
    <PageShell title="Contact" slate="Serious Inquiries Only">
      {/* Bio */}
      <div className="mx-auto max-w-xl text-center">
        <div className="space-y-4 text-[14px] leading-[1.85]">
          {BIO.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <a
          href="mailto:armandirix@gmail.com"
          className="display mt-12 inline-block text-[clamp(22px,3vw,36px)] transition-opacity hover:opacity-55"
        >
          armandirix@gmail.com
        </a>

        <p className="caps-sm mx-auto mt-8 max-w-[44ch] text-[color:var(--muted)]">
          Available for documentary, sports and commercial work &mdash;
          shooting, directing and edit.
        </p>
      </div>

      {/* Personal contact sheet — his own photos, run as a strip of frames. */}
      <section className="mt-28">
        <div className="flex items-baseline justify-between gap-6 border-b border-[color:var(--rule)] pb-4">
          <h2 className="caps">Off the Clock</h2>
          <p className="caps text-[color:var(--muted)]">
            {lifePhotos.length} Frames
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
          {lifePhotos.map((src, i) => (
            <div
              key={src}
              className="group relative aspect-[3/2] overflow-hidden bg-[color:var(--rule)]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority={i < 6}
              />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

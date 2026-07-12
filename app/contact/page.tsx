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
    <PageShell title="Contact" slate="Serious inquiries only">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        {/* Bio */}
        <div>
          <p className="hud mb-6 text-[color:var(--dim)]">Who&apos;s shooting</p>
          <div className="flex max-w-[52ch] flex-col gap-5">
            {BIO.map((line) => (
              <p key={line} className="text-[17px] leading-relaxed text-white/85">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Reach him */}
        <div>
          <p className="hud mb-6 text-[color:var(--dim)]">Get in touch</p>

          <a
            href="mailto:armandirix@gmail.com"
            className="lock group inline-flex items-baseline gap-5 px-3 py-2"
          >
            <span className="text-[clamp(20px,2.4vw,30px)] text-white">
              armandirix@gmail.com
            </span>
            <span className="hud text-[color:var(--rec)]">Email ↗</span>
          </a>

          <p className="mt-10 max-w-[42ch] text-[14px] leading-relaxed text-[color:var(--dim)]">
            Available for documentary, sports, and commercial work — shooting,
            directing, and edit.
          </p>
        </div>
      </div>

      {/* Personal contact sheet — his own photos, run as a strip of frames. */}
      <section className="mt-28">
        <div className="flex items-baseline justify-between gap-6 border-b border-[color:var(--line)] pb-4">
          <h2 className="hud text-white">B-Roll</h2>
          <p className="hud text-[color:var(--dim)]">
            {lifePhotos.length} frames · personal
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-px bg-[color:var(--line-soft)] sm:grid-cols-5 lg:grid-cols-6">
          {lifePhotos.map((src, i) => (
            <div
              key={src}
              className="lock lock-tile group relative aspect-[3/2] overflow-hidden bg-black"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 16vw"
                className="object-cover opacity-75 saturate-[0.85] transition-all duration-500 group-hover:opacity-100 group-hover:saturate-100"
              />
              <span className="hud-num absolute bottom-2 left-2 z-10 text-[9px] tracking-[0.1em] text-white/0 transition-colors group-hover:text-white/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

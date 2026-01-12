// components/about/AboutDossier.tsx
import Image from "next/image";

const POLAROIDS = [
  // Replace these with your real photos later (keep aspect ratios similar)
  // Put files in: /public/img/about/
  {
    src: "/img/about/polaroid-1.jpg",
    alt: "Behind the scenes still",
    caption: "SDSU — courtside",
  },
  {
    src: "/img/about/polaroid-2.jpg",
    alt: "Camera rig detail",
    caption: "feature work",
  },
  {
    src: "/img/about/polaroid-3.jpg",
    alt: "Editing timeline or set detail",
    caption: "cut loud",
  },
];

export default function AboutDossier() {
  return (
    <section className="grid grid-cols-12 gap-10 lg:gap-12">
      {/* LEFT: big type + story */}
      <div className="col-span-12 lg:col-span-7">
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
          <span>About</span>
          <span className="h-[1px] w-10 bg-[color:var(--page-border)]" />
          <span>Notes</span>
        </div>

        <h1 className="mt-10 font-[var(--font-serif)] text-[clamp(56px,7.4vw,104px)] leading-[0.9] tracking-[-0.04em]">
          Story first.
          <br />
          Sports second.
        </h1>

        <div className="mt-10 max-w-2xl space-y-6 text-[15px] leading-7 text-[color:var(--page-muted)]">
          <p>
            I was born and raised in Mexico until 7th grade, when my family and I
            moved to the United States. I arrived without English — and had to
            adapt fast.
          </p>

          <p>
            I leaned on storytelling. It became the way I learned, connected, and
            built a path into media.
          </p>

          <p>
            Today, I’m the lead producer for Aztec Men’s Basketball and the MESA
            Foundation at San Diego State University. As a Video Intern with SDSU
            Media Relations, I contribute across sports — and one highlight has
            been producing a video feature for Sports Illustrated.
          </p>

          <p>
            I’m a Film major with a 4.0 GPA, working across videography,
            photography, and creative direction — always trying to push the work
            past “content” and into something you replay.
          </p>
        </div>

        {/* Index-card facts (minimal, dossier vibe) */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <FactCard
            label="Now"
            value="Lead Producer — Aztec Men’s Basketball / MESA"
          />
          <FactCard
            label="Also"
            value="Video Intern — SDSU Media Relations"
          />
          <FactCard
            label="Highlight"
            value="Produced a feature for Sports Illustrated"
          />
          <FactCard
            label="Study"
            value="Film Major — 4.0 GPA"
          />
        </div>
      </div>

      {/* RIGHT: polaroid stack */}
      <div className="col-span-12 lg:col-span-5">
        <div className="sticky top-28">
          <div className="relative mx-auto max-w-[520px]">
            {/* big translucent word behind stack */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 left-1/2 w-[140%] -translate-x-1/2 text-center font-[var(--font-serif)] text-[80px] tracking-[-0.04em] text-[color:var(--page-fg)] opacity-[0.06] sm:text-[110px]"
            >
              DOSSIER
            </div>

            <div className="relative mt-10">
              {POLAROIDS.map((p, i) => (
                <Polaroid key={p.src} {...p} index={i} />
              ))}
            </div>

            {/* tiny line under stack, very A24 */}
            <div className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
              <span className="h-px w-10 bg-[color:var(--page-border)]" />
              <span>stills</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--page-border)] bg-[color:var(--page-card)] px-5 py-4">
      <div className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
        {label}
      </div>
      <div className="mt-2 text-[14px] leading-6 text-[color:var(--page-fg)]">
        {value}
      </div>
    </div>
  );
}

function Polaroid({
  src,
  alt,
  caption,
  index,
}: {
  src: string;
  alt: string;
  caption: string;
  index: number;
}) {
  // Subtle “thrown on the desk” offsets
  const transforms = [
    "rotate-[-2.2deg] translate-x-0 translate-y-0",
    "rotate-[1.6deg] translate-x-6 -translate-y-6",
    "rotate-[-1.2deg] -translate-x-2 -translate-y-10",
  ];

  const t = transforms[index] ?? "rotate-[-1deg]";

  return (
    <figure
      className={[
        "relative",
        "rounded-3xl border border-[color:var(--page-border)] bg-[color:var(--page-bg)]",
        "shadow-[0_40px_120px_rgba(0,0,0,0.14)]",
        "overflow-hidden",
        "transition-transform duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_60px_160px_rgba(0,0,0,0.18)]",
        t,
        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10",
      ].join(" ")}
    >
      {/* “Polaroid” white frame */}
      <div className="bg-[color:var(--page-bg)] p-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-black/5">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 90vw, 520px"
            className="object-cover"
          />
        </div>

        <figcaption className="mt-4 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
            {caption}
          </span>
          <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
            2025
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

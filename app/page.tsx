import Image from "next/image";
import Link from "next/link";

const HERO =
  "https://res.cloudinary.com/dzjcndphq/video/upload/so_1.0,f_jpg,q_auto,w_2000/BYRDTRAILERMANDOINGGG_qm56iy.jpg";

const FACTS = [
  { label: "Based in", values: ["San Diego, California"] },
  {
    label: "Disciplines",
    values: ["Direction", "Cinematography", "Edit", "Color"],
  },
  {
    label: "Selected Clients",
    values: [
      "San Diego State Athletics",
      "San Diego FC",
      "University of Colorado",
      "Strictly Run Club",
    ],
  },
];

export default function Page() {
  return (
    <div>
      {/* Statement */}
      <section className="mx-auto max-w-4xl text-center">
        <p className="caps text-[color:var(--muted)]">
          Filmmaker &middot; Cinematographer
        </p>

        <h1 className="display mt-7 text-[clamp(30px,4.4vw,56px)]">
          Cinematic work,
          <br />
          thoughtfully made.
        </h1>
      </section>

      {/* Hero still */}
      <section className="mt-12 lg:mt-16">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src={HERO}
            alt="Frame from Beyond the Jersey"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-6 border-t border-[color:var(--rule)] pt-4">
          <p className="caps text-[color:var(--muted)]">
            Beyond the Jersey &mdash; Miles Byrd Doc
          </p>
          <p className="caps tabular-nums text-[color:var(--muted)]">2026</p>
        </div>
      </section>

      {/* Facts */}
      <section className="mt-24 grid gap-12 border-t border-[color:var(--rule)] pt-10 sm:grid-cols-3 lg:mt-32">
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <h2 className="caps text-[color:var(--muted)]">{fact.label}</h2>
            <ul className="mt-5 space-y-1.5">
              {fact.values.map((value) => (
                <li key={value} className="caps-sm">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Bio */}
      <section className="mx-auto mt-24 max-w-xl text-center lg:mt-32">
        <p className="text-[14px] leading-[1.85]">
          Armando Aguilar is a filmmaker and cinematographer working out of San
          Diego. Lead producer for Aztec Men&apos;s Basketball and freelance
          across sport, brand and documentary. Born in Mexico, raised between
          two languages.
        </p>

        <Link
          href="/work"
          className="caps mt-10 inline-block border-b border-[color:var(--fg)] pb-1 transition-opacity hover:opacity-55"
        >
          View the work
        </Link>
      </section>
    </div>
  );
}

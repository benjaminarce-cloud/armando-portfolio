import Image from "next/image";

const CLIENTS = [
  "San Diego State Athletics",
  "San Diego FC",
  "University of Colorado",
  "Strictly Run Club",
];

const DISCIPLINES = ["Direction", "Cinematography", "Edit", "Color"];

const PORTRAIT =
  "https://res.cloudinary.com/dzjcndphq/video/upload/so_1.0,f_jpg,q_auto,w_1200/BYRDTRAILERMANDOINGGG_qm56iy.jpg";

export default function Page() {
  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
      {/* Left column — info */}
      <div className="lg:col-span-4 xl:col-span-3">
        <p className="prose-justify max-w-[34ch] text-[13px] leading-[1.65]">
          Armando Aguilar is a filmmaker and cinematographer working out of San
          Diego. He is lead producer for Aztec Men&apos;s Basketball and works
          freelance across sport, brand and documentary.
        </p>

        <p className="prose-justify mt-4 max-w-[34ch] text-[13px] leading-[1.65]">
          Born in Mexico, raised between two languages. Film major.
        </p>

        <section className="mt-14">
          <h2 className="label">Selected Clients</h2>
          <ul className="mt-4 space-y-1">
            {CLIENTS.map((client) => (
              <li key={client} className="text-[13px] italic">
                {client}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="label">Disciplines</h2>
          <ul className="mt-4 space-y-1">
            {DISCIPLINES.map((discipline) => (
              <li key={discipline} className="text-[13px] italic">
                {discipline}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <a
            href="mailto:armandirix@gmail.com"
            className="block text-[13px] transition-colors hover:text-[color:var(--muted)]"
          >
            armandirix@gmail.com
          </a>
          <a
            href="https://instagram.com/armandoaguilare"
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-[13px] text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            @armandoaguilare
          </a>
        </section>
      </div>

      {/* Right column — single still */}
      <div className="lg:col-span-5 lg:col-start-7 xl:col-span-4 xl:col-start-8">
        <div className="relative aspect-[4/5] w-full max-w-[420px]">
          <Image
            src={PORTRAIT}
            alt="Frame from Beyond the Jersey"
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

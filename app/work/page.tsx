import Image from "next/image";
import Link from "next/link";
import { selectedFrames } from "@/lib/frames";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0C] text-[#F3F2EE]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
              Work
            </p>
            <h1 className="mt-3 text-3xl tracking-[-0.03em] sm:text-5xl">
              Campaigns & Projects
            </h1>
            <p className="mt-4 max-w-2xl text-white/65">
              Social-first sports storytelling — shot and edited for energy, clarity, and replay.
            </p>
          </div>

          <Link
            href="/"
            className="hidden text-[11px] uppercase tracking-[0.28em] text-white/55 hover:text-white md:block"
          >
            Back home
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {selectedFrames.map((it) => (
            <Link
              key={it.id}
              href={it.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={it.imageSrc}
                  alt={it.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                  {it.year}
                </p>
                <p className="mt-2 text-lg tracking-[-0.02em]">{it.title}</p>
                <p className="mt-1 text-sm text-white/60">{it.subtitle}</p>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-white/15" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

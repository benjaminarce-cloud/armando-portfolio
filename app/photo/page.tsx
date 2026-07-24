import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { photos } from "@/lib/photos";

export const metadata = {
  title: "Photo — Armando Aguilar",
};

export default function PhotoPage() {
  return (
    <PageShell title="Photo" slate={`${photos.length} Frames`}>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {photos.map((photo) => {
          const body = (
            <>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
              />

              {/* Caption fades in over a soft scrim on hover. */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white">
                  {photo.title}
                </p>
                <p className="caps mt-1 text-white/70">
                  {photo.filmSlug ? `From film · ${photo.year}` : photo.year}
                </p>
              </div>
            </>
          );

          // Frames pulled from a film link back to it.
          return photo.filmSlug ? (
            <Link
              key={photo.id}
              href={`/video/${photo.filmSlug}`}
              className="group relative block aspect-[4/5] overflow-hidden bg-[color:var(--rule)]"
            >
              {body}
            </Link>
          ) : (
            <div
              key={photo.id}
              className="group relative aspect-[4/5] overflow-hidden bg-[color:var(--rule)]"
            >
              {body}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

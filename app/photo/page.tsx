import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { photos, type Photo } from "@/lib/photos";

export const metadata = {
  title: "Photo — Armando Aguilar",
};

function Frame({ photo, feature = false }: { photo: Photo; feature?: boolean }) {
  const body = (
    <>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={
          feature
            ? "(max-width: 1024px) 100vw, 1200px"
            : "(max-width: 1024px) 50vw, 33vw"
        }
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
        priority={feature}
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

  const shape = feature ? "aspect-[16/9]" : "aspect-[3/2]";

  return photo.filmSlug ? (
    <Link
      href={`/video/${photo.filmSlug}`}
      className={`group relative block overflow-hidden bg-[color:var(--rule)] ${shape}`}
    >
      {body}
    </Link>
  ) : (
    <div
      className={`group relative overflow-hidden bg-[color:var(--rule)] ${shape}`}
    >
      {body}
    </div>
  );
}

export default function PhotoPage() {
  const [feature, ...rest] = photos;

  return (
    <PageShell title="Photo" slate={`${photos.length} Frames`}>
      {feature ? (
        <div className="mx-auto max-w-5xl">
          <Frame photo={feature} feature />
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {rest.map((photo) => (
          <Frame key={photo.id} photo={photo} />
        ))}
      </div>
    </PageShell>
  );
}

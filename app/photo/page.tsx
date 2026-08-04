import Image from "next/image";
import PageShell from "@/components/PageShell";
import { SPAN_CLASS, toRows } from "@/lib/layout";
import {
  PHOTO_RATIO_CLASS,
  photos,
  photoUrl,
  shootCount,
  type Photo,
} from "@/lib/photos";

export const metadata = {
  title: "Photo — Mando",
};

function Frame({ photo, priority = false }: { photo: Photo; priority?: boolean }) {
  return (
    <figure
      className={`row ${SPAN_CLASS[photo.span]} ${photo.drop ? "lg:mt-24" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-[color:var(--rule)] ${PHOTO_RATIO_CLASS[photo.ratio]}`}
      >
        <Image
          src={photoUrl(photo, 1800)}
          alt={`${photo.title} — ${photo.shoot}`}
          fill
          sizes={`(max-width: 1024px) 100vw, ${Math.round((photo.span / 12) * 100)}vw`}
          className="object-cover"
          priority={priority}
        />
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-[color:var(--rule)] pt-2">
        <div className="min-w-0">
          <p className="caps-xs truncate text-[color:var(--muted)]">
            {photo.shoot}
          </p>
          <p className="caps mt-1 truncate">{photo.title}</p>
        </div>
        <span className="caps-xs shrink-0 tabular-nums text-[color:var(--muted)]">
          {photo.year}
        </span>
      </figcaption>
    </figure>
  );
}

export default function PhotoPage() {
  const rows = toRows(photos);

  return (
    <PageShell title="Photo" slate={`${shootCount} Shoots · ${photos.length} Frames`}>
      <div className="index space-y-16 lg:space-y-28">
        {rows.map((row, i) => (
          <div
            key={row[0].slug}
            className="grid grid-cols-1 items-start gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-0"
          >
            {row.map((photo, j) => (
              <Frame
                key={photo.slug}
                photo={photo}
                priority={i === 0 && j === 0}
              />
            ))}
          </div>
        ))}
      </div>
    </PageShell>
  );
}

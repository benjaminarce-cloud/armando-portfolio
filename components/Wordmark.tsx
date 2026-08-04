import Link from "next/link";

/**
 * MANDO is the brand; Armando Aguilar is the name under it, set small and
 * tracked out just enough to sit as a byline rather than as a second title.
 *
 * `hero` is the home page treatment — the mark carries the screen. Everywhere
 * else it runs at nav scale in the corner.
 */
export default function Wordmark({ hero = false }: { hero?: boolean }) {
  const mark = (
    <>
      <span
        className={
          hero
            ? "wordmark block text-[clamp(64px,13vw,190px)]"
            : "wordmark block text-[17px] sm:text-[19px]"
        }
      >
        Mando
      </span>
      <span
        className={
          hero
            ? "byline mt-3 block text-[10px] sm:text-[11px]"
            : "byline mt-1 block text-[color:var(--muted)]"
        }
      >
        Armando Aguilar
      </span>
    </>
  );

  if (hero) return <div>{mark}</div>;

  return (
    <Link href="/" aria-label="Mando — Armando Aguilar, home" className="block">
      {mark}
    </Link>
  );
}

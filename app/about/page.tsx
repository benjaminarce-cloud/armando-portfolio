// app/about/page.tsx
import { LifePhotosGrid } from "@/components/about/LifePhotosGrid";

export const metadata = {
  title: "About — Armando Aguilar",
};

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <p className="caps text-[color:var(--muted)]">About</p>

        <h1 className="display mt-6 text-[clamp(30px,4.4vw,54px)]">
          Found my voice
          <br />
          through a camera.
        </h1>

        <div className="mx-auto mt-12 max-w-xl space-y-5 text-[14px] leading-[1.85]">
          <p>
            Born in Mexico, raised between two languages. Lead producer for
            Aztec Men&apos;s Basketball and freelance filmmaker creating
            high-end, cinematic visuals.
          </p>
          <p>Film major, based in San Diego.</p>
        </div>
      </div>

      <div className="mt-24 border-t border-[color:var(--rule)] pt-10 lg:mt-32">
        <h2 className="caps text-[color:var(--muted)]">Off the clock</h2>
        <div className="mt-8">
          <LifePhotosGrid />
        </div>
      </div>
    </div>
  );
}

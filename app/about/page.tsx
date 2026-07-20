// app/about/page.tsx
import { LifePhotosGrid } from "@/components/about/LifePhotosGrid";

export const metadata = {
  title: "About — Armando Aguilar",
};

export default function AboutPage() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-3">
        <h1 className="label">About</h1>

        <div className="mt-6 space-y-4 text-[13px] leading-[1.65]">
          <p className="prose-justify max-w-[36ch]">
            Born in Mexico, raised between two languages. Found my voice through
            a camera.
          </p>
          <p className="prose-justify max-w-[36ch]">
            Lead producer for Aztec Men&apos;s Basketball and freelance
            filmmaker creating high-end, cinematic visuals. Film major, based in
            San Diego.
          </p>
        </div>
      </div>

      <div className="lg:col-span-8 lg:col-start-5">
        <LifePhotosGrid />
      </div>
    </div>
  );
}

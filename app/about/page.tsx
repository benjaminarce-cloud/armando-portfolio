// app/about/page.tsx
import AboutDossier from "@/components/about/AboutDossier";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8 lg:px-12">
        <AboutDossier />
      </div>
    </main>
  );
}

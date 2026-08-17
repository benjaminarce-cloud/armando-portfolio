import Mosaic from "@/components/Mosaic";
import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { projectsOfKind } from "@/lib/projects";

export const metadata = {
  title: "Video — Mando",
};

/** The same mosaic, filtered. A route rather than client-side state. */
export default function VideoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteMark />

      <main className="mt-5 flex-1">
        <Mosaic projects={projectsOfKind("video")} />
      </main>

      <SiteFooter />
    </div>
  );
}

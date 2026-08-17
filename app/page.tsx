import Mosaic from "@/components/Mosaic";
import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { projects } from "@/lib/projects";

/**
 * The front page is the index. There is nothing above the work but the mark.
 *
 * The build before this one opened on a 190px wordmark, a full-width autoplaying
 * clip, a list of section links and three cropped frames — four screens before
 * you saw a body of work. This is one screen: the mark, and then everything.
 */
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteMark />

      <main className="mt-5 flex-1">
        <Mosaic projects={projects} />
      </main>

      <SiteFooter />
    </div>
  );
}

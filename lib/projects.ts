export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  category: "Athletics" | "Run Club" | "Brand";
  frames: Array<{ src: string; alt: string }>;
};

export const projects: Project[] = [
  {
    slug: "sdsu-hoops-night-run",
    title: "SDSU Hoops — Night Run",
    year: "2025",
    role: "Director • Camera • Edit",
    category: "Athletics",
    frames: [
      { src: "/img/projects/sdsu-hoops/frame-01.jpg", alt: "Crowd lights and pregame intensity" },
      { src: "/img/projects/sdsu-hoops/frame-02.jpg", alt: "Tunnel close-up, hard shadows" }
    ]
  },
  {
    slug: "uvu-club-run-series",
    title: "UVU Club — Run Series",
    year: "2025",
    role: "Camera • Edit",
    category: "Run Club",
    frames: [
      { src: "/img/projects/run-club/frame-01.jpg", alt: "Shoes on pavement, early morning" },
      { src: "/img/projects/run-club/frame-02.jpg", alt: "Pack shot, shallow depth" }
    ]
  },
  {
    slug: "brand-drop-social-tease",
    title: "Brand Drop — Social Tease",
    year: "2024",
    role: "Edit • Color • Motion",
    category: "Brand",
    frames: [
      { src: "/img/projects/brand-drop/frame-01.jpg", alt: "Product silhouette in hard light" },
      { src: "/img/projects/brand-drop/frame-02.jpg", alt: "Texture macro, hands framing" }
    ]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

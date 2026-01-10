export type ProjectCategory =
  | "SDSU Athletics"
  | "Run Club"
  | "Brand / Drop"
  | "Social / Hype";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  role: string;

  coverSrc: string;    // used for /work poster wall
  posterSrc: string;   // used for the rail (fast)
  previewSrc?: string; // optional mp4 loop for spotlight
  instagramUrl: string;
};

export const projects: Project[] = [
  {
    slug: "project-01",
    title: "Hype Cut",
    category: "SDSU Athletics",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/hero-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DMqsa7STxqz/",
  },
  {
    slug: "project-02",
    title: "Game Day Energy",
    category: "SDSU Athletics",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/hero-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DRxn1KkEi1_/",
  },
  {
    slug: "project-03",
    title: "Night Run",
    category: "Run Club",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/hero-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DP9pVblEo7y/",
  },
  {
    slug: "project-04",
    title: "Pace Pack",
    category: "Run Club",
    year: "2024",
    role: "Shoot + Edit",
    coverSrc: "/img/hero-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DJfInIlTo5I/",
  },
  {
    slug: "project-05",
    title: "Teaser Drop",
    category: "Brand / Drop",
    year: "2025",
    role: "Edit + Color",
    coverSrc: "/img/hero-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DOyy_XpD1Dd/",
  },
  {
    slug: "project-06",
    title: "Mic’d Moments",
    category: "Social / Hype",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/hero-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DMYkz9jzNXQ/",
  },
  {
    slug: "project-07",
    title: "Sideline Reactions",
    category: "Social / Hype",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/hero-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DMGVqUISj_E/",
  },
  {
    slug: "project-08",
    title: "Training Detail",
    category: "SDSU Athletics",
    year: "2024",
    role: "Shoot + Edit",
    coverSrc: "/img/hero-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DCFbVI9JWQZ/",
  },
];

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

  // Used for the A24-style /work wall (poster image)
  coverSrc: string;

  // Used for the home Spotlight Rail (fast still)
  posterSrc: string;

  // Optional: short mp4 preview loop for the Spotlight Rail
  // If you leave it undefined, it will show posterSrc only.
  previewSrc?: string;

  instagramUrl: string;
};

export const projects: Project[] = [
  {
    slug: "sdsu-hoops",
    title: "SDSU Hoops",
    category: "SDSU Athletics",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/frames/sdsu-hoops.jpg",
    posterSrc: "/img/frames/sdsu-hoops.jpg",
    previewSrc: "/video/previews/sdsu-hoops.mp4",
    instagramUrl: "https://www.instagram.com/p/DMqsa7STxqz/",
  },
  {
    slug: "game-day-energy",
    title: "Game Day Energy",
    category: "SDSU Athletics",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/frames/game-day-energy.jpg",
    posterSrc: "/img/frames/game-day-energy.jpg",
    previewSrc: "/video/previews/game-day-energy.mp4",
    instagramUrl: "https://www.instagram.com/p/DRxn1KkEi1_/",
  },
  {
    slug: "night-run",
    title: "Night Run",
    category: "Run Club",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/frames/night-run.jpg",
    posterSrc: "/img/frames/night-run.jpg",
    previewSrc: "/video/previews/night-run.mp4",
    instagramUrl: "https://www.instagram.com/p/DP9pVblEo7y/",
  },
  {
    slug: "pace-pack",
    title: "Pace Pack",
    category: "Run Club",
    year: "2024",
    role: "Shoot + Edit",
    coverSrc: "/img/frames/pace-pack.jpg",
    posterSrc: "/img/frames/pace-pack.jpg",
    previewSrc: "/video/previews/pace-pack.mp4",
    instagramUrl: "https://www.instagram.com/p/DJfInIlTo5I/",
  },
  {
    slug: "teaser-drop",
    title: "Teaser Drop",
    category: "Brand / Drop",
    year: "2025",
    role: "Edit + Color",
    coverSrc: "/img/frames/teaser-drop.jpg",
    posterSrc: "/img/frames/teaser-drop.jpg",
    previewSrc: "/video/previews/teaser-drop.mp4",
    instagramUrl: "https://www.instagram.com/p/DOyy_XpD1Dd/",
  },
  {
    slug: "micd-moments",
    title: "Mic’d Moments",
    category: "Social / Hype",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/frames/micd-moments.jpg",
    posterSrc: "/img/frames/micd-moments.jpg",
    previewSrc: "/video/previews/micd-moments.mp4",
    instagramUrl: "https://www.instagram.com/p/DMYkz9jzNXQ/",
  },
  {
    slug: "sideline-reactions",
    title: "Sideline Reactions",
    category: "Social / Hype",
    year: "2025",
    role: "Shoot + Edit",
    coverSrc: "/img/frames/sideline-reactions.jpg",
    posterSrc: "/img/frames/sideline-reactions.jpg",
    previewSrc: "/video/previews/sideline-reactions.mp4",
    instagramUrl: "https://www.instagram.com/p/DMGVqUISj_E/",
  },
  {
    slug: "training-detail",
    title: "Training Detail",
    category: "SDSU Athletics",
    year: "2024",
    role: "Shoot + Edit",
    coverSrc: "/img/frames/training-detail.jpg",
    posterSrc: "/img/frames/training-detail.jpg",
    previewSrc: "/video/previews/training-detail.mp4",
    instagramUrl: "https://www.instagram.com/p/DCFbVI9JWQZ/",
  },
];

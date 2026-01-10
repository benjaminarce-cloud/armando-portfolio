// lib/projects.ts

export type Project = {
  slug: string;
  title: string;
  year: number;
  category: string;
  role: string; // <-- ADD THIS
  coverSrc: string;
  coverAlt?: string;

  // Optional fields (safe to ignore if you don't use them yet)
  tags?: string[];
  client?: string;
  href?: string; // external link (optional)
};

export const projects: Project[] = [
  {
    slug: "nil-campaign",
    title: "NIL Campaign",
    category: "Campaign",
    role: "Director / Editor",
    year: 2025,
    coverSrc: "/img/files/NIL%20campaign.jpg",
    coverAlt: "NIL campaign still frame",
    tags: ["Social-first", "Sports"],
  },
  {
    slug: "run-club",
    title: "Run Club",
    category: "Run Culture",
    role: "Director / Editor",
    year: 2025,
    coverSrc: "/img/files/run%20club.jpg",
    coverAlt: "Run club still frame",
    tags: ["Community", "Lifestyle"],
  },
  {
    slug: "cam-ward",
    title: "Cam Ward",
    category: "Athlete Profile",
    role: "Director / Editor",
    year: 2025,
    coverSrc: "/img/files/cam%20ward.jpg",
    coverAlt: "Cam Ward still frame",
    tags: ["Profile", "Sports"],
  },
  {
    slug: "off-szn",
    title: "Off Szn",
    category: "Training",
    role: "Director / Editor",
    year: 2025,
    coverSrc: "/img/files/off%20szn.jpg",
    coverAlt: "Off season still frame",
    tags: ["Workout", "Sports"],
  },
  {
    slug: "recap",
    title: "Recap",
    category: "Recap",
    role: "Editor",
    year: 2025,
    coverSrc: "/img/files/recap.jpg",
    coverAlt: "Recap still frame",
    tags: ["Highlights", "Edit"],
  },
  {
    slug: "the-madness",
    title: "The Madness",
    category: "Game Day",
    role: "Director / Editor",
    year: 2025,
    coverSrc: "/img/files/the%20madness.jpg",
    coverAlt: "The madness still frame",
    tags: ["Energy", "Crowd"],
  },
  {
    slug: "basketball",
    title: "Basketball",
    category: "Sports Film",
    role: "Director / Editor",
    year: 2025,
    coverSrc: "/img/files/basketball.png",
    coverAlt: "Basketball still frame",
    tags: ["Hoops", "Cinematic"],
  },
];

// Alias in case other components import PROJECTS
export const PROJECTS = projects;

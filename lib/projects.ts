// lib/projects.ts

export type Project = {
  slug: string;
  title: string;
  year: number;
  coverSrc: string;
  coverAlt?: string;
  // Optional fields (safe to ignore if you don't use them yet)
  tags?: string[];
  client?: string;
  type?: string; // e.g., "Sports film", "Run culture", etc.
  href?: string; // external link (optional)
};

export const projects: Project[] = [
  {
    slug: "nil-campaign",
    title: "NIL Campaign",
    year: 2025,
    coverSrc: "/img/files/NIL%20campaign.jpg",
    coverAlt: "NIL campaign still frame",
    tags: ["Social-first", "Sports"],
  },
  {
    slug: "run-club",
    title: "Run Club",
    year: 2025,
    coverSrc: "/img/files/run%20club.jpg",
    coverAlt: "Run club still frame",
    tags: ["Run culture", "Community"],
  },
  {
    slug: "cam-ward",
    title: "Cam Ward",
    year: 2025,
    coverSrc: "/img/files/cam%20ward.jpg",
    coverAlt: "Cam Ward still frame",
    tags: ["Athlete", "Profile"],
  },
  {
    slug: "off-szn",
    title: "Off Szn",
    year: 2025,
    coverSrc: "/img/files/off%20szn.jpg",
    coverAlt: "Off season still frame",
    tags: ["Training", "Sports"],
  },
  {
    slug: "recap",
    title: "Recap",
    year: 2025,
    coverSrc: "/img/files/recap.jpg",
    coverAlt: "Recap still frame",
    tags: ["Highlights", "Edit"],
  },
  {
    slug: "the-madness",
    title: "The Madness",
    year: 2025,
    coverSrc: "/img/files/the%20madness.jpg",
    coverAlt: "The madness still frame",
    tags: ["Game day", "Energy"],
  },
  {
    slug: "basketball",
    title: "Basketball",
    year: 2025,
    coverSrc: "/img/files/basketball.png",
    coverAlt: "Basketball still frame",
    tags: ["Hoops", "Cinematic"],
  },
];

// Some components/projects might import PROJECTS instead of projects.
// This alias prevents more build errors if your codebase expects that name.
export const PROJECTS = projects;

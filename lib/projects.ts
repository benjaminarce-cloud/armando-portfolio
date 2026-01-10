// lib/projects.ts

export type Project = {
  slug: string;
  title: string;
  year: number;
  category: string;
  coverSrc: string;
  coverAlt?: string;

  // Used by SpotlightRail (optional, but your code expects it)
  previewSrc?: string;

  tags?: string[];
  client?: string;
  href?: string;
  role?: string; // add if /work page renders p.role
};

export const projects: Project[] = [
  {
    slug: "nil-campaign",
    title: "NIL Campaign",
    category: "Campaign",
    year: 2025,
    coverSrc: "/img/files/nil-campaign.jpg",
    coverAlt: "NIL campaign still frame",
    tags: ["Social-first", "Sports"],
  },
  {
    slug: "run-club",
    title: "Run Club",
    category: "Run Culture",
    year: 2025,
    coverSrc: "/img/files/run-club.jpg",
    coverAlt: "Run club still frame",
    tags: ["Community", "Lifestyle"],
  },
  {
    slug: "cam-ward",
    title: "Cam Ward",
    category: "Athlete Profile",
    year: 2025,
    coverSrc: "/img/files/cam-ward.jpg",
    coverAlt: "Cam Ward still frame",
    tags: ["Profile", "Sports"],
  },
  {
    slug: "off-szn",
    title: "Off Szn",
    category: "Training",
    year: 2025,
    coverSrc: "/img/files/off-szn.jpg",
    coverAlt: "Off season still frame",
    tags: ["Workout", "Sports"],
  },
  {
    slug: "recap",
    title: "Recap",
    category: "Recap",
    year: 2025,
    coverSrc: "/img/files/recap.jpg",
    coverAlt: "Recap still frame",
    tags: ["Highlights", "Edit"],
  },
  {
    slug: "the-madness",
    title: "The Madness",
    category: "Game Day",
    year: 2025,
    coverSrc: "/img/files/the-madness.jpg",
    coverAlt: "The madness still frame",
    tags: ["Energy", "Crowd"],
  },
  {
    slug: "basketball",
    title: "Basketball",
    category: "Sports Film",
    year: 2025,
    coverSrc: "/img/files/basketball.png",
    coverAlt: "Basketball still frame",
    tags: ["Hoops", "Cinematic"],
  },
  // Optional extra card if you want it:
  // {
  //   slug: "soccer",
  //   title: "Soccer",
  //   category: "Training",
  //   year: 2025,
  //   coverSrc: "/img/files/soccer.jpg",
  //   coverAlt: "Soccer still frame",
  // },
];

export const PROJECTS = projects;

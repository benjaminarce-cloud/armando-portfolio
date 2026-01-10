export type Project = {
  slug: string;
  title: string;
  year: string;
  tagline?: string;
  coverSrc: string; // <-- add this
  coverAlt?: string;
};

export const projects = [
  {
    slug: "nil-campaign",
    title: "NIL Campaign",
    year: "2024",
    coverSrc: "/img/files/NIL%20campaign.jpg",
  },
  {
    slug: "run-club",
    title: "Run Club",
    year: "2025",
    coverSrc: "/img/files/run%20club.jpg",
  },
  {
    slug: "cam-ward",
    title: "Cam Ward",
    year: "2025",
    coverSrc: "/img/files/cam%20ward.jpg",
  },
  {
    slug: "off-szn",
    title: "Off Szn",
    year: "2025",
    coverSrc: "/img/files/off%20szn.jpg",
  },
  {
    slug: "recap",
    title: "Recap",
    year: "2025",
    coverSrc: "/img/files/recap.jpg",
  },
  {
    slug: "the-madness",
    title: "The Madness",
    year: "2025",
    coverSrc: "/img/files/the%20madness.jpg",
  },
  {
    slug: "basketball",
    title: "Basketball",
    year: "2025",
    coverSrc: "/img/files/basketball.png",
  },
];
];

// lib/projects.ts
import type { GroupId } from "@/lib/workGroups";

export type Project = {
  slug: string;
  title: string;
  year: number;
  category: string;
  coverSrc: string;
  coverAlt?: string;

  // NEW
  group: GroupId;

  // Optional (Cloudinary URLs)
  previewSrc?: string; // hover mp4
  videoSrc?: string;   // full mp4
  role?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    slug: "basketball",
    title: "Basketball",
    category: "Sports Film",
    year: 2025,
    coverSrc: "/img/files/basketball.png",
    coverAlt: "Basketball still frame",
    tags: ["Hoops", "Cinematic"],
    group: "basketball",
    // previewSrc: "https://.../basketball-preview.mp4",
    // videoSrc: "https://.../basketball-full.mp4",
  },

  {
    slug: "nil-campaign",
    title: "NIL Campaign",
    category: "Campaign",
    year: 2025,
    coverSrc: "/img/files/nil-campaign.jpg",
    coverAlt: "NIL campaign still frame",
    tags: ["Social-first", "Sports"],
    group: "basketball", // <- choose the group for each project
  },

  {
    slug: "run-club",
    title: "Run Club",
    category: "Run Culture",
    year: 2025,
    coverSrc: "/img/files/run-club.jpg",
    coverAlt: "Run club still frame",
    tags: ["Community", "Lifestyle"],
    group: "freelance",
  },

  {
    slug: "recap",
    title: "Recap",
    category: "Recap",
    year: 2025,
    coverSrc: "/img/files/recap.jpg",
    coverAlt: "Recap still frame",
    tags: ["Highlights", "Edit"],
    group: "other",
  },
];

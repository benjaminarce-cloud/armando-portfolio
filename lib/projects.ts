// lib/projects.ts
import type { GroupId } from "@/lib/workGroups";

export type Project = {
  slug: string;
  title: string;
  year: number;
  category: string;
  coverSrc: string;
  coverAlt?: string;

  // grouping (for query param filtering)
  group: GroupId;

  // media
  previewSrc?: string; // hover mp4 (Cloudinary)
  videoSrc?: string; // full mp4 (later)

  role?: string;
  tags?: string[];
};

const CLOUD = "dzjcndphq";

// Prefer this format: no version hardcoding + auto optimize
const preview = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUD}/video/upload/f_auto,q_auto/${publicId}.mp4`;

// Posters:
// Put your poster jpg/png files in: public/img/posters/
// And name them EXACTLY like the slug (e.g. basketball-1.jpg, freelance-rc.jpg)
const poster = (slug: string) => `/img/posters/${slug}.jpg`;

export const projects: Project[] = [
  // --------------------
  // Basketball (20)
  // --------------------
  {
    slug: "basketball-1",
    title: "Basketball 1",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-1"),
    coverAlt: "Basketball 1 poster",
    previewSrc: preview("Basketball-1-preview_wwfslg"),
  },
  {
    slug: "basketball-2",
    title: "Basketball 2",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-2"),
    coverAlt: "Basketball 2 poster",
    previewSrc: preview("Basketball-2-preview_jsuyju"),
  },
  {
    slug: "basketball-3",
    title: "Basketball 3",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-3"),
    coverAlt: "Basketball 3 poster",
    previewSrc: preview("Basketball-3-preview_jnkhjs"),
  },
  {
    slug: "basketball-4",
    title: "Basketball 4",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-4"),
    coverAlt: "Basketball 4 poster",
    previewSrc: preview("Basketball-4-preview_v0qkcc"),
  },
  {
    slug: "basketball-5",
    title: "Basketball 5",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-5"),
    coverAlt: "Basketball 5 poster",
    previewSrc: preview("Basketball-5-preview_jhhaeu"),
  },
  {
    slug: "basketball-6",
    title: "Basketball 6",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-6"),
    coverAlt: "Basketball 6 poster",
    previewSrc: preview("Basketball-6-preview_ujmwqc"),
  },
  {
    slug: "basketball-7",
    title: "Basketball 7",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-7"),
    coverAlt: "Basketball 7 poster",
    previewSrc: preview("Basketball-7-preview_bpxogl"),
  },
  {
    slug: "basketball-8",
    title: "Basketball 8",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-8"),
    coverAlt: "Basketball 8 poster",
    previewSrc: preview("Basketball-8-preview_lkfq7c"),
  },
  {
    slug: "basketball-9",
    title: "Basketball 9",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-9"),
    coverAlt: "Basketball 9 poster",
    previewSrc: preview("Basketball-9-preview_z96l9c"),
  },
  {
    slug: "basketball-10",
    title: "Basketball 10",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-10"),
    coverAlt: "Basketball 10 poster",
    previewSrc: preview("Basketball-10-preview_qku9bv"),
  },
  {
    slug: "basketball-11",
    title: "Basketball 11",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-11"),
    coverAlt: "Basketball 11 poster",
    previewSrc: preview("Basketball-11-preview_a3i7ei"),
  },
  {
    slug: "basketball-13",
    title: "Basketball 13",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-13"),
    coverAlt: "Basketball 13 poster",
    previewSrc: preview("Basketball-13-preview_hgpzqc"),
  },
  {
    slug: "basketball-15",
    title: "Basketball 15",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-15"),
    coverAlt: "Basketball 15 poster",
    previewSrc: preview("Basketball-15-preview_md5hcj"),
  },
  {
    slug: "basketball-16",
    title: "Basketball 16",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-16"),
    coverAlt: "Basketball 16 poster",
    previewSrc: preview("Basketball-16-preview_mqtpel"),
  },
  {
    slug: "basketball-17",
    title: "Basketball 17",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-17"),
    coverAlt: "Basketball 17 poster",
    previewSrc: preview("Basketball-17-preview_mtmwnm"),
  },
  {
    slug: "basketball-18",
    title: "Basketball 18",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-18"),
    coverAlt: "Basketball 18 poster",
    previewSrc: preview("Basketball-18-preview_jbb1oi"),
  },
  {
    slug: "basketball-19",
    title: "Basketball 19",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-19"),
    coverAlt: "Basketball 19 poster",
    previewSrc: preview("Basketball-19-preview_ag30gn"),
  },
  {
    slug: "basketball-20",
    title: "Basketball 20",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: poster("basketball-20"),
    coverAlt: "Basketball 20 poster",
    previewSrc: preview("basketball-20-preview_tpj633"),
  },

  // --------------------
  // Freelance (6)
  // --------------------
  {
    slug: "freelance-1",
    title: "Freelance 1",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: poster("freelance-1"),
    coverAlt: "Freelance 1 poster",
    previewSrc: preview("freelance-1-preview_zxwodg"),
  },
  {
    slug: "freelance-coloradofb",
    title: "Colorado FB",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: poster("freelance-coloradofb"),
    coverAlt: "Colorado FB poster",
    previewSrc: preview("freelance-coloradofb-preview_yldpnv"),
  },
  {
    slug: "freelance-rc",
    title: "Run Club",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: poster("freelance-rc"),
    coverAlt: "Freelance run club poster",
    previewSrc: preview("freelance-rc-preview_cwskb0"),
  },
  {
    slug: "freelance-rc-2",
    title: "Run Club 2",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: poster("freelance-rc-2"),
    coverAlt: "Freelance run club 2 poster",
    previewSrc: preview("freelance-rc-2-preview_wmffop"),
  },
  {
    slug: "freelance-rc-3",
    title: "Run Club 3",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: poster("freelance-rc-3"),
    coverAlt: "Freelance run club 3 poster",
    previewSrc: preview("freelance-rc-3-preview_ni4bwe"),
  },
  {
    slug: "freelance-soccer",
    title: "Soccer",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: poster("freelance-soccer"),
    coverAlt: "Freelance soccer poster",
    previewSrc: preview("freelance-soccer-preview_hz5tym"),
  },
  {
    slug: "freelance-soccer-2",
    title: "Soccer 2",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: poster("freelance-soccer-2"),
    coverAlt: "Freelance soccer 2 poster",
    previewSrc: preview("freelance-soccer-2-preview_pg5u0j"),
  },

  // --------------------
  // Other (4)
  // --------------------
  {
    slug: "other-track",
    title: "Track",
    category: "Other",
    year: 2025,
    group: "other",
    coverSrc: poster("other-track"),
    coverAlt: "Track poster",
    previewSrc: preview("other-track-preview_o1vvmx"),
  },
  {
    slug: "other-track-2",
    title: "Track 2",
    category: "Other",
    year: 2025,
    group: "other",
    coverSrc: poster("other-track-2"),
    coverAlt: "Track 2 poster",
    previewSrc: preview("other-track-2-preview_dktqw2"),
  },
  {
    slug: "other-sorority",
    title: "Sorority",
    category: "Other",
    year: 2025,
    group: "other",
    coverSrc: poster("other-sorority"),
    coverAlt: "Sorority poster",
    previewSrc: preview("other-sorority-preview_znlgh8"),
  },
  {
    slug: "other-sor-2",
    title: "Sorority 2",
    category: "Other",
    year: 2025,
    group: "other",
    coverSrc: poster("other-sor-2"),
    coverAlt: "Sorority 2 poster",
    previewSrc: preview("other-sor-2-preview_ljjvaw"),
  },
];

export const PROJECTS = projects;

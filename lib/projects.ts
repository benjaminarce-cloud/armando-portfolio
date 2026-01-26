import type { GroupId } from "@/lib/workGroups";

export type Project = {
  slug: string;
  title: string;
  year: number;
  category: string;
  coverSrc: string;
  coverAlt?: string;
  group: GroupId;
  previewSrc?: string;
  videoSrc?: string;
  role?: string;
  tags?: string[];
};

const CLOUD = "dzjcndphq";

const video = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUD}/video/upload/f_auto,q_auto/${publicId}.mp4`;

const image = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto/${publicId}.jpg`;

export const projects: Project[] = [
  // BASKETBALL - Reordered by priority (1, 2, 3, 4, 5, then rest)
  
  // Priority 1
  {
    slug: "basketball-7",
    title: "Season Hype Video",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_2.0,f_jpg,q_auto,w_1200/Basketball-7_1080p_gmi1a2.jpg",
    previewSrc: video("Basketball-7-preview_bpxogl"),
    videoSrc: video("Basketball-7_1080p_gmi1a2"),
  },
  
  // Priority 2
  {
    slug: "basketball-15",
    title: "2024-2025 Intro Video",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: image("Basketball-15-poster_t0jacv"),
    previewSrc: video("Basketball-15-preview_md5hcj"),
    videoSrc: video("Basketball-15_1080p-cld_kt3fav"),
  },
  
  // Priority 3
  {
    slug: "basketball-8",
    title: "Miles Byrd Spotlight",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: image("Basketball-8-poster_urzpi3"),
    previewSrc: video("Basketball-8-preview_lkfq7c"),
    videoSrc: video("Basketball-8_1080p_lzfpww"),
  },
  
  // Priority 4
  {
    slug: "basketball-6",
    title: "Magoon Gwath Spotlight",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_61.0,f_jpg,q_auto,w_1200/Basketball-6_1080p_mqnads.jpg",
    previewSrc: video("Basketball-6-preview_ujmwqc"),
    videoSrc: video("Basketball-6_1080p_mqnads"),
  },
  
  // Priority 5
  {
    slug: "basketball-4",
    title: "March Madness",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: image("Basketball-4-poster_jptibu"),
    previewSrc: video("Basketball-4-preview_v0qkcc"),
    videoSrc: video("Basketball-4_1080p_sed2zh"),
  },
  
  // Rest in original order
  {
    slug: "basketball-1",
    title: "Blackout Promo",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_13.0,f_jpg,q_auto,w_1200/Basketball-1_1080p_fqfho5.jpg",
    previewSrc: video("Basketball-1-preview_wwfslg"),
    videoSrc: video("Basketball-1_1080p_fqfho5"),
  },
  {
    slug: "basketball-2",
    title: "Slow Dunk",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: image("Basketball-2-poster_rde4sk"),
    previewSrc: video("Basketball-2-preview_jsuyju"),
    videoSrc: video("Basketball-2_1080p_blfdee"),
  },
  {
    slug: "basketball-3",
    title: "Freshman Spotlight",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: image("Basketball-3-poster_sn3mka"),
    previewSrc: video("Basketball-3-preview_jnkhjs"),
    videoSrc: video("Basketball-3_1080p_agbxb7"),
  },
  {
    slug: "basketball-5",
    title: "Basketball Stills",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: image("Basketball-5-poster_uepeqj"),
    previewSrc: video("Basketball-5-preview_jhhaeu"),
    videoSrc: video("Basketball-5_1080p_qfrl2n"),
  },
  {
    slug: "basketball-9",
    title: "Practice Recap",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_5.0,f_jpg,q_auto,w_1200/Basketball-9_1080p_qzinxm.jpg",
    previewSrc: video("Basketball-9-preview_z96l9c"),
    videoSrc: video("Basketball-9_1080p_qzinxm"),
  },
  {
    slug: "basketball-10",
    title: "The Off Season",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: image("Basketball-10-poster_edzh45"),
    previewSrc: video("Basketball-10-preview_qku9bv"),
    videoSrc: video("Basketball-10_1080p_mifnpi"),
  },
  {
    slug: "basketball-11",
    title: "Offszn Recap",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: image("Basketball-11-poster_zd3cpr"),
    previewSrc: video("Basketball-11-preview_a3i7ei"),
    videoSrc: video("Basketball-11_1080p_h7ypik"),
  },
  {
    slug: "basketball-13",
    title: "Practice Recap",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: image("Basketball-13-poster_a8jhak"),
    previewSrc: video("Basketball-13-preview_hgpzqc"),
    videoSrc: video("Basketball-13_1080p_vyk24e"),
  },
  {
    slug: "basketball-16",
    title: "San Jose State Recap",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_44.0,f_jpg,q_auto,w_1200/Basketball-16_1080p_mntob2.jpg",
    previewSrc: video("Basketball-16-preview_mqtpel"),
    videoSrc: video("Basketball-16_1080p_mntob2"),
  },
  {
    slug: "basketball-17",
    title: "Nevada Shoot Around",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_3.0,f_jpg,q_auto,w_1200/Basketball-17_1080p_fd6pwn.jpg",
    previewSrc: video("Basketball-17-preview_mtmwnm"),
    videoSrc: video("Basketball-17_1080p_fd6pwn"),
  },
  {
    slug: "basketball-18",
    title: "Suits NIL",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_2.0,f_jpg,q_auto,w_1200/Basketball-18_1080p-cld_vnbdjv.jpg",
    previewSrc: video("Basketball-18-preview_jbb1oi"),
    videoSrc: video("Basketball-18_1080p-cld_vnbdjv"),
  },
  {
    slug: "basketball-19",
    title: "VHS Practice Recap",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_37.0,f_jpg,q_auto,w_1200/Basketball-19_1080p_swyu1d.jpg",
    previewSrc: video("Basketball-19-preview_ag30gn"),
    videoSrc: video("Basketball-19_1080p_swyu1d"),
  },
  {
    slug: "basketball-20",
    title: "Aztecs in the Community",
    category: "Basketball",
    year: 2025,
    group: "basketball",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_27.0,f_jpg,q_auto,w_1200/basketball-20_1080p_iscfmp.jpg",
    previewSrc: video("basketball-20-preview_tpj633"),
    videoSrc: video("basketball-20_1080p_iscfmp"),
  },

  // FREELANCE - Reordered with Cam Ward spotlight as priority 1
  
  // Priority 1
  {
    slug: "freelance-1",
    title: "Cam Ward Spotlight",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_15.0,f_jpg,q_auto,w_1200/freelance-1_1080p_tu1tge.jpg",
    previewSrc: video("freelance-1-preview_zxwodg"),
    videoSrc: video("freelance-1_1080p_tu1tge"),
  },
  
  // Rest in original order
  {
    slug: "freelance-coloradofb",
    title: "Colorado FB Recap",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_9.0,f_jpg,q_auto,w_1200/freelance-coloradofb_1080p-cld_rdxe0p.jpg",
    previewSrc: video("freelance-coloradofb-preview_yldpnv"),
    videoSrc: video("freelance-coloradofb_1080p-cld_rdxe0p"),
  },
  {
    slug: "freelance-rc",
    title: "Strictly Run Club Finale",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_4.0,f_jpg,q_auto,w_1200/freelance-rc_1080p_mkhazb.jpg",
    previewSrc: video("freelance-rc-preview_cwskb0"),
    videoSrc: video("freelance-rc_1080p_mkhazb"),
  },
  {
    slug: "freelance-rc-2",
    title: "Strictly Run Club Finale Year 2",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: image("freelance-rc-2-poster_azc73t"),
    previewSrc: video("freelance-rc-2-preview_wmffop"),
    videoSrc: video("freelance-rc-2_1080p-cld_kwb94m"),
  },
  {
    slug: "freelance-rc-3",
    title: "Run Club in the Sky",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_6.0,f_jpg,q_auto,w_1200/freelance-rc-3_1080p-cld_v6enki.jpg",
    previewSrc: video("freelance-rc-3-preview_ni4bwe"),
    videoSrc: video("freelance-rc-3_1080p-cld_v6enki"),
  },
  {
    slug: "freelance-soccer",
    title: "San Diego FC Game",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: "https://res.cloudinary.com/dzjcndphq/video/upload/so_5.0,f_jpg,q_auto,w_1200/freelance-soccer_1080p_b2tpmg.jpg",
    previewSrc: video("freelance-soccer-preview_hz5tym"),
    videoSrc: video("freelance-soccer_1080p_b2tpmg"),
  },
  {
    slug: "freelance-soccer-2",
    title: "San Diego FC Cinematics",
    category: "Freelance",
    year: 2025,
    group: "freelance",
    coverSrc: image("freelance-soccer-2-poster_mmozmu"),
    previewSrc: video("freelance-soccer-2-preview_pg5u0j"),
    videoSrc: video("freelance-soccer-2_1080p_l44hnp"),
  },

  // OTHER - Only 4 projects
  {
    slug: "other-track",
    title: "Track and Field Media Day (Director's Cut)",
    category: "Other",
    year: 2025,
    group: "other",
    coverSrc: image("other-track-poster_ea6u2s"),
    previewSrc: video("other-track-preview_o1vvmx"),
    videoSrc: video("other-track_1080p_s1zdb6"),
  },
  {
    slug: "other-track-2",
    title: "Track and Field Media Day",
    category: "Other",
    year: 2025,
    group: "other",
    coverSrc: image("other-track-2-poster_puhn7b"),
    previewSrc: video("other-track-2-preview_dktqw2"),
    videoSrc: video("other-track-2_1080p_cfrfja"),
  },
  {
    slug: "other-sorority",
    title: "AXO Big Little Reveal",
    category: "Other",
    year: 2025,
    group: "other",
    coverSrc: image("other-sorority-poster_cbwetw"),
    previewSrc: video("other-sorority-preview_znlgh8"),
    videoSrc: video("other-sorority_1080p_rtjvpc"),
  },
  {
    slug: "other-sor-2",
    title: "AXO Fall Rush 2025",
    category: "Other",
    year: 2025,
    group: "other",
    coverSrc: image("other-sor-2-poster_bdbxme"),
    previewSrc: video("other-sor-2-preview_ljjvaw"),
    videoSrc: video("other-sor-2_1080p-cld_uioh2u"),
  },
];

export const PROJECTS = projects;

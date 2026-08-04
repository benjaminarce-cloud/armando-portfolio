export type Tab = {
  label: string;
  href: string;
};

/**
 * Three tabs, as asked: Video, Photo, Me. Socials keeps its page but is
 * reached from the footer and from /me rather than taking a fourth slot.
 */
export const TABS: Tab[] = [
  { label: "Video", href: "/video" },
  { label: "Photo", href: "/photo" },
  { label: "Me", href: "/me" },
];

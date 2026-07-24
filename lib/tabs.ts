export type Tab = {
  label: string;
  href: string;
};

/** The content sections. The home page is his info — reached via the wordmark. */
export const TABS: Tab[] = [
  { label: "Photo", href: "/photo" },
  { label: "Video", href: "/video" },
  { label: "Socials", href: "/socials" },
];

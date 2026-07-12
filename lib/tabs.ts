export type Tab = {
  label: string;
  href: string;
};

/** The whole site. The landing page is nothing but this list. */
export const TABS: Tab[] = [
  { label: "Photo", href: "/photo" },
  { label: "Video", href: "/video" },
  { label: "Contact", href: "/contact" },
  { label: "Socials", href: "/socials" },
];

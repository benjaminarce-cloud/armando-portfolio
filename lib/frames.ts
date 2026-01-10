export type FrameItem = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  imageSrc: string;
  imageAlt: string;
  href: string; // internal link (we’ll build /work next)
  igUrl?: string; // optional: link out to Instagram
};

export const selectedFrames: FrameItem[] = [
  {
    id: "sdsu-hoops-01",
    title: "SDSU Hoops",
    subtitle: "Game day • tunnel energy • quick cuts",
    year: "2025",
    imageSrc: "/img/hero-poster.jpg",
    imageAlt: "SDSU hoops cinematic still frame",
    href: "/work#sdsu-hoops",
    igUrl: "https://instagram.com/armandoaguilare",
  },
  {
    id: "run-club-01",
    title: "Run Club",
    subtitle: "Pack shots • street light • cadence",
    year: "2025",
    imageSrc: "/img/hero-poster.jpg",
    imageAlt: "Running club cinematic still frame",
    href: "/work#run-club",
    igUrl: "https://instagram.com/armandoaguilare",
  },
  {
    id: "brand-drop-01",
    title: "Brand Drop",
    subtitle: "Tease • texture • product motion",
    year: "2024",
    imageSrc: "/img/hero-poster.jpg",
    imageAlt: "Brand drop cinematic still frame",
    href: "/work#brand-drop",
    igUrl: "https://instagram.com/armandoaguilare",
  },
  {
    id: "sideline-01",
    title: "Sideline",
    subtitle: "Handheld • grit • real reactions",
    year: "2024",
    imageSrc: "/img/hero-poster.jpg",
    imageAlt: "Sideline documentary style frame",
    href: "/work#sideline",
    igUrl: "https://instagram.com/armandoaguilare",
  },
  {
    id: "training-01",
    title: "Training Day",
    subtitle: "Slow shutter • sweat • detail",
    year: "2025",
    imageSrc: "/img/hero-poster.jpg",
    imageAlt: "Training cinematic still frame",
    href: "/work#training",
    igUrl: "https://instagram.com/armandoaguilare",
  },
  {
    id: "crowd-01",
    title: "Crowd Noise",
    subtitle: "Wide lenses • chaos • emotion",
    year: "2025",
    imageSrc: "/img/hero-poster.jpg",
    imageAlt: "Crowd cinematic still frame",
    href: "/work#crowd",
    igUrl: "https://instagram.com/armandoaguilare",
  },
];

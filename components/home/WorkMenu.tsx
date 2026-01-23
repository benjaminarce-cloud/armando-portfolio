"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SECTIONS = [
  {
    id: "basketball",
    title: "Basketball",
    href: "/work?group=basketball",
    // Replace with your actual hero still URL
    image: "https://res.cloudinary.com/dzjcndphq/image/upload/f_auto,q_auto,w_1920/Basketball-3-poster.jpg",
  },
  {
    id: "freelance",
    title: "Freelance",
    href: "/work?group=freelance",
    // Replace with your actual hero still URL
    image: "https://res.cloudinary.com/dzjcndphq/image/upload/f_auto,q_auto,w_1920/freelance-1-poster.jpg",
  },
  {
    id: "other",
    title: "Other",
    href: "/work?group=other",
    // Replace with your actual hero still URL
    image: "https://res.cloudinary.com/dzjcndphq/image/upload/f_auto,q_auto,w_1920/other-track-poster.jpg",
  },
];

function WorkSection({ section, index }: { section: typeof SECTIONS[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height + window.innerHeight);
      setOffsetY(scrollProgress * 100); // Parallax effect
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link href={section.href}>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            transform: `translateY(${offsetY * 0.3}px) scale(${isHovered ? 1.02 : 1})`,
          }}
        >
          <Image
            src={section.image}
            alt={section.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
            quality={90}
          />
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <h2 
              className="editorial-title text-[clamp(80px,12vw,180px)] leading-[0.9] tracking-[-0.04em] text-white transition-opacity duration-500"
              style={{
                textShadow: "0 4px 24px rgba(0,0,0,0.5)",
                opacity: isHovered ? 0.95 : 1,
              }}
            >
              {section.title}
            </h2>
            
            <div 
              className="mt-8 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.32em] text-white/80 transition-opacity duration-500"
              style={{
                opacity: isHovered ? 1 : 0.7,
              }}
            >
              <span className="h-px w-12 bg-white/60" />
              <span>View Projects</span>
              <span className="h-px w-12 bg-white/60" />
            </div>
          </div>
        </div>

        {/* Subtle hover indicator */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 transition-transform duration-500 origin-left"
          style={{
            transform: `scaleX(${isHovered ? 1 : 0})`,
          }}
        />
      </section>
    </Link>
  );
}

export function WorkMenu() {
  return (
    <div className="relative">
      {SECTIONS.map((section, index) => (
        <WorkSection key={section.id} section={section} index={index} />
      ))}
    </div>
  );
}

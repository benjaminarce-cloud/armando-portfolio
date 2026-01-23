"use client";

import { useEffect, useRef, useState } from "react";

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
    <a href={section.href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <section
        ref={sectionRef}
        className="relative overflow-hidden cursor-pointer"
        style={{ height: '100vh', width: '100%' }}
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
          <img
            src={section.image}
            alt={section.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          
          {/* Dark overlay for text readability */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
            }}
          />
          
          {/* Vignette */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, black 100%)',
              opacity: 0.4,
            }}
          />
        </div>

        {/* Content */}
        <div 
          className="relative flex items-center justify-center"
          style={{ 
            zIndex: 10,
            height: '100%',
          }}
        >
          <div className="text-center">
            <h2 
              className="editorial-title text-white transition-opacity duration-500"
              style={{
                fontSize: 'clamp(80px, 12vw, 180px)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                opacity: isHovered ? 0.95 : 1,
              }}
            >
              {section.title}
            </h2>
            
            <div 
              className="flex items-center justify-center gap-3 text-white transition-opacity duration-500"
              style={{
                marginTop: '2rem',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.32em',
                opacity: isHovered ? 1 : 0.7,
              }}
            >
              <span style={{ height: '1px', width: '48px', background: 'rgba(255,255,255,0.6)' }} />
              <span>View Projects</span>
              <span style={{ height: '1px', width: '48px', background: 'rgba(255,255,255,0.6)' }} />
            </div>
          </div>
        </div>

        {/* Subtle hover indicator */}
        <div 
          className="absolute bottom-0 left-0 right-0 transition-transform duration-500"
          style={{
            height: '4px',
            background: 'rgba(255,255,255,0.2)',
            transform: `scaleX(${isHovered ? 1 : 0})`,
            transformOrigin: 'left',
          }}
        />
      </section>
    </a>
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

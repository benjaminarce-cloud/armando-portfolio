"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const CLOUD_NAME = "dzjcndphq";

// Generate Cloudinary URLs for all 35 photos
const PHOTOS = Array.from({ length: 35 }, (_, i) => 
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_800/about-${i + 1}.jpg`
);

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function LifePhotosGrid() {
  const [currentBatch, setCurrentBatch] = useState<string[]>([]);
  const [shuffledPhotos, setShuffledPhotos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize shuffled photos on mount
  useEffect(() => {
    const shuffled = shuffleArray(PHOTOS);
    setShuffledPhotos(shuffled);
    setCurrentBatch(shuffled.slice(0, 6));
  }, []);

  // Rotation logic - slower, more deliberate (8 seconds)
  useEffect(() => {
    if (shuffledPhotos.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        const nextIndex = currentIndex + 6;
        
        // If we've shown all photos, reshuffle and start over
        if (nextIndex >= shuffledPhotos.length) {
          const reshuffled = shuffleArray(PHOTOS);
          setShuffledPhotos(reshuffled);
          setCurrentBatch(reshuffled.slice(0, 6));
          setCurrentIndex(0);
        } else {
          setCurrentBatch(shuffledPhotos.slice(nextIndex, nextIndex + 6));
          setCurrentIndex(nextIndex);
        }

        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 800);
    }, 8000); // 8 second intervals

    return () => clearInterval(interval);
  }, [shuffledPhotos, currentIndex]);

  if (currentBatch.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {currentBatch.map((photo, i) => (
        <div
          key={`${photo}-${i}`}
          className={[
            "relative aspect-[3/2] overflow-hidden bg-[color:var(--page-card)]",
            "transition-opacity duration-[800ms] ease-out",
            isTransitioning ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <Image
            src={photo}
            alt=""
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 300px"
            className="object-cover"
            style={{
              filter: "saturate(0.88) contrast(1.02)",
            }}
          />
          {/* Subtle vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-black/4 opacity-60" />
        </div>
      ))}
    </div>
  );
}

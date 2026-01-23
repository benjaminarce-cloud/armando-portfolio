"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PHOTOS = Array.from({ length: 35 }, (_, i) => `/img/about/about-${i + 1}.jpg`);

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
    setCurrentBatch(shuffled.slice(0, 4));
  }, []);

  // Rotation logic
  useEffect(() => {
    if (shuffledPhotos.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        const nextIndex = currentIndex + 4;
        
        // If we've shown all photos, reshuffle and start over
        if (nextIndex >= shuffledPhotos.length) {
          const reshuffled = shuffleArray(PHOTOS);
          setShuffledPhotos(reshuffled);
          setCurrentBatch(reshuffled.slice(0, 4));
          setCurrentIndex(0);
        } else {
          setCurrentBatch(shuffledPhotos.slice(nextIndex, nextIndex + 4));
          setCurrentIndex(nextIndex);
        }

        setTimeout(() => {
          setIsTransitioning(false);
        }, 200);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [shuffledPhotos, currentIndex]);

  if (currentBatch.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {currentBatch.map((photo, i) => (
        <div
          key={`${photo}-${i}`}
          className={[
            "relative aspect-[4/3] overflow-hidden rounded-2xl border border-[color:var(--page-border)] bg-[color:var(--page-card)]",
            "transition-opacity duration-[600ms] ease-out",
            isTransitioning ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <Image
            src={photo}
            alt={`Life photo ${i + 1}`}
            fill
            sizes="(max-width: 1024px) 50vw, 20vw"
            className="object-cover"
            style={{
              filter: "saturate(0.85)",
            }}
          />
          {/* Subtle film grain overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-40" />
        </div>
      ))}
    </div>
  );
}

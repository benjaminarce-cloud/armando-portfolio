"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const CLOUD_NAME = "dzjcndphq";

// Exclude photos that are duplicates/don't fit
const EXCLUDED_PHOTOS = [6, 7, 29, 31, 32];

// Generate exactly 30 photos for clean 3×2 grid rotation (5 complete cycles)
const PHOTOS = Array.from({ length: 35 }, (_, i) => i + 1)
  .filter(num => !EXCLUDED_PHOTOS.includes(num))
  .slice(0, 30) // Take exactly 30 photos
  .map(num => 
    `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_400,c_fill,ar_3:2/about-${num}.jpg`
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
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

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
      setImagesLoaded(new Set()); // Reset loaded state for new batch

      setTimeout(() => {
        const nextIndex = currentIndex + 6;
        
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
    }, 8000);

    return () => clearInterval(interval);
  }, [shuffledPhotos, currentIndex]);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => new Set(prev).add(index));
  };

  const handleImageError = (photoUrl: string) => {
    // Extract the photo number from URL
    const match = photoUrl.match(/about-(\d+)\.jpg/);
    const photoNumber = match ? match[1] : 'unknown';
    
    console.error(`❌ Failed to load: about-${photoNumber}.jpg`);
    console.error(`Full URL: ${photoUrl}`);
    
    setFailedImages(prev => new Set(prev).add(photoUrl));
  };

  // Filter out failed images from current batch
  const validBatch = currentBatch.filter(photo => !failedImages.has(photo));

  if (validBatch.length === 0) {
    // Loading skeleton
    return (
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative aspect-[3/2] overflow-hidden bg-[color:var(--page-card)] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {validBatch.map((photo, i) => (
        <div
          key={`${photo}-${i}`}
          className={[
            "relative aspect-[3/2] overflow-hidden bg-[color:var(--page-card)]",
            "transition-opacity duration-[800ms] ease-out",
            isTransitioning ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          {/* Loading skeleton */}
          {!imagesLoaded.has(i) && (
            <div className="absolute inset-0 bg-[color:var(--page-card)] animate-pulse" />
          )}
          
          <Image
            src={photo}
            alt=""
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 300px"
            className={[
              "object-cover transition-opacity duration-500",
              imagesLoaded.has(i) ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
              filter: "saturate(0.88) contrast(1.02)",
            }}
            onLoad={() => handleImageLoad(i)}
            onError={() => handleImageError(photo)}
            priority={i < 6} // Priority load first batch
          />
          
          {/* Subtle vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-black/4 opacity-60" />
        </div>
      ))}
    </div>
  );
}

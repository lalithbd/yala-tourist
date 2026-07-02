"use client";

import { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import type { CloudinaryMediaRef } from "@/types";

interface HeroBannerProps {
  heroBanner?: CloudinaryMediaRef | null;
  heroImages?: CloudinaryMediaRef[];
  siteName?: string;
  tagline?: string;
}

export default function HeroBanner({
  heroBanner,
  heroImages,
  siteName,
  tagline,
}: HeroBannerProps) {
  const images = heroImages && heroImages.length > 0
    ? heroImages
    : heroBanner?.publicId
      ? [heroBanner]
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length > 0) {
    return (
      <section className="relative w-full overflow-hidden bg-gray-900">
        <div className="relative h-[60vh] min-h-[400px]">
          {images.map((img, index) => (
            <div
              key={img.publicId}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <CldImage
                src={img.publicId}
                alt={img.altText ?? `Hero image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                format="auto"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center">
              {siteName && (
                <h1 className="text-4xl font-bold text-white md:text-6xl">
                  {siteName}
                </h1>
              )}
              {tagline && (
                <p className="mt-4 text-lg text-white/90 md:text-2xl">
                  {tagline}
                </p>
              )}
            </div>
          </div>
          {/* Slide indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-[40vh] items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          {siteName ?? "Tourist Website"}
        </h1>
        <p className="mt-4 text-lg text-white/90 md:text-2xl">
          {tagline ?? "Discover amazing travel destinations"}
        </p>
      </div>
    </section>
  );
}

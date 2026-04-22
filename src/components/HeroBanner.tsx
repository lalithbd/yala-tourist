"use client";

import { CldImage } from "next-cloudinary";
import type { CloudinaryMediaRef } from "@/types";

interface HeroBannerProps {
  heroBanner?: CloudinaryMediaRef | null;
  siteName?: string;
  tagline?: string;
}

export default function HeroBanner({
  heroBanner,
  siteName,
  tagline,
}: HeroBannerProps) {
  if (heroBanner?.publicId) {
    return (
      <section className="relative w-full overflow-hidden bg-gray-900">
        <div className="relative h-[60vh] min-h-[400px]">
          <CldImage
            src={heroBanner.publicId}
            alt={heroBanner.altText ?? "Hero banner"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            format="auto"
          />
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

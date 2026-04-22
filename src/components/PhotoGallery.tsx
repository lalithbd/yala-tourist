"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import type { MediaItem } from "@/types";
import Lightbox from "./Lightbox";

type PhotoItem = MediaItem & { mediaType: "photo" };

interface PhotoGalleryProps {
  photos: PhotoItem[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <p className="text-center text-gray-500">No photos available.</p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo._key}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`View ${photo.altText ?? photo.title}`}
          >
            <CldImage
              src={photo.cloudinaryPublicId}
              alt={photo.altText ?? photo.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              format="auto"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos.map((p) => ({
            cloudinaryPublicId: p.cloudinaryPublicId,
            altText: p.altText,
            caption: p.caption,
          }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </>
  );
}

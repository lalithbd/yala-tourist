"use client";

import { useState, useMemo } from "react";
import { CldImage } from "next-cloudinary";
import type { MediaItem } from "@/types";
import Lightbox from "./Lightbox";
import VideoPlayer from "./VideoPlayer";

type FilterType = "all" | "photo" | "video";

interface MixedMediaGalleryProps {
  items: MediaItem[];
}

export function filterMediaItems(
  items: MediaItem[],
  filter: FilterType
): MediaItem[] {
  if (filter === "all") return items;
  return items.filter((item) => item.mediaType === filter);
}

export default function MixedMediaGallery({ items }: MixedMediaGalleryProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const filteredItems = useMemo(
    () => filterMediaItems(items, filter),
    [items, filter]
  );

  const photos = useMemo(
    () => filteredItems.filter((item) => item.mediaType === "photo"),
    [filteredItems]
  );

  const handlePhotoClick = (item: MediaItem) => {
    const photoIndex = photos.findIndex((p) => p._key === item._key);
    if (photoIndex !== -1) {
      setLightboxIndex(photoIndex);
    }
  };

  const handleVideoClick = (item: MediaItem) => {
    setActiveVideoId(activeVideoId === item._key ? null : item._key);
  };

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Photos Only", value: "photo" },
    { label: "Videos Only", value: "video" },
  ];

  if (items.length === 0) {
    return <p className="text-center text-gray-500">No media available.</p>;
  }

  return (
    <div>
      {/* Filter controls */}
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter media by type">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === btn.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-pressed={filter === btn.value}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500">
          No {filter === "photo" ? "photos" : "videos"} available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div key={item._key}>
              {item.mediaType === "video" && activeVideoId === item._key ? (
                <div>
                  <VideoPlayer
                    publicId={item.cloudinaryPublicId}
                    title={item.title}
                  />
                  <button
                    onClick={() => setActiveVideoId(null)}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    Close video
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    item.mediaType === "photo"
                      ? handlePhotoClick(item)
                      : handleVideoClick(item)
                  }
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`${item.mediaType === "photo" ? "Photo" : "Video"}: ${item.title}`}
                >
                  <CldImage
                    src={item.cloudinaryPublicId}
                    alt={item.altText ?? item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    format="auto"
                  />
                  {/* Play icon overlay for videos */}
                  {item.mediaType === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-14 w-14 text-white drop-shadow-lg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox for photos */}
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
    </div>
  );
}

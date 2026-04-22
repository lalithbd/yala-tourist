"use client";

import { useState } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

interface VideoPlayerProps {
  publicId: string;
  title: string;
  thumbnailPublicId?: string;
}

export default function VideoPlayer({
  publicId,
  title,
  thumbnailPublicId,
}: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100 text-gray-500">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-2 h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm font-medium">Video is currently unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CldVideoPlayer
        width="1920"
        height="1080"
        src={publicId}
        autoplay={false}
        sourceTypes={["hls"]}
        transformation={{
          streaming_profile: "auto",
        }}
        onError={() => setHasError(true)}
        {...(thumbnailPublicId ? { poster: thumbnailPublicId } : {})}
      />
      <p className="mt-2 text-sm font-medium text-gray-700">{title}</p>
    </div>
  );
}

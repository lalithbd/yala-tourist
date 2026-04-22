"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";

interface DestinationCardProps {
  name: string;
  slug: string;
  shortDescription: string;
  featuredImagePublicId: string;
}

export default function DestinationCard({
  name,
  slug,
  shortDescription,
  featuredImagePublicId,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <CldImage
          src={featuredImagePublicId}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          format="auto"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {shortDescription}
        </p>
      </div>
    </Link>
  );
}

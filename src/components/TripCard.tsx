"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";

interface TripCardProps {
  name: string;
  slug: string;
  duration: string;
  shortDescription: string;
  featuredImagePublicId?: string;
  price?: string;
}

export default function TripCard({
  name,
  slug,
  duration,
  shortDescription,
  featuredImagePublicId,
  price,
}: TripCardProps) {
  return (
    <Link
      href={`/trips/${slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {featuredImagePublicId ? (
          <CldImage
            src={featuredImagePublicId}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            format="auto"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
          {duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {shortDescription}
        </p>
        {price && (
          <p className="mt-2 text-sm font-medium text-blue-600">{price}</p>
        )}
      </div>
    </Link>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { TRIP_BY_SLUG_QUERY, TRIPS_QUERY } from "@/lib/sanity/queries";
import type { TripOption } from "@/types";
import { buildCloudinaryUrl } from "@/lib/cloudinary/utils";
import DestinationCard from "@/components/DestinationCard";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: trip } = await sanityFetch<TripOption>(TRIP_BY_SLUG_QUERY, {
    slug,
  });

  if (!trip) {
    return { title: "Trip Not Found" };
  }

  const ogImageUrl = trip.featuredImage?.publicId
    ? buildCloudinaryUrl(trip.featuredImage.publicId)
    : undefined;

  return {
    title: trip.name,
    description: trip.shortDescription,
    openGraph: {
      title: trip.name,
      description: trip.shortDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
      url: `/trips/${trip.slug.current}`,
    },
  };
}

export async function generateStaticParams() {
  const { data: trips } = await sanityFetch<TripOption[]>(TRIPS_QUERY);

  if (!trips) return [];

  return trips.map((trip) => ({
    slug: trip.slug.current,
  }));
}

export default async function TripDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: trip, error } = await sanityFetch<TripOption>(
    TRIP_BY_SLUG_QUERY,
    { slug }
  );

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ErrorPlaceholder
          message="Trip content is temporarily unavailable"
          type="content"
        />
      </div>
    );
  }

  if (!trip) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <Link
        href="/trips"
        className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Trips
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-4xl font-bold text-gray-900">{trip.name}</h1>
        <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
          {trip.duration}
        </span>
      </div>

      {trip.price && (
        <p className="mb-6 text-lg font-medium text-blue-600">{trip.price}</p>
      )}

      <p className="mb-8 whitespace-pre-line text-lg text-gray-700">
        {trip.fullDescription}
      </p>

      {trip.highlights && trip.highlights.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Highlights
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            {trip.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </section>
      )}

      {trip.destinations && trip.destinations.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Destinations Included
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trip.destinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                name={destination.name}
                slug={destination.slug.current}
                shortDescription={destination.shortDescription}
                featuredImagePublicId={
                  destination.featuredImage?.publicId ?? ""
                }
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

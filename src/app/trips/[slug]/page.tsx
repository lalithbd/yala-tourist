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

      {/* WhatsApp Inquiry Button */}
      <div className="mb-12">
        <a
          href={`https://wa.me/94742398210?text=${encodeURIComponent(`Hi, I'm interested in the "${trip.name}" safari package. Could you please provide more details?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Inquire via WhatsApp
        </a>
      </div>

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

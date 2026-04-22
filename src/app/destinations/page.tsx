import { sanityFetch } from "@/lib/sanity/fetch";
import { DESTINATIONS_QUERY } from "@/lib/sanity/queries";
import type { Destination } from "@/types";
import DestinationCard from "@/components/DestinationCard";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";

export const revalidate = 60;

export default async function DestinationsListingPage() {
  const { data: destinations, error } =
    await sanityFetch<Destination[]>(DESTINATIONS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Destinations</h1>

      {error ? (
        <ErrorPlaceholder
          message="Destinations are temporarily unavailable"
          type="content"
        />
      ) : destinations && destinations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              name={destination.name}
              slug={destination.slug.current}
              shortDescription={destination.shortDescription}
              featuredImagePublicId={destination.featuredImage?.publicId ?? ""}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No destinations available yet.
        </p>
      )}
    </div>
  );
}

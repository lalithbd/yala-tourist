import { sanityFetch } from "@/lib/sanity/fetch";
import { TRIPS_QUERY } from "@/lib/sanity/queries";
import type { TripOption } from "@/types";
import TripCard from "@/components/TripCard";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";

export const revalidate = 60;

export default async function TripsListingPage() {
  const { data: trips, error } =
    await sanityFetch<TripOption[]>(TRIPS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Trips</h1>

      {error ? (
        <ErrorPlaceholder
          message="Trips are temporarily unavailable"
          type="content"
        />
      ) : trips && trips.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              name={trip.name}
              slug={trip.slug.current}
              duration={trip.duration}
              shortDescription={trip.shortDescription}
              featuredImagePublicId={trip.featuredImage?.publicId}
              price={trip.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No trips available yet.
        </p>
      )}
    </div>
  );
}

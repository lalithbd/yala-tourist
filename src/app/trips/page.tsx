import { sanityFetch } from "@/lib/sanity/fetch";
import { TRIPS_QUERY } from "@/lib/sanity/queries";
import type { TripOption } from "@/types";
import TripCard from "@/components/TripCard";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";

export const revalidate = 60;

// Map destination IDs to their slugs for section anchors
const DESTINATION_SECTIONS: Record<string, { slug: string; label: string }> = {
  "dest-yala": { slug: "yala", label: "Yala Safari" },
  "dest-weheragala": { slug: "weheragala", label: "Weheragala Safari" },
  "dest-lunugamvehera": { slug: "lunugamvehera", label: "Lunugamvehera Safari" },
  "dest-bundala": { slug: "bundala", label: "Bundala Safari" },
  "dest-sithulpawwa": { slug: "sithulpawwa", label: "Sithulpawwa Safari" },
};

function groupTripsByDestination(trips: TripOption[]) {
  const groups: Record<string, TripOption[]> = {};

  for (const trip of trips) {
    // Use the first destination reference ID to group
    const destId = (trip as unknown as { destinations?: { _ref: string }[] })
      .destinations?.[0]?._ref;
    const section = destId ? DESTINATION_SECTIONS[destId] : undefined;
    const key = section?.slug ?? "other";

    if (!groups[key]) groups[key] = [];
    groups[key].push(trip);
  }

  return groups;
}

export default async function TripsListingPage() {
  const { data: trips, error } =
    await sanityFetch<TripOption[]>(TRIPS_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Safari Packages</h1>

      {error ? (
        <ErrorPlaceholder
          message="Safari packages are temporarily unavailable"
          type="content"
        />
      ) : trips && trips.length > 0 ? (
        <div className="space-y-16">
          {Object.entries(DESTINATION_SECTIONS).map(([destId, { slug, label }]) => {
            const grouped = groupTripsByDestination(trips);
            const sectionTrips = grouped[slug];
            if (!sectionTrips || sectionTrips.length === 0) return null;

            return (
              <section key={destId} id={slug}>
                <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                  {label}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sectionTrips.map((trip) => (
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
              </section>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No safari packages available yet.
        </p>
      )}
    </div>
  );
}

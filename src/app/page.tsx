import { sanityFetch } from "@/lib/sanity/fetch";
import { HOME_QUERY, FEATURED_DESTINATIONS_QUERY } from "@/lib/sanity/queries";
import type { SiteSettings, Destination } from "@/types";
import DestinationCard from "@/components/DestinationCard";
import MixedMediaGallery from "@/components/MixedMediaGallery";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";
import HeroBanner from "@/components/HeroBanner";

export const revalidate = 60;

export default async function HomePage() {
  const [settingsResult, destinationsResult] = await Promise.all([
    sanityFetch<SiteSettings>(HOME_QUERY),
    sanityFetch<Destination[]>(FEATURED_DESTINATIONS_QUERY),
  ]);

  const settings = settingsResult.data;
  const destinations = destinationsResult.data;

  return (
    <div>
      {/* Hero Section */}
      {settingsResult.error ? (
        <div className="bg-gray-900 px-4 py-16">
          <ErrorPlaceholder
            message="Hero content is temporarily unavailable"
            type="content"
          />
        </div>
      ) : (
        <HeroBanner
          heroBanner={settings?.heroBanner}
          siteName={settings?.siteName}
          tagline={settings?.tagline}
        />
      )}

      {/* Featured Destinations Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Featured Destinations
        </h2>
        {destinationsResult.error ? (
          <ErrorPlaceholder
            message="Featured destinations are temporarily unavailable"
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
            No featured destinations available yet.
          </p>
        )}
      </section>

      {/* Featured Media Section */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Featured Media
        </h2>
        {settingsResult.error ? (
          <ErrorPlaceholder
            message="Featured media is temporarily unavailable"
            type="content"
          />
        ) : settings?.featuredMedia && settings.featuredMedia.length > 0 ? (
          <MixedMediaGallery items={settings.featuredMedia} />
        ) : (
          <p className="text-center text-gray-500">
            No featured media available yet.
          </p>
        )}
      </section>
    </div>
  );
}

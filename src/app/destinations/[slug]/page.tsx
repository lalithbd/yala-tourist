import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  DESTINATION_BY_SLUG_QUERY,
  DESTINATIONS_QUERY,
} from "@/lib/sanity/queries";
import type { Destination } from "@/types";
import { buildCloudinaryUrl } from "@/lib/cloudinary/utils";
import MixedMediaGallery from "@/components/MixedMediaGallery";
import ContactSection from "@/components/ContactSection";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: destination } = await sanityFetch<Destination>(
    DESTINATION_BY_SLUG_QUERY,
    { slug }
  );

  if (!destination) {
    return { title: "Destination Not Found" };
  }

  const ogImageUrl = destination.featuredImage?.publicId
    ? buildCloudinaryUrl(destination.featuredImage.publicId)
    : undefined;

  return {
    title: destination.name,
    description: destination.shortDescription,
    openGraph: {
      title: destination.name,
      description: destination.shortDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
      url: `/destinations/${destination.slug.current}`,
    },
  };
}

export async function generateStaticParams() {
  const { data: destinations } =
    await sanityFetch<Destination[]>(DESTINATIONS_QUERY);

  if (!destinations) return [];

  return destinations.map((destination) => ({
    slug: destination.slug.current,
  }));
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: destination, error } = await sanityFetch<Destination>(
    DESTINATION_BY_SLUG_QUERY,
    { slug }
  );

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ErrorPlaceholder
          message="Destination content is temporarily unavailable"
          type="content"
        />
      </div>
    );
  }

  if (!destination) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <Link
        href="/destinations"
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
        Back to Destinations
      </Link>

      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        {destination.name}
      </h1>

      <p className="mb-8 whitespace-pre-line text-lg text-gray-700">
        {destination.fullDescription}
      </p>

      {destination.gallery && destination.gallery.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Media Gallery
          </h2>
          <MixedMediaGallery items={destination.gallery} />
        </section>
      )}

      {destination.contact && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Contact Information
          </h2>
          <ContactSection contact={destination.contact} />
        </section>
      )}
    </div>
  );
}

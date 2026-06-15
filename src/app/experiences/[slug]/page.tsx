import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  EXPERIENCE_BY_SLUG_QUERY,
  EXPERIENCES_QUERY,
} from "@/lib/sanity/queries";
import type { Experience, MediaItem } from "@/types";
import { buildCloudinaryUrl } from "@/lib/cloudinary/utils";
import PhotoGallery from "@/components/PhotoGallery";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: experience } = await sanityFetch<Experience>(
    EXPERIENCE_BY_SLUG_QUERY,
    { slug }
  );

  if (!experience) {
    return { title: "Experience Not Found" };
  }

  const ogImageUrl = experience.featuredImage?.publicId
    ? buildCloudinaryUrl(experience.featuredImage.publicId)
    : undefined;

  return {
    title: experience.name,
    description: experience.shortDescription,
    openGraph: {
      title: experience.name,
      description: experience.shortDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
      url: `/experiences/${experience.slug.current}`,
    },
  };
}

export async function generateStaticParams() {
  const { data: experiences } =
    await sanityFetch<Experience[]>(EXPERIENCES_QUERY);

  if (!experiences) return [];

  return experiences.map((experience) => ({
    slug: experience.slug.current,
  }));
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: experience, error } = await sanityFetch<Experience>(
    EXPERIENCE_BY_SLUG_QUERY,
    { slug }
  );

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ErrorPlaceholder
          message="Experience content is temporarily unavailable"
          type="content"
        />
      </div>
    );
  }

  if (!experience) {
    notFound();
  }

  const photos = experience.gallery?.filter(
    (item): item is MediaItem & { mediaType: "photo" } =>
      item.mediaType === "photo"
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <Link
        href="/experiences"
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
        Back to Experiences
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-4xl font-bold text-gray-900">{experience.name}</h1>
        {experience.category && (
          <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
            {experience.category}
          </span>
        )}
      </div>

      {experience.duration && (
        <p className="mb-6 text-lg font-medium text-gray-500">
          {experience.duration}
        </p>
      )}

      <p className="mb-8 whitespace-pre-line text-lg text-gray-700">
        {experience.fullDescription}
      </p>

      {photos && photos.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Gallery
          </h2>
          <PhotoGallery photos={photos} />
        </section>
      )}
    </div>
  );
}

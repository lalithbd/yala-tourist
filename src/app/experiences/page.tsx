import { sanityFetch } from "@/lib/sanity/fetch";
import { EXPERIENCES_QUERY } from "@/lib/sanity/queries";
import type { Experience } from "@/types";
import ExperienceCard from "@/components/ExperienceCard";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";

export const revalidate = 60;

export default async function ExperiencesListingPage() {
  const { data: experiences, error } =
    await sanityFetch<Experience[]>(EXPERIENCES_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Experiences</h1>

      {error ? (
        <ErrorPlaceholder
          message="Experiences are temporarily unavailable"
          type="content"
        />
      ) : experiences && experiences.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience._id}
              name={experience.name}
              slug={experience.slug.current}
              shortDescription={experience.shortDescription}
              featuredImagePublicId={experience.featuredImage?.publicId}
              category={experience.category}
              duration={experience.duration}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No experiences are currently available.
        </p>
      )}
    </div>
  );
}

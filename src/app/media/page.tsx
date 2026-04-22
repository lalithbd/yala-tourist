import { sanityFetch } from "@/lib/sanity/fetch";
import { ALL_MEDIA_QUERY } from "@/lib/sanity/queries";
import type { MediaItem } from "@/types";
import MixedMediaGallery from "@/components/MixedMediaGallery";
import ErrorPlaceholder from "@/components/ErrorPlaceholder";

export const revalidate = 60;

export default async function MediaPage() {
  const { data: mediaItems, error } =
    await sanityFetch<MediaItem[]>(ALL_MEDIA_QUERY);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Media</h1>

      {error ? (
        <ErrorPlaceholder
          message="Media content is temporarily unavailable"
          type="content"
        />
      ) : mediaItems && mediaItems.length > 0 ? (
        <MixedMediaGallery items={mediaItems} />
      ) : (
        <p className="text-center text-gray-500">
          No media available yet.
        </p>
      )}
    </div>
  );
}

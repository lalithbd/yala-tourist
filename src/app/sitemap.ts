import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";

const baseUrl = "https://yala-tourist.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/trips`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/experiences`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/media`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // Fetch dynamic slugs from Sanity
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  if (client) {
    try {
      const [destinations, trips, experiences] = await Promise.all([
        client.fetch<{ slug: { current: string } }[]>(
          `*[_type == "destination"]{ slug }`
        ),
        client.fetch<{ slug: { current: string } }[]>(
          `*[_type == "tripOption" && isActive == true]{ slug }`
        ),
        client.fetch<{ slug: { current: string } }[]>(
          `*[_type == "experience" && isActive == true]{ slug }`
        ),
      ]);

      const destinationRoutes = destinations.map((d) => ({
        url: `${baseUrl}/destinations/${d.slug.current}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

      const tripRoutes = trips.map((t) => ({
        url: `${baseUrl}/trips/${t.slug.current}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

      const experienceRoutes = experiences.map((e) => ({
        url: `${baseUrl}/experiences/${e.slug.current}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

      dynamicRoutes = [...destinationRoutes, ...tripRoutes, ...experienceRoutes];
    } catch (error) {
      console.error("Failed to fetch slugs for sitemap:", error);
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}

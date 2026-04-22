import type { QueryParams } from "next-sanity";
import { client, isSanityConfigured } from "./client";

export interface SanityFetchResult<T> {
  data: T | null;
  error: string | null;
}

export async function sanityFetch<T>(
  query: string,
  params?: QueryParams
): Promise<SanityFetchResult<T>> {
  if (!isSanityConfigured || !client) {
    return { data: null, error: "Sanity is not configured. Please set environment variables." };
  }
  try {
    const data = params
      ? await client.fetch<T>(query, params)
      : await client.fetch<T>(query);
    return { data, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Sanity fetch error:", message);
    return { data: null, error: message };
  }
}

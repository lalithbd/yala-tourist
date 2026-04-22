/**
 * Generates a URL-safe slug from a destination name.
 *
 * - Strips diacritics (e.g. "café" → "cafe")
 * - Converts to lowercase
 * - Removes special characters (keeps alphanumeric and spaces)
 * - Collapses whitespace to single hyphens
 * - Strips leading/trailing hyphens
 *
 * Returns an empty string only if the input contains no alphanumeric characters
 * after normalization.
 */
export function generateSlug(name: string): string {
  return (
    name
      // Decompose combined characters (e.g. é → e + combining accent)
      .normalize('NFD')
      // Strip combining diacritical marks
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      // Replace any non-alphanumeric character with a hyphen
      .replace(/[^a-z0-9]+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
  )
}

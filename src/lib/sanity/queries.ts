export const HOME_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  heroBanner,
  featuredMedia
}`;

export const FEATURED_DESTINATIONS_QUERY = `*[_type == "destination" && isFeatured == true] | order(displayOrder asc) [0...6] {
  _id, name, slug, shortDescription, featuredImage
}`;

export const DESTINATIONS_QUERY = `*[_type == "destination"] | order(displayOrder asc) {
  _id, name, slug, shortDescription, featuredImage
}`;

export const DESTINATION_BY_SLUG_QUERY = `*[_type == "destination" && slug.current == $slug][0]{
  _id, name, slug, shortDescription, fullDescription, featuredImage,
  gallery[] | order(displayOrder asc),
  contact->{ _id, label, phone, email, address, coordinates }
}`;

export const ALL_MEDIA_QUERY = `*[_type == "destination" && defined(gallery)] {
  gallery[] | order(displayOrder asc) {
    _key, mediaType, title, altText, cloudinaryPublicId, caption, displayOrder
  }
}.gallery[]`;

export const CONTACT_QUERY = `*[_type == "contactInfo"][0]{
  _id, label, phone, email, address, coordinates
}`;

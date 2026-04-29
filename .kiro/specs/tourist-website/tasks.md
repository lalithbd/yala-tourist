# Implementation Plan: Tourist Website

## Overview

Build a Next.js (App Router) tourist website with Sanity CMS for content management and Cloudinary for media delivery. Implementation proceeds from project setup and data layer through shared components to page assembly, with property-based tests validating correctness properties throughout.

## Tasks

- [x] 1. Set up project structure, configuration, and TypeScript types
  - [x] 1.1 Initialize Next.js project with App Router and install dependencies
    - Initialize Next.js with TypeScript and App Router
    - Install `next-sanity`, `next-cloudinary`, `@sanity/image-url`, `fast-check` (dev)
    - Configure environment variables for Sanity (project ID, dataset, API version) and Cloudinary (cloud name)
    - _Requirements: 2.1, 2.2, 8.4_

  - [x] 1.2 Create TypeScript interfaces and types
    - Create `types/index.ts` with `CloudinaryMediaRef`, `MediaItem`, `Destination`, `ContactInfo`, `SiteSettings`, `TripOption` interfaces
    - _Requirements: 2.1, 2.3_

  - [x] 1.3 Create Sanity client and fetch utilities
    - Create `lib/sanity/client.ts` configuring the Sanity client with `next-sanity`
    - Create `lib/sanity/queries.ts` with all GROQ query constants (`HOME_QUERY`, `DESTINATIONS_QUERY`, `DESTINATION_BY_SLUG_QUERY`, `ALL_MEDIA_QUERY`, `CONTACT_QUERY`, `TRIPS_QUERY`, `TRIP_BY_SLUG_QUERY`)
    - Create `lib/sanity/fetch.ts` with error-handling wrapper returning `{ data, error }` pattern
    - _Requirements: 2.1, 2.4_

  - [x] 1.4 Create Cloudinary utility and slug utility modules
    - Create `lib/cloudinary/utils.ts` with helper to construct Cloudinary URLs from public IDs
    - Create `lib/utils/slug.ts` with `generateSlug(name: string): string` function that produces lowercase, hyphen-separated, URL-safe slugs (strips diacritics, removes special characters, collapses whitespace)
    - _Requirements: 7.2, 2.2_

  - [ ]* 1.5 Write property test for slug generation (Property 1)
    - **Property 1: Slug generation produces valid URL-safe strings**
    - Use fast-check to generate random non-empty strings and verify `generateSlug` output matches `^[a-z0-9]+(-[a-z0-9]+)*$`, has no leading/trailing hyphens, no consecutive hyphens, and is non-empty
    - **Validates: Requirements 7.2**

- [x] 2. Create Sanity schema definitions
  - [x] 2.1 Create Sanity schema files
    - Create `sanity/schemas/cloudinaryMedia.ts` object type
    - Create `sanity/schemas/mediaItem.ts` object type
    - Create `sanity/schemas/destination.ts` document type with all fields (name, slug, shortDescription, fullDescription, featuredImage, gallery, contact, isFeatured, displayOrder)
    - Create `sanity/schemas/contactInfo.ts` document type
    - Create `sanity/schemas/siteSettings.ts` singleton document type
    - Create schema index file exporting all schemas
    - _Requirements: 2.1, 7.1, 7.2, 5.1_

- [x] 3. Implement shared UI components (Navigation, Footer, ErrorPlaceholder, LoadingIndicator)
  - [x] 3.1 Implement Navigation component
    - Create `components/Navigation.tsx` as a client component
    - Render links to Home, Destinations, Trips, Media, Contact using Next.js `<Link>`
    - Implement responsive behavior: full horizontal nav ≥768px, collapsible hamburger menu <768px
    - _Requirements: 1.1, 1.2, 1.4_

  - [x] 3.2 Implement Footer component
    - Create `components/Footer.tsx` as a server component
    - Render copyright information and secondary navigation links
    - _Requirements: 1.3_

  - [x] 3.3 Implement ErrorPlaceholder component
    - Create `components/ErrorPlaceholder.tsx` with props `message` and `type: 'content' | 'media'`
    - Render appropriate error messages for content vs media failures
    - _Requirements: 2.4, 2.5_

  - [x] 3.4 Implement LoadingIndicator component
    - Create `components/LoadingIndicator.tsx` with spinner or skeleton UI
    - _Requirements: 2.6_

  - [x] 3.5 Create RootLayout with Navigation and Footer
    - Create `app/layout.tsx` rendering `<Navigation />` and `<Footer />` persistently
    - Set global metadata, fonts, and styles
    - Wrap children in main content area with React Error Boundary
    - _Requirements: 1.1, 1.3_

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement media components (DestinationCard, PhotoGallery, Lightbox, VideoPlayer, MixedMediaGallery)
  - [x] 5.1 Implement DestinationCard component
    - Create `components/DestinationCard.tsx` with props: `name`, `slug`, `shortDescription`, `featuredImagePublicId`
    - Render `CldImage` thumbnail, name, short description
    - Wrap in `<Link href={/destinations/${slug}}>`
    - _Requirements: 6.2, 6.3, 7.9_

  - [x] 5.2 Implement PhotoGallery component
    - Create `components/PhotoGallery.tsx` with props: `photos: PhotoItem[]`
    - Render grid of `CldImage` thumbnails with alt text from Sanity
    - Use Cloudinary responsive transformations (width, format: auto)
    - Click handler to open Lightbox
    - _Requirements: 3.1, 3.5, 3.6, 3.7_

  - [x] 5.3 Implement Lightbox component
    - Create `components/Lightbox.tsx` as a client component
    - Props: `photos: PhotoItem[]`, `currentIndex: number`, `onClose: () => void`
    - Full-screen overlay with large image via `CldImage`
    - Arrow controls for next/previous, close on Escape key or close button
    - Caption display below image
    - _Requirements: 3.2, 3.3, 3.4_

  - [x] 5.4 Implement VideoPlayer component
    - Create `components/VideoPlayer.tsx` as a client component
    - Props: `publicId: string`, `title: string`, `thumbnailPublicId?: string`
    - Render `CldVideoPlayer` with standard controls (play, pause, volume, fullscreen)
    - No autoplay — playback starts only on user interaction
    - Request adaptive streaming from Cloudinary
    - Show error message if video fails to load
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 5.5 Implement MixedMediaGallery component
    - Create `components/MixedMediaGallery.tsx` as a client component
    - Props: `items: MediaItem[]`
    - Render responsive grid: multi-column ≥768px, single-column <768px
    - Filter controls: All | Photos Only | Videos Only
    - Video thumbnails display play icon overlay
    - Each item has accessible label with media type and title
    - Photo click → opens Lightbox; Video click → opens VideoPlayer
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8_

  - [ ]* 5.6 Write property test for media type filter (Property 3)
    - **Property 3: Media type filter returns only matching items and preserves order**
    - Use fast-check to generate random `MediaItem[]` arrays and filter values, verify filter output correctness and order preservation
    - **Validates: Requirements 9.5, 9.6**

  - [ ]* 5.7 Write property test for photo alt text propagation (Property 4)
    - **Property 4: Photo alt text propagation**
    - Use fast-check to generate random photo arrays with alt text, render `PhotoGallery`, verify `alt` attributes match corresponding `altText` values
    - **Validates: Requirements 3.5**

  - [ ]* 5.8 Write property test for mixed media gallery accessible labels (Property 5)
    - **Property 5: Mixed media gallery accessible labels**
    - Use fast-check to generate random `MediaItem` objects, render in `MixedMediaGallery`, verify accessible labels contain media type and title
    - **Validates: Requirements 9.8**

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement ContactSection component
  - [x] 7.1 Implement ContactSection component
    - Create `components/ContactSection.tsx`
    - Props: `contact: ContactInfo`
    - Render phone as `<a href="tel:...">`, email as `<a href="mailto:...">`
    - Render physical address
    - If geographic coordinates provided, render embedded map (iframe to OpenStreetMap)
    - Fallback message if contact data unavailable
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Implement page components
  - [x] 8.1 Implement Home page
    - Create `app/page.tsx` as a server component
    - Fetch hero banner, featured destinations (up to 6), and featured media (up to 6) from Sanity
    - Render hero section with `CldImage` for banner + tagline
    - Render `DestinationCard` grid for featured destinations
    - Render `MixedMediaGallery` with featured media items
    - Configure ISR with revalidate: 60s
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 8.2 Implement Destinations listing page
    - Create `app/destinations/page.tsx` as a server component
    - Fetch all destinations from Sanity
    - Render grid of `DestinationCard` components, each linking to `/destinations/[slug]`
    - Configure ISR with revalidate: 60s
    - _Requirements: 7.9_

  - [x] 8.3 Implement Destination detail page
    - Create `app/destinations/[slug]/page.tsx` as a server component
    - Fetch single destination by slug from Sanity
    - Use `generateMetadata` to set Open Graph tags (og:title, og:description, og:image, og:url)
    - Use `generateStaticParams` to pre-render known slugs
    - Render destination name, full description, `MixedMediaGallery`, and `ContactSection`
    - Render back link to `/destinations`
    - Return `notFound()` if slug doesn't match any Sanity record
    - Configure ISR with revalidate: 60s
    - _Requirements: 7.1, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8_

  - [ ]* 8.4 Write property test for Open Graph meta tags (Property 2)
    - **Property 2: Open Graph meta tags reflect destination data**
    - Use fast-check to generate random destination objects, verify `generateMetadata` output contains correct OG fields (og:title = name, og:description = shortDescription, og:image contains publicId, og:url ends with `/destinations/{slug.current}`)
    - **Validates: Requirements 7.7**

  - [x] 8.5 Implement Media page
    - Create `app/media/page.tsx` as a server component
    - Fetch all media items from Sanity
    - Render `MixedMediaGallery` with filter controls
    - Configure ISR with revalidate: 60s
    - _Requirements: 9.1_

  - [x] 8.6 Implement Contact page
    - Create `app/contact/page.tsx` as a server component
    - Fetch contact details from Sanity
    - Render `ContactSection`
    - Configure ISR with revalidate: 300s
    - _Requirements: 5.1_

  - [x] 8.7 Create loading.tsx files for each route
    - Create `app/loading.tsx`, `app/destinations/loading.tsx`, `app/destinations/[slug]/loading.tsx`, `app/media/loading.tsx`, `app/contact/loading.tsx`
    - Each renders `LoadingIndicator` component
    - _Requirements: 2.6_

  - [x] 8.8 Create not-found page
    - Create `app/not-found.tsx` with "Destination not found" message
    - _Requirements: 7.6_

- [x] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Integration wiring and final verification
  - [x] 10.1 Wire responsive design and performance optimizations
    - Ensure all pages use responsive layouts adapting from 320px to 2560px
    - Verify `CldImage` components use appropriate sizes, format: auto for WebP/AVIF delivery
    - Ensure all content pages use SSR/SSG for search engine crawlability
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 10.2 Write unit tests for key components
    - Test Navigation renders all 5 links and mobile menu toggles
    - Test DestinationCard renders name, image, description and links to correct slug URL
    - Test ContactSection renders tel: link, mailto: link, address, map, and fallback message
    - Test Lightbox opens, navigates next/previous, closes on Escape
    - Test VideoPlayer renders with controls, no autoplay, shows error on load failure
    - _Requirements: 1.1, 1.4, 5.1, 5.2, 5.3, 5.4, 5.5, 3.2, 3.3, 3.4, 4.2, 4.4, 4.5_

  - [ ]* 10.3 Write integration tests
    - Test Sanity client fetches data correctly with mocked API responses
    - Test pages render with server-side data
    - Test Cloudinary components receive correct public IDs from Sanity data
    - Test navigation between pages works without full reload
    - _Requirements: 2.1, 2.2, 2.3, 1.2_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Implement Trip Options feature
  - [x] 12.1 Create tripOption Sanity schema
    - Create `sanity/schemas/tripOption.ts` document type with fields: name, slug, duration, shortDescription, fullDescription, featuredImage (cloudinaryMedia), price, highlights (array of strings), destinations (array of references to destination), isActive, displayOrder
    - Register schema in `sanity/schemas/index.ts`
    - _Requirements: 10.1, 11.1_

  - [x] 12.2 Add TripOption TypeScript interface and GROQ queries
    - Add `TripOption` interface to `types/index.ts` with all trip fields including optional featuredImage, price, highlights, and destinations
    - Add `TRIPS_QUERY` to `lib/sanity/queries.ts` fetching all active trip options ordered by display order
    - Add `TRIP_BY_SLUG_QUERY` to `lib/sanity/queries.ts` fetching single trip by slug with expanded destination references
    - _Requirements: 10.1, 11.1, 11.3_

  - [x] 12.3 Implement TripCard component
    - Create `components/TripCard.tsx` as a client component
    - Props: `name`, `slug`, `duration`, `shortDescription`, `featuredImagePublicId?`, `price?`
    - Render `CldImage` thumbnail with placeholder fallback, duration badge overlay, trip name, short description, and price
    - Wrap in `<Link href={/trips/${slug}}>`
    - _Requirements: 10.2, 10.3_

  - [x] 12.4 Implement Trips listing page
    - Create `app/trips/page.tsx` as a server component
    - Fetch all active trip options from Sanity using `TRIPS_QUERY`
    - Render grid of `TripCard` components
    - Show error placeholder if Sanity is unreachable
    - Show "No trips available" message if no active trips exist
    - Configure ISR with revalidate: 60s
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.6_

  - [x] 12.5 Implement Trip detail page
    - Create `app/trips/[slug]/page.tsx` as a server component
    - Fetch single trip by slug from Sanity using `TRIP_BY_SLUG_QUERY`
    - Use `generateMetadata` to set Open Graph tags (og:title, og:description, og:image, og:url)
    - Use `generateStaticParams` to pre-render known trip slugs
    - Render trip name, duration badge, price, full description, highlights list, and linked destination cards
    - Render back link to `/trips`
    - Return `notFound()` if slug doesn't match any Sanity record
    - Show error placeholder if Sanity is unreachable
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

  - [x] 12.6 Update Navigation and Footer with Trips link
    - Add Trips link to `components/Navigation.tsx` nav links array (between Destinations and Media)
    - Add Trips link to `components/Footer.tsx` footer links array
    - _Requirements: 1.1, 10.3_

  - [x] 12.7 Create loading.tsx files for trip routes
    - Create `app/trips/loading.tsx` rendering `LoadingIndicator` component
    - Create `app/trips/[slug]/loading.tsx` rendering `LoadingIndicator` component
    - _Requirements: 10.5, 2.6_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses TypeScript throughout with Next.js App Router conventions

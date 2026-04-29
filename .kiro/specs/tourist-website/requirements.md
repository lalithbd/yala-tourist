# Requirements Document

## Introduction

A tourist website built with Next.js that showcases travel destinations, attractions, and experiences. The website displays photos, videos, and contact details to visitors, with structured content managed in Sanity CMS (free tier) and media assets stored and delivered through Cloudinary (free tier). Sanity stores destination data, contact details, and references to Cloudinary-hosted media. Cloudinary handles image and video storage, optimization, transformations, and CDN delivery. The goal is to provide an engaging, visually rich experience that helps tourists discover and plan visits to featured destinations.

## Glossary

- **Website**: The Next.js frontend application serving the tourist website to visitors
- **Visitor**: A person browsing the tourist website
- **Sanity_CMS**: The Sanity headless CMS (free tier) that stores structured content including destination data, contact details, and references to media assets hosted on Cloudinary. Free tier limits: unlimited content types, 2 public datasets, 250K API requests/month, 1M CDN API requests/month, 100GB assets, 100GB bandwidth
- **Cloudinary_CDN**: The Cloudinary media platform (free tier) that stores, optimizes, transforms, and delivers photos and videos via CDN. Provides on-the-fly image transformations, responsive image delivery, and adaptive video streaming. Free tier limits: 25 monthly credits, 3 users, image/video transformations, CDN delivery
- **Photo_Gallery**: A component that displays a collection of destination and attraction photographs
- **Video_Player**: A component that plays tourism-related video content
- **Contact_Section**: A component that displays contact details such as phone numbers, email addresses, and physical addresses
- **Destination_Page**: A page dedicated to a specific tourist destination or attraction
- **Mixed_Media_Gallery**: A unified gallery component that displays photos and videos together in an interleaved layout, rather than separating them into distinct sections
- **Navigation**: The primary menu system allowing Visitors to move between pages and sections of the Website
- **Trip_Option**: A curated travel package stored in Sanity_CMS with a name, slug, duration, short and full descriptions, featured image, price, highlights, linked destinations, active status, and display order
- **Trips_Page**: A listing page that displays all active Trip_Option entries in a card grid
- **Trip_Detail_Page**: A page dedicated to a specific Trip_Option, showing full description, highlights, price, and linked destinations
- **Destination_Slug**: A URL-friendly, human-readable string derived from the destination name (e.g., "golden-temple-amritsar") used as the unique identifier in the destination URL path
- **Shareable_URL**: A permanent, unique URL for a Destination_Page (e.g., /destinations/golden-temple-amritsar) that can be copied and shared, and loads directly to that destination when opened

## Requirements

### Requirement 1: Display Navigation and Site Layout

**User Story:** As a Visitor, I want a clear and consistent navigation layout, so that I can easily browse different sections of the tourist website.

#### Acceptance Criteria

1. THE Website SHALL render a persistent navigation bar on every page with links to all top-level sections (Home, Destinations, Trips, Media, Contact)
2. WHEN a Visitor selects a navigation link, THE Website SHALL route the Visitor to the corresponding page without a full page reload
3. THE Website SHALL render a footer on every page containing copyright information and secondary navigation links
4. WHILE the Website is displayed on a viewport narrower than 768 pixels, THE Website SHALL render the navigation as a collapsible mobile menu

### Requirement 2: Fetch and Display Dynamic Content via Sanity and Cloudinary Integration

**User Story:** As a Visitor, I want to see up-to-date destination information with optimized media, so that I can make informed travel decisions with fast-loading visuals.

#### Acceptance Criteria

1. WHEN a page is requested, THE Website SHALL fetch structured content (destination data, text, contact details, and media references) from the Sanity_CMS API
2. WHEN the Sanity_CMS returns destination data containing Cloudinary media references, THE Website SHALL resolve those references and load images and videos directly from the Cloudinary_CDN
3. WHEN the Sanity_CMS returns destination data, THE Website SHALL render the destination name, description, and featured image served from the Cloudinary_CDN
4. IF the Sanity_CMS is unreachable or returns an error, THEN THE Website SHALL display a user-friendly error message indicating content is temporarily unavailable
5. IF a Cloudinary_CDN media asset fails to load, THEN THE Website SHALL display a placeholder image or message in place of the failed asset without breaking the page layout
6. WHILE content is being fetched from the Sanity_CMS, THE Website SHALL display a loading indicator to the Visitor

### Requirement 3: Photo Gallery

**User Story:** As a Visitor, I want to browse photos of tourist destinations, so that I can visually explore places before visiting.

#### Acceptance Criteria

1. WHEN the Photo_Gallery is rendered within a standalone or mixed context, THE Photo_Gallery SHALL fetch photo metadata from the Sanity_CMS and load photo assets from the Cloudinary_CDN
2. WHEN a Visitor selects a photo thumbnail, THE Photo_Gallery SHALL display the photo in a full-size lightbox overlay with a caption, requesting an appropriately sized image transformation from the Cloudinary_CDN
3. WHILE the lightbox overlay is open, THE Photo_Gallery SHALL allow the Visitor to navigate to the next or previous photo using arrow controls
4. WHEN the Visitor presses the Escape key or selects the close button, THE Photo_Gallery SHALL close the lightbox overlay and return to the gallery grid
5. THE Photo_Gallery SHALL render each image with an alt text attribute sourced from the Sanity_CMS for accessibility
6. THE Photo_Gallery SHALL request responsive image variants from the Cloudinary_CDN using width and format transformations to serve appropriately sized images for the Visitor's viewport
7. THE Photo_Gallery SHALL support rendering within the Mixed_Media_Gallery alongside video entries

### Requirement 4: Video Playback

**User Story:** As a Visitor, I want to watch videos about tourist destinations, so that I can get a richer preview of the experience.

#### Acceptance Criteria

1. WHEN a video entry is displayed within a standalone or mixed context, THE Video_Player SHALL render a thumbnail from the Cloudinary_CDN and a title from the Sanity_CMS for the video
2. WHEN a Visitor selects a video entry, THE Video_Player SHALL load the video from the Cloudinary_CDN and display it in an embedded player with standard playback controls (play, pause, volume, fullscreen)
3. WHEN a video is loaded, THE Video_Player SHALL request adaptive streaming delivery from the Cloudinary_CDN to optimize playback quality based on the Visitor's network conditions
4. IF a video fails to load from the Cloudinary_CDN, THEN THE Video_Player SHALL display an error message indicating the video is currently unavailable
5. THE Video_Player SHALL not auto-play videos; playback SHALL begin only when the Visitor activates the play control
6. THE Video_Player SHALL support rendering within the Mixed_Media_Gallery alongside photo entries

### Requirement 5: Contact Details Display

**User Story:** As a Visitor, I want to find contact information for tourist services, so that I can reach out for inquiries or bookings.

#### Acceptance Criteria

1. WHEN the Contact page is loaded, THE Contact_Section SHALL fetch and display contact details from the Sanity_CMS including phone number, email address, and physical address
2. THE Contact_Section SHALL render the phone number as a clickable tel: link
3. THE Contact_Section SHALL render the email address as a clickable mailto: link
4. WHEN the Sanity_CMS provides geographic coordinates, THE Contact_Section SHALL display an embedded map showing the location
5. IF contact details are unavailable from the Sanity_CMS, THEN THE Contact_Section SHALL display a fallback message directing the Visitor to try again later

### Requirement 6: Home Page with Featured Content

**User Story:** As a Visitor, I want to see highlighted destinations and media on the home page, so that I can quickly discover popular attractions.

#### Acceptance Criteria

1. WHEN the Home page is loaded, THE Website SHALL fetch a hero banner image reference from the Sanity_CMS and display the image served from the Cloudinary_CDN along with a tagline
2. WHEN the Sanity_CMS returns featured destinations, THE Website SHALL render a section displaying up to 6 featured destination cards, each with an image from the Cloudinary_CDN, name, and short description
3. WHEN a Visitor selects a featured destination card, THE Website SHALL navigate the Visitor to the corresponding destination's Shareable_URL
4. THE Website SHALL display a featured Mixed_Media_Gallery section on the Home page containing up to 6 items (photos and videos combined), arranged in an interleaved layout

### Requirement 7: Destination Detail Pages with Shareable URLs

**User Story:** As a Visitor, I want each destination to have its own unique, shareable URL, so that I can share a specific destination with others and they can load directly to that page.

#### Acceptance Criteria

1. THE Website SHALL assign each destination a unique Shareable_URL using the route pattern /destinations/[Destination_Slug]
2. THE Website SHALL derive the Destination_Slug from the destination name provided by the Sanity_CMS, producing a lowercase, hyphen-separated, URL-safe string
3. WHEN a Visitor navigates to a Shareable_URL, THE Website SHALL fetch the destination details from the Sanity_CMS using the Destination_Slug from the URL and render the Destination_Page directly
4. WHEN a Visitor opens a Shareable_URL received from another person, THE Website SHALL load and display the corresponding Destination_Page without requiring additional navigation
5. WHEN destination data is returned, THE Destination_Page SHALL display the destination name, full description, a Mixed_Media_Gallery of related photos and videos, and contact information if available
6. IF the Destination_Slug in the URL does not match any record in the Sanity_CMS, THEN THE Website SHALL display a 404 page indicating the destination was not found
7. THE Destination_Page SHALL render Open Graph meta tags (og:title, og:description, og:image, og:url) using the destination name, description, featured image, and Shareable_URL so that shared links display a rich preview on social platforms
8. THE Destination_Page SHALL include a back link allowing the Visitor to return to the Destinations listing page
9. WHEN a Visitor selects a destination from the Destinations listing or a featured destination card on the Home page, THE Website SHALL navigate the Visitor to that destination's Shareable_URL

### Requirement 8: Responsive Design and Performance

**User Story:** As a Visitor, I want the website to load quickly and look good on any device, so that I can browse comfortably from my phone, tablet, or desktop.

#### Acceptance Criteria

1. THE Website SHALL render all pages in a responsive layout that adapts to viewport widths from 320 pixels to 2560 pixels
2. THE Website SHALL use Cloudinary_CDN image transformations combined with Next.js Image component to serve images in appropriate sizes and modern formats (WebP or AVIF) based on the Visitor's device
3. WHEN a page is first loaded, THE Website SHALL achieve a Largest Contentful Paint (LCP) of 2.5 seconds or less on a simulated 4G connection
4. THE Website SHALL use server-side rendering or static generation for all content pages to ensure search engine crawlability

### Requirement 9: Mixed Media Gallery

**User Story:** As a Visitor, I want to see photos and videos displayed together in a single unified gallery, so that I can browse all media for a destination without switching between separate sections.

#### Acceptance Criteria

1. WHEN the Media page is loaded, THE Mixed_Media_Gallery SHALL fetch all photo and video metadata from the Sanity_CMS and load media assets from the Cloudinary_CDN, displaying them together in a single interleaved grid
2. THE Mixed_Media_Gallery SHALL visually distinguish video items from photo items by rendering a play icon overlay on video thumbnails
3. WHEN a Visitor selects a photo item in the Mixed_Media_Gallery, THE Photo_Gallery SHALL display the photo in a full-size lightbox overlay
4. WHEN a Visitor selects a video item in the Mixed_Media_Gallery, THE Video_Player SHALL load and display the video in an embedded player
5. THE Mixed_Media_Gallery SHALL allow the Visitor to filter displayed items by media type (All, Photos Only, Videos Only)
6. THE Mixed_Media_Gallery SHALL arrange items based on the display order provided by the Sanity_CMS, preserving the interleaved mix of photos and videos
7. WHILE the Mixed_Media_Gallery is displayed on a viewport narrower than 768 pixels, THE Mixed_Media_Gallery SHALL render items in a single-column layout
8. THE Mixed_Media_Gallery SHALL render each item with an accessible label indicating the media type and title

### Requirement 10: Trip Options Listing

**User Story:** As a Visitor, I want to browse available trip packages, so that I can discover curated travel experiences and compare options.

#### Acceptance Criteria

1. WHEN the Trips_Page is loaded, THE Website SHALL fetch all active Trip_Option entries from the Sanity_CMS ordered by display order and render them in a card grid
2. THE Trips_Page SHALL display each Trip_Option card with the trip name, duration badge, short description, featured image from the Cloudinary_CDN, and price
3. WHEN a Visitor selects a Trip_Option card, THE Website SHALL navigate the Visitor to the corresponding Trip_Detail_Page at /trips/[slug]
4. IF the Sanity_CMS is unreachable or returns an error, THEN THE Trips_Page SHALL display a user-friendly error message indicating trips are temporarily unavailable
5. WHILE content is being fetched from the Sanity_CMS, THE Trips_Page SHALL display a loading indicator to the Visitor
6. WHEN no active Trip_Option entries exist, THE Trips_Page SHALL display a message indicating no trips are available

### Requirement 11: Trip Detail Pages

**User Story:** As a Visitor, I want to view the full details of a trip package including highlights, price, and linked destinations, so that I can make an informed decision about booking.

#### Acceptance Criteria

1. WHEN a Visitor navigates to a Trip_Detail_Page, THE Website SHALL fetch the Trip_Option by slug from the Sanity_CMS and render the trip name, duration, full description, and price
2. WHEN the Trip_Option includes highlights, THE Trip_Detail_Page SHALL display the highlights as a list
3. WHEN the Trip_Option includes linked destinations, THE Trip_Detail_Page SHALL display the linked destinations as a grid of destination cards linking to their respective Destination_Pages
4. THE Trip_Detail_Page SHALL render Open Graph meta tags (og:title, og:description, og:image, og:url) using the trip name, short description, featured image, and trip URL for rich social sharing previews
5. THE Trip_Detail_Page SHALL use generateStaticParams to pre-render known trip slugs at build time
6. IF the slug in the URL does not match any Trip_Option in the Sanity_CMS, THEN THE Website SHALL display a 404 page indicating the trip was not found
7. THE Trip_Detail_Page SHALL include a back link allowing the Visitor to return to the Trips_Page
8. IF the Sanity_CMS is unreachable or returns an error, THEN THE Trip_Detail_Page SHALL display a user-friendly error message indicating trip content is temporarily unavailable

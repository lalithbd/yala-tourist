/**
 * Seed script — pushes sample tourist content to Sanity.
 *
 * Usage:
 *   1. Add SANITY_API_WRITE_TOKEN to .env.local
 *   2. Run: set PATH=C:\tools\node-v20.19.5-win-x64;%PATH% && npx tsx scripts/seed.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const API = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;

interface Mutation {
  createOrReplace: Record<string, unknown>;
}

async function mutate(mutations: Mutation[]) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity API error ${res.status}: ${text}`);
  }

  return res.json();
}

async function seed() {
  console.log("Seeding Sanity dataset...\n");

  // 1. Contact Info
  console.log("Creating contact info...");
  await mutate([
    {
      createOrReplace: {
        _id: "contact-main",
        _type: "contactInfo",
        label: "Tourist Information Center",
        phone: "+94-11-2345678",
        email: "info@touristsite.com",
        address: "123 Beach Road\nColombo 03\nSri Lanka",
        coordinates: { _type: "geopoint", lat: 6.9271, lng: 79.8612 },
      },
    },
  ]);
  console.log("  ✓ Contact info created");

  // 2. Destinations
  console.log("Creating destinations...");
  const destinations = [
    {
      _id: "dest-sigiriya",
      name: "Sigiriya Rock Fortress",
      slug: { _type: "slug", current: "sigiriya-rock-fortress" },
      shortDescription:
        "An ancient rock fortress rising 200m above the jungle, featuring stunning frescoes and landscaped gardens.",
      fullDescription:
        "Sigiriya, also known as Lion Rock, is a 5th-century rock fortress located in the central Matale District of Sri Lanka. Built by King Kashyapa as his new capital, it features remarkable frescoes, mirror walls, and the famous lion gate entrance. The summit contains the ruins of the upper palace with its cisterns, walls, and gardens. Surrounded by an extensive network of gardens, reservoirs, and other structures, Sigiriya is one of the best-preserved examples of ancient urban planning.",
      featuredImage: {
        _type: "cloudinaryMedia",
        publicId: "sigiriya",
        altText: "Sigiriya Rock Fortress rising above the jungle",
      },
      gallery: [
        {
          _key: "sig-photo-1",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Sigiriya from the gardens",
          altText: "View of Sigiriya Rock from the water gardens",
          cloudinaryPublicId: "sigiriya-gardens",
          caption: "The ancient water gardens at the base of Sigiriya",
          displayOrder: 1,
        },
        {
          _key: "sig-photo-2",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Sigiriya frescoes",
          altText: "Ancient frescoes painted on the rock face",
          cloudinaryPublicId: "sigiriya-frescoes",
          caption: "The famous Sigiriya maidens painted on the rock wall",
          displayOrder: 2,
        },
      ],
      contact: { _type: "reference", _ref: "contact-main" },
      isFeatured: true,
      displayOrder: 1,
    },
    {
      _id: "dest-galle-fort",
      name: "Galle Fort",
      slug: { _type: "slug", current: "galle-fort" },
      shortDescription:
        "A UNESCO World Heritage Site blending Dutch colonial architecture with tropical charm on the southern coast.",
      fullDescription:
        "Galle Fort, in the Bay of Galle on the southwest coast of Sri Lanka, was first built by the Portuguese in 1588 and then extensively fortified by the Dutch during the 17th century. It is the best example of a fortified city built by Europeans in South and Southeast Asia. The fort has a unique atmosphere with its cobblestone streets, colonial buildings, churches, mosques, and temples. Today it houses boutique hotels, restaurants, shops, and museums within its historic walls.",
      featuredImage: {
        _type: "cloudinaryMedia",
        publicId: "galle-fort",
        altText: "Galle Fort lighthouse and colonial buildings",
      },
      gallery: [
        {
          _key: "galle-photo-1",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Galle Fort lighthouse",
          altText: "The iconic white lighthouse at Galle Fort",
          cloudinaryPublicId: "galle-lighthouse",
          caption: "The Galle Fort lighthouse at sunset",
          displayOrder: 1,
        },
      ],
      contact: { _type: "reference", _ref: "contact-main" },
      isFeatured: true,
      displayOrder: 2,
    },
    {
      _id: "dest-ella",
      name: "Ella",
      slug: { _type: "slug", current: "ella" },
      shortDescription:
        "A charming hill country town surrounded by tea plantations, waterfalls, and breathtaking mountain views.",
      fullDescription:
        "Ella is a small town in the Badulla District of Uva Province, Sri Lanka. Surrounded by hills covered with cloud forests and tea plantations, it has become one of the most popular destinations in Sri Lanka. The town offers stunning views of the southern plains, the famous Nine Arches Bridge, Ravana Falls, Little Adam's Peak, and Ella Rock. The train journey from Kandy to Ella is considered one of the most scenic rail journeys in the world.",
      featuredImage: {
        _type: "cloudinaryMedia",
        publicId: "ella",
        altText: "Nine Arches Bridge in Ella surrounded by lush greenery",
      },
      gallery: [
        {
          _key: "ella-photo-1",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Nine Arches Bridge",
          altText: "Train crossing the Nine Arches Bridge in Ella",
          cloudinaryPublicId: "ella-bridge",
          caption: "The iconic Nine Arches Bridge",
          displayOrder: 1,
        },
        {
          _key: "ella-photo-2",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Tea plantations",
          altText: "Lush green tea plantations in the hills of Ella",
          cloudinaryPublicId: "ella-tea",
          caption: "Tea plantations surrounding Ella",
          displayOrder: 2,
        },
      ],
      contact: { _type: "reference", _ref: "contact-main" },
      isFeatured: true,
      displayOrder: 3,
    },
  ];

  for (const dest of destinations) {
    await mutate([{ createOrReplace: { _type: "destination", ...dest } }]);
    console.log(`  ✓ ${dest.name}`);
  }

  // 3. Site Settings
  console.log("Creating site settings...");
  await mutate([
    {
      createOrReplace: {
        _id: "site-settings",
        _type: "siteSettings",
        siteName: "Discover Sri Lanka",
        tagline: "Explore the pearl of the Indian Ocean",
        heroBanner: {
          _type: "cloudinaryMedia",
          publicId: "hero-banner",
          altText: "Beautiful Sri Lankan landscape",
        },
        featuredMedia: [
          {
            _key: "fm-1",
            _type: "mediaItem",
            mediaType: "photo",
            title: "Tropical beach",
            altText: "Golden sandy beach with palm trees",
            cloudinaryPublicId: "beach",
            displayOrder: 1,
          },
          {
            _key: "fm-2",
            _type: "mediaItem",
            mediaType: "photo",
            title: "Ancient temple",
            altText: "Buddhist temple in the hills",
            cloudinaryPublicId: "temple",
            displayOrder: 2,
          },
          {
            _key: "fm-3",
            _type: "mediaItem",
            mediaType: "photo",
            title: "Wildlife safari",
            altText: "Elephants in Yala National Park",
            cloudinaryPublicId: "elephants",
            displayOrder: 3,
          },
        ],
      },
    },
  ]);
  console.log("  ✓ Site settings created");

  console.log("\n✅ Seed complete! Your content is now in Sanity.");
  console.log(
    "\nNote: The images use Cloudinary public IDs (sigiriya, hero-banner, etc.)."
  );
  console.log(
    "Upload real images to Cloudinary and update the public IDs in Sanity to see them."
  );
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

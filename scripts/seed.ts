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
  createOrReplace?: Record<string, unknown>;
  delete?: { id: string };
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
        phone: "+94742398210",
        email: "info@touristsite.com",
        address: "No 187, Sithulpawwa Road\nYodakandiya\nTissamaharama\nSri Lanka",
        coordinates: { _type: "geopoint", lat: 6.2833, lng: 81.2833 },
      },
    },
  ]);
  console.log("  ✓ Contact info created");

  // 2. Delete old destinations
  console.log("Deleting old destinations...");
  await mutate([
    { delete: { id: "dest-sigiriya" } },
    { delete: { id: "dest-galle-fort" } },
    { delete: { id: "dest-ella" } },
  ]);
  console.log("  ✓ Old destinations deleted");

  // 3. Create new destinations
  console.log("Creating destinations...");
  const destinations = [
    {
      _id: "dest-yala",
      name: "Yala National Park",
      slug: { _type: "slug", current: "yala" },
      shortDescription:
        "Sri Lanka's most famous wildlife sanctuary, home to the highest density of leopards in the world.",
      fullDescription:
        "Yala National Park is the most visited and second largest national park in Sri Lanka. It is situated in the southeast region of the country and lies in the Southern and Uva Provinces. The park is best known for its variety of wild animals, including Sri Lankan elephants, leopards, sloth bears, and many species of birds. Yala has the highest leopard density in the world, making it one of the best places on the planet to spot these elusive big cats. The park also features beautiful coastal scenery, sand dunes, freshwater lakes, and ancient Buddhist ruins.",
      featuredImage: {
        _type: "cloudinaryMedia",
        publicId: "tourist/yala/yala-photo-03",
        altText: "Yala National Park wildlife",
      },
      gallery: [
        {
          _key: "yala-p-01",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Wildlife in Yala National Park",
          cloudinaryPublicId: "tourist/yala/yala-photo-01",
          caption: "Wildlife spotted during a Yala safari",
          displayOrder: 1,
        },
        {
          _key: "yala-p-02",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Wildlife encounter at Yala",
          cloudinaryPublicId: "tourist/yala/yala-photo-02",
          caption: "Animals in their natural habitat",
          displayOrder: 2,
        },
        {
          _key: "yala-p-03",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Nature at Yala National Park",
          cloudinaryPublicId: "tourist/yala/yala-photo-05",
          displayOrder: 3,
        },
        {
          _key: "yala-p-04",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Yala National Park landscape",
          cloudinaryPublicId: "tourist/yala/yala-photo-06",
          displayOrder: 4,
        },
        {
          _key: "yala-p-05",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Yala safari scenery",
          cloudinaryPublicId: "tourist/yala/yala-photo-07",
          displayOrder: 5,
        },
        {
          _key: "yala-p-06",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Wildlife roaming at Yala",
          cloudinaryPublicId: "tourist/yala/yala-photo-08",
          displayOrder: 6,
        },
        {
          _key: "yala-p-07",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Scenic Yala landscape",
          cloudinaryPublicId: "tourist/yala/yala-photo-09",
          displayOrder: 7,
        },
        {
          _key: "yala-p-08",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Yala morning safari",
          cloudinaryPublicId: "tourist/yala/yala-photo-10",
          displayOrder: 8,
        },
        {
          _key: "yala-p-09",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Yala evening scenery",
          cloudinaryPublicId: "tourist/yala/yala-photo-11",
          displayOrder: 9,
        },
        {
          _key: "yala-p-10",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Leopard at Yala",
          cloudinaryPublicId: "tourist/yala/yala-photo-12",
          displayOrder: 10,
        },
        {
          _key: "yala-p-11",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Elephants at Yala",
          cloudinaryPublicId: "tourist/yala/yala-photo-13",
          displayOrder: 11,
        },
        {
          _key: "yala-p-12",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Birds at Yala lake",
          cloudinaryPublicId: "tourist/yala/yala-photo-14",
          displayOrder: 12,
        },
        {
          _key: "yala-p-13",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Yala coastal area",
          cloudinaryPublicId: "tourist/yala/yala-photo-15",
          displayOrder: 13,
        },
        {
          _key: "yala-v-01",
          _type: "mediaItem",
          mediaType: "video",
          altText: "Video from Yala safari",
          cloudinaryPublicId: "tourist/yala/yala-video-01",
          caption: "Safari experience at Yala",
          displayOrder: 14,
        },
      ],
      contact: { _type: "reference", _ref: "contact-main" },
      isFeatured: true,
      displayOrder: 1,
    },
    {
      _id: "dest-lunugamvehera",
      name: "Lunugamvehera National Park",
      slug: { _type: "slug", current: "lunugamvehera" },
      shortDescription:
        "A hidden gem bordering Yala, offering peaceful elephant gatherings and diverse birdlife without the crowds.",
      fullDescription:
        "Lunugamvehera National Park is located in the southern part of Sri Lanka, adjacent to Yala National Park. Established in 1995, the park serves as a corridor for elephants moving between Yala and Udawalawe national parks. It is known for its large elephant gatherings, especially during the dry season when herds congregate around the Lunugamvehera reservoir. The park is also a haven for birdwatchers with over 180 species recorded. Unlike its more famous neighbor Yala, Lunugamvehera offers a quieter, more intimate wildlife experience.",
      featuredImage: {
        _type: "cloudinaryMedia",
        publicId: "tourist/lunugamvehera/lunugamvehera-photo-01",
        altText: "Elephant herd at Lunugamvehera National Park",
      },
      gallery: [
        {
          _key: "lunu-photo-01",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Large elephant herd near the reservoir",
          cloudinaryPublicId: "tourist/lunugamvehera/lunugamvehera-photo-01",
          caption: "Elephants gathering near the Lunugamvehera reservoir",
          displayOrder: 1,
        },
        {
          _key: "lunu-photo-02",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Elephants in their natural habitat",
          cloudinaryPublicId: "tourist/lunugamvehera/lunugamvehera-photo-02",
          caption: "A peaceful herd at Lunugamvehera",
          displayOrder: 2,
        },
      ],
      contact: { _type: "reference", _ref: "contact-main" },
      isFeatured: true,
      displayOrder: 2,
    },
    {
      _id: "dest-sithulpawwa",
      name: "Sithulpawwa",
      slug: { _type: "slug", current: "sithulpawwa" },
      shortDescription:
        "An ancient Buddhist monastery perched on a massive rock, dating back over 2,000 years within Yala's borders.",
      fullDescription:
        "Sithulpawwa is an ancient Buddhist monastery situated on a huge rock within the Yala National Park. Dating back to the 2nd century BC, it was once home to over 12,000 monks who sought solitude for meditation. The site features ancient cave temples with well-preserved frescoes, dagobas (stupas), and rock inscriptions. Visitors can climb to the top of the rock for panoramic views of the surrounding jungle and coastline. The monastery remains an active place of worship and pilgrimage, blending spiritual significance with natural beauty and wildlife encounters.",
      featuredImage: {
        _type: "cloudinaryMedia",
        publicId: "tourist/sithulpawwa/sithulpawwa-photo-01",
        altText: "Sithulpawwa ancient Buddhist monastery on a rock",
      },
      gallery: [
        {
          _key: "sith-photo-01",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Ancient monastery perched on the rock",
          cloudinaryPublicId: "tourist/sithulpawwa/sithulpawwa-photo-01",
          caption: "The ancient Sithulpawwa monastery",
          displayOrder: 1,
        },
        {
          _key: "sith-photo-02",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Ancient temple carved into the rock face",
          cloudinaryPublicId: "tourist/sithulpawwa/sithulpawwa-photo-02",
          caption: "The ancient rock temple at Sithulpawwa",
          displayOrder: 2,
        },
      ],
      contact: { _type: "reference", _ref: "contact-main" },
      isFeatured: true,
      displayOrder: 3,
    },
    {
      _id: "dest-weheragala",
      name: "Weheragala",
      slug: { _type: "slug", current: "weheragala" },
      shortDescription:
        "A serene reservoir surrounded by wilderness, perfect for birdwatching and spotting elephants in their natural habitat.",
      fullDescription:
        "Weheragala is a scenic reservoir area located near Yala National Park in the southern dry zone of Sri Lanka. The reservoir and its surrounding wetlands attract large numbers of elephants, especially during the dry months when water becomes scarce elsewhere. The area is also renowned for its rich birdlife, with numerous water birds, raptors, and forest species. Weheragala offers a tranquil alternative to the busier safari circuits, with opportunities for nature photography, birdwatching, and observing wildlife in an undisturbed setting.",
      featuredImage: {
        _type: "cloudinaryMedia",
        publicId: "tourist/weheragala/weheragala-photo-01",
        altText: "Weheragala reservoir with elephants",
      },
      gallery: [
        {
          _key: "wehe-photo-01",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Scenic view of Weheragala reservoir",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-01",
          caption: "The peaceful Weheragala reservoir",
          displayOrder: 1,
        },
        {
          _key: "wehe-photo-02",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Elephants near the reservoir",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-02",
          caption: "Elephants gathering near the water",
          displayOrder: 2,
        },
        {
          _key: "wehe-photo-03",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Birds at Weheragala wetlands",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-03",
          caption: "Rich birdlife at the wetlands",
          displayOrder: 3,
        },
        {
          _key: "wehe-photo-04",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Scenic landscape at Weheragala",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-04",
          displayOrder: 4,
        },
        {
          _key: "wehe-photo-05",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Wildlife spotted at Weheragala",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-05",
          displayOrder: 5,
        },
        {
          _key: "wehe-photo-06",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Sunset over the reservoir",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-06",
          caption: "Golden sunset over the water",
          displayOrder: 6,
        },
        {
          _key: "wehe-photo-07",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Nature trail at Weheragala",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-07",
          displayOrder: 7,
        },
        {
          _key: "wehe-photo-08",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Panoramic view of Weheragala",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-08",
          displayOrder: 8,
        },
        {
          _key: "wehe-photo-09",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Water birds at the reservoir",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-09",
          displayOrder: 9,
        },
        {
          _key: "wehe-photo-10",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Dry zone vegetation around Weheragala",
          cloudinaryPublicId: "tourist/weheragala/weheragala-photo-10",
          displayOrder: 10,
        },
      ],
      contact: { _type: "reference", _ref: "contact-main" },
      isFeatured: true,
      displayOrder: 4,
    },
    {
      _id: "dest-bundala",
      name: "Bundala National Park",
      slug: { _type: "slug", current: "bundala" },
      shortDescription:
        "A Ramsar wetland sanctuary famous for migratory flamingos, coastal lagoons, and diverse waterbird populations.",
      fullDescription:
        "Bundala National Park is an internationally important wintering ground for migratory waterbirds in Sri Lanka. Designated as a Ramsar Wetland of International Importance, the park is located on the southern coast and encompasses a mix of dry thorny scrubland, lagoons, marshes, and sand dunes. Bundala is most famous for hosting large flocks of greater flamingos between September and March. The park is also home to elephants, crocodiles, and over 200 species of birds. Its relatively compact size and diverse habitats make it an excellent destination for birdwatching and nature photography.",
      featuredImage: {
        _type: "cloudinaryMedia",
        publicId: "tourist/bundala/bundala-photo-01",
        altText: "Bundala National Park scenery",
      },
      gallery: [
        {
          _key: "bund-p-01",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Wildlife at Bundala National Park",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-02",
          caption: "Bundala National Park wildlife",
          displayOrder: 1,
        },
        {
          _key: "bund-p-02",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Birds at Bundala lagoon",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-03",
          caption: "Birdlife at Bundala",
          displayOrder: 2,
        },
        {
          _key: "bund-p-03",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Bundala wetlands",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-04",
          displayOrder: 3,
        },
        {
          _key: "bund-p-04",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Bundala National Park landscape",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-05",
          displayOrder: 4,
        },
        {
          _key: "bund-p-05",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Nature at Bundala",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-06",
          displayOrder: 5,
        },
        {
          _key: "bund-p-06",
          _type: "mediaItem",
          mediaType: "photo",
          altText: "Bundala coastal scenery",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-07",
          displayOrder: 6,
        },
      ],
      contact: { _type: "reference", _ref: "contact-main" },
      isFeatured: true,
      displayOrder: 5,
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
        siteName: "Yala Safari Tours",
        tagline: "Explore Sri Lanka's wild southern coast",
        heroBanner: {
          _type: "cloudinaryMedia",
          publicId: "tourist/bundala/bundala-photo-06",
          altText: "Yala National Park wildlife safari",
        },
        heroImages: [
          {
            _key: "hero-1",
            _type: "cloudinaryMedia",
            publicId: "tourist/bundala/bundala-photo-06",
            altText: "Birds at Bundala National Park",
          },
          {
            _key: "hero-2",
            _type: "cloudinaryMedia",
            publicId: "tourist/yala/yala-photo-03",
            altText: "Wildlife at Yala National Park",
          },
          {
            _key: "hero-3",
            _type: "cloudinaryMedia",
            publicId: "tourist/yala/yala-photo-09",
            altText: "Yala safari scenery",
          },
          {
            _key: "hero-4",
            _type: "cloudinaryMedia",
            publicId: "tourist/bundala/bundala-photo-05",
            altText: "Nature at Bundala",
          },
          {
            _key: "hero-5",
            _type: "cloudinaryMedia",
            publicId: "tourist/yala/yala-photo-07",
            altText: "Yala National Park landscape",
          },
        ],
        featuredMedia: [
          {
            _key: "fm-1",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Wildlife at Yala National Park",
            cloudinaryPublicId: "tourist/yala/yala-photo-09",
            displayOrder: 1,
          },
          {
            _key: "fm-2",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Beautiful scenery at Yala",
            cloudinaryPublicId: "tourist/yala/yala-photo-05",
            displayOrder: 2,
          },
          {
            _key: "fm-3",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Nature at Bundala National Park",
            cloudinaryPublicId: "tourist/bundala/bundala-photo-05",
            displayOrder: 3,
          },
          {
            _key: "fm-4",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Scenic view at Weheragala",
            cloudinaryPublicId: "tourist/weheragala/weheragala-photo-01",
            displayOrder: 4,
          },
          {
            _key: "fm-5",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Safari video from Yala",
            cloudinaryPublicId: "tourist/yala/yala-video-01",
            displayOrder: 5,
          },
        ],
      },
    },
  ]);
  console.log("  ✓ Site settings created");

  // 4. Experiences
  console.log("Creating experiences...");
  await mutate([
    {
      createOrReplace: {
        _id: "exp-gami-gedara",
        _type: "experience",
        name: "Gami Gedara",
        slug: { _type: "slug", current: "gami-gedara" },
        shortDescription:
          "Immerse yourself in rich local culture with a guided village tour featuring clay pot making, cow milking, and a traditional Sri Lankan house.",
        fullDescription:
          "Immerse yourself in the rich local culture and traditions with our guided village tour. Explore the heart of the community and witness age-old craftsmanship as you observe skilled artisans creating clay pots. Engage with adorable cow infants, learn the art of milking cows, and gain a deeper understanding of rural life. As you visit a traditional house known as the 'Gami Gedara,' you'll step back in time, surrounded by historical Sri Lankan kitchen items that offer insights into the culinary heritage of the region. Our village tour promises an authentic and enlightening experience, allowing you to connect with the soul of Sri Lanka's countryside during your stay at Saffron Lake Yala Hotel.",
        category: "Cooking",
        duration: "Half Day",
        featuredImage: {
          _type: "cloudinaryMedia",
          publicId: "tourist/gami-gedara/gami-gedara-01",
          altText: "Traditional Gami Gedara village house experience",
        },
        gallery: [
          {
            _key: "gg-photo-01",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Traditional village house and cultural experience",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-01",
            caption: "The traditional Gami Gedara experience",
            displayOrder: 1,
          },
          {
            _key: "gg-photo-02",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Artisan creating clay pots",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-02",
            caption: "Skilled artisans creating clay pots",
            displayOrder: 2,
          },
          {
            _key: "gg-photo-03",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Traditional Sri Lankan cooking demonstration",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-03",
            caption: "Traditional cooking methods",
            displayOrder: 3,
          },
          {
            _key: "gg-photo-04",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Beautiful village surroundings",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-04",
            caption: "Scenic village landscape",
            displayOrder: 4,
          },
          {
            _key: "gg-photo-05",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Learning to milk cows",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-05",
            caption: "Hands-on cow milking experience",
            displayOrder: 5,
          },
          {
            _key: "gg-photo-06",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Historical Sri Lankan kitchen items",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-06",
            caption: "Historical kitchen items on display",
            displayOrder: 6,
          },
          {
            _key: "gg-photo-07",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Cultural artifacts in the village",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-07",
            displayOrder: 7,
          },
          {
            _key: "gg-photo-08",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Walking through the traditional village",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-08",
            displayOrder: 8,
          },
          {
            _key: "gg-photo-09",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Local craftsmanship on display",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-09",
            displayOrder: 9,
          },
          {
            _key: "gg-photo-10",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Community gathering at village",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-10",
            displayOrder: 10,
          },
          {
            _key: "gg-photo-11",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Rural heritage experience",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-11",
            displayOrder: 11,
          },
          {
            _key: "gg-photo-12",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Farewell at the village",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-12",
            displayOrder: 12,
          },
          {
            _key: "gg-photo-13",
            _type: "mediaItem",
            mediaType: "photo",
            altText: "Countryside view from the village",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-13",
            displayOrder: 13,
          },
          {
            _key: "gg-video-01",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Introduction to the village tour",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-video-01",
            caption: "Welcome to the Gami Gedara experience",
            displayOrder: 14,
          },
          {
            _key: "gg-video-02",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Artisan making clay pots",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-video-02",
            caption: "Traditional clay pot making",
            displayOrder: 15,
          },
          {
            _key: "gg-video-03",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Traditional cooking demonstration",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-video-03",
            displayOrder: 16,
          },
          {
            _key: "gg-video-04",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Cow milking demonstration",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-video-04",
            displayOrder: 17,
          },
          {
            _key: "gg-video-05",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Walking through the village",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-video-05",
            displayOrder: 18,
          },
          {
            _key: "gg-video-06",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Local cultural performance",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-video-06",
            displayOrder: 19,
          },
          {
            _key: "gg-video-07",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Tour of the traditional kitchen",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-video-07",
            displayOrder: 20,
          },
          {
            _key: "gg-video-08",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Nature around the village",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-video-08",
            displayOrder: 21,
          },
          {
            _key: "gg-video-09",
            _type: "mediaItem",
            mediaType: "video",
            altText: "Farewell at the Gami Gedara",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara-video-09",
            displayOrder: 22,
          },
        ],
        isActive: true,
        displayOrder: 1,
      },
    },
  ]);
  console.log("  ✓ Gami Gedara experience created");

  // 5. Trip Packages (Safari)
  console.log("Creating safari packages...");

  // Delete old trips
  await mutate([
    { delete: { id: "trip-yala-safari" } },
    { delete: { id: "trip-lunugamvehera-safari" } },
    { delete: { id: "trip-weheragala-safari" } },
    { delete: { id: "trip-bundala-safari" } },
    { delete: { id: "trip-sithulpawwa-heritage" } },
    { delete: { id: "trip-yala-full-day" } },
    { delete: { id: "trip-yala-morning-4hrs" } },
    { delete: { id: "trip-yala-morning-7hrs" } },
    { delete: { id: "trip-yala-afternoon" } },
    { delete: { id: "trip-weheragala-full-day" } },
    { delete: { id: "trip-weheragala-morning-4hrs" } },
    { delete: { id: "trip-weheragala-morning-7hrs" } },
    { delete: { id: "trip-weheragala-afternoon" } },
    { delete: { id: "trip-lunugamvehera-full-day" } },
    { delete: { id: "trip-lunugamvehera-morning-4hrs" } },
    { delete: { id: "trip-lunugamvehera-morning-7hrs" } },
    { delete: { id: "trip-lunugamvehera-afternoon" } },
    { delete: { id: "trip-bundala-morning" } },
    { delete: { id: "trip-bundala-afternoon" } },
    { delete: { id: "trip-sithulpawwa-morning" } },
    { delete: { id: "trip-sithulpawwa-afternoon" } },
  ]);

  const trips = [
    // === YALA SAFARI (Large) ===
    {
      _id: "trip-yala-full-day",
      _type: "tripOption",
      name: "Yala Safari — Full Day",
      slug: { _type: "slug", current: "yala-safari-full-day" },
      duration: "Full Day (4:30AM – 6:00PM)",
      shortDescription:
        "The ultimate Yala experience. A full day exploring Sri Lanka's premier wildlife sanctuary with lunch included. Recommended.",
      fullDescription:
        "Spend an entire day immersed in the wild beauty of Yala National Park. Starting at dawn when animals are most active, your experienced safari driver — who is also your tracker — will guide you through the park's diverse landscapes. Enjoy a traditional Sri Lankan rice and curry lunch in a scenic spot, along with fruits, soft drinks, and water throughout the day. This is our recommended package for the most comprehensive Yala experience.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
        "Fruits",
        "Sri Lankan Rice and Curry lunch",
      ],
      destinations: [{ _type: "reference", _ref: "dest-yala" }],
      isActive: true,
      displayOrder: 1,
    },
    {
      _id: "trip-yala-morning-4hrs",
      _type: "tripOption",
      name: "Yala Safari — Morning 4hrs",
      slug: { _type: "slug", current: "yala-safari-morning-4hrs" },
      duration: "Morning (4:30AM – 10:00AM)",
      shortDescription:
        "A focused 4-hour morning safari at Yala during peak wildlife activity hours.",
      fullDescription:
        "Catch the best wildlife action during the early morning hours when animals are most active. This 4-hour safari starts at dawn and takes you through Yala's prime wildlife zones. Your experienced safari driver doubles as your tracker, ensuring the best sightings of leopards, elephants, and birdlife.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-yala" }],
      isActive: true,
      displayOrder: 2,
    },
    {
      _id: "trip-yala-morning-7hrs",
      _type: "tripOption",
      name: "Yala Safari — Morning 7hrs",
      slug: { _type: "slug", current: "yala-safari-morning-7hrs" },
      duration: "Morning (4:30AM – 12:00PM)",
      shortDescription:
        "An extended 7-hour morning safari at Yala with fruits included for a deeper wildlife experience.",
      fullDescription:
        "An extended morning safari that gives you more time to explore Yala's vast terrain. Starting at dawn, you'll cover more ground and have better chances of spotting elusive wildlife. Fruits are provided along with soft drinks and water to keep you refreshed throughout the adventure.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
        "Fruits",
      ],
      destinations: [{ _type: "reference", _ref: "dest-yala" }],
      isActive: true,
      displayOrder: 3,
    },
    {
      _id: "trip-yala-afternoon",
      _type: "tripOption",
      name: "Yala Safari — Afternoon",
      slug: { _type: "slug", current: "yala-safari-afternoon" },
      duration: "Afternoon (2:00PM – 6:00PM)",
      shortDescription:
        "An afternoon safari at Yala, perfect for catching wildlife in the golden evening light.",
      fullDescription:
        "Experience Yala in the beautiful afternoon light when animals emerge from their midday rest. This safari is ideal for photographers and those who prefer a later start. Watch elephants at watering holes and predators beginning their evening hunt as the golden hour sets in.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-yala" }],
      isActive: true,
      displayOrder: 4,
    },

    // === WEHERAGALA SAFARI (Large — same as Yala) ===
    {
      _id: "trip-weheragala-full-day",
      _type: "tripOption",
      name: "Weheragala Safari — Full Day",
      slug: { _type: "slug", current: "weheragala-safari-full-day" },
      duration: "Full Day (4:30AM – 6:00PM)",
      shortDescription:
        "A full day at Weheragala's serene reservoir, spotting elephants and birdlife with lunch included. Recommended.",
      fullDescription:
        "Spend an entire day exploring the tranquil wilderness of Weheragala, where a scenic reservoir draws elephants, water birds, and diverse wildlife to its shores. Starting at dawn, your experienced safari driver — who is also your tracker — will guide you through the area's diverse habitats. Enjoy a traditional Sri Lankan rice and curry lunch, along with fruits, soft drinks, and water throughout the day.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
        "Fruits",
        "Sri Lankan Rice and Curry lunch",
      ],
      destinations: [{ _type: "reference", _ref: "dest-weheragala" }],
      isActive: true,
      displayOrder: 5,
    },
    {
      _id: "trip-weheragala-morning-4hrs",
      _type: "tripOption",
      name: "Weheragala Safari — Morning 4hrs",
      slug: { _type: "slug", current: "weheragala-safari-morning-4hrs" },
      duration: "Morning (4:30AM – 10:00AM)",
      shortDescription:
        "A focused 4-hour morning safari at Weheragala during peak wildlife activity hours.",
      fullDescription:
        "Catch the best wildlife action at Weheragala during the early morning hours. This 4-hour safari starts at dawn and takes you along the reservoir's edge where elephants come to drink and water birds are most active. Your experienced safari driver doubles as your tracker.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-weheragala" }],
      isActive: true,
      displayOrder: 6,
    },
    {
      _id: "trip-weheragala-morning-7hrs",
      _type: "tripOption",
      name: "Weheragala Safari — Morning 7hrs",
      slug: { _type: "slug", current: "weheragala-safari-morning-7hrs" },
      duration: "Morning (4:30AM – 12:00PM)",
      shortDescription:
        "An extended 7-hour morning safari at Weheragala with fruits included for a deeper nature experience.",
      fullDescription:
        "An extended morning at Weheragala gives you more time to explore the reservoir area and surrounding wetlands. Starting at dawn, you'll observe elephants, raptors, and diverse birdlife in their undisturbed habitat. Fruits are provided along with soft drinks and water.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
        "Fruits",
      ],
      destinations: [{ _type: "reference", _ref: "dest-weheragala" }],
      isActive: true,
      displayOrder: 7,
    },
    {
      _id: "trip-weheragala-afternoon",
      _type: "tripOption",
      name: "Weheragala Safari — Afternoon",
      slug: { _type: "slug", current: "weheragala-safari-afternoon" },
      duration: "Afternoon (2:00PM – 6:00PM)",
      shortDescription:
        "An afternoon safari at Weheragala, perfect for golden-hour photography by the reservoir.",
      fullDescription:
        "Experience Weheragala in the beautiful afternoon light. This safari is ideal for nature photography as elephants gather at the reservoir and water birds return to roost. The golden hour creates stunning conditions for capturing wildlife and landscapes.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-weheragala" }],
      isActive: true,
      displayOrder: 8,
    },

    // === LUNUGAMVEHERA SAFARI (Large — same as Yala) ===
    {
      _id: "trip-lunugamvehera-full-day",
      _type: "tripOption",
      name: "Lunugamvehera Safari — Full Day",
      slug: { _type: "slug", current: "lunugamvehera-safari-full-day" },
      duration: "Full Day (4:30AM – 6:00PM)",
      shortDescription:
        "A full day at Lunugamvehera, witnessing large elephant herds at the reservoir with lunch included. Recommended.",
      fullDescription:
        "Spend an entire day in the tranquil Lunugamvehera National Park, a hidden gem bordering Yala that serves as a vital elephant corridor. Starting at dawn, your experienced safari driver — who is also your tracker — will take you through diverse habitats where large elephant herds congregate. Enjoy a traditional Sri Lankan rice and curry lunch, along with fruits, soft drinks, and water throughout the day.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
        "Fruits",
        "Sri Lankan Rice and Curry lunch",
      ],
      destinations: [{ _type: "reference", _ref: "dest-lunugamvehera" }],
      isActive: true,
      displayOrder: 9,
    },
    {
      _id: "trip-lunugamvehera-morning-4hrs",
      _type: "tripOption",
      name: "Lunugamvehera Safari — Morning 4hrs",
      slug: { _type: "slug", current: "lunugamvehera-safari-morning-4hrs" },
      duration: "Morning (4:30AM – 10:00AM)",
      shortDescription:
        "A focused 4-hour morning safari at Lunugamvehera during peak elephant activity.",
      fullDescription:
        "Catch the best elephant sightings during the early morning hours at Lunugamvehera. This 4-hour safari starts at dawn when herds gather near the reservoir. Your experienced safari driver doubles as your tracker, ensuring intimate wildlife encounters without the crowds.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-lunugamvehera" }],
      isActive: true,
      displayOrder: 10,
    },
    {
      _id: "trip-lunugamvehera-morning-7hrs",
      _type: "tripOption",
      name: "Lunugamvehera Safari — Morning 7hrs",
      slug: { _type: "slug", current: "lunugamvehera-safari-morning-7hrs" },
      duration: "Morning (4:30AM – 12:00PM)",
      shortDescription:
        "An extended 7-hour morning at Lunugamvehera with fruits, for a deeper elephant and birdwatching experience.",
      fullDescription:
        "An extended morning safari that gives you more time to explore Lunugamvehera's vast terrain and observe its famous elephant gatherings. With over 180 bird species, there's always something to spot. Fruits are provided along with soft drinks and water.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
        "Fruits",
      ],
      destinations: [{ _type: "reference", _ref: "dest-lunugamvehera" }],
      isActive: true,
      displayOrder: 11,
    },
    {
      _id: "trip-lunugamvehera-afternoon",
      _type: "tripOption",
      name: "Lunugamvehera Safari — Afternoon",
      slug: { _type: "slug", current: "lunugamvehera-safari-afternoon" },
      duration: "Afternoon (2:00PM – 6:00PM)",
      shortDescription:
        "An afternoon safari at Lunugamvehera, ideal for watching elephants gather in the evening light.",
      fullDescription:
        "Experience Lunugamvehera in the peaceful afternoon when elephant herds move towards the reservoir. This safari is perfect for those who prefer a later start, offering excellent opportunities to observe wildlife behavior in the golden evening light.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-lunugamvehera" }],
      isActive: true,
      displayOrder: 12,
    },

    // === BUNDALA SAFARI (Small) ===
    {
      _id: "trip-bundala-morning",
      _type: "tripOption",
      name: "Bundala Safari — Morning",
      slug: { _type: "slug", current: "bundala-safari-morning" },
      duration: "Morning (4:30AM – 10:00AM)",
      shortDescription:
        "A morning safari to the Ramsar wetland sanctuary, famous for flamingos and 200+ bird species.",
      fullDescription:
        "Explore Bundala National Park in the cool morning hours when birdlife is at its most active. This Ramsar Wetland of International Importance hosts spectacular flocks of flamingos (seasonal), over 200 bird species, and diverse wildlife. Your experienced safari driver doubles as your tracker through the park's lagoons, marshes, and sand dunes.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-bundala" }],
      isActive: true,
      displayOrder: 13,
    },
    {
      _id: "trip-bundala-afternoon",
      _type: "tripOption",
      name: "Bundala Safari — Afternoon",
      slug: { _type: "slug", current: "bundala-safari-afternoon" },
      duration: "Afternoon (2:00PM – 6:00PM)",
      shortDescription:
        "An afternoon safari at Bundala, perfect for catching waterbirds and flamingos in the evening light.",
      fullDescription:
        "Experience Bundala National Park in the afternoon when waterbirds flock to the lagoons and the light is perfect for photography. This Ramsar Wetland sanctuary offers intimate encounters with flamingos, elephants, and crocodiles. Your experienced safari driver doubles as your tracker through this compact yet diverse park.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-bundala" }],
      isActive: true,
      displayOrder: 14,
    },

    // === SITHULPAWWA SAFARI (Small — same as Bundala) ===
    {
      _id: "trip-sithulpawwa-morning",
      _type: "tripOption",
      name: "Sithulpawwa Safari — Morning",
      slug: { _type: "slug", current: "sithulpawwa-safari-morning" },
      duration: "Morning (4:30AM – 10:00AM)",
      shortDescription:
        "A morning safari to the ancient 2,000-year-old Buddhist monastery perched on a rock within Yala.",
      fullDescription:
        "Journey to Sithulpawwa in the cool morning hours, combining a wildlife safari with a visit to one of Sri Lanka's most ancient Buddhist monasteries. Dating back to the 2nd century BC, the monastery sits atop a massive rock with panoramic views. Your experienced safari driver doubles as your tracker through the jungle trails, where wildlife encounters are common.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-sithulpawwa" }],
      isActive: true,
      displayOrder: 15,
    },
    {
      _id: "trip-sithulpawwa-afternoon",
      _type: "tripOption",
      name: "Sithulpawwa Safari — Afternoon",
      slug: { _type: "slug", current: "sithulpawwa-safari-afternoon" },
      duration: "Afternoon (2:00PM – 6:00PM)",
      shortDescription:
        "An afternoon safari to Sithulpawwa, combining wildlife spotting with ancient heritage in golden light.",
      fullDescription:
        "Visit Sithulpawwa in the afternoon when the golden light illuminates the ancient rock monastery beautifully. The jungle trail offers wildlife encounters with peacocks, monkeys, and other animals. Climb to the summit for panoramic views of the surrounding jungle and coastline at sunset. Your experienced safari driver doubles as your tracker.",
      highlights: [
        "All Inclusive",
        "Private Luxury Safari Jeep",
        "Experienced Safari Driver (also your tracker)",
        "All taxes & entrance tickets",
        "Free hotel pickup and drop off (around the Yala area)",
        "Soft drinks and water",
      ],
      destinations: [{ _type: "reference", _ref: "dest-sithulpawwa" }],
      isActive: true,
      displayOrder: 16,
    },
  ];

  for (const trip of trips) {
    await mutate([{ createOrReplace: trip }]);
    console.log(`  ✓ ${trip.name}`);
  }

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

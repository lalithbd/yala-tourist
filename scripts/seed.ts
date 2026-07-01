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
        phone: "+94-11-2345678",
        email: "info@touristsite.com",
        address: "123 Beach Road\nColombo 03\nSri Lanka",
        coordinates: { _type: "geopoint", lat: 6.9271, lng: 79.8612 },
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

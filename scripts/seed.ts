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
          title: "Yala wildlife scene 1",
          altText: "Wildlife in Yala National Park",
          cloudinaryPublicId: "tourist/yala/yala-photo-02",
          caption: "Wildlife spotted during a Yala safari",
          displayOrder: 1,
        },
        {
          _key: "yala-p-02",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Yala wildlife scene 2",
          altText: "Wildlife encounter at Yala",
          cloudinaryPublicId: "tourist/yala/yala-photo-05",
          caption: "Animals in their natural habitat",
          displayOrder: 2,
        },
        {
          _key: "yala-p-03",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Yala wildlife scene 3",
          altText: "Safari experience at Yala",
          cloudinaryPublicId: "tourist/yala/yala-photo-06",
          displayOrder: 3,
        },
        {
          _key: "yala-p-04",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Yala wildlife scene 4",
          altText: "Nature at Yala National Park",
          cloudinaryPublicId: "tourist/yala/yala-photo-07",
          displayOrder: 4,
        },
        {
          _key: "yala-p-05",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Yala wildlife scene 5",
          altText: "Yala National Park landscape",
          cloudinaryPublicId: "tourist/yala/yala-photo-08",
          displayOrder: 5,
        },
        {
          _key: "yala-p-06",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Yala wildlife scene 6",
          altText: "Yala safari scenery",
          cloudinaryPublicId: "tourist/yala/yala-photo-09",
          displayOrder: 6,
        },
        {
          _key: "yala-v-01",
          _type: "mediaItem",
          mediaType: "video",
          title: "Yala safari video 1",
          altText: "Video from Yala safari",
          cloudinaryPublicId: "tourist/yala/yala-video-01",
          caption: "Safari experience at Yala",
          displayOrder: 7,
        },
        {
          _key: "yala-v-02",
          _type: "mediaItem",
          mediaType: "video",
          title: "Yala safari video 2",
          altText: "Wildlife video from Yala",
          cloudinaryPublicId: "tourist/yala/yala-video-02",
          displayOrder: 8,
        },
        {
          _key: "yala-v-03",
          _type: "mediaItem",
          mediaType: "video",
          title: "Yala safari video 3",
          altText: "Animals in motion at Yala",
          cloudinaryPublicId: "tourist/yala/yala-video-03",
          displayOrder: 9,
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
        publicId: "tourist/lunugamvehera",
        altText: "Elephant herd at Lunugamvehera National Park",
      },
      gallery: [
        {
          _key: "lunu-photo-1",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Elephant gathering",
          altText: "Large elephant herd near the reservoir",
          cloudinaryPublicId: "tourist/lunugamvehera-elephants",
          caption: "Elephants gathering near the Lunugamvehera reservoir",
          displayOrder: 1,
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
        publicId: "tourist/sithulpawwa",
        altText: "Sithulpawwa ancient Buddhist monastery on a rock",
      },
      gallery: [
        {
          _key: "sith-photo-1",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Sithulpawwa temple",
          altText: "Ancient temple carved into the rock face",
          cloudinaryPublicId: "tourist/sithulpawwa-temple",
          caption: "The ancient rock temple at Sithulpawwa",
          displayOrder: 1,
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
        publicId: "tourist/weheragala",
        altText: "Weheragala reservoir with elephants",
      },
      gallery: [
        {
          _key: "wehe-photo-1",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Weheragala reservoir",
          altText: "Scenic view of Weheragala reservoir at sunset",
          cloudinaryPublicId: "tourist/weheragala-reservoir",
          caption: "The peaceful Weheragala reservoir at sunset",
          displayOrder: 1,
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
          title: "Bundala scene 1",
          altText: "Wildlife at Bundala National Park",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-02",
          caption: "Bundala National Park wildlife",
          displayOrder: 1,
        },
        {
          _key: "bund-p-02",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Bundala scene 2",
          altText: "Birds at Bundala lagoon",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-03",
          caption: "Birdlife at Bundala",
          displayOrder: 2,
        },
        {
          _key: "bund-p-03",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Bundala scene 3",
          altText: "Bundala wetlands",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-04",
          displayOrder: 3,
        },
        {
          _key: "bund-p-04",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Bundala scene 4",
          altText: "Bundala National Park landscape",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-05",
          displayOrder: 4,
        },
        {
          _key: "bund-p-05",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Bundala scene 5",
          altText: "Nature at Bundala",
          cloudinaryPublicId: "tourist/bundala/bundala-photo-06",
          displayOrder: 5,
        },
        {
          _key: "bund-p-06",
          _type: "mediaItem",
          mediaType: "photo",
          title: "Bundala scene 6",
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
            title: "Yala wildlife",
            altText: "Wildlife at Yala National Park",
            cloudinaryPublicId: "tourist/yala/yala-photo-09",
            displayOrder: 1,
          },
          {
            _key: "fm-2",
            _type: "mediaItem",
            mediaType: "photo",
            title: "Yala scenery",
            altText: "Beautiful scenery at Yala",
            cloudinaryPublicId: "tourist/yala/yala-photo-10",
            displayOrder: 2,
          },
          {
            _key: "fm-3",
            _type: "mediaItem",
            mediaType: "photo",
            title: "Bundala nature",
            altText: "Nature at Bundala National Park",
            cloudinaryPublicId: "tourist/bundala/bundala-photo-05",
            displayOrder: 3,
          },
          {
            _key: "fm-4",
            _type: "mediaItem",
            mediaType: "video",
            title: "Yala safari experience",
            altText: "Safari video from Yala",
            cloudinaryPublicId: "tourist/yala/yala-video-04",
            displayOrder: 4,
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
          publicId: "tourist/gami-gedara/gami-gedara",
          altText: "Traditional Gami Gedara village house experience",
        },
        gallery: [
          {
            _key: "gg-photo-1",
            _type: "mediaItem",
            mediaType: "photo",
            title: "Gami Gedara village tour",
            altText: "Traditional village house and cultural experience",
            cloudinaryPublicId: "tourist/gami-gedara/gami-gedara",
            caption: "The traditional Gami Gedara experience",
            displayOrder: 1,
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

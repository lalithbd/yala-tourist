import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'heroBanner',
      title: 'Hero Banner Image',
      type: 'cloudinaryMedia',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Slideshow Images',
      description: 'Multiple images that rotate in the hero banner. Falls back to Hero Banner Image if empty.',
      type: 'array',
      of: [{ type: 'cloudinaryMedia' }],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'featuredMedia',
      title: 'Featured Media (Home Page)',
      type: 'array',
      of: [{ type: 'mediaItem' }],
      validation: (Rule) => Rule.max(6),
    }),
  ],
})

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cloudinaryMedia',
  title: 'Cloudinary Media',
  type: 'object',
  fields: [
    defineField({
      name: 'publicId',
      title: 'Cloudinary Public ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
    }),
  ],
})

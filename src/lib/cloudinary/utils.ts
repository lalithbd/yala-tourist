const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ''

/**
 * Constructs a Cloudinary delivery URL from a public ID.
 * Use this when you need a raw URL outside of CldImage/CldVideoPlayer components.
 */
export function buildCloudinaryUrl(
  publicId: string,
  options: {
    resourceType?: 'image' | 'video'
    transformations?: string
    format?: string
  } = {}
): string {
  const { resourceType = 'image', transformations, format = 'auto' } = options
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload`
  const parts = [base]

  if (transformations) {
    parts.push(transformations)
  }

  if (format) {
    parts.push(`f_${format}`)
  }

  parts.push(publicId)
  return parts.join('/')
}

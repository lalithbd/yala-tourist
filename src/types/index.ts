export interface CloudinaryMediaRef {
  publicId: string
  altText?: string
  width?: number
  height?: number
}

export interface MediaItem {
  _key: string
  mediaType: 'photo' | 'video'
  title: string
  altText?: string
  cloudinaryPublicId: string
  caption?: string
  displayOrder?: number
}

export interface Destination {
  _id: string
  name: string
  slug: { current: string }
  shortDescription: string
  fullDescription: string
  featuredImage: CloudinaryMediaRef
  gallery: MediaItem[]
  contact?: ContactInfo
  isFeatured: boolean
  displayOrder?: number
}

export interface ContactInfo {
  _id: string
  label: string
  phone?: string
  email?: string
  address?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface TripOption {
  _id: string
  name: string
  slug: { current: string }
  duration: string
  shortDescription: string
  fullDescription: string
  featuredImage?: CloudinaryMediaRef
  price?: string
  highlights?: string[]
  destinations?: Destination[]
  isActive: boolean
  displayOrder?: number
}

export interface SiteSettings {
  siteName: string
  tagline: string
  heroBanner: CloudinaryMediaRef
  featuredMedia: MediaItem[]
}

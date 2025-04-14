import type { SanityImageValue } from "@sanity/image-url/lib/types/types"

export interface Talk {
  _id: string
  title: string
  description: string | any
  date: string
  image: SanityImageValue
  videoUrl?: string
  link?: string
  conference?: string
  location?: string
}

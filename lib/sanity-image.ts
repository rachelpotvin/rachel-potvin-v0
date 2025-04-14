import imageUrlBuilder from "@sanity/image-url"
import { client } from "./sanity-client"

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  if (!source) return { url: () => null }

  // Create a configured image builder
  const imageBuilder = builder.image(source)

  // Return the builder with auto format and fit options
  return imageBuilder.auto("format").fit("max")
}

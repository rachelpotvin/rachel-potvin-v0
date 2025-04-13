import imageUrlBuilder from "@sanity/image-url"
import { client } from "./sanity-client"

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  if (!source) {
    return {
      url: () => null,
    }
  }
  return builder.image(source)
}

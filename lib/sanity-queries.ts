import { client } from "./sanity-client"

export async function getBio() {
  try {
    // Query to fetch a single bio document with name, title, image, and bio fields
    const query = `*[_type == "bio"][0]{
      name,
      title,
      image,
      bio
    }`

    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching bio:", error)
    return null
  }
}

export async function getTalks() {
  try {
    const query = `*[_type == "talk"] | order(date desc) {
      _id,
      title,
      description,
      date,
      image,
      videoUrl,
      conference,
      location
    }`

    return await client.fetch(query)
  } catch (error) {
    console.error("Error fetching talks:", error)
    return []
  }
}

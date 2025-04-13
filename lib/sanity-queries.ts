import { client } from "./sanity-client"

export async function getBio() {
  try {
    // Query that fetches the bio content, keeping the rich text format intact
    const query = `*[_type == "author"][0]{
      name,
      title,
      "summary": bio,
      image,
      socialLinks[]{ platform, url }
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

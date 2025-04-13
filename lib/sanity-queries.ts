import { client } from "./sanity-client"

export async function getBio() {
  try {
    // Updated query to fetch LinkedIn profile along with other bio data
    const query = `*[_type == "bio"][0]{
      name,
      title,
      image,
      bio,
      linkedin,
      "socialLinks": socialLinks[] {
        platform,
        url
      },
      "social": social {
        linkedin
      },
      "contact": contact {
        linkedin
      }
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

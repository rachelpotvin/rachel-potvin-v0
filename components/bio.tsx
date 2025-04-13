import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { urlForImage } from "@/lib/sanity-image"

interface BioProps {
  bio?: {
    name?: string
    title?: string
    summary?: any // Changed to any to accommodate Portable Text
    image?: any
    socialLinks?: {
      platform: string
      url: string
    }[]
  }
}

// Portable Text components configuration
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-4">
          <Image
            src={urlForImage(value).url() || ""}
            alt={value.alt || ""}
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </a>
      )
    },
  },
}

export default function Bio({ bio }: BioProps) {
  // If bio is undefined or null, show a placeholder
  if (!bio) {
    return (
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-40 h-40 md:w-48 md:h-48 relative rounded-full overflow-hidden flex-shrink-0 bg-gray-200"></div>
          <div className="flex-1 text-center md:text-left">
            <div className="h-10 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-24 w-full bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {bio.image ? (
          <div className="w-40 h-40 md:w-48 md:h-48 relative rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={urlForImage(bio.image).url() || "/placeholder.svg?height=192&width=192"}
              alt={bio.name || "Profile"}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-40 h-40 md:w-48 md:h-48 relative rounded-full overflow-hidden flex-shrink-0 bg-gray-200"></div>
        )}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{bio.name || "Name"}</h1>
          <p className="text-lg text-gray-600 mb-4">{bio.title || "Title"}</p>
          <div className="prose max-w-none mb-6">
            {bio.summary ? <PortableText value={bio.summary} components={ptComponents} /> : <p>Bio summary</p>}
          </div>

          {bio.socialLinks && bio.socialLinks.length > 0 && (
            <div className="flex gap-4 justify-center md:justify-start">
              {bio.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

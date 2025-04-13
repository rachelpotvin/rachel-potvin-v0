import type React from "react"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { Linkedin } from "lucide-react"
import { urlForImage } from "@/lib/sanity-image"
import type { SanityImageValue } from "@sanity/image-url/lib/types/types"

interface SocialLink {
  platform: string
  url: string
}

interface BioData {
  name?: string
  title?: string
  bio?: any
  image?: SanityImageValue
  linkedin?: string
  socialLinks?: SocialLink[]
  social?: {
    linkedin?: string
  }
  contact?: {
    linkedin?: string
  }
}

interface BioProps {
  bio?: BioData
}

const ptComponents = {
  types: {
    image: ({ value }: { value: SanityImageValue & { alt?: string } }) => {
      if (!value?.asset?._ref) return null

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
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
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
  if (!bio) {
    return (
      <section className="mb-16">
        <div className="text-center mb-8">
          <div className="h-10 w-48 bg-gray-200 rounded mb-2 mx-auto" />
          <div className="h-6 w-32 bg-gray-200 rounded mb-4 mx-auto" />
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="w-40 h-40 md:w-48 md:h-48 relative rounded-full overflow-hidden flex-shrink-0 bg-gray-200" />
          <div className="w-full max-w-2xl">
            <div className="h-24 bg-gray-200 rounded mb-6" />
          </div>
        </div>
      </section>
    )
  }

  // Find LinkedIn URL from various possible locations in the schema
  const linkedinUrl =
    bio.linkedin ||
    bio.social?.linkedin ||
    bio.contact?.linkedin ||
    bio.socialLinks?.find(
      (link) => link.platform.toLowerCase() === "linkedin" || link.platform.toLowerCase() === "linked in",
    )?.url

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{bio.name || "Name"}</h1>
        <p className="text-lg text-gray-600 mb-2">{bio.title || "Title"}</p>

        {linkedinUrl && (
          <a
            href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mt-2"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
            <span className="text-sm">LinkedIn Profile</span>
          </a>
        )}
      </div>

      <div className="flex flex-col items-center gap-8">
        {bio.image ? (
          <div className="w-40 h-40 md:w-48 md:h-48 relative rounded-full overflow-hidden">
            <Image
              src={urlForImage(bio.image).url() || "/placeholder.svg?height=192&width=192"}
              alt={bio.name || "Profile"}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-40 h-40 md:w-48 md:h-48 relative rounded-full overflow-hidden bg-gray-200" />
        )}

        <div className="prose prose-lg max-w-2xl mx-auto">
          {bio.bio ? <PortableText value={bio.bio} components={ptComponents} /> : <p>Bio content</p>}
        </div>
      </div>
    </section>
  )
}

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
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 text-lg leading-relaxed text-gray-300">{children}</p>
    ),
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl font-bold mb-4 gradient-text">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mb-3 gradient-text">{children}</h2>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImageValue & { alt?: string } }) => {
      if (!value?.asset?._ref) return null

      return (
        <div className="my-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlForImage(value).url() || ""}
            alt={value.alt || ""}
            width={800}
            height={400}
            className="w-full"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline font-medium">
          {children}
        </a>
      )
    },
    strong: ({ children }: { children: React.ReactNode }) => <strong className="font-bold">{children}</strong>,
  },
}

export default function Bio({ bio }: BioProps) {
  if (!bio) {
    return (
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="h-12 w-48 bg-gray-800 rounded animate-pulse" />
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full bg-gray-800 animate-pulse" />
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
    <section className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 animate-in delay-100">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">{bio.name || "Name"}</h1>
          <p className="text-xl md:text-2xl gradient-text font-medium">{bio.title || "Title"}</p>
        </div>

        {linkedinUrl && (
          <a
            href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition-colors border border-gray-700 rounded-full px-4 py-2 hover:border-primary"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
            <span className="text-sm font-medium">Connect on LinkedIn</span>
          </a>
        )}

        <div className="prose prose-lg prose-invert max-w-none">
          {bio.bio ? <PortableText value={bio.bio} components={ptComponents} /> : <p>Bio content</p>}
        </div>
      </div>

      <div className="flex justify-center animate-in delay-200">
        {bio.image ? (
          <div className="relative w-64 h-64 md:w-80 md:h-80 gradient-border p-1 rounded-full">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={urlForImage(bio.image).url() || "/placeholder.svg?height=320&width=320"}
                alt={bio.name || "Profile"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-800" />
        )}
      </div>
    </section>
  )
}

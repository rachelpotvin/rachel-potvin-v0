import Image from "next/image"
import { urlForImage } from "@/lib/sanity-image"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { PortableText } from "@portabletext/react"

interface Talk {
  _id: string
  title: string
  description: any // Changed to any to accommodate Portable Text
  date: string
  image: any
  videoUrl?: string
  conference?: string
  location?: string
}

// Portable Text components configuration
const ptComponents = {
  block: {
    normal: ({ children }: any) => <p className="text-gray-600 mb-3 line-clamp-3">{children}</p>,
  },
}

export default function TalkCard({ talk }: { talk: Talk }) {
  return (
    <div className="group bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        {talk.image ? (
          <Image
            src={urlForImage(talk.image).url() || "/placeholder.svg"}
            alt={talk.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{talk.title}</h3>

        <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600">
          {talk.conference && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{talk.conference}</span>
            </div>
          )}
        </div>

        <div className="mb-3">
          {typeof talk.description === "string" ? (
            <p className="text-gray-600 line-clamp-3">{talk.description}</p>
          ) : (
            <div className="text-gray-600 line-clamp-3">
              <PortableText value={talk.description} components={ptComponents} />
            </div>
          )}
        </div>

        {talk.date && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(talk.date)}</span>
          </div>
        )}

        {talk.videoUrl && (
          <a
            href={talk.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            Watch Video <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  )
}

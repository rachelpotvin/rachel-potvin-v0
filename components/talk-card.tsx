import type React from "react"
import Image from "next/image"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { PortableText } from "@portabletext/react"
import { urlForImage } from "@/lib/sanity-image"
import { formatDate } from "@/lib/utils"
import type { Talk } from "@/types/talk"

const ptComponents = {
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-gray-300 mb-3 line-clamp-3">{children}</p>
    ),
  },
}

export default function TalkCard({ talk, index }: { talk: Talk; index: number }) {
  return (
    <div
      className="talk-card relative bg-card rounded-lg overflow-hidden shadow-md border border-gray-800 hover:border-gray-700 transition-all duration-300"
      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
    >
      <div className="relative aspect-[16/9] w-full bg-gray-900 overflow-hidden">
        {talk.image ? (
          <div className="card-image w-full h-full">
            <Image
              src={urlForImage(talk.image).url() || "/placeholder.svg?height=192&width=192"}
              alt={talk.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <span className="text-gray-600">No image</span>
          </div>
        )}

        {/* Overlay gradient that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white hover:text-primary transition-colors">{talk.title}</h3>

        {talk.conference && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{talk.conference}</span>
          </div>
        )}

        <div className="mb-4">
          {typeof talk.description === "string" ? (
            <p className="text-gray-300 line-clamp-3">{talk.description}</p>
          ) : (
            <div className="text-gray-300 line-clamp-3">
              <PortableText value={talk.description} components={ptComponents} />
            </div>
          )}
        </div>

        {talk.date && (
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(talk.date)}</span>
          </div>
        )}

        {talk.link ? (
          <a
            href={talk.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group"
          >
            <span>Link</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        ) : null}
      </div>
    </div>
  )
}

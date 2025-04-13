import { getBio, getTalks } from "@/lib/sanity-queries"
import Bio from "@/components/bio"
import TalksList from "@/components/talks-list"

export default async function HomePage() {
  const bio = await getBio()
  const talks = await getTalks()

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <Bio bio={bio} />
        <TalksList talks={talks} />
      </div>
    </main>
  )
}


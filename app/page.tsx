import { getBio, getTalks } from "@/lib/sanity-queries"
import Bio from "@/components/bio"
import TalksList from "@/components/talks-list"

export default async function HomePage() {
  const bio = await getBio()
  const talks = await getTalks()

  return (
    <main className="min-h-screen pt-16">
      {" "}
      {/* Added pt-16 to account for fixed header */}
      <div className="hero-pattern">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <Bio bio={bio} />
        </div>
      </div>
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24" id="talks">
          <TalksList talks={talks} />
        </div>
      </div>
    </main>
  )
}

import TalkCard from "./talk-card"
import type { Talk } from "@/types/talk"

interface TalksListProps {
  talks: Talk[]
}

export default function TalksList({ talks = [] }: TalksListProps) {
  if (!talks || talks.length === 0) {
    return (
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">Conference Talks and Podcasts</h2>
        <div className="text-center py-12 bg-card rounded-lg shadow-sm">
          <p className="text-gray-400">No talks found. Add some talks in your Sanity studio.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="animate-in delay-300">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Conference Talks and Podcasts</h2>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl">
        A collection of my presentations, conference talks, and podcast appearances.
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {talks.map((talk, index) => (
          <TalkCard key={talk._id} talk={talk} index={index} />
        ))}
      </div>
    </section>
  )
}

import TalkCard from "./talk-card"

interface Talk {
  _id: string
  title: string
  description: string
  date: string
  image: any
  videoUrl?: string
  conference?: string
  location?: string
}

interface TalksListProps {
  talks: Talk[]
}

export default function TalksList({ talks = [] }: TalksListProps) {
  if (!talks || talks.length === 0) {
    return (
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 pb-4 border-b">Conferences and Podcasts</h2>
        <p className="text-gray-500">No talks found. Add some talks in your Sanity studio.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-8 pb-4 border-b">Conferences and Podcasts</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {talks.map((talk) => (
          <TalkCard key={talk._id} talk={talk} />
        ))}
      </div>
    </section>
  )
}

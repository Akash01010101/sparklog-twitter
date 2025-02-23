import { ThreadComposer } from "./thread-composer"
import { Header } from "./header"
import { SavedThreads } from "./saved-threads"

export default function ThreadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <ThreadComposer />
        <SavedThreads />
      </main>
    </div>
  )
}
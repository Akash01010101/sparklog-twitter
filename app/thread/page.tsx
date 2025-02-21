import { ThreadComposer } from "./thread-composer"
import { Header } from "./header"

export default function ThreadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <ThreadComposer />
      </main>
    </div>
  )
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

interface Tweet {
  content: string
  imageFile?: File
}

interface ThreadPreviewProps {
  tweets: Tweet[]
}

export function ThreadPreview({ tweets }: ThreadPreviewProps) {
  return (
    <div className="space-y-4">
      {tweets.map((tweet, index) => (
        <div key={index} className="flex space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">User Name</div>
            <p className="text-gray-600">{tweet.content}</p>
            {tweet.imageFile && (
              <div className="mt-2">
                <Image
                  src={URL.createObjectURL(tweet.imageFile) || "/placeholder.svg"}
                  alt="Tweet image"
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
import Image from "next/image"

import { Button } from "@/components/ui/button"

export const EmptyBoards = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="Empty Boards" width={110} height={110} />
      <h2 className="text-2xl font-bold mt-6">Create Your First Board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg">Create board</Button>
      </div>
    </div>
  )
}

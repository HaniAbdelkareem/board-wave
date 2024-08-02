"use client"

import Image from "next/image"
import { useOrganization } from "@clerk/nextjs"
import { toast } from "sonner"

import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onCLick = () => {
    if (!organization) return

    mutate({
      orgId: organization.id,
      title: "Untitled"
    })
      .then((id) => {
        toast.success("Board created")
        // TODO: Redirect to board/{id}
      })
      .catch(() => toast.error("Failed to create board"))
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="Empty Boards" width={110} height={110} />
      <h2 className="text-2xl font-bold mt-6">Create Your First Board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onCLick} size="lg">
          Create board
        </Button>
      </div>
    </div>
  )
}

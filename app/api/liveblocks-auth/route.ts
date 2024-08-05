import { Liveblocks } from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"

import { api } from "@/convex/_generated/api"
import { auth, currentUser } from "@clerk/nextjs/server"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  // Hide this in the .env file
  secret: process.env.LIVE_BLOCKS_SECRET_KEY!
  // secret:
  //   "sk_dev_Rh0Xz9mI9_Tk6Ams7DjpRE3i1FXLv_LfTtEJwT5XzIt0MsIachBcdKfWXUt64Lvr"
})

export async function POST(request: Request) {
  const authorization = await auth()
  const user = await currentUser()

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 })
  }

  const { room } = await request.json()
}

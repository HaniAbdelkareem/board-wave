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

  console.log("AUTH_INFO", {
    authorization,
    user
  })

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 })
  }

  const { room } = await request.json()
  const board = await convex.query(api.board.get, { id: room })

  console.log("AUTH_INFO", {
    room,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authorization.orgId
  })

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 })
  }

  const userInfo = {
    name: user.firstName || "Team mate",
    picture: user.imageUrl
  }

  console.log({ userInfo })

  const session = liveblocks.prepareSession(user.id, { userInfo })

  if (room) {
    session.allow(room, session.FULL_ACCESS)
  }

  const { status, body } = await session.authorize()
  console.log({ status, body }, "ALLOWED")
  return new Response(body, { status })
}

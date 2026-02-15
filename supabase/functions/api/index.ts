import { serve } from "https://deno.land/std/http/server.ts"
import { handleUsers } from "./users.ts"

serve(async (req) => {
  const url = new URL(req.url)
  const path = url.pathname.replace(/^\/+/, "")
  const segments = path.split("/")

  /**
   * Expected pattern:
   * /api/v1/users
   * /api/v1/users/:id
   */

  if (segments[0] !== "api" || segments[1] !== "v1") {
    return new Response("Not Found", { status: 404 })
  }

  if (segments[2] === "users") {
    const userId = segments[3]
    return handleUsers(req, userId)
  }

  return new Response("Not Found", { status: 404 })
})
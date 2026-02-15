import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
)

export async function handleUsers(req: Request, userId?: string) {
  switch (req.method) {
    case "GET":
      return userId ? getUserById(userId) : getUsers()

    case "PUT":
    case "PATCH":
      if (!userId) return badRequest("User ID required")
      return updateUser(userId, req)

    case "DELETE":
      if (!userId) return badRequest("User ID required")
      return deleteUser(userId)

    default:
      return methodNotAllowed()
  }
}

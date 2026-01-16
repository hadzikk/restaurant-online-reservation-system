import type { Session } from "@supabase/supabase-js"

export type AuthContextType = {
    session: Session | null
    loading: boolean
    user: Session['user']
    register: (
        data: {
            email: string
            password: string
            first_name: string
            middle_name?: string
            last_name?: string
        }
    ) => Promise<void>
    login: (
        data: {
            email: string
            password: string
        }
    ) => Promise<void>
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}
import type { Session } from "@supabase/supabase-js"

export type AuthContextType = {
    session: Session | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, full_name: string, birthday: Date, gender: string, phone: string, password: string) => Promise<void>
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
}
import type { Session } from "@supabase/supabase-js"

export type AuthContextType = {
    session: Session | null
    login: (email: string, password: string) => Promise<{
        success: boolean
        error?: any
        data?: {
            user: any
            session: any
        }
    }>
    register: (email: string, password: string) => Promise<{
        success: boolean
        error?: any
        data?: {
            user: any
            session: any
        }
    }>
    signOut: () => Promise<{ error?: Error }>
}
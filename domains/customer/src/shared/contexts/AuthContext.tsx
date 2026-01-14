import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { UserService } from '../services'
import type { AuthContextType } from '../types'
import { supabase } from '../api/supabase'

type Props = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthContextProvider = ({ children }: Props) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const user = session?.user ?? null

    const register = async (data: {
        email: string
        password: string
        first_name: string
        middle_name?: string
        last_name?: string
    }) => {
        try {
            const { data: auth, error: errorAuth } = await supabase.auth.signUp({
                email: data.email,
                password: data.password
            })

            if (errorAuth) throw new Error(errorAuth.message)
            if (!auth.user) throw new Error('Failed to create auth user')

            const newUser = await UserService.createUser({
                id: auth.user.id,  
                email: data.email,
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                created_at: new Date(),
                updated_at: new Date()
            })

            return newUser
        } catch (error) {
            console.error('Registration error:', error)
            throw error
        }
    }

    const login = async (data: {
        email: string
        password: string
    }) => {
        try {
            const { data: auth, error: errorAuth } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            })

            if (errorAuth) throw new Error(errorAuth.message)
            setSession(auth.session)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ session, register, login, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
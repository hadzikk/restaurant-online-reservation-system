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

    const register = async (data: {
        email: string
        password: string
        first_name: string
        middle_name: string
        last_name: string
    }) => {
        try {
            // register using Supabase
            const { data: auth, error: errorAuth } = await supabase.auth.signUp({
                email: data.email,
                password: data.password
            })

            if (errorAuth) throw new Error(errorAuth.message)
            
            const newUser = await UserService.createUser({
                email: data.email,
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name
            })

            if (!newUser) throw new Error('Failed to create user')
        } catch (error) {
            throw error
        }
    }

    const login = async (data: {
        email: string
        password: string
    }) => {
        try {
            // Verified login using Supabase
            const { data: auth, error: errorAuth } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            })

            if (errorAuth) throw new Error(errorAuth.message)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ session, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
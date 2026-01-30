import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { OrderService, UserService } from '../services'
import type { AuthContextType } from '../types'
import { supabase } from '../api/supabase'

type Props = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthContextProvider = ({ children }: Props) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    const signUp = async (email: string, full_name: string, birthday: Date, gender: string, phone: string, password: string) => {
        try {
            const { data: auth, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password
            })

            if (authError) throw authError

            if (auth?.user) {
                await UserService.createCustomer(auth.user.id, auth.user.email, full_name, birthday, gender, phone)
                await OrderService.createCustomerOrder(auth.user.id)
            }
        } catch (error) {
            throw error
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
        } catch (error) {
            throw error
        }
    }

    const signInWithGoogle = async () => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            })
            if (error) {
                setLoading(false)
                throw new Error(error.message)
            }
        } catch (error) {
            setLoading(false)
            throw error
        }
    }

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw new Error(error.message)
            setSession(null)
        } catch (error) {
            console.error('Logout error:', error)
            throw error
        }
    }

    const createCustomer = async (userId: string, email: string, fullName: string, birthday: Date, gender: string, phone: string) => {
        try {
            const exist = await UserService.getUserByEmail(email)
            if (!exist) {
                await UserService.createCustomer(userId, email, fullName, birthday, gender, phone)
                await OrderService.createCustomerOrder(userId)
            }
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
            if (session) {
                createCustomer(session.user.id, session.user.email, session.user.email.split('@')[0], null, null, null)
                setSession(session)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ session, loading, signIn, signUp, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
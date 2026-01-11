import React, { createContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../api/supabase'
import type { Session } from '@supabase/supabase-js'
import { AuthContext } from '../contexts'
import { data } from 'react-router-dom'

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log('Session updated:', session)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const value = {
        session,
        isAuthenticated: !!session,
        loading,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
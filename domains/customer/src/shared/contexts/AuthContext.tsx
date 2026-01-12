import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { AuthContextType } from '../types'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../api/supabase'

type Props = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: Props) => {
    const [session, setSession] = useState<Session | undefined>(undefined)

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}
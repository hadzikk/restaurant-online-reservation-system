import { supabase } from '../api/supabase'

const AuthService = {
    async login(email: string, password: string) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) throw error
            
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', data.user.id)
                .single()
            if (userError) throw userError

            return {
                user: {
                    id: userData.id,
                    email: userData.email,
                    role: userData.role
                },
                error: null,
                data
            }
        } catch (error) {
            return {
                user: null,
                error: error as Error,
                data: null
            }
        }
    },
    async logout() {
        try {
            const { error } = await supabase.auth.signOut()
            return { error }
        } catch (error) {
            return { error: error as Error }
        }
    },
    onAuthStateChange(callback: (event: string, session: any) => void) {
        return supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session);
        });
    }
}

export default AuthService
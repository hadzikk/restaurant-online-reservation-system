import { supabase } from '../api/supabase'
import type { User } from '../types'

export const UserService = {
  async createUser(user: User) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single()
    if (error) throw error
    return data
  },
  async getUserById(id: number) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },
  async getUsers(filters: Partial<User> = {}) {
    let query = supabase
      .from('users')
      .select('*')
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        query = query.eq(key, value)
      }
    })
    const { data, error } = await query
    
    if (error) throw error
    return data
  },
  async updateUser(id: number, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },
  async deleteUser(id: number) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },
  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error // PGRST116 means no rows returned
    return data
  }
}
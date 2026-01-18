import { supabase } from  '../api/supabase'

export const OrderMenuLineService = {
    async updateMenuLineQuantity(id: number, quantity: number) {   
        const { data: updatedOrderedMenu, error } = await supabase
            .from('order_menu_lines')
            .update({ 
                quantity,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select('*')
            .single()
        if (error) throw error
        return updatedOrderedMenu
    },
    async removeMenuLine(id: number) {     
        const { error } = await supabase
            .from('order_menu_lines')
            .delete()
            .eq('id', id)
        if (error) throw error
    }
}
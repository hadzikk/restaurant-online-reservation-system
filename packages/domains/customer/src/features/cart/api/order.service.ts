import { supabase } from  '../../../shared/api/supabase'

const OrderService = {
    async getCartById(id: number) {
        let { data: order, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_menu_lines(*),
                order_table_lines(*)
            `)
            .eq('user_id', id)
            .order('created_at', { ascending: true }) // Urutkan berdasarkan created_at
            .single()

        if (error) throw error
        
        // Urutkan menu items berdasarkan id atau created_at
        if (order?.order_menu_lines) {
            order.order_menu_lines.sort((a, b) => 
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            )
        }
        
        return order ? [order] : []
    },
    async updateMenuQuantity(id: number, quantity: number) {   
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
    }
}

export default OrderService
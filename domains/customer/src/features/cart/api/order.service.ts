import { supabase } from  '../../../shared/api/supabase'

const OrderService = {
    async getOrderById(id: string) {
        let { data: order, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_menu_lines(*),
                order_table_lines(*)
            `)
            .eq('user_id', id)
            .order('created_at', { ascending: true })
            .single()

        if (error) throw error
        
        if (order?.order_menu_lines) {
            order.order_menu_lines.sort((a: { created_at: | Date }, b: { created_at: Date }) => 
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            )
        }
        
        return order ? [order] : []
    },
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
    async updateOrderTotal(id: number, total: number) {        
        const { data: updatedOrderTotal, error } = await supabase
            .from('orders')
            .update({ total: total })
            .eq('id', id)
            .select('*')
            .single()
        if (error) throw error
        return updatedOrderTotal
    }
}

export default OrderService
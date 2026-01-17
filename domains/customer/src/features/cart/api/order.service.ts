import { supabase } from  '../../../shared/api/supabase'

const OrderService = {
    async getOrderById(id: string) {
    try {
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
        
        // Ensure order_menu_lines is an array before trying to sort
        if (order) {
            order.order_menu_lines = Array.isArray(order.order_menu_lines) 
                ? [...order.order_menu_lines].sort((a, b) => 
                    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                  )
                : []
                
            // Ensure order_table_lines is an array
            order.order_table_lines = Array.isArray(order.order_table_lines) 
                ? order.order_table_lines 
                : []
        }

        return order ? [order] : []
    } catch (error) {
        console.error('Error in getOrderById:', error)
        // Return an empty array with the expected structure
        return [{
            id: null,
            user_id: id,
            total: 0,
            order_menu_lines: [],
            order_table_lines: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }]
    }
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
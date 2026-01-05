import { supabase } from  '../../../shared/api/supabase'

const OrderService = {
    async getCartById(id: number) {
        let { data: order, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_menu_lines(*),
                order_table_lines(*)
            `
            )
            .eq('user_id', id)
        if (error) throw new Error(error.message)
        return order || null
    },
    async updateMenuQuantity(id: number, quantity: number) {   
        const { data: updatedOrderedMenu, error } = await supabase
            .from('order_menu_lines')
            .update({ quantity: quantity })
            .eq('id', id)
            .select('quantity')
        if (error) throw new Error(error.message)
        return updatedOrderedMenu || null
    }
}

export default OrderService
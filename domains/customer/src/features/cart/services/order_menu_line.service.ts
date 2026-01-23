import { supabase } from  '../../../shared/api/supabase'

const OrderMenuLineService = {
    async getOrderMenuLinesById(order_id: number) {
        try {
            const { data: orderMenuLines, error } = await supabase
                .from('order_menu_lines')
                .select('*')
                .eq('order_id', order_id)
                .order('created_at');
            
            if (error) {
                throw new Error(error.message || 'Failed to fetch order menu lines');
            }
            
            return orderMenuLines || [];
        } catch (error) {
            console.error('Error in getOrderMenuLinesById:', error);
            throw error; // Re-throw after logging
        }
    },
    async updateAndInsertMenuLine(order_id: number, menu_id: number, quantity: number, snapshot_price: number) {        
        const { data, error } = await supabase
            .from('order_menu_lines')
            .upsert({ 
                order_id: order_id,
                menu_id: menu_id,
                quantity: quantity,
                snapshot_price: snapshot_price
             })
            .select()
        if (error) throw error
        return data
    },
    async updateMenuLine(id: number, quantity: number) {   
        const { data: updatedOrderedMenu, error } = await supabase
            .from('order_menu_lines')
            .update({ 
                'quantity': quantity,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select('*')
            .single()
        if (error) throw error
        return updatedOrderedMenu
    },
    async deleteMenuLine(id: number) {     
        const { error } = await supabase
            .from('order_menu_lines')
            .delete()
            .eq('id', id)
            .select()
        if (error) throw error
    }
}

export default OrderMenuLineService
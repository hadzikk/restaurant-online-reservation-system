import { supabase } from  '../../../shared/api/supabase'

const OrderMenuLineService = {
    async getOrderMenuLinesById(order_id: number) {
        let { data: orderMenuLines, error } = await supabase
            .from('order_menu_lines')
            .select('*')
            .eq('order_id', order_id)
            .order('created_at')
        if (error) throw error
        return orderMenuLines
    },
    async updateAndInsertMenuLine(order_id: number, menu_id: number, menu_name: string, unit_price: number, quantity: number) {
        const { data: createdMenuLine, error } = await supabase
            .from('order_menu_lines')
            .upsert({
                order_id: order_id,
                menu_id: menu_id,
                menu_name: menu_name,
                unit_price: unit_price,
                quantity: quantity,
                updated_at: new Date().toISOString()
            }, {
                ignoreDuplicates: false,
                onConflict: 'menu_id'
            })
            .select()
        if (error) throw error
        return createdMenuLine
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
        if (error) throw error
    }
}

export default OrderMenuLineService
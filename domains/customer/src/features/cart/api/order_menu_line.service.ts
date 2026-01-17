import { supabase } from  '../../../shared/api/supabase'

const OrderMenuLineService = {
    async getAllOrderMenuLines(order_id: number) {
        let { data: order_menu_lines, error } = await supabase
            .from('order_menu_lines')
            .select('*')
            .eq('order_id', order_id)
        if (error) throw error
        return order_menu_lines
    }
}

export default OrderMenuLineService
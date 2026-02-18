import { supabase } from '../../../shared/api/supabase'
import type { OrderTableLine } from '../types'

export class OrderTableLineService {
    static async createOrderTableLine(orderTableLine: {
        order_id: string
        table_id: number
        table_name: string
        reservation_date: string
        reservation_time: string
        guest_count: number
    }) {
        const { data, error } = await supabase
            .from('order_table_lines')
            .insert([orderTableLine])
            .select()

        if (error) throw error
        return data
    }

    static async getOrderTableLinesByOrderId(orderId: string) {
        const { data, error } = await supabase
            .from('order_table_lines')
            .select('*')
            .eq('order_id', orderId)

        if (error) throw error
        return data
    }

    static async deleteOrderTableLine(id: number) {
        const { error } = await supabase
            .from('order_table_lines')
            .delete()
            .eq('id', id)

        if (error) throw error
    }

    static async updateOrderTableLine(id: number, updates: Partial<OrderTableLine>) {
        const { data, error } = await supabase
            .from('order_table_lines')
            .update(updates)
            .eq('id', id)
            .select()

        if (error) throw error
        return data
    }
}

export default OrderTableLineService

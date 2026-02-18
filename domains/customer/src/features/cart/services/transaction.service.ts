import { supabase } from '../../../shared/api/supabase'

export interface TransactionData {
    user_id: string
    transaction_id: string
    total_amount: number
    payment_method: string
    payment_status: string
    receipt_file_name?: string
    order_snapshot: {
        menus: Array<{
            name: string
            quantity: number
            price: number
            total: number
        }>
        tables: Array<{
            table_name: string
            reservation_date: string
            reservation_time: string
            guests: number
        }>
        total: number
    }
}

export class TransactionService {
    static async createTransaction(transactionData: TransactionData) {
        const { data, error } = await supabase
            .from('transactions')
            .insert([transactionData])
            .select()

        if (error) throw error
        return data
    }

    static async getUserTransactions(userId: string) {
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', userId)
            .order('transaction_date', { ascending: false })

        if (error) throw error
        return data
    }

    static async getTransactionById(transactionId: string) {
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('transaction_id', transactionId)
            .single()

        if (error) throw error
        return data
    }

    static async updateTransactionStatus(transactionId: string, status: string) {
        const { data, error } = await supabase
            .from('transactions')
            .update({ payment_status: status })
            .eq('transaction_id', transactionId)
            .select()

        if (error) throw error
        return data
    }
}

export default TransactionService

import { supabase } from  '../../../shared/api/supabase'

const CartService = {
    async getCartById(id: number) {
        let { data: order, error } = await supabase
            .from('orders')
            .select("*")
            .eq('user_id', id)
            .single()
        if (error) throw new Error(error.message)
        return order || null
    }
}

export default CartService
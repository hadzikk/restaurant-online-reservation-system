// useCart.tsx
import { useEffect, useState } from 'react'
import { OrderService } from '../api'
import { supabase } from '../../../shared/api/supabase'
import type { Cart, OrderedTable, OrderedMenu } from '../types'

const useCart = (userId: number = 4) => {
    const [cart, setCart] = useState<Cart[]>([])
    const [orderedTables, setOrderedTables] = useState<OrderedTable[]>([])
    const [orderedMenus, setOrderedMenus] = useState<OrderedMenu[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setIsLoading] = useState(true)

    const fetchCart = async () => {
        try {
            const response = await OrderService.getCartById(userId)
            if (response && response.length > 0) {
                setCart(response)
                setOrderedTables(response[0].order_table_lines || [])
                setOrderedMenus(response[0].order_menu_lines || [])
            } else {
                throw new Error('No cart data received')
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch cart'
            console.error('Fetching cart failed:', errorMessage)
            setError('Failed to load cart. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()

        // Set up real-time subscription
        const channel = supabase
            .channel('order_menu_lines_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'order_menu_lines'
                },
                (payload) => {
                    console.log('Change received!', payload)
                    fetchCart() // Refresh cart data on any change
                }
            )
            .subscribe()

        // Cleanup subscription
        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId])

    return {
        cart,
        orderedTables,
        orderedMenus,
        error,
        loading,
        refetch: fetchCart
    }
}

export default useCart
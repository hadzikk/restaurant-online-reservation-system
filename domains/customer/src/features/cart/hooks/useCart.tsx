// useCart.tsx
import { useEffect, useState, useMemo, useCallback } from 'react'
import { OrderService } from '../api'
import { supabase } from '../../../shared/api/supabase'
import type { Cart, OrderedTable, OrderedMenu } from '../types'

const useCart = (userId: number = 4) => {
    const [cart, setCart] = useState<Cart[]>([])
    const [orderedTables, setOrderedTables] = useState<OrderedTable[]>([])
    const [orderedMenus, setOrderedMenus] = useState<OrderedMenu[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setIsLoading] = useState(true)
    const [isUpdatingTotal, setIsUpdatingTotal] = useState(false)

    const total = useMemo(() => {
        return orderedMenus.reduce((sum, item) => {
            return sum + (item.quantity * item.unit_price)
        }, 0)
    }, [orderedMenus])

    const updateOrderTotal = useCallback(async () => {
        if (!cart[0]?.id || isUpdatingTotal) return

        try {
            setIsUpdatingTotal(true)
            await OrderService.updateOrderTotal(cart[0].id, total)
        } catch (error) {
            console.error('Failed to update order total:', error)
        } finally {
            setIsUpdatingTotal(false)
        }
    }, [cart[0]?.id, total, isUpdatingTotal])

    useEffect(() => {
        if (cart[0]?.id && cart[0]?.total !== total) {
            updateOrderTotal()
        }
    }, [total, cart[0]?.id, updateOrderTotal])

    const fetchCart = async () => {
        try {
            const response = await OrderService.getOrderById(userId)
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
        if (!userId) return

        fetchCart()

        const menuLinesChannel = supabase
            .channel('order_menu_lines_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'order_menu_lines',
                    filter: `order_id=eq.${cart[0]?.id || ''}` 
                },
                (payload) => {
                    console.log('Menu lines change received!', payload)
                    fetchCart()
                }
            )
            .subscribe()

        const ordersChannel = supabase
            .channel('orders_changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${cart[0]?.id || ''}`
                },
                (payload) => {
                    console.log('Order update received:', payload)
                    setCart(prev => {
                        if (prev.length > 0) {
                            return [{
                                ...prev[0],
                                ...payload.new
                            }]
                        }
                        return prev
                    })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(menuLinesChannel)
            supabase.removeChannel(ordersChannel)
        }
    }, [userId, cart[0]?.id])

    return {
        cart,
        orderedTables,
        orderedMenus,
        total,
        error,
        loading,
        refetch: fetchCart
    }
}

export default useCart
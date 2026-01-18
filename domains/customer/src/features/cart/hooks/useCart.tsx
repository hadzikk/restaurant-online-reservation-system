// useCart.tsx
import { useEffect, useState, useMemo, useCallback } from 'react'
import { supabase } from '../../../shared/api/supabase'
import { OrderMenuLineService, OrderService } from '../api'
import { useAuth } from '../../../shared/hooks'
import type { Cart, OrderedTable, OrderedMenu } from '../types'

const useCart = () => {
    const [cart, setCart] = useState<Cart[]>([])
    const [orderedTables, setOrderedTables] = useState<OrderedTable[]>([])
    const [orderedMenus, setOrderedMenus] = useState<OrderedMenu[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const { session } = useAuth()
    
    const addMenuLine = async (menu_id: number, menu_name: string, unit_price: number, quantity: number) => {
        const orderId = cart[0].id
        try {
            const addMenuLineAndUpdate = await OrderMenuLineService.updateAndInsertMenuLine(orderId, menu_id, menu_name, unit_price, quantity)
            if (!addMenuLineAndUpdate) throw error
        } catch (error) {
            throw error
        }
    }

    // func to update menu line quantity
    const updateMenuLineQuantity = async (id: number, quantity: number) => {
        try {
            const { error } = await OrderMenuLineService.updateMenuLine(id, quantity)
            if (error) throw error
             setOrderedMenus(prevMenus => 
            prevMenus.map(menu => 
                menu.id === id ? { ...menu, quantity } : menu
            )
        )
        } catch (error) {
            throw error
        }
    }

    // func to remove menu line
    const removeMenuLine = async (id: number) => {
        try {
            await OrderMenuLineService.deleteMenuLine(id)
        } catch (error) {
            throw error
        }
    }

    // increasing performance by memoize calculation of total
    const total = useMemo(() => {
        return orderedMenus.reduce((sum, item) => {
            return sum + (item.quantity * item.unit_price)
        }, 0)
    }, [orderedMenus])

    const updateOrderTotal = useCallback(async () => {
        if (!cart[0]?.id || loading) return

        try {
            await OrderService.updateOrderTotal(cart[0].id, total)
        } catch (error) {
            console.error('Failed to update order total:', error)
        } finally {
            setLoading(false)
        }
    }, [cart[0]?.id, total, loading])

    // If the cart id exist and the cart total is changes then update
    useEffect(() => {
        if (cart[0]?.id && cart[0]?.total !== total) updateOrderTotal() // call update func
    }, [total, cart[0]?.id, updateOrderTotal])

    // read data
    const fetchCart = async () => {
        try {
            const order = await OrderService.getOrderById(session.user.id)
            // if success
            if (order && order.length > 0) {
                // then setup state value
                setCart(order)
                setOrderedTables(order[0].order_table_lines || [])
                setOrderedMenus(order[0].order_menu_lines || [])
            } else {
                throw new Error('No cart data received')
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    // real time
    useEffect(() => {
        if (!session.user.id) return

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
    }, [session.user.id, cart[0]?.id])

    return {
        cart,
        orderedTables,
        orderedMenus,
        total,
        error,
        loading,
        refetch: fetchCart,
        addMenuLine,
        removeMenuLine,
        updateMenuLineQuantity
    }
}

export default useCart
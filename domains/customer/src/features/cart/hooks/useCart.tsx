import { useEffect, useState, useMemo, useCallback } from 'react'
import type { Order, OrderMenuLine, OrderTableLine } from '../types'
import { supabase } from '../../../shared/api/supabase'
import { OrderMenuLineService, OrderService } from '../services'
import { useAuth } from '../../../shared/hooks'

const useCart = () => {
    const [order, setOrder] = useState<Order[]>([])
    const [orderedTables, setOrderedTables] = useState<OrderTableLine[]>([])
    const [orderMenuLines, setOrderMenuLines] = useState<OrderMenuLine[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const { session } = useAuth()
    const orderId = order[0]?.id

    // real time
    // order
    useEffect(() => {
        const userId = session.user.id
        if (!userId) return
        const fetchOrder = async () => {
            try {
                const order = await OrderService.getOrderById(userId)
                if (!order) throw error
                setOrder(order)
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred')
                throw error
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
        const ordersChannel = supabase
            .channel('orders-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${userId}` },
                () => {
                    fetchOrder().catch(console.error)
                }
            )
            .subscribe()
        return () => {
            supabase.removeChannel(ordersChannel)
        }
    }, [session?.user?.id])

    // order menu line
    useEffect(() => {
        if (!orderId) return
        const fetchOrderMenuLine = async () => {
            try {
                const orderMenuLine = await OrderMenuLineService.getOrderMenuLinesById(orderId)
                if (!orderMenuLine) throw error
                setOrderMenuLines(orderMenuLine)
            } catch (error) {
                throw error
            } finally {
                setLoading(false)
            }
        }
        fetchOrderMenuLine()
        const orderMenuLinesChannel = supabase
    .channel('order-menu-lines')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'order_menu_lines',
            
        },
        () => {
            fetchOrderMenuLine().catch(console.error)
        }
    )
    .subscribe()
        return () => {
            supabase.removeChannel(orderMenuLinesChannel)
        }
    }, [orderId])

    // func update and insert menu line to cart
    const addMenuLineToCart = async (menu_id: number, snapshot_price: number, quantity: number) => {
        try {
            await OrderMenuLineService.updateAndInsertMenuLine(
                orderId,
                menu_id,
                quantity,
                snapshot_price
            )
        } catch (error) {
            setError(error)
        }
    }

    // func to update menu line quantity
    const updateMenuLineQuantity = async (id: number, quantity: number) => {
        try {
            const { error } = await OrderMenuLineService.updateMenuLine(id, quantity)
            if (error) throw error
        } catch (error) {
            throw error
        }
    }

    // func to remove menu line
    const removeMenuLine = async (id: number) => {
        try {
            await OrderMenuLineService.deleteMenuLine(id)
            setOrderMenuLines(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            throw error
        }
    }

    // increasing performance by memoize calculation of total
    const total = useMemo(() => {
        return orderMenuLines.reduce((sum, item) => {
            return sum + (item.quantity * item.snapshot_price)
        }, 0)
    }, [orderMenuLines])

    const updateOrderTotal = useCallback(async () => {
        if (!order[0]?.id || loading) return

        try {
            await OrderService.updateOrderTotal(order[0].id, total)
        } catch (error) {
            console.error('Failed to update order total:', error)
        } finally {
            setLoading(false)
        }
    }, [order[0]?.id, total, loading])

    useEffect(() => {
    // Memastikan state orderMenuLines selalu dalam sinkronisasi
    // dengan data terbaru dari database
    if (orderId) {
        const fetchOrderMenuLine = async () => {
            try {
                const orderMenuLine = await OrderMenuLineService.getOrderMenuLinesById(orderId)
                if (orderMenuLine) {
                    setOrderMenuLines(orderMenuLine)
                }
            } catch (error) {
                console.error('Error fetching order menu lines:', error)
            }
        }
        fetchOrderMenuLine()
    }
}, [orderMenuLines, orderId])

    return {
        order,
        orderedTables,
        orderMenuLines,
        total,
        error,
        loading,
        removeMenuLine,
        updateMenuLineQuantity,
        addMenuLineToCart
    }
}

export default useCart
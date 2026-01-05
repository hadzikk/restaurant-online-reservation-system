import React, { useState, useEffect } from 'react'
import { OrderService } from '../api'
import type { Cart, OrderedTable, OrderedMenu } from '../types'

const useCart = () => {
    const [cart, setCart] = useState<Cart[]>([])
    const [orderedTables, setOrderedTables] = useState<OrderedTable[]>([])
    const [orderedMenus, setOrderedMenus] = useState<OrderedMenu[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await OrderService.getCartById(4)
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

        fetchCart()
    }, [])

    return {
        cart,
        orderedTables,
        orderedMenus,
        error,
        loading
    }
}

export default useCart
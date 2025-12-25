import React, { useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from '../../libs/supabase'
import { formatToRupiah } from '../../../../shared/utils/textUtils'
import { ListVenue, ListFood } from '../../components'
import styles from './Checkout.module.css'
import { OpenCheckout } from '../../contexts'

interface Order {
    id: number
    total: number
    order_menu_lines: OrderMenuLine[]
}

interface OrderMenuLine {
    id: number
    menu_name: string
    unit_price: number
    quantity: number
}

const Checkout = () => {
    const [order, setOrder] = useState<Order | null>(null)
    const [calculatedTotal, setCalculatedTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const {isOpen, setIsOpen} = useContext(OpenCheckout)
    const [isContentVisible, setIsContentVisible] = useState(false)

    const updateOrderTotal = useCallback(async (orderId: number, total: number) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ total })
                .eq('id', orderId)
            
            if (error) throw error
        } catch (error) {
            console.error('Error updating order total:', error)
        }
    }, [])

    const fetchOrder = useCallback(async () => {
        try {
            console.log('Fetching order...')
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    order_menu_lines(*)    
                `)
                .single()

            console.log('Order: ', data)

            if (error) throw error

            if (data) {
                setOrder(data as Order)
                const total = (data.order_menu_lines || []).reduce(
                    (sum, item) => sum + (item.unit_price * item.quantity),
                    0
                )
                setCalculatedTotal(total)
                await updateOrderTotal(data.id, total)
            }
        } catch (error) {
            console.error('Error in fetchOrder', error)
        } finally {
            setLoading(false)
        }
    }, [updateOrderTotal])

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsContentVisible(true)
            }, 10)
            return () => clearTimeout(timer)
        } else {
            setIsContentVisible(false)
        }
    }, [isOpen])

    const handleClose = () => {
        setIsContentVisible(false)
        setTimeout(() => {
            setIsOpen(false)
        }, 300)
    }

    useEffect(() => {
        let subscription: any
        
        const setupSubscription = async () => {
            if (!order?.id) return
            subscription = supabase
                .channel('order_changes')
                .on('postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'order_menu_lines',
                        filter: `order_id=eq.${order.id}`
                    },
                    fetchOrder
                )
                .subscribe()
        }
        
        fetchOrder()
        setupSubscription()
        
        return () => {
            if (subscription) {
                supabase.removeChannel(subscription)
            }
        }
    }, [order?.id, fetchOrder])

    return (
        <aside className={isOpen ? styles.root : styles.hidden}>
            <div 
                onClick={handleClose}
                className={styles.overlay}    
            ></div>

            <div className={`${styles.checkoutContent} ${isContentVisible ? styles.slideIn : styles.slideOut}`}>
                <p className={styles.title}>checkout</p>
                <ul className={styles.checkoutListContainer}>
                    <p className={styles.title}>venues</p>
                    <ListVenue name={'A01'}/>
                    <ListVenue name={'A02'}/>
                    <ListVenue name={'A03'}/>
                </ul>

                <ul className={styles.checkoutListContainer}>
                    <p className={styles.title}>Items</p>
                    {loading ? (
                        <p>Loading...</p>
                    ) : order?.order_menu_lines?.length > 0 ? (
                        order.order_menu_lines.map((item) => (
                            <ListFood
                                key={item.id}
                                name={item.menu_name}
                                price={item.unit_price}
                                quantity={item.quantity}
                            />
                        ))
                    ) : (
                        <p>You haven't ordered anything yet.</p>
                    )}
                    <div className={styles.totalAmountContainer}>
                        <p className={styles.title}>Total</p>
                        <span className={styles.totalAmount}>
                            {formatToRupiah(calculatedTotal)}
                        </span>
                    </div>
                </ul>

                <div className={styles.buttonTransaction}>
                    <button 
                        onClick={handleClose}
                        className={styles.buttonClose}
                    >
                        close
                    </button>
                    <button className={styles.buttonPay}>pay</button>
                </div>
            </div>
        </aside>
    )
}

export default Checkout
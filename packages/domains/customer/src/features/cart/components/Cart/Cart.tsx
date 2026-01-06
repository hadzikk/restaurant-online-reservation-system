import React, { useState, useEffect } from 'react'
import { OrderService } from '../../api'
import { useCart } from '../../hooks'
import { formatToRupiah } from '../../../../shared/utils'
import { OrderMenuList, OrderTableList } from '../../components'
import styles from './Cart.module.css'

const Cart = () => {
    const { cart, orderedTables, orderedMenus, error, loading } = useCart()

    if (loading) {
        return <div>Loading cart...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (cart.length === 0) {
        return <div>Your cart is empty</div>
    }

    return (
        <div className={styles.root}>
            <aside className={styles.cart}>
                <div className={styles.content}>
                    <p className={styles.title}>checkout</p>
                    <p className={styles.title}>tables</p>
                    <OrderTableList 
                        order_tables={orderedTables}
                    />
                    <p className={styles.title}>menus</p>
                    <OrderMenuList 
                        ordered_menus={orderedMenus} 
                    />
                    <p className={styles.title}>total</p>
                    <span className={styles.total}>{formatToRupiah(cart[0].total)}</span>
                </div>
                <div className={styles.controls}>
                    <button className={styles.control}>close</button>
                    <button className={styles.control}>pay</button>
                </div>
            </aside>
        </div>
    )
}

export default Cart
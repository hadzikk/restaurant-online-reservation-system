import React, { useState, useEffect } from 'react'
import { OrderService } from '../../api'
import { useCart } from '../../hooks'
import { formatToRupiah } from '../../../../shared/utils'
import { CartSkeleton, OrderMenuList, OrderTableList } from '../../components'
import styles from './Cart.module.css'

const Cart = () => {
    const { cart, orderedTables, orderedMenus, total, error, loading } = useCart()
    const [isOpen, setIsOpen] = useState(true)
    const toggleCart = () => {
        const cartElement = document.querySelector(`.${styles.cart}`)
        if (cartElement) {
            cartElement.classList.remove(styles.slide)
        }

        setTimeout(() => {
            setIsOpen(false)
        }, 300)
    }

    if (loading) { 
        return <div className={styles.root}><CartSkeleton/></div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (cart.length === 0) {
        return <div>Your cart is empty</div>
    }

    return (
        <div 
            className={`${styles.root} ${isOpen ? styles.open : ''}`}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    toggleCart()
                }
            }}
        >
            <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
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
                    <span className={styles.total}>{formatToRupiah(total)}</span>
                </div>
                <div className={styles.controls}>
                    <button 
                        className={styles.control}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                toggleCart()
                            }
                        }}
                    >
                        close
                    </button>
                    <button className={styles.control}>pay</button>
                </div>
            </aside>
        </div>
    )
}

export default Cart
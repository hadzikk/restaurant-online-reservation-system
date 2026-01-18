import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks'
import { formatToRupiah } from '../../../../shared/utils'
import toast from 'react-hot-toast'
import { CartSkeleton, OrderMenuList, OrderTableList } from '../../components'
import styles from './Cart.module.css'

const Cart = () => {
    const { orderedTables, total, error, loading } = useCart()
    const [isOpen, setIsOpen] = useState(true)

    // error handler notification
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const handleToggleCart = (e) => {
        if (e.target === e.currentTarget) {
            const cartElement = document.querySelector(`.${styles.cart}`)
            if (cartElement) cartElement.classList.remove(styles.slide)

            setTimeout(() => {
                setIsOpen(false)
            }, 300)
        }
    }

    return (
        <div 
            className={`${styles.root} ${isOpen ? styles.open : ''}`}
            onClick={handleToggleCart}
        >
            <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                <div className={styles.content}>
                    <p className={styles.title}>checkout</p>
                    <p className={styles.title}>tables</p>
                    <OrderTableList 
                        order_tables={orderedTables}
                    />
                    <p className={styles.title}>menus</p>
                    <OrderMenuList />
                    <p className={styles.title}>total</p>
                    <span className={styles.total}>{formatToRupiah(total)}</span>
                </div>
                <div className={styles.controls}>
                    <button 
                        className={styles.control}
                        onClick={handleToggleCart}
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
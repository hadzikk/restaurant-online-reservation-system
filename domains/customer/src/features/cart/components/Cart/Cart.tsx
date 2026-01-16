import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks'
import { formatToRupiah } from '../../../../shared/utils'
import toast from 'react-hot-toast'
import { CartSkeleton, OrderMenuList, OrderTableList } from '../../components'
import styles from './Cart.module.css'
import { Logo } from '../../../../shared/components'

const Cart = () => {
    const { cart, orderedTables, orderedMenus, total, error, loading } = useCart()
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

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

    if (cart[0]?.order_menu_lines) {
        return (
            <div 
                className={`${styles.root} ${isOpen ? styles.open : ''}`}
                onClick={(e) => {
                    if (e.target === e.currentTarget) toggleCart()
                }}
            >
                <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                    <div className={styles.content + ' ' + styles.extended}>
                        <Logo/>
                        <p>Bill is empty now, add food or table here.</p>
                    </div>
                </aside>
            </div>
        )
    }

    if (error) {
        return (
            <div 
                className={`${styles.root} ${isOpen ? styles.open : ''}`}
                onClick={(e) => {
                    if (e.target === e.currentTarget) toggleCart()
                }}
            >
                <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                    <div className={styles.content}>
                        <CartSkeleton/>
                    </div>
                </aside>
            </div>
        )
    }

    return (
        <div 
            className={`${styles.root} ${isOpen ? styles.open : ''}`}
            onClick={(e) => {
                if (e.target === e.currentTarget) toggleCart()
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
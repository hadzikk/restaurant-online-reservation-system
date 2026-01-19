import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks'
import { formatToRupiah } from '../../../../shared/utils'
import toast from 'react-hot-toast'
import { CartSkeleton, OrderMenuList, OrderTableList } from '../../components'
import styles from './Cart.module.css'
import { Logo } from '../../../../shared/components'

const Cart = () => {
    const { orderedTables, total, error, loading, orderMenuLines } = useCart()
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

    if (orderMenuLines.length === 0 && orderedTables.length === 0) {
        return (
            <div className={`${styles.root} ${isOpen ? styles.open : ''}`} onClick={handleToggleCart}>
                <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                    <div className={`${styles.content} ${styles.extended}`}>
                        <Logo />
                        <p>Bill is currently empty, please add some menus or tables here.</p>
                    </div>
                </aside>
            </div>
        )
    }
    // Cek jika ada orderedTables tapi tidak ada orderMenuLines
    if (orderedTables.length > 0 && orderMenuLines.length === 0) {
        return (
            <div className={`${styles.root} ${isOpen ? styles.open : ''}`} onClick={handleToggleCart}>
                <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                    <div className={styles.content}>
                        <p className={styles.title}>bill</p>
                        <p className={styles.subtitle}>tables</p>
                        <OrderTableList order_tables={orderedTables} />
                        <p className={styles.subtitle}>menus</p>
                        <p>No menu items added yet</p>
                        <p className={styles.subtitle}>total</p>
                        <span className={styles.total}>{formatToRupiah(total)}</span>
                    </div>
                    <div className={styles.controls}>
                        <button className={styles.control} onClick={handleToggleCart}>
                            close
                        </button>
                        <button className={styles.control}>pay</button>
                    </div>
                </aside>
            </div>
        )
    }
    // Cek jika ada orderMenuLines tapi tidak ada orderedTables
    if (orderMenuLines.length > 0 && orderedTables.length === 0) {
        return (
            <div className={`${styles.root} ${isOpen ? styles.open : ''}`} onClick={handleToggleCart}>
                <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                    <div className={styles.content}>
                        <p className={styles.title}>bill</p>
                        <p className={styles.subtitle}>tables</p>
                        <p>No tables selected</p>
                        <p className={styles.subtitle}>menus</p>
                        <OrderMenuList />
                        <p className={styles.subtitle}>total</p>
                        <span className={styles.total}>{formatToRupiah(total)}</span>
                    </div>
                    <div className={styles.controls}>
                        <button className={styles.control} onClick={handleToggleCart}>
                            close
                        </button>
                        <button className={styles.control}>pay</button>
                    </div>
                </aside>
            </div>
        )
    }

    return (
        <div 
            className={`${styles.root} ${isOpen ? styles.open : ''}`}
            onClick={handleToggleCart}
        >
            <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                <div className={styles.content}>
                    <p className={styles.title}>bill</p>
                    <p className={styles.subtitle}>tables</p>
                    <OrderTableList 
                        order_tables={orderedTables}
                    />
                    <p className={styles.subtitle}>menus</p>
                    <OrderMenuList />
                    <p className={styles.subtitle}>total</p>
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
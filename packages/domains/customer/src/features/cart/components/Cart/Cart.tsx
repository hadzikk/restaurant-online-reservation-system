import React, { useState } from 'react'
import styles from './Cart.module.css'

const Cart = () => {
    const [cart, setCart] = useState(null)

    return (
        <aside className={styles.root}>
            <div className={styles.content}>
                <p className={styles.title}>checkout</p>
            </div>
        </aside>
    )
}

export default Cart
import React, { type FC } from 'react'
import { OrderMenuItem } from '../../components'
import styles from './OrderMenuList.module.css'
import { useCart } from '../../hooks'

const OrderMenuList = () => {
    const { orderMenuLines } = useCart()
    console.log(orderMenuLines)

    return (
        <div className={styles.root}>
            {orderMenuLines.map((ordered_menu) => (
                <OrderMenuItem
                    key={ordered_menu.id}
                    ordered_menu={ordered_menu}
                />
            ))}
        </div>
    )
}

export default OrderMenuList
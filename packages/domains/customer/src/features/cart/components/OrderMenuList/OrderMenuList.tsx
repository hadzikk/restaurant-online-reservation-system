import React, { type FC } from 'react'
import { OrderMenuItem } from '../../components'
import styles from './OrderMenuList.module.css'

interface OrderMenuListProps {
    orders: [];
}

const OrderMenuList: FC<OrderMenuListProps> = ({ orders }) => {
    return (
        <ul className={styles.root}>
            {orders.map((order) => (
                <OrderMenuItem 
                     
                />
            ))}
        </ul>
    )
}

export default OrderMenuList
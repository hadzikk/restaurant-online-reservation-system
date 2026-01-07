import React, { type FC } from 'react'
import type { OrderTable } from '../../types'
import styles from './OrderTableItem.module.css'

interface OrderTableProps {
    order_table: OrderTable
}

const OrderTableItem: FC<OrderTableProps> = ({ order_table }) => {
    return (
        <li className={styles.root}>
            <p className={styles.name}>{order_table.table_code}</p>
            <button className={styles.remove}>remove</button>
        </li>
    )
}

export default OrderTableItem
import React, { type FC } from 'react'
import type { OrderTableLine } from '../../types'
import styles from './OrderTableItem.module.css'

interface OrderTableProps {
    order_table: OrderTableLine
    onRemove?: (id: number) => void
}

const OrderTableItem: FC<OrderTableProps> = ({ order_table, onRemove }) => {
    return (
        <li className={styles.root}>
            <div className={styles.details}>
                <p className={styles.name}>{order_table.table_name}</p>
                <p className={styles.info}>Time: {order_table.reservation_time}</p>
                <p className={styles.info}>Guests: {order_table.guest_count}</p>
            </div>
            {onRemove && (
                <button 
                    className={styles.remove}
                    onClick={() => onRemove(order_table.id)}
                >
                    remove
                </button>
            )}
        </li>
    )
}

export default OrderTableItem
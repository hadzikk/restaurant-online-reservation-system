import React from 'react'
import type { OrderTable } from '../../types'
import { OrderTableItem } from '../../components'

interface OrderTableListProps {
    order_tables: OrderTable[]
} 

const OrderTableList = ({ order_tables }: OrderTableListProps) => {
    return (
        <ul>
            {order_tables.map((order_table) => (
                <OrderTableItem 
                    key={order_table.id} 
                    order_table={order_table} 
                />
            ))}
        </ul>
    )
}

export default OrderTableList
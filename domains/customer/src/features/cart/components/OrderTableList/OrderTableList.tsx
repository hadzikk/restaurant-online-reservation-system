import React from 'react'
import type { OrderTableLine } from '../../types'
import { OrderTableItem } from '../../components'

interface OrderTableListProps {
    order_tables: OrderTableLine[]
    onRemoveTable?: (id: number) => void
} 

const OrderTableList = ({ order_tables, onRemoveTable }: OrderTableListProps) => {
    return (
        <ul>
            {order_tables.map((order_table) => (
                <OrderTableItem 
                    key={order_table.id} 
                    order_table={order_table}
                    onRemove={onRemoveTable}
                />
            ))}
        </ul>
    )
}

export default OrderTableList
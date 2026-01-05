// OrderMenuList.tsx
import React, { type FC } from 'react'
import type { OrderedMenu } from '../../types'
import { OrderMenuItem } from '../../components'
import styles from './OrderMenuList.module.css'

interface OrderMenuListProps {
    ordered_menus: OrderedMenu[]
}

const OrderMenuList: FC<OrderMenuListProps> = ({ ordered_menus }) => {
    return (
        <div className={styles.root}>
            {ordered_menus.map((ordered_menu) => (
                <OrderMenuItem
                    key={ordered_menu.id}
                    ordered_menu={ordered_menu}
                />
            ))}
        </div>
    )
}

export default OrderMenuList
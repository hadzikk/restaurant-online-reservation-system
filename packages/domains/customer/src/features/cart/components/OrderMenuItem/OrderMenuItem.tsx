import React, { type FC, useEffect, useState } from 'react'
import { OrderService } from '../../api'
import type { OrderedMenu } from '../../types'
import { formatToRupiah } from '../../../../shared/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import styles from './OrderMenuItem.module.css'

interface OrderMenuItemProps {
    ordered_menu: OrderedMenu
}

const OrderMenuItem: FC<OrderMenuItemProps> = ({ ordered_menu }) => {
    const [quantity, setQuantity] = useState(ordered_menu.quantity)
    const handleIncrease = async () => {
        try {
            const newQuantity = quantity + 1
            await OrderService.updateMenuQuantity(ordered_menu.id, newQuantity)
            setQuantity(newQuantity)
        } catch (error) {
            console.error('Failed to update quantity:', error)
        }
    }

    return (
        <li className={styles.root}>
            <div className={styles.food}>
                <p className={styles.name}>{ordered_menu.menu_name}</p>
                <p className={styles.price}>{formatToRupiah(ordered_menu.unit_price)}</p>
                <button className={styles.remove}>remove</button>
            </div>

            <div className={styles.buttons}>
                <div className={styles.controls}>
                    <button 
                        className={styles.control}
                        onClick={handleIncrease}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <span className={styles.quantity}>
                        {ordered_menu.quantity}
                    </span>
                    <button 
                        className={styles.control}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
                <span className={styles.subtotal}>
                    {formatToRupiah(ordered_menu.quantity * ordered_menu.unit_price)}
                </span>
            </div>
        </li>
    )
}

export default OrderMenuItem
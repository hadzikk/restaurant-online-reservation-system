import React, { type FC } from 'react'
import type { OrderedMenu } from '../../types'
import { formatToRupiah } from '../../../../shared/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import styles from './OrderMenuItem.module.css'

interface OrderMenuItemProps {
    ordered_menu: OrderedMenu
}

const OrderMenuItem: FC<OrderMenuItemProps> = ({ ordered_menu }) => {
    return (
        <li className={styles.root}>
            <div className={styles.food}>
                <p className={styles.name}>{ordered_menu.menu_name}</p>
                <p className={styles.price}>{formatToRupiah(ordered_menu.unit_price)}</p>
                <button className={styles.remove}>remove</button>
            </div>

            <div className={styles.buttons}>
                <div className={styles.controls}>
                    <button className={styles.control}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <span className={styles.quantity}>{ordered_menu.quantity}</span>
                    <button className={styles.control}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
                <span className={styles.subtotal}>{formatToRupiah(ordered_menu.quantity * ordered_menu.unit_price)}</span>
            </div>
        </li>
    )
}

export default OrderMenuItem
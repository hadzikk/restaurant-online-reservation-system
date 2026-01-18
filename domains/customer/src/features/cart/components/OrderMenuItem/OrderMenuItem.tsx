import React, { type FC, useEffect, useState } from 'react'
import type { OrderedMenu } from '../../types'
import { formatToRupiah } from '../../../../shared/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import styles from './OrderMenuItem.module.css'
import { useCart } from '../../hooks'
import toast from 'react-hot-toast'

interface Props {
    ordered_menu: OrderedMenu
}

const OrderMenuItem: FC<Props> = ({ ordered_menu }) => {
    const { removeMenuLine, updateMenuLineQuantity } = useCart()

    const handleRemoveMenuLine = async () => {
        try {
            await removeMenuLine(ordered_menu.id)
            toast.success('Menu removed')
        } catch (error) {
            toast.error('Failed to remove menu line')
            console.log(error)
        }
    }

    const handleUpdateMenuLineQuantity = async (id: number, quantity: number) => {
        try {
            await updateMenuLineQuantity(id, quantity)
            toast.success('Quantity updated.')
        } catch (error) {
            toast.error('Failed to update quantity')
        }
    }

    return (
        <li className={styles.root}>
            <div className={styles.food}>
                <p className={styles.name}>{ordered_menu.menu_name}</p>
                <p className={styles.price}>{formatToRupiah(ordered_menu.unit_price)}</p>
                <button className={styles.remove} onClick={handleRemoveMenuLine}>remove</button>
            </div>

            <div className={styles.buttons}>
                <div className={styles.controls}>
                    <button 
                        className={styles.control}
                        onClick={() => handleUpdateMenuLineQuantity(ordered_menu.id, (ordered_menu.quantity - 1))}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className={styles.quantity}>
                        {ordered_menu.quantity}
                    </span>
                    <button 
                        className={styles.control}
                        onClick={() => handleUpdateMenuLineQuantity(ordered_menu.id, (ordered_menu.quantity + 1))}
                    >
                        <FontAwesomeIcon icon={faPlus} />
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
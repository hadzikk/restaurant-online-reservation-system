import React, { type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { truncateEnd, truncateMiddle, formatToRupiah } from '../../../../shared/utils/textUtils'
import styles from './ListFood.module.css'

interface ListFoodProps {
    name: string
    price: number
    quantity: number
}

const ListFood:FC<ListFoodProps> = ({ name, price, quantity }) => {
    return (
        <li className={styles.root}>
            <div className={styles.foodDetails}>
                <p className={styles.food}>{name}</p>
                <p className={styles.price}>{formatToRupiah(price)}</p>

                <div className={styles.buttonContainer}>
                    <button className={styles.buttonControl}>
                        <FontAwesomeIcon 
                            icon={faMinus}
                        />
                    </button>
                    <span className={styles.quantity}>
                        {quantity}
                    </span>
                    <button className={styles.buttonControl}>
                        <FontAwesomeIcon 
                            icon={faPlus}
                        />
                    </button>
                </div>
            </div>
                
            <p className={styles.subTotal}>{formatToRupiah(quantity * price)}</p>
        </li>
    )
}

export default ListFood
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import styles from './OrderMenuItem.module.css'

const OrderMenuItem = () => {
    return (
        <li className={styles.root}>
            <div className={styles.food}>
                <p className={styles.name}></p>
                <p className={styles.price}></p>
                <button className={styles.remove}>remove</button>
            </div>

            <div className={styles.buttons}>
                <div className={styles.controls}>
                    <button className={styles.control}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <span className={styles.quantity}></span>
                    <button className={styles.control}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
                <p className={styles.subtotal}></p>
            </div>
        </li>
    )
}

export default OrderMenuItem
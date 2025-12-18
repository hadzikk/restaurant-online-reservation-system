import React from 'react'
import { formatToRupiah } from '../../../../shared/utils/textUtils'
import ListVenue from '../ListVenue/ListVenue'
import ListFood from '../ListFood/ListFood'
import styles from './Rightbar.module.css'

const Rightbar = () => {
    return (
        <aside className={styles.root}>
            <div className={styles.overlay}></div>

            <div className={styles.rightbarContent}>
                <p className={styles.title}>checkout</p>
                <ul className={styles.checkoutContainer}>
                    <p className={styles.title}>venues</p>
                    <ListVenue name={'A01'}/>
                    <ListVenue name={'A02'}/>
                    <ListVenue name={'A03'}/>
                </ul>

                <ul className={styles.checkoutContainer}>
                    <p className={styles.title}>Items</p>
                    <ListFood
                        name={'Beef Steak'}
                        price={48000}
                        quantity={2}
                    />
                    <ListFood
                        name={'Ice Cream Sundae'}
                        price={20000}
                        quantity={3}
                    />
                    <ListFood
                        name={'Pancake'}
                        price={20000}
                        quantity={2}
                    />
                    <ListFood
                        name={'Chocolate Brownies'}
                        price={20000}
                        quantity={3}
                    />
                    <ListFood
                        name={'Chicken Katsu'}
                        price={28000}
                        quantity={1}
                    />

                    <div className={styles.totalAmountContainer}>
                        <p className={styles.title}>Total</p>
                        <span className={styles.totalAmount}>{formatToRupiah(284000)}</span>
                    </div>
                </ul>
            </div>
        </aside>
    )
}

export default Rightbar
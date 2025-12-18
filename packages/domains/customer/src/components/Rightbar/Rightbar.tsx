import React from 'react'
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
                </ul>
            </div>
        </aside>
    )
}

export default Rightbar
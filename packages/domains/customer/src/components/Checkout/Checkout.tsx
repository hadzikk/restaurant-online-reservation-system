import React, { useContext, useEffect, useRef, useState, type FC } from 'react'
import { formatToRupiah } from '../../../../shared/utils/textUtils'
import { ListVenue, ListFood } from '../../components'
import styles from './Checkout.module.css'
import { OpenCheckout } from '../../contexts'

const Checkout = () => {
    const {isOpen, setIsOpen} = useContext(OpenCheckout)
    const [isContentVisible, setIsContentVisible] = useState(false)
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsContentVisible(true)
            }, 10)
            return () => clearTimeout(timer)
        } else {
            setIsContentVisible(false)
        }
    }, [isOpen])
    const handleClose = () => {
        setIsContentVisible(false)

        setTimeout(() => {
            setIsOpen(false)
        }, 300)
    }
    
    return (
        <aside className={isOpen? styles.root : styles.hidden}>
            <div 
                onClick={handleClose}
                className={styles.overlay}>    
            </div>

            <div className={`${styles.checkoutContent} ${isContentVisible ? styles.slideIn : styles.slideOut}`}>
                <p className={styles.title}>checkout</p>
                <ul className={styles.checkoutListContainer}>
                    <p className={styles.title}>venues</p>
                    <ListVenue name={'A01'}/>
                    <ListVenue name={'A02'}/>
                    <ListVenue name={'A03'}/>
                </ul>

                <ul className={styles.checkoutListContainer}>
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

                <div className={styles.buttonTransaction}>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className={styles.buttonClose}
                    >
                    close
                    </button>
                    <button className={styles.buttonPay}>pay</button>
                </div>
            </div>
        </aside>
    )
}

export default Checkout
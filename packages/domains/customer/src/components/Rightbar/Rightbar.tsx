import React, { useEffect, useRef, type FC } from 'react'
import { formatToRupiah } from '../../../../shared/utils/textUtils'
import ListVenue from '../ListVenue/ListVenue'
import ListFood from '../ListFood/ListFood'
import styles from './Rightbar.module.css'

interface RightbarProps {
    isOpen?: boolean
    onClose?: () => void
}

const Rightbar:FC<RightbarProps> = ({ isOpen, onClose }) => {

    const rightbarRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (rightbarRef.current && !rightbarRef.current.contains(event.target as Node)) {
                onClose?.()
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])
    
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose?.()
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }
        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])
    
    if (!isOpen) return null

    return (
        <aside className={styles.root} ref={rightbarRef}>
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

                <div className={styles.buttonTransactionContainer}>
                    <button 
                        className={styles.buttonClose}
                        onClick={onClose}
                    >
                    close
                    </button>
                    <button className={styles.buttonPay}>pay</button>
                </div>
            </div>
        </aside>
    )
}

export default Rightbar
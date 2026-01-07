import React from 'react'
import styles from './MenuItemSkeleton.module.css'

const MenuItemSkeleton = () => {
    return (
        <div className={styles.root}>
            <div className={styles.image}></div>
            <div className={styles.content}>
                <div className={styles.title}></div>
                <div className={styles.price}></div>
            </div>
        </div>
    )
}

export default MenuItemSkeleton
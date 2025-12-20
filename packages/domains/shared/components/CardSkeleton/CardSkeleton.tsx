import React from 'react'
import styles from './CardSkeleton.module.css'

const CardSkeleton = () => {
    return (
        <div className={styles.root}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
                <div className={styles.skeletonLineOne}></div>
                <div className={styles.skeletonLineTwo}></div>
            </div>
        </div>
    )
}

export default CardSkeleton
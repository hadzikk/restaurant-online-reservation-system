// CartSkeleton.tsx
import React from 'react'
import styles from './CartSkeleton.module.css'

interface CartSkeletonProps {
  className?: string;
}

const CartSkeleton: React.FC<CartSkeletonProps> = ({ className = '' }) => {
    return (
        <div className={`${styles.root} ${className}`.trim()}>
            <div className={styles.skeletonTitle}>Cart</div>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonTable}></div>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonMenu}></div>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonTotal}></div>
            <div className={styles.skeletonControls}>
                <div className={styles.skeletonButton}></div>
                <div className={styles.skeletonButton}></div>
            </div>
        </div>
    )
}

export default CartSkeleton
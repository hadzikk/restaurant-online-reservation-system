import React, { useMemo } from 'react'
const SKELETON_COUNT = 8
import { MenuItemSkeleton } from '../../components'
import styles from './MenuSkeletonLoader.module.css'

const MenuSkeletonLoader = () => {
    const skeletons = useMemo(
        () => Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <MenuItemSkeleton key={i} />
    )), [])
    return <div className={styles.root}>{skeletons}</div>
}

export default MenuSkeletonLoader
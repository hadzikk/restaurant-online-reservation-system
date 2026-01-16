import React, { type FC } from 'react'
import type { Menu } from '../../types'
import { truncateMiddle } from '../../utils'
import { formatToRupiah } from '../../../../shared/utils'
import styles from './MenuItem.module.css'

interface MenuItemsProps {
    menu: Menu
}

const MenuItem: FC<MenuItemsProps> = ({ menu }) => {
    return (
        <div className={styles.root}>
            <figure className={styles.imageContainer}>
                <img
                    className={styles.image} 
                    src={menu.menu_images[0].image_url} 
                    alt="" 
                />
            </figure>
            
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{menu.name}</h1>
            </div>

            <p className={styles.price}>{formatToRupiah(menu.price)}</p>

            <button className={styles.button}>Add to cart</button>
        </div>
    )
}

export default MenuItem
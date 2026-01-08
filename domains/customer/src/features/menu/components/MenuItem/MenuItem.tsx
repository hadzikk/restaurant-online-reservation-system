import React, { type FC } from 'react'
import type { Menu } from '../../types'
import { truncateMiddle } from '../../utils'
import { formatToRupiah } from '../../../../shared/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
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
                {/* <div className={styles.rate}>
                    <FontAwesomeIcon className={styles.icon} icon={faStar} /> 
                    <span className={styles.score}>4</span>
                </div> */}
                <h1 className={styles.name}>{truncateMiddle(menu.name, 7, 5)}</h1>
            </div>

            <p className={styles.price}>{formatToRupiah(menu.price)}</p>

            <button className={styles.button}>Add to cart</button>
        </div>
    )
}

export default MenuItem
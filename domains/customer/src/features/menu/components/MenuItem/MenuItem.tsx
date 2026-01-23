import React, { useState, type FC } from 'react'
import { supabase } from '../../../../shared/api/supabase'
import type { Menu } from '../../types'
import { truncateMiddle } from '../../utils'
import { formatToRupiah } from '../../../../shared/utils'
import { useCart } from '../../../cart/hooks'
import toast from 'react-hot-toast'
import styles from './MenuItem.module.css'

interface MenuItemsProps {
    menu: Menu
}

const MenuItem: FC<MenuItemsProps> = ({ menu }) => {
    const { orderMenuLines, addMenuLineToCart } = useCart()
    const isInCart = orderMenuLines.some(item => item.menu_id === menu.id)

    const handleAddMenu = async () => {
        if (isInCart) return
        try {
            await addMenuLineToCart(menu.id, menu.price, 1)
            toast.success('Menu added to cart successfully!')
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className={styles.root}>
            <figure className={styles.imageContainer}>
                <img
                    className={styles.image} 
                    src={menu.menu_images[0]?.image_url} 
                    alt="" 
                />
            </figure>
            
            <div className={styles.textContainer}>
                <h1 title={menu.name} className={styles.name}>{truncateMiddle(menu.name, 7, 10)}</h1>
            </div>

            <p className={styles.price}>{formatToRupiah(menu.price)}</p>

            { isInCart ? (
                <div className={styles.container}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path>
                    </svg>
                </div>
                ) : (
                <button 
                    className={styles.button}
                    onClick={handleAddMenu}
                    disabled={isInCart}
                >
                    Add
                </button> 
            )}
        </div>
    )
}

export default MenuItem
import React, { useContext, type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '../../libs/supabase'
import { UseOrder } from '../../contexts'
import { truncateEnd, truncateMiddle, formatToRupiah } from '../../../../shared/utils/textUtils'
import styles from './Card.module.css'

interface MenuItem {
    id: number
    name: string
    price: number
    ratings: number
    image: string
    order_id: number
}

const Card:FC<MenuItem> = ({ id, name, price, ratings, image, order_id }) => {
    const { orderId, setOrderId } = useContext(UseOrder)

    const handleAddToCart = async () => {
        const { data, error } = await supabase
        .from('order_menu_lines')
        .insert([
            {
                menu_id: id,
                menu_name: name,
                unit_price: price,
                quantity: 1,
                order_id: order_id
            }
        ])
    }

    return (
        <div className={styles.root}>
            <figure className={styles.pictureContainer}>
                <img 
                    src={image} 
                    alt="" 
                    title='Click the image to preview'
                    className={styles.picture} />
            </figure>

            <div className={styles.textContainer}>
                <div className={styles.ratings}>
                    <FontAwesomeIcon icon={faStar} className={styles.icon} />
                    <span className={styles.ratingScore}>{ratings}</span>
                </div>
                <h1 className={styles.name}>{truncateMiddle(name, 7, 5)}</h1>
            </div>

            <p className={styles.price}>{formatToRupiah(price)}</p>

            <button 
                onClick={handleAddToCart}
                className={styles.buttonAddToCart}>
                Add to cart
            </button>
        </div>
    )
}

export default Card
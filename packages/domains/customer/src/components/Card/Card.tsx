import React, { type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { truncateEnd, truncateMiddle, formatToRupiah } from '../../../../shared/utils/textUtils'
import styles from './Card.module.css'

interface MenuItem {
    name: string
    price: number
    ratings: number
    image: string
}

const Card:FC<MenuItem> = ({ name, price, ratings, image }) => {
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

            <button className={styles.buttonAddToCart}>Add to cart</button>
        </div>
    )
}

export default Card
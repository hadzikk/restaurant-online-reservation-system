import React, { type FC } from 'react'
import styles from './ListVenue.module.css'

interface VenueProps {
    name: string
}

const ListVenue:FC<VenueProps> = ({ name }) => {
    return (
        <li className={styles.root}>
            <p className={styles.venueName}>{name}</p>
            <a href="" className={styles.removeAction}>remove</a>
        </li>
    )
}

export default ListVenue
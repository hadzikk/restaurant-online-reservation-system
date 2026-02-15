import React from 'react'
import { Logo } from '../../components'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.root}>
            <Logo />
            <figure>
                <img 
                    src="https://wwysrmzdjfdljzxjfejb.supabase.co/storage/v1/object/public/restaurant_images_bucket/icons8-account-48.png" 
                    alt="" 
                />
            </figure>
        </nav>
    )
}

export default Navbar
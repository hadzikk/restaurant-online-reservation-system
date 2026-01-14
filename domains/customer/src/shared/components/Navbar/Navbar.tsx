import React from 'react'
import { useAuth } from '../../hooks'
import { Logo } from '../../components'
import styles from './Navbar.module.css'

const Navbar = () => {
    const { session } = useAuth()

    if (!session) {
        return (
            <nav className={styles.root}>
            <Logo />
            <figure>
                <img
                    src={"https://wwysrmzdjfdljzxjfejb.supabase.co/storage/v1/object/public/restaurant_images_bucket/icons8-account-48.png"}
                    alt=""
                />
            </figure>
        </nav>
        )
    }

    return (
        <nav className={styles.root}>
            <Logo />
            <figure className={styles.wrapper + ' ' + styles.xl}>
                <img
                    src={session.user.user_metadata.avatar_url ? session.user.user_metadata.avatar_url : "https://wwysrmzdjfdljzxjfejb.supabase.co/storage/v1/object/public/restaurant_images_bucket/icons8-account-48.png"}
                    alt=""
                />
            </figure>
        </nav>
    )
}

export default Navbar
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks'
import { Logo } from '../../components'
import styles from './Navbar.module.css'
import { usePanel } from '../../hooks'

const Navbar = () => {
    const { session } = useAuth()
    const { togglePanel } = usePanel()
    const location = useLocation()
    const isActive = (path: string) => {
        return location.pathname === path
    }

    const handleProfileClick = (e: React.MouseEvent) => {
        e.preventDefault()
        togglePanel()
    }

    if (!session) {
        return (
            <nav className={styles.root + ' ' + styles['p-4']}>
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

    if (!session.user.user_metadata.avatar_url) {
        return (
            <nav className={styles.root}>
                <div className={styles.container}>
                    <Logo />
                    <ul>
                        <li><a href="/menu" className={styles.link + (isActive('/menu') ? ' ' + styles.active : '')}>Food</a></li>
                        <li><a href="/table" className={styles.link + (isActive('/table') ? ' ' + styles.active : '')}>Table</a></li>
                        <li><a href="/" className={styles.link + (isActive('/') ? ' ' + styles.active : '')}>Cart</a></li>
                    </ul>
                </div>

                <div className={styles.container}>
                    <figure className={styles.figure + ' ' + styles.xl} onClick={handleProfileClick}>
                        <div className={styles.profile}>
                            <span className={styles.artificial}>{session.user.email.charAt(0).toUpperCase()}</span>
                        </div>
                    </figure>
                </div>
            </nav>
        )
    }

    return (
        <nav className={styles.root}>
            <div className={styles.container}>
                <Logo />
                <ul>
                    <li><a href="/menu" className={styles.link + (isActive('/menu') ? ' ' + styles.active : '')}>Food</a></li>
                    <li><a href="/table" className={styles.link + (isActive('/table') ? ' ' + styles.active : '')}>Table</a></li>
                    <li><a href="/" className={styles.link + (isActive('/') ? ' ' + styles.active : '')}>Cart</a></li>
                </ul>
            </div>

            <div className={styles.container}>
                <figure className={styles.figure + ' ' + styles.xl} onClick={handleProfileClick}>
                    <img
                        src={session.user.user_metadata.avatar_url}
                        alt='avatar'
                    />
                </figure>
            </div>
        </nav>
    )
}

export default Navbar
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
                    </ul>
                </div>

                <div className={styles.container}>
                    <figure className={styles.wrapper}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32">
                            <path d="M 10 4 C 8.355 4 7 5.355 7 7 L 7 21 L 4 21 L 4 25 C 4 26.645 5.355 28 7 28 L 21 28 L 21.03125 28 C 22.66025 27.984 24 26.633 24 25 L 24 11 L 28 11 L 28 7 C 28 5.355 26.645 4 25 4 L 10 4 z M 10 6 L 22.1875 6 C 22.0745 6.316 22 6.648 22 7 L 22 25 C 22 25.566 21.566 26 21 26 C 20.437 26.008 20.008 25.562 20 25 L 19.96875 21 L 9 21 L 9 7 C 9 6.434 9.434 6 10 6 z M 25 6 C 25.566 6 26 6.434 26 7 L 26 9 L 24 9 L 24 7 C 24 6.434 24.434 6 25 6 z M 6 23 L 14 23 L 17.96875 23 L 18 23 L 18 25 L 18 25.03125 C 18.004 25.37525 18.0745 25.691 18.1875 26 L 7 26 C 6.434 26 6 25.566 6 25 L 6 23 z"></path>
                        </svg>
                    </figure>
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
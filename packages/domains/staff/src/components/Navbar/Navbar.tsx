import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChair, faUser, faNoteSticky, faDashboard, faBurger, faCashRegister, faCompass, faGear } from '@fortawesome/free-solid-svg-icons'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.root}>
            {/* Create 4 containers */}

            {/* container 1 */}
            <div className={styles.profileContainer}>
                <figure className={styles.pictureContainer}>
                    <img 
                        src="https://cdn.cosmos.so/8f3499f8-99aa-4510-b2e4-8e76205219b7?format=jpeg" 
                        alt="" 
                        className={styles.picture} />
                </figure>
            </div>

            {/* container 2 */}
            <ul className={styles.navbarListContainer}>
                <p className={styles.navbarTitle}>Management</p>
                <li className={styles.navbarList} title='Dashboard'>
                    <div className={styles.tooltip} data-tooltip='Dashboard'>
                        <FontAwesomeIcon 
                            icon={faDashboard}
                            className={styles.icon}
                        />
                    </div>
                </li>
                <li className={styles.navbarList}>
                    <FontAwesomeIcon 
                        icon={faUser}
                        className={styles.icon}
                        title='User'
                    />
                    <span className={styles.navbarName}>Table</span>
                </li>
                <li className={styles.navbarList}>
                    <FontAwesomeIcon 
                        icon={faNoteSticky}
                        className={styles.icon}
                    />
                    <span className={styles.navbarName}>Table</span>
                </li>
                <li className={styles.navbarList}>
                    <FontAwesomeIcon 
                        icon={faChair}
                        className={styles.icon}
                    />
                    <span className={styles.navbarName}>Table</span>
                </li>
            </ul>

            {/* container 3 */}
            <ul className={styles.navbarListContainer}>
                <p className={styles.navbarTitle}>Management</p>
                <li className={styles.navbarList}>
                    <FontAwesomeIcon 
                        icon={faBurger}
                        className={styles.icon}
                    />
                    <span className={styles.navbarName}>Table</span>
                </li>
                <li className={styles.navbarList}>
                    <FontAwesomeIcon 
                        icon={faCashRegister}
                        className={styles.icon}
                    />
                    <span className={styles.navbarName}>Table</span>
                </li>
                <li className={styles.navbarList}>
                    <FontAwesomeIcon 
                        icon={faCompass}
                        className={`${styles.icon} ${styles.active}`}
                    />
                    <span className={styles.navbarName}>Table</span>
                </li>
            </ul>

            {/* container 4 */}
            <ul className={styles.navbarListContainer}>
                <p className={styles.navbarTitle}>Management</p>
                <li className={styles.navbarList}>
                    <FontAwesomeIcon 
                        icon={faGear}
                        className={styles.icon}
                    />
                    <span className={styles.navbarName}>Table</span>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
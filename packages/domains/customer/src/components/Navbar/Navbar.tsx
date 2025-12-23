import React, { useContext, type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons'
import { faBurger, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { OpenCheckout } from '../../contexts'
import styles from './Navbar.module.css'

const Navbar = () => {
    const {isOpen, setIsOpen} = useContext(OpenCheckout)

    {console.log(isOpen)}

    return (
        <aside className={styles.root}>
            <ul className={styles.leftBarContent}>
                <li className={styles.leftBarList}>
                    <button 
                        className={styles.buttonIconContainer}
                    >
                        <FontAwesomeIcon
                            icon={faCartShopping}
                            className={`${styles.icon} ${isOpen ? styles.active : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </button>
                </li>
                <li className={styles.leftBarList}>
                    <a href="">
                        <FontAwesomeIcon
                            icon={faBuromobelexperte}
                            className={styles.icon}
                        />
                    </a>
                </li>
                <li className={styles.leftBarList}>
                    <a href="">
                        <FontAwesomeIcon
                            icon={faBurger}
                            className={styles.icon}
                        />
                    </a>
                </li>
            </ul>
            
            <div className={styles.userProfile}>
                <figure className={styles.pictureContainer}>
                    <img 
                        src="https://cdn.cosmos.so/e2124298-c03a-42fd-912b-ab01ac2e9885?format=jpeg" 
                        alt="" 
                        className={styles.picture} 
                    />
                </figure>
            </div>

        </aside>
    )
}

export default Navbar
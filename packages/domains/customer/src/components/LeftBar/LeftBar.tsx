import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons'
import { faBurger, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import styles from './Leftbar.module.css'

const Leftbar = () => {
    return (
        <aside className={styles.root}>
            <ul className={styles.leftBarContent}>
                <li className={styles.leftBarList}>
                    <a href="">
                        <FontAwesomeIcon
                            icon={faCartShopping}
                            className={styles.icon}
                        />
                    </a>
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

export default Leftbar
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.root}>
            <div className={styles.circle}></div>

            <div>
                <>
                    Lorem ipsum dolor sit amet adispiscing elit.
                </>
            </div>

            <FontAwesomeIcon
                icon={faXmark}
            />
        </nav>
    )
}

export default Navbar
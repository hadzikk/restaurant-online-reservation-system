import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './Billboard.module.css'

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = () => {
        setIsVisible(false)
    }

    if (!isVisible) {
        return null
    }

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
                onClick={handleClose}
            />
        </nav>
    )
}

export default Navbar
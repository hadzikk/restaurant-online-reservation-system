import React from 'react'
import styles from './Divider.module.css'

const Divider = () => {
    return (
        <div className={styles.root}>
            <span className={styles.text}>or</span>
        </div>
    )
}

export default Divider
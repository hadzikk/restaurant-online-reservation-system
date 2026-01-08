import React, { type FC } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    text?: string
    type?: 'button' | 'submit' | 'reset'
    size?: 'small' | 'medium' | 'large'
}

const Button: FC<ButtonProps> = ({ text = 'button', type = 'button', size = 'medium' }) => {
    if (type === 'submit') {
     return (
        <button className={styles.root + ' ' + styles[size] + ' ' + styles[type]} type={type}>
            {text}
        </button>
     )   
    }

    return (
        <button className={styles.root + ' ' + styles[size]} type={type}>
            {text}
        </button>
    )
}

export default Button
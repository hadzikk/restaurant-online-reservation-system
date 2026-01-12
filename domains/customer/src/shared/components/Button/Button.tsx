import React, { type FC } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    text?: string
    type?: 'button' | 'submit' | 'reset'
    size?: 'small' | 'medium' | 'large'
    onClick?: () => void
    isDisabled?: boolean
}

const Button: FC<ButtonProps> = ({ text = 'button', type = 'button', size = 'medium', onClick, isDisabled = false }) => {
    if (type === 'submit') {
     return (
        <button 
            className={styles.root + ' ' + styles[size] + ' ' + styles[type]} 
            type="submit"
            onClick={onClick}
            disabled={isDisabled}
        >
            {text}
        </button>
     )   
    }

    return (
        <button 
            className={styles.root + ' ' + styles[size]} 
            type={type} 
            onClick={onClick}
            disabled={isDisabled}
        >
            {text}
        </button>
    )
}

export default Button
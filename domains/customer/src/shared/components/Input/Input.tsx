import React, { type FC } from 'react'
import styles from './Input.module.css'

interface InputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
}

const Input: FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  size
}) => {
  if (type === 'phone') {
    return (
      <div className={styles.root}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.container}>
          <select name="" id="">
            <option value="">+62</option>
          </select>
          <input type="number" />
        </div>
      </div>
    )
  }

  if (type === 'gender') {
    return (
      <div className={styles.root}>
        <label htmlFor={id}>{label}</label>
        <select className={styles.gender} name="" id="">
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={styles[size]}
      />
    </div>
  )
}

export default Input
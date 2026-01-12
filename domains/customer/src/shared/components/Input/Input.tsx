import React, { type FC } from 'react'
import styles from './Input.module.css'

interface InputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const Input: FC<InputProps> = ({ id, label, type = 'text', placeholder = '', size, onChange }) => {
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
        <select className={styles.gender} name="gender" id={id}>
          <option id="1" value="male">male</option>
          <option id="2" value="female">female</option>
        </select>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles[size]}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
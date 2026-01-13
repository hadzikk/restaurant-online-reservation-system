import React, { type FC } from 'react'
import styles from './Input.module.css'

interface InputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  size?: 'small' | 'medium' | 'large'
  value?: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const Input: FC<InputProps> = ({ id, label, type = 'text', placeholder = '', size, onChange, value }) => {
  if (type === 'phone') {
    return (
      <div className={styles.root}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.container}>
          <select name="" id="">
            <option value="+62">+62</option>
          </select>
          <input 
            type="number" 
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      </div>
    )
}

  if (type === 'gender') {
    return (
      <div className={styles.root}>
        <label htmlFor={id}>{label}</label>
        <select 
          id={id}
          value={value}
          onChange={onChange}
          className={styles.select}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
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
        value={value}
      />
    </div>
  )
}

export default Input
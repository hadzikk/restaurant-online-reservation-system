import type { FC } from 'react'
import type { Tables } from '../../types'
import styles from './Table.module.css'

interface TableProps {
  table: Tables
  onClick?: (id: number) => void
  isSelected?: boolean
}

const Table: FC<TableProps> = ({ table, onClick, isSelected }) => {
  return (
    <div 
      className={`${styles.root} ${isSelected ? styles.selected : ''}`}
      style={{
        width: table.width,
        height: table.height,
        top: table.top,
        left: table.left,
      }}
      onClick={() => onClick(table.id)}
    >
      <p className={styles.name}>{table.name}</p>
    </div>
  )
}

export default Table
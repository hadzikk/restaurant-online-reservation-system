import type { FC } from 'react'
import type { Tables as TablesTypes } from '../../types'
import styles from './Table.module.css'

interface TableProps {
  table: TablesTypes
  onClick?: () => void
}

const Table: FC<TableProps> = ({ table, onClick }) => {
  return (
    <div 
      className={styles.root}
      style={{
        width: table.width,
        height: table.height,
        top: table.top,
        left: table.left,
      }}
      onClick={onClick}
    >
      <p className={styles.name}>{table.name}</p>
    </div>
  )
}

export default Table
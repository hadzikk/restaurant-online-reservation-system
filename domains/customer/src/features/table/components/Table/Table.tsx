import type { FC } from 'react'
import type { Table as TableTypes } from '../../types'
import styles from './Table.module.css'

interface TableProps {
  table: TableTypes
}

const Table: FC<TableProps> = ({ table }) => {

  return (
    <div 
      className={styles.root}
      style={{
        width: table.width,
        height: table.height,
        top: table.top,
        left: table.left,
      }}
    >
      <p className={styles.name}>{table.name}</p>
    </div>
  )
}

export default Table
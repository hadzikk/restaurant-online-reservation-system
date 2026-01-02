import React from "react"
import styles from './Table.module.css'

interface TableTypes {
    id?: number
    width?: number
    height?: number
    x?: number
    y?: number
    table_code: string
    isSelected?: boolean
    onClick?: () => void
}

const Table: React.FC<TableTypes> = ({
    width = 60,
    height = 60,
    table_code,
    x = 0,
    y = 0,
    isSelected = false,
    onClick
}) => {
    return (
        <div 
            style={{
                width: `${width}px`,
                height: `${height}px`,
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
            }} 
            className={`${styles.root} ${isSelected ? styles.selected: ''}`}
            onClick={onClick}
            >
            <p className={`${styles.name} ${isSelected ? styles.active : ''}`}>{table_code}</p>            
        </div>        
    )
}

export default Table
import React from "react"
import styles from './Table.module.css'

interface TableTypes {
    width?: number
    height?: number
    x?: number
    y?: number
    table_code: string
}

const Table: React.FC<TableTypes> = ({
    width = 60,
    height = 60,
    table_code,
    x = 0,
    y = 0,
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
            className={styles.root}>
            <p className={styles.name}>{table_code}</p>            
        </div>        
    )
}

export default Table
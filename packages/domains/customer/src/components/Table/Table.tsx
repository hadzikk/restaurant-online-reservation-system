import React from "react"
import styles from './Table.module.css'

interface TableTypes {
    width?: number
    height?: number
    top?: number
    left?: number
    bottom?: number
    right?: number
    name: string
}

const Table: React.FC<TableTypes> = ({
    width = 60,
    height = 60,
    top = 100,
    left = 100,
    bottom = 0,
    right = 0,
    name
}) => {
    return (
        <div 
            style={{
                width: `${width}px`,
                height: `${height}px`,
                top: `${top}px`,
                left: `${left}px`,
                bottom: `${bottom}px`,
                right: `${right}px`,
            }} 
            className={styles.root}>
            <p className={styles.name}>{name}</p>            
        </div>        
    )
}

export default Table
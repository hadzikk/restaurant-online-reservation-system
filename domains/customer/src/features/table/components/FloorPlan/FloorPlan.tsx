import { Table } from '../../components' 
import { useTable } from '../../hooks/useTable'
import styles from './FloorPlan.module.css'

const FloorPlan = () => {
    const { tables, details, isLoading, error } = useTable()

    console.log(details)
    
    if (isLoading) return <div>Loading tables...</div>
    if (error) return <div>Error loading tables: {error}</div>
    
    return (
        <div className={styles.root}>
            {tables.map((table) => (
                <Table
                    key={table.id}
                    table={table}
                />
            ))}
        </div>
    )
}

export default FloorPlan
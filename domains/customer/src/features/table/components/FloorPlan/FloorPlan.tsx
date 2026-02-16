import { Table } from '../../components' 
import { useTable } from '../../hooks/useTable'
import styles from './FloorPlan.module.css'

interface FloorPlanProps {
    selectedTableId: number | null
    onTableSelect: (id: number) => void
}

const FloorPlan = ({ selectedTableId, onTableSelect }: FloorPlanProps) => {
    const { tables, isLoading, error } = useTable()

    if (isLoading) return (
        <div className={styles.root}>
            <div>Loading tables...</div>
        </div>
    )
    if (error) return <div>Error loading tables: {error}</div>
    
    return (
        <div className={styles.root}>
            {tables.map((table) => (
                <Table
                    key={table.id}
                    table={table}
                    onClick={onTableSelect}
                    isSelected={selectedTableId === table.id}
                />
            ))}
        </div>
    )
}

export default FloorPlan
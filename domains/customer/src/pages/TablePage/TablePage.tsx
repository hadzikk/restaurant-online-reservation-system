import { FloorPlan } from '../../features/table/components'
import Detail from '../../features/table/components/Detail/Detail'
import { Navbar, Panel } from '../../shared/components'
import { useState } from 'react'
import styles from './TablePage.module.css'

const TablePage = () => {
    const [selectedTableId, setSelectedTableId] = useState<number | null>(null)

    return (
        <>
            <Navbar/>
            <Panel/>
            <main className={styles.root}>
                <FloorPlan 
                    selectedTableId={selectedTableId}
                    onTableSelect={setSelectedTableId}
                />
                <Detail tableId={selectedTableId} />
            </main>
        </>
    )
}

export default TablePage
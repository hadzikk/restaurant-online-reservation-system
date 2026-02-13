import { FloorPlan } from '../../features/table/components'
import { Navbar } from '../../shared/components'
import styles from './TablePage.module.css'

const TablePage = () => {
    return (
        <>
            <Navbar/>
            <main className={styles.root}>
                <FloorPlan/>
            </main>
        </>
    )
}

export default TablePage
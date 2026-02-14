import { FloorPlan } from '../../features/table/components'
import Detail from '../../features/table/components/Detail/Detail'
import { Navbar } from '../../shared/components'
import styles from './TablePage.module.css'

const TablePage = () => {
    return (
        <>
            <Navbar/>
            <main className={styles.root}>
                <FloorPlan/>
                <Detail/>
            </main>
        </>
    )
}

export default TablePage
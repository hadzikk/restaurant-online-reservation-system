import { Navbar, Panel } from '../../shared/components'
import { Cart } from '../../features/cart/components'
import styles from './TablePages.module.css'

const TablePages = () => {
    return (
    <>
      <Navbar />
      <Panel />
      <main className={styles.root}>
        <h1>Table Page Here</h1>
        <Cart />
      </main>
    </>
  )
}

export default TablePages
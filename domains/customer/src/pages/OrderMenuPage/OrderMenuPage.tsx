import { MenuSkeletonLoader, MenuList } from '../../features/menu/components'
import { Cart } from '../../features/cart/components'
import { Navbar, Panel } from '../../shared/components'
import styles from './OrderMenuPage.module.css'
import { useMenu } from '../../features/menu/hooks/useMenu'

const OrderMenuPage = () => {
  const { isLoading, error } = useMenu()

  if (isLoading) {
    return (
      <main className={styles.root}>
        <MenuSkeletonLoader />
      </main>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className={styles.root}>
          {error}
          <Cart />
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Panel />
      <main className={styles.root}>
        <MenuList />
        <Cart />
      </main>
    </>
  )
}

export default OrderMenuPage
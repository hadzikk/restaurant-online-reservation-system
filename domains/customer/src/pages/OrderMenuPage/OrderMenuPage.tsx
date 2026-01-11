import React, { useContext, useEffect, useState } from 'react'
import { MenuService } from '../../features/menu/api'
import type { Menu } from '../../features/menu/types'
import { MenuSkeletonLoader, MenuList } from '../../features/menu/components'
import { Cart } from '../../features/cart/components'
import styles from './OrderMenuPage.module.css'

type Props = {
    Menu: Menu[]
}

const OrderMenuPage: React.FC<Props> = ({ Menu }) => {
    const [menus, setMenus] = useState<Menu[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await MenuService.getAllMenus()
        setMenus(response)
      } catch (err) {
        setError('Unexpected error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenus()
  }, [])

  if (isLoading) {
    return (
      <main className={styles.root}>
        <MenuSkeletonLoader />
      </main>
    )
  }

  if (error) {
    return (
      <main className={styles.root}>
        <div className={styles.error}>{error}</div>
      </main>
    )
  }

  return (
    <main className={styles.root}>
      <MenuList menus={menus} />
      <Cart />
    </main>
  )
}

export default OrderMenuPage
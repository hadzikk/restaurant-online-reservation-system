import React, { useEffect, useState } from 'react'
import { MenuService } from '../../features/menu/api'
import { Cart } from '../../features/cart/components'
import { MenuSkeletonLoader, MenuList } from '../../features/menu/components'
import styles from './OrderMenuPage.module.css'

interface MenuImage {
    image_url: string
}

interface Menu {
    id: number
    name: string
    price: number
    menu_images: MenuImage[]
}

const OrderMenuPage: React.FC = () => {
    const [menus, setMenus] = useState<Menu[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await MenuService.getAllMenus()
                if (response) {
                    setMenus(response)
                } else {
                    throw new Error('No data received')
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch menus'
                console.error('Fetching menus failed:', errorMessage)
                setError('Failed to load menus. Please try again later.')
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
import { useEffect, useState } from 'react'
import type { Menu } from '../types'
import { MenuService } from '../api'

export const useMenu = () => {
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

    return { menus, isLoading, error }
}
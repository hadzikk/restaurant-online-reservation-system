import { useEffect, useState } from 'react'
import type { Menu } from '../types'
import { MenuService } from '../services'

export const useMenu = () => {
    const [menus, setMenus] = useState<Menu[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchMenus = async () => {
          try {
            const data = await MenuService.getAllMenus()
            setMenus(data)
            if (error) throw error
          } catch (error) {
            setError(error)
          } finally {
            setIsLoading(false)
          }
        }
    
        fetchMenus()
    }, [])

    return { menus, isLoading, error }
}
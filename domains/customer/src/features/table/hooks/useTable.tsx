import { useEffect, useState } from 'react'
import type { Tables } from '../types'
import TableService from '../services/table.service'

export const useTable = () => {
  const [tables, setTables] = useState<Tables[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await TableService.getAllTables()
        setTables(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTables()
  }, [])

  return { tables, isLoading, error }
}
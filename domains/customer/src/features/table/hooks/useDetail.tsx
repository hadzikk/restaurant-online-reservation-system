import { useEffect, useState } from 'react'
import type { TableDetails } from '../types'
import TableService from '../services/table.service'

export const useTableDetails = (tableId: number | null) => {
  const [details, setDetails] = useState<TableDetails | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!tableId) {
      setDetails(null)
      return
    }
    
    const fetchDetails = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await TableService.getTableById(tableId)
        setDetails(data?.[0]?.table_details?.[0] || null)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDetails()
  }, [tableId])

  return { details, isLoading, error }
}
import { useEffect, useState } from 'react'
import type { TableDetails } from '../types'
import TableService from '../services/table.service'

export const useTable = () => {
  const [tables, setTables] = useState<TableDetails[]>([])
  const [details, setDetails] = useState<TableDetails | null>(null)
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // fetching all tables
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

  // fetching table details - hanya saat selectedTableId berubah
  useEffect(() => {
    if (!selectedTableId) return
    
    const fetchTableDetails = async () => {
      try {
        const data = await TableService.getTableDetails(selectedTableId)
        setDetails(data?.[0] || null)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
      }
    }
    fetchTableDetails()
  }, [selectedTableId])

  return { tables, details, isLoading, error, setSelectedTableId }
}
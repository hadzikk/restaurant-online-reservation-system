// src/pages/TablePage/TablePage.tsx
import React, { useEffect, useState } from "react"
import { supabase } from '../../libs/supabase'
import { Layout, Table, TableDetails } from '../../components'
import styles from './TablePage.module.css'

interface TableData {
    id: number
    table_code: string
    width: number
    height: number
    x: number
    y: number
}

const ReservationPage = () => {
    const [tables, setTables] = useState<TableData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedTableId, setSelectedTableId] = useState<number | null>(null)

    const handleTableClick = (tableId: number) => {
        setSelectedTableId(tableId)
    }

    useEffect(() => {
        console.log('Fetching tables...')
        const fetchTables = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('restaurant_tables')
                    .select('*')
                    .order('id', { ascending: true })
                
                console.log('Tables: ', data)

                if (error) throw error
                setTables(data || [])
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Something went wrong.')
                console.error('Error: ', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTables()
    }, [])

    if (loading) {
        return (
            <Layout>
                <p>Fetching...</p>
            </Layout>
        )
    }

    if (error) {
        return (
            <Layout>
                <p>{error}</p>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className={styles.root}>
                <div className={styles.container}>
                    {tables.map((table) => (
                        <Table 
                            key={table.id}
                            width={table.width}
                            height={table.height}
                            table_code={table.table_code}
                            x={table.x}
                            y={table.y}
                            isSelected={selectedTableId === table.id}
                            onClick={() => handleTableClick(table.id)}
                        />
                    ))}
                </div>
                <TableDetails
                  id={selectedTableId}  
                />
            </div>       
        </Layout>
    )
}

export default ReservationPage
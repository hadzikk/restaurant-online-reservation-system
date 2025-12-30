import React, { useEffect, useState } from "react"
import { supabase } from '../../libs/supabase'
import { Table, TableDetails } from '../../components'
import styles from './TablePage.module.css'
import { Layout } from "../../components"

interface TableStructure {
    id: number
    table_code: string
    width: number
    height: number
    x: number
    y: number
}

const ReservationPage = () => {
    const [tables, setTables] = useState<TableStructure[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
                setTables(data)
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
                        />
                    ))}
                </div>
                <TableDetails/>
            </div>       
        </Layout>
    )
}

export default ReservationPage
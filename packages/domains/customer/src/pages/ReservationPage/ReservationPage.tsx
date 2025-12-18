import React, { useEffect, useState } from "react"
import { supabase } from '../../libs/supabase'
import Table from "../../components/Table/Table"
import styles from './ReservationPage.module.css'

interface TableStructure {
    id: number
    name: string
    width: number
    height: number
    top: number
    left: number
    bottom: number
    right: number
}

const ReservationPage = () => {
    const [tables, setTables] = useState<TableStructure[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTables = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('tables')
                    .select('*')
                    .order('id', { ascending: true })
                
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

    if (loading) return <p>Fetching tables...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <main className={styles.root}>
            <section className={styles.floorPlan}>
                <div className={styles.floorPlanContent}>
                    {tables.map((table) => {
                        return (
                            <Table
                                key={table.id}
                                name={table.name}
                                width={table.width}
                                height={table.height}
                                top={table.top}
                                left={table.left}
                                bottom={table.bottom}
                                right={table.right}
                            />
                        );
                    })}
                </div>
            </section>

            <aside className={styles.previewTable}>
                <figure className={styles.pictureContainer}>
                    <img 
                        src="https://cdn.cosmos.so/381ac9d8-001c-4cbd-a2c3-e1615767da0c?format=jpeg" 
                        alt="" 
                        className={styles.picture} 
                    />
                </figure>
            </aside>
        </main>
    )
}

export default ReservationPage
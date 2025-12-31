import React, { useState, useEffect } from 'react'
import { supabase } from '../../libs/supabase'
import styles from './Sandbox.module.css'

// interface
interface Table {
    id?: number
    table_code: string
    width: number
    height: number
    top?: number
    left?: number
    bottom?: number
    right?: number
}

const Sandbox = () => {
    // state
    const [tables, setTables] = useState<Table[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTables = async () => {
            try {
                console.log('Fetching menu items...')
                const { data, error } = await supabase
                    .from('restaurant_tables')
                    .select('*')
                    .order('created_at', { ascending: false })
                
                console.log('Menu items:', data)
                
                if (error) throw error
                
                if (data) {
                    setTables(data as unknown as Table[])
                }
            } catch (error) {
                console.error('Error in fetchTables:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTables()
    }, [])
    
    // event handler
    

    return (
        // main root
        <main className={styles.root}>
            {/* content */}
            <div className={styles.content}>
                {tables.map((table) => (
                    <div className={styles.table}>
                        <p>{table.table_code}</p>
                    </div>
                ))}
            </div>

            {/* button for add new table */}
            <button className={styles.buttonAddTable}>Add</button>
        </main>
    )
}

export default Sandbox
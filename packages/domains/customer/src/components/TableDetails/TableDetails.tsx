import React, { useState, useEffect } from 'react'
import { supabase } from '../../libs/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import styles from './TableDetails.module.css'

interface Table {
  id: number
  x: number
  y: number
  width: number
  height: number
  table_code: string
  status: string
}

interface TableDetails {
  id: number
  capacity: number
  description: string | null
  location_id: number
  table_id: number
  table_size_id: number
  restaurant_tables: Table
}

const TablePreview = () =>  {
    const [table, setTable] = useState<TableDetails | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTableDetails = async () => {
            const { data: table_details, error } = await supabase
            .from('restaurant_table_details')
            .select(`
                *,
                restaurant_tables(table_code)
            `)
            .eq('id', 1)
            .single()
            if (error) {
                console.error('Error fetching table details:', error);
            } else {
                console.log('Details', table_details);
            }
            setTable(table_details)
        }

        fetchTableDetails()
    }, [])

    return (
        <div className={styles.root}>
            <figure className={styles.figure}>
                <img
                    className={styles.image}  
                    src='https://cdn.cosmos.so/a6d966bc-7eaa-4068-b79d-7cfe65db74e3?format=jpeg' 
                    alt=''  
                />
            </figure>
            <div className="container">
                <p className={styles.header}>table</p>
                <p className={styles.tableCode}>{table?.restaurant_tables?.table_code}</p>
                <details className={styles.detailItem}>
                    <summary className={styles.detailSummary}>
                        <span className={styles.detailTitle}>description</span>
                        <span className={styles.arrow}>
                            <FontAwesomeIcon
                                icon={faAngleUp}
                            />
                        </span>
                    </summary>
                    <div className={styles.detailContent}>
                        <p>{table?.description}</p>
                    </div>
                </details>
                <details className={styles.detailItem}>
                    <summary className={styles.detailSummary}>
                        <span className={styles.detailTitle}>characteristics</span>
                        <span className={styles.arrow}>
                            <FontAwesomeIcon
                                icon={faAngleUp}
                            />
                        </span>
                    </summary>
                    <div className={styles.detailContent}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Size</td>
                                    <td>{table?.restaurant_tables?.width} x {table?.restaurant_tables?.height}</td>
                                </tr>
                                <tr>
                                    <td>Capacity</td>
                                    <td>{table?.capacity} people</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>
            </div>
        </div>
    )
}

export default TablePreview
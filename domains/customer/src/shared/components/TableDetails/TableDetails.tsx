import React, { useState, useEffect } from 'react'
import { supabase } from '../../api/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import styles from './TableDetails.module.css'

interface TableDetailProps {
    id: number | null
}

const TablePreview = ({ id }: TableDetailProps) =>  {
    const [table, setTable] = useState(null)

    useEffect(() => {
            const fetchTable = async () => {
                if (id === null) {
                    setTable(null)
                    return
                }

                try {
                    console.log('FETCHING TABLE...')
                    const { data, error } = await supabase
                    .from('restaurant_tables')
                    .select(`
                        table_code, 
                        status,
                        restaurant_table_details(
                        capacity,
                        description,
                        restaurant_table_features(id, name, description),
                        restaurant_table_images(image_url),
                        restaurant_table_locations(name),
                        restaurant_table_sizes(name)
                        )
                    `)
                    .eq('id', id)
                    .single()
                    
                    
                    if (error) throw error
                    
                    if (data) {
                        setTable(data)
                    }

                    console.log('TABLE & DETAIL:', data)

                } catch (error) {
                    console.error('ERROR IN FETCHTABLE:', error)
                }
            }
    
            fetchTable()
        }, [id])

    return (
        <div className={styles.root}>
            <figure className={styles.figure}>
                <img
                    className={styles.image}  
                    src={table?.restaurant_table_details[0].restaurant_table_images[0].image_url} 
                    alt=''  
                />
            </figure>
            <div className="container">
                <div className={styles.tableInfo}>
                    <div className={styles.tableHeader}>
                        <p className={styles.header}>table</p>
                        <p className={styles.tableCode}>{table?.table_code}</p>
                    </div>
                    <span className={styles.status}>{table?.status}</span>
                </div>
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
                        <p>{table?.restaurant_table_details[0].description}</p>
                    </div>
                </details>
                <details className={styles.detailItem}>
                    <summary className={styles.detailSummary}>
                        <span className={styles.detailTitle}>about this table</span>
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
                                    <td>{table?.restaurant_table_details[0]?.restaurant_table_sizes?.name || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Capacity</td>
                                    <td>{table?.restaurant_table_details[0]?.capacity || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Place</td>
                                    <td>{table?.restaurant_table_details[0]?.restaurant_table_locations?.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>
                <details className={styles.detailItem}>
                    <summary className={styles.detailSummary}>
                        <span className={styles.detailTitle}>features</span>
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
                                {table?.restaurant_table_details[0]?.restaurant_table_features?.map((feature) => (
                                    <tr key={feature.id}>
                                        <td>{feature.name}</td>
                                        <td>{feature.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </details>
            </div>
        </div>
    )
}

export default TablePreview
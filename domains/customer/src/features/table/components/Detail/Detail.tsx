import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import styles from './Detail.module.css'
import { useTableDetails } from '../../hooks/useDetail'

interface DetailProps {
    tableId: number | null
}

const Detail = ({ tableId }: DetailProps) =>  {
    const { details, isLoading, error } = useTableDetails(tableId)

    if (isLoading) return <div>Loading table details...</div>
    if (error) return <div>Error loading details: {error}</div>
    if (!details) return <div>No table selected</div>

    return (
        <div className={styles.root}>
            <figure className={styles.figure}>
                <img
                    className={styles.image}  
                    src={details.table_images[0].image_url} 
                    alt=''  
                />
            </figure>
            <div className={styles.container}>
                <div className={styles.about}>
                    <div className={styles.general}>
                        <span className={styles.code}>{details.tables.name}</span>
                        <span className={styles.status}>available</span>
                    </div>
                </div>
                <details className={styles.detail}>
                    <summary className={styles.summary}>
                        <span className={styles.title}>description</span>
                        <span className={styles.arrow}>
                            <FontAwesomeIcon
                                icon={faAngleUp}
                            />
                        </span>
                    </summary>
                    <div className={styles.content}>
                        <span>{'description'}</span>
                    </div>
                </details>
                <details className={styles.detail}>
                    <summary className={styles.summary}>
                        <span className={styles.title}>about this table</span>
                        <span className={styles.arrow}>
                            <FontAwesomeIcon
                                icon={faAngleUp}
                            />
                        </span>
                    </summary>
                    <div className={styles.content}>
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
                                    <td>{details.table_sizes.name}</td>
                                </tr>
                                <tr>
                                    <td>Capacity</td>
                                    <td>{details.capacity}</td>
                                </tr>
                                <tr>
                                    <td>Place</td>
                                    <td>{details.table_locations.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>
                <details className={styles.detail}>
                    <summary className={styles.summary}>
                        <span className={styles.title}>features</span>
                        <span className={styles.arrow}>
                            <FontAwesomeIcon
                                icon={faAngleUp}
                            />
                        </span>
                    </summary>
                    <div className={styles.content}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.table_features?.length > 0 ? (
                                    details.table_features.map((feature) => (
                                        <tr key={feature.id}>
                                            <td>{feature.name}</td>
                                            <td>{feature.description}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2}>No features available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </details>
            </div>
        </div>
    )
}

export default Detail
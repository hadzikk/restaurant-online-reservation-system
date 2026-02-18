import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import styles from './Detail.module.css'
import { useTableDetails } from '../../hooks/useDetail'
import { useState, useEffect } from 'react'
import { OrderTableLineService } from '../../../cart/services'
import { useCart } from '../../../cart/hooks'
import { TableAvailabilityService } from '../../services/tableAvailability.service'
import toast from 'react-hot-toast'

interface DetailProps {
    tableId: number | null
}

const Detail = ({ tableId }: DetailProps) =>  {
    const { details, isLoading, error } = useTableDetails(tableId)
    const { order } = useCart()
    const [reservationData, setReservationData] = useState({
        date: '',
        time: '',
        guests: 1
    })
    const [isReserving, setIsReserving] = useState(false)
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
    const [tableAvailability, setTableAvailability] = useState<boolean | null>(null)

    const handleReserveTable = async () => {
        if (!tableId || !order[0]?.id || !reservationData.date || !reservationData.time) {
            toast.error('Please complete all reservation fields')
            return
        }

        setIsReserving(true)
        try {
            // Check table availability first
            const isAvailable = await TableAvailabilityService.checkTableAvailability({
                table_id: tableId,
                reservation_date: reservationData.date,
                reservation_time: reservationData.time,
                duration_hours: 2 // Default 2 hours duration
            })

            if (!isAvailable) {
                toast.error('This table is not available at the selected time. Please choose a different time.')
                setTableAvailability(false)
                return
            }

            // Proceed with reservation
            await OrderTableLineService.createOrderTableLine({
                order_id: order[0].id,
                table_id: tableId,
                table_name: details.tables.name,
                reservation_date: reservationData.date,
                reservation_time: reservationData.time,
                guest_count: reservationData.guests
            })
            
            toast.success('Table reserved successfully!')
            setReservationData({ date: '', time: '', guests: 1 })
            setTableAvailability(null)
        } catch (error) {
            toast.error('Failed to reserve table')
            console.error('Reservation error:', error)
        } finally {
            setIsReserving(false)
        }
    }

    const checkAvailability = async () => {
        if (!tableId) {
            setTableAvailability(null)
            return
        }

        // Check if there are any existing reservations for today
        const today = new Date().toISOString().split('T')[0]
        const currentTime = new Date().toTimeString().slice(0, 5)
        
        setIsCheckingAvailability(true)
        try {
            // Check if table is available right now (for immediate reservations)
            const isAvailableNow = await TableAvailabilityService.checkTableAvailability({
                table_id: tableId,
                reservation_date: today,
                reservation_time: currentTime,
                duration_hours: 2
            })
            
            setTableAvailability(isAvailableNow)
        } catch (error) {
            console.error('Error checking availability:', error)
            setTableAvailability(null)
        } finally {
            setIsCheckingAvailability(false)
        }
    }

    const checkAvailabilityForDateTime = async () => {
        if (!tableId || !reservationData.date || !reservationData.time) {
            setTableAvailability(null)
            return
        }

        setIsCheckingAvailability(true)
        try {
            const isAvailable = await TableAvailabilityService.checkTableAvailability({
                table_id: tableId,
                reservation_date: reservationData.date,
                reservation_time: reservationData.time,
                duration_hours: 2
            })
            setTableAvailability(isAvailable)
        } catch (error) {
            console.error('Error checking availability:', error)
            setTableAvailability(null)
        } finally {
            setIsCheckingAvailability(false)
        }
    }

    // Check availability when table is selected
    useEffect(() => {
        if (tableId) {
            checkAvailability()
        }
    }, [tableId])

    // Check availability when date/time changes
    useEffect(() => {
        checkAvailabilityForDateTime()
    }, [reservationData.date, reservationData.time])

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
                        <span className={`${styles.status} ${
                            tableAvailability === false ? styles.notAvailable : 
                            tableAvailability === true ? styles.available : 
                            styles.checking
                        }`}>
                            {isCheckingAvailability ? 'checking...' :
                             tableAvailability === false ? 'not available' :
                             tableAvailability === true ? 'available' : 'available'}
                        </span>
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
                
                {/* Reservation Form - Only show if table is available */}
                {tableAvailability !== false && (
                    <div className={styles.reservation}>
                        <h3 className={styles.reservationTitle}>
                            <FontAwesomeIcon icon={faCalendarPlus} />
                            Reserve This Table
                        </h3>
                        {tableAvailability === null && reservationData.date && reservationData.time && (
                            <p className={styles.availabilityNote}>
                                Please select date and time to check availability
                            </p>
                        )}
                        {tableAvailability === true && (
                            <p className={styles.availabilityNoteAvailable}>
                                Table is available for the selected time
                            </p>
                        )}
                        <div className={styles.reservationForm}>
                            <div className={styles.formGroup}>
                                <label>Reservation Date</label>
                                <input
                                    type="date"
                                    value={reservationData.date}
                                    onChange={(e) => setReservationData(prev => ({
                                        ...prev,
                                        date: e.target.value
                                    }))}
                                    min={new Date().toISOString().split('T')[0]}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Reservation Time</label>
                                <input
                                    type="time"
                                    value={reservationData.time}
                                    onChange={(e) => setReservationData(prev => ({
                                        ...prev,
                                        time: e.target.value
                                    }))}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Number of Guests</label>
                                <select
                                    value={reservationData.guests}
                                    onChange={(e) => setReservationData(prev => ({
                                        ...prev,
                                        guests: parseInt(e.target.value)
                                    }))}
                                    className={styles.select}
                                >
                                    {[...Array(Math.min(details.capacity, 8))].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={handleReserveTable}
                                disabled={isReserving || !reservationData.date || !reservationData.time || tableAvailability !== true}
                                className={styles.reserveButton}
                            >
                                <FontAwesomeIcon icon={faCalendarPlus} />
                                {isReserving ? 'Reserving...' : 'Reserve Table'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Not Available Message */}
                {tableAvailability === false && (
                    <div className={styles.notAvailableMessage}>
                        <h3 className={styles.notAvailableTitle}>
                            <FontAwesomeIcon icon={faCalendarPlus} />
                            Table Not Available
                        </h3>
                        <p className={styles.notAvailableText}>
                            This table is currently not available for reservation.
                        </p>
                        <p className={styles.notAvailableSubtext}>
                            The table might be reserved by another customer. Please try a different table or check back later.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Detail
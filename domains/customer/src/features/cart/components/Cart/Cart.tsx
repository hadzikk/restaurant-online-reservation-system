import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks'
import { formatToRupiah } from '../../../../shared/utils'
import toast from 'react-hot-toast'
import { CartSkeleton, OrderMenuList, OrderTableList } from '../../components'
import { generateOrderPDF, simulatePayment, clearOrderAfterPayment } from '../../utils/pdfGenerator'
import { useAuth } from '../../../../shared/hooks'
import styles from './Cart.module.css'
import { Logo } from '../../../../shared/components'

const Cart = () => {
    const { 
        orderedTables, 
        total, 
        error, 
        loading, 
        orderMenuLines,
        removeTableReservation,
        order
    } = useCart()
    const { session } = useAuth()
    const [isOpen, setIsOpen] = useState(true)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    // error handler notification
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const handleToggleCart = (e) => {
        if (e.target === e.currentTarget) {
            const cartElement = document.querySelector(`.${styles.cart}`)
            if (cartElement) cartElement.classList.remove(styles.slide)

            setTimeout(() => {
                setIsOpen(false)
            }, 300)
        }
    }

    const handlePayment = async () => {
        if (orderMenuLines.length === 0 && orderedTables.length === 0) {
            toast.error('Cart is empty!')
            return
        }

        if (orderedTables.length === 0) {
            toast.error('Please reserve at least one table to complete the transaction')
            return
        }

        if (!session?.user?.id) {
            toast.error('User not authenticated')
            return
        }

        setIsProcessingPayment(true)
        
        try {
            // Simulate payment
            const paymentResult = await simulatePayment(total)
            
            if (paymentResult.success) {
                toast.success(`Payment successful! Transaction ID: ${paymentResult.transactionId}`)
                
                // Generate PDF receipt
                const orderId = (order[0]?.id || Math.floor(Math.random() * 10000)).toString()
                const receiptFileName = await generateOrderPDF({
                    orderMenuLines,
                    orderedTables,
                    total,
                    orderId
                })
                
                toast.success('Receipt downloaded!')
                
                // Save transaction and clear order
                const orderDetails = {
                    orderMenuLines,
                    orderedTables,
                    total,
                    orderId
                }
                
                const cleared = await clearOrderAfterPayment(
                    orderDetails, 
                    session.user.id, 
                    paymentResult.transactionId, 
                    receiptFileName
                )
                
                if (cleared) {
                    toast.success('Order completed and cleared! Ready for new order.')
                } else {
                    toast.error('Failed to clear order')
                }
            } else {
                toast.error('Payment failed. Please try again.')
            }
        } catch (error) {
            toast.error('Payment processing error')
            console.error('Payment error:', error)
        } finally {
            setIsProcessingPayment(false)
        }
    }

    if (orderMenuLines.length === 0 && orderedTables.length === 0) {
        return (
            <div className={`${styles.root} ${isOpen ? styles.open : ''}`} onClick={handleToggleCart}>
                <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                    <div className={`${styles.content} ${styles.extended}`}>
                        <Logo />
                        <p>Bill is currently empty, please add some menus and reserve at least one table to complete your order.</p>
                    </div>
                    <div className={styles.controls}>
                        <button className={styles.control} onClick={handleToggleCart}>
                            close
                        </button>
                        <button 
                            className={styles.control} 
                            onClick={handlePayment}
                            disabled={isProcessingPayment}
                        >
                            {isProcessingPayment ? 'Processing...' : 'pay'}
                        </button>
                    </div>
                </aside>
            </div>
        )
    }
    // Cek jika ada orderedTables tapi tidak ada orderMenuLines
    if (orderedTables.length > 0 && orderMenuLines.length === 0) {
        return (
            <div className={`${styles.root} ${isOpen ? styles.open : ''}`} onClick={handleToggleCart}>
                <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                    <div className={styles.content}>
                        <p className={styles.title}>bill</p>
                        <p className={styles.subtitle}>tables</p>
                        <OrderTableList 
                            order_tables={orderedTables}
                            onRemoveTable={removeTableReservation}
                        />
                        <p className={styles.subtitle}>menus</p>
                        <p>No menu items added yet</p>
                        <p className={styles.subtitle}>total</p>
                        <span className={styles.total}>{formatToRupiah(total)}</span>
                    </div>
                    <div className={styles.controls}>
                        <button className={styles.control} onClick={handleToggleCart}>
                            close
                        </button>
                        <button 
                            className={styles.control} 
                            onClick={handlePayment}
                            disabled={isProcessingPayment}
                        >
                            {isProcessingPayment ? 'Processing...' : 'pay'}
                        </button>
                    </div>
                </aside>
            </div>
        )
    }
    // Cek jika ada orderMenuLines tapi tidak ada orderedTables
    if (orderMenuLines.length > 0 && orderedTables.length === 0) {
        return (
            <div className={`${styles.root} ${isOpen ? styles.open : ''}`} onClick={handleToggleCart}>
                <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                    <div className={styles.content}>
                        <p className={styles.title}>bill</p>
                        <p className={styles.subtitle}>tables</p>
                        <p>No tables selected</p>
                        <p className={styles.subtitle}>menus</p>
                        <OrderMenuList />
                        <p className={styles.subtitle}>total</p>
                        <span className={styles.total}>{formatToRupiah(total)}</span>
                    </div>
                    <div className={styles.controls}>
                        <button className={styles.control} onClick={handleToggleCart}>
                            close
                        </button>
                        <button 
                            className={styles.control} 
                            onClick={handlePayment}
                            disabled={isProcessingPayment}
                        >
                            {isProcessingPayment ? 'Processing...' : 'pay'}
                        </button>
                    </div>
                </aside>
            </div>
        )
    }

    return (
        <div 
            className={`${styles.root} ${isOpen ? styles.open : ''}`}
            onClick={handleToggleCart}
        >
            <aside className={`${styles.cart} ${isOpen ? styles.slide : ''}`}>
                <div className={styles.content}>
                    <p className={styles.title}>bill</p>
                    <p className={styles.subtitle}>tables</p>
                    <OrderTableList 
                        order_tables={orderedTables}
                        onRemoveTable={removeTableReservation}
                    />
                    <p className={styles.subtitle}>menus</p>
                    <OrderMenuList />
                    <p className={styles.subtitle}>total</p>
                    <span className={styles.total}>{formatToRupiah(total)}</span>
                </div>
                <div className={styles.controls}>
                    <button 
                        className={styles.control}
                        onClick={handleToggleCart}
                    >
                        close
                    </button>
                    <button 
                        className={styles.control}
                        onClick={handlePayment}
                        disabled={isProcessingPayment}
                    >
                        {isProcessingPayment ? 'Processing...' : 'pay'}
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default Cart
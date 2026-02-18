import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import type { OrderMenuLine, OrderTableLine } from '../types'
import { OrderMenuLineService, OrderTableLineService, TransactionService } from '../services'
import { useAuth } from '../../../shared/hooks'

export interface OrderDetails {
    orderMenuLines: OrderMenuLine[]
    orderedTables: OrderTableLine[]
    total: number
    orderId: string
}

export const generateOrderPDF = async (orderDetails: OrderDetails) => {
    const { orderMenuLines, orderedTables, total, orderId } = orderDetails
    
    // Create PDF document
    const pdf = new jsPDF()
    
    // Add custom font for better Unicode support
    pdf.setFont('helvetica')
    
    // Title - Monochrome theme
    pdf.setFontSize(20)
    pdf.setTextColor(26, 26, 26) // #1a1a1a
    pdf.text('Restaurant Bill', 105, 20, { align: 'center' })
    
    // Order ID and Date
    pdf.setFontSize(12)
    pdf.setTextColor(75, 75, 75) // #4b4b4b
    pdf.text(`Order ID: #${orderId}`, 20, 40)
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50)
    pdf.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 60)
    
    let currentY = 80
    
    // Table Reservations Section - Cart style
    if (orderedTables.length > 0) {
        pdf.setFontSize(14)
        pdf.setTextColor(26, 26, 26) // #1a1a1a
        pdf.text('tables', 20, currentY)
        currentY += 15
        
        pdf.setFontSize(10)
        pdf.setTextColor(75, 75, 75) // #4b4b4b
        
        orderedTables.forEach((table, index) => {
            pdf.text(`${index + 1}. ${table.table_name}`, 25, currentY)
            pdf.text(`   Date: ${table.reservation_date}`, 25, currentY + 6)
            pdf.text(`   Time: ${table.reservation_time}`, 25, currentY + 12)
            pdf.text(`   Guests: ${table.guest_count}`, 25, currentY + 18)
            currentY += 25
        })
        
        currentY += 10
    }
    
    // Menu Items Section - Cart style
    if (orderMenuLines.length > 0) {
        pdf.setFontSize(14)
        pdf.setTextColor(26, 26, 26) // #1a1a1a
        pdf.text('menus', 20, currentY)
        currentY += 15
        
        // Table headers
        pdf.setFontSize(10)
        pdf.setTextColor(75, 75, 75) // #4b4b4b
        pdf.text('Item', 20, currentY)
        pdf.text('Qty', 120, currentY)
        pdf.text('Price', 140, currentY)
        pdf.text('Total', 170, currentY)
        
        // Menu items
        currentY += 10
        orderMenuLines.forEach((item) => {
            const itemTotal = item.quantity * item.snapshot_price
            pdf.text(item.menu?.name || 'Menu Item', 20, currentY)
            pdf.text(item.quantity.toString(), 120, currentY)
            pdf.text(`Rp ${item.snapshot_price.toLocaleString()}`, 140, currentY)
            pdf.text(`Rp ${itemTotal.toLocaleString()}`, 170, currentY)
            currentY += 8
        })
        
        currentY += 10
    }
    
    // Total Section
    pdf.setFontSize(12)
    pdf.setTextColor(26, 26, 26) // #1a1a1a
    pdf.text('total', 20, currentY)
    pdf.text(`Rp ${total.toLocaleString()}`, 170, currentY)
    
    // Footer
    pdf.setFontSize(10)
    pdf.setTextColor(156, 163, 175) // #9ca3af
    pdf.text('Thank you for your order!', 105, 280, { align: 'center' })
    pdf.text('This is a computer-generated receipt', 105, 285, { align: 'center' })
    
    // Save PDF
    const fileName = `restaurant-bill-${orderId}-${Date.now()}.pdf`
    pdf.save(fileName)
    
    return fileName
}

export const clearOrderAfterPayment = async (orderDetails: OrderDetails, userId: string, transactionId: string, receiptFileName: string) => {
    const { orderMenuLines, orderedTables, total, orderId } = orderDetails
    
    try {
        // Create transaction record
        const orderSnapshot = {
            menus: orderMenuLines.map(item => ({
                name: item.menu?.name || 'Menu Item',
                quantity: item.quantity,
                price: item.snapshot_price,
                total: item.quantity * item.snapshot_price
            })),
            tables: orderedTables.map(table => ({
                table_name: table.table_name,
                reservation_date: table.reservation_date,
                reservation_time: table.reservation_time,
                guests: table.guest_count
            })),
            total: total
        }

        await TransactionService.createTransaction({
            user_id: userId,
            transaction_id: transactionId,
            total_amount: total,
            payment_method: 'simulation',
            payment_status: 'completed',
            receipt_file_name: receiptFileName,
            order_snapshot: orderSnapshot
        })

        // Clear all menu lines for this order
        if (orderMenuLines.length > 0) {
            for (const line of orderMenuLines) {
                await OrderMenuLineService.deleteMenuLine(line.id)
            }
        }
        
        // Clear all table lines for this order
        if (orderedTables.length > 0) {
            for (const line of orderedTables) {
                await OrderTableLineService.deleteOrderTableLine(line.id)
            }
        }
        
        return true
    } catch (error) {
        console.error('Error clearing order:', error)
        return false
    }
}

export const simulatePayment = async (amount: number): Promise<{ success: boolean; transactionId: string }> => {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate random transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    // Simulate 95% success rate
    const success = Math.random() > 0.05
    
    return {
        success,
        transactionId: success ? transactionId : ''
    }
}

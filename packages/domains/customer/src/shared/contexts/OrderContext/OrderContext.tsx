import React, { createContext, useState, type ReactNode } from 'react'

interface OrderContextType {
    orderId: number | null
    setOrderId: (id: number) => void
}

type OrderContextProps = {
    children: ReactNode
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const OrderContextProvider = ({ children } : OrderContextProps) => {
    const [orderId, setOrderId] = useState<number | null>(null)
    
    return (
        <OrderContext.Provider value={{ orderId, setOrderId }}>
            {children}
        </OrderContext.Provider>
    )
}

export const UseOrder = OrderContext
export default OrderContextProvider
import React, { createContext, useState, type ReactNode } from 'react'

type CheckoutContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

type CheckoutProviderProps = {
  children: ReactNode
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

const CheckoutContextProvider = ({ children } : CheckoutProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <CheckoutContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const OpenCheckout = CheckoutContext
export default CheckoutContextProvider
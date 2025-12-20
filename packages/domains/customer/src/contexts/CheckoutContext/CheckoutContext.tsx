import { createContext, useContext, useState, type FC, type ReactNode } from 'react'

type CheckoutContextType = {
  isCheckoutOpen: boolean
  openCheckout: () => void
  closeCheckout: () => void
  toggleCheckout: () => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export const CheckoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const openCheckout = () => setIsCheckoutOpen(true)
  const closeCheckout = () => setIsCheckoutOpen(false)
  const toggleCheckout = () => setIsCheckoutOpen(prev => !prev)

  return (
    <CheckoutContext.Provider value={{ isCheckoutOpen, openCheckout, closeCheckout, toggleCheckout }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}
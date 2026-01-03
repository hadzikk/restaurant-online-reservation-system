import { useState } from 'react'
import { CheckoutContextProvider, OrderContextProvider } from './contexts'
import { MenuPage, TablePage } from './pages'

const App = () => {
  return (
    <OrderContextProvider>
      <CheckoutContextProvider>
        <MenuPage/>
      </CheckoutContextProvider>
    </OrderContextProvider>
  )
}

export default App
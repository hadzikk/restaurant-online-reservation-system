import { useState } from 'react'
import CheckoutContextProvider from './contexts/CheckoutContext/CheckoutContext'
import { MenuPage, TablePage } from './pages'

const App = () => {
  return (
    <CheckoutContextProvider>
      <TablePage/>
    </CheckoutContextProvider>
  )
}

export default App
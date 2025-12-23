import { useState } from 'react'
import CheckoutContextProvider from './contexts/CheckoutContext/CheckoutContext'
import MenuPage from './pages/MenuPage/MenuPage'

const App = () => {
  return (
    <CheckoutContextProvider>
      <MenuPage/>
    </CheckoutContextProvider>
  )
}

export default App

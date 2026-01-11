import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './shared/routes'
import { LoginPage, RegisterPage, LandingPage, OrderMenuPage } from './pages'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <OrderMenuPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
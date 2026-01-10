import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginPage, RegisterPage, LandingPage } from './pages'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
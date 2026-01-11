import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../hooks'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { session, isAuthenticated, loading } = useAuth()

  // Tunggu hasil pengecekan session
  if (loading) {
    return <p>Checking authentication...</p>
  }

  // Tidak ada session → redirect
  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
import { type PropsWithChildren } from 'react'
import { useAuth } from '../hooks'
import { Navigate } from 'react-router-dom'

type Props = PropsWithChildren

export const GuestRoute = ({ children }: { children: Props }) => {
  const { session, loading } = useAuth()

  if (loading) return null

  if (session) return <Navigate to="/menu" replace />

  return children
}

export const ProtectedRoute = ({ children }: { children: Props }) => {
  const { session, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  if (!session) return <Navigate to="/login" replace />

  return children
}
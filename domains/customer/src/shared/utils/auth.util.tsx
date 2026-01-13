// auth.util.tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { session, isLoading } = useAuth()
    const location = useLocation()

    if (isLoading) {
        return <div>Loading...</div> // Atau komponen loading Anda
    }

    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export const GuestRoute = ({ children }: { children: JSX.Element }) => {
    const { session, isLoading } = useAuth()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (session) {
        return <Navigate to="/" replace />
    }

    return children
}
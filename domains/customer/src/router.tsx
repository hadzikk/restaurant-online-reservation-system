import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute, GuestRoute } from './shared/utils'
import { LandingPage, LoginPage, RegisterPage, OrderMenuPage, TablePage } from './pages'

export const router = createBrowserRouter([
    { 
        path: '/', 
        element: (
            <GuestRoute>
                <LandingPage />
            </GuestRoute>
        ) 
    },
    { 
        path: '/login', 
        element: (
            <GuestRoute>
                <LoginPage />
            </GuestRoute>
        ) 
    },
    { 
        path: '/register', 
        element: (
            <GuestRoute>
                <RegisterPage />
            </GuestRoute>
        ) 
    },
    { 
        path: '/menu', 
        element: (
        <ProtectedRoute>
            <OrderMenuPage />
        </ProtectedRoute>
        ) 
    },
    { 
        path: '/table', 
        element: (
        <ProtectedRoute>
            <TablePage />
        </ProtectedRoute>
        ) 
    }
])
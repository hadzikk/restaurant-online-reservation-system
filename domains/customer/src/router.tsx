// this is an object that you will call for create a route { createBrowserRouter }
import { createBrowserRouter } from 'react-router-dom'
import { LandingPage, LoginPage, RegisterPage, OrderMenuPage } from './pages'

export const router = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/menu', element: <OrderMenuPage /> }
])
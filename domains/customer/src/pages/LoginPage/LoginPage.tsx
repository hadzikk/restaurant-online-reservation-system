import React, { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks'
import toast from 'react-hot-toast'
import { Divider, GoogleProviderButton, SpotifyProviderButton, Button, Input, Logo } from '../../shared/components'
import styles from './LoginPage.module.css'

const LoginPage = () => {
    const { session, login } = useAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (!formData.email || !formData.password) {
                const errorMsg = 'Please fill in all required fields'
                setError(errorMsg)
                toast.error(errorMsg)
                return
            }
            
            await login(formData)
            toast.success('Login successful!')
            navigate('/menu')
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Login failed. Please try again.'
            setError(errorMsg)
            toast.error(errorMsg)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className={styles.root}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo />
                </div>

                <p className={styles.hint}>Before order, please login.</p>

                {/* Login form */}
                <div className={styles.card}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="Enter your email..." id="email" onChange={handleChange} required />
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter your password..." id="password" onChange={handleChange} required />
                        <button type="submit">Login</button>
                    </form>
                </div>

                {/* These are alternatives authentications options */}
                <Divider/>

                {/* Authenticate using providers */}
                <GoogleProviderButton text={'Login with Google account'}/>
                <Divider/>

                {/* Create an account traditionally */}
                <Link to="/register">
                    <Button text={'Create an account'} type="button"/>
                </Link>
            </div>
        </main>
    )
}

export default LoginPage
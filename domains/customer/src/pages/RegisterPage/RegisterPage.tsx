import React, { useState, useEffect, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks'
import toast from 'react-hot-toast'
import { Divider, GoogleProviderButton, Logo } from '../../shared/components'
import styles from './RegisterPage.module.css'

const RegisterPage = () => {
    const { register, loading } = useAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
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
            if (!formData.first_name || !formData.email || !formData.password) {
                const errorMsg = 'Please fill in all required fields'
                setError(errorMsg)
                toast.error(errorMsg)
                return
            }
            
            await register(formData)
            toast.success('Registration successful!')
            navigate('/login')
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Registration failed. Please try again.'
            setError(errorMsg)
            toast.error(errorMsg)
            throw new Error(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <video src="https://cdn.cosmos.so/29462f91-c6bc-4a06-964c-867f89b681c3.mp4" autoPlay loop muted/>
            </div>

            <div className={styles.content}>
                <div className={styles.card}>
                    <Logo />
                    <p className={styles.title}>Create an account</p>
                    <Divider />

                    {/* Directly login with these options without register */}
                    <GoogleProviderButton text={'Continue with Google'} size={'medium'} />
                    <Divider />
                    
                    {/* Register form */}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" onChange={handleChange} placeholder='Your first name' id='first_name' required />
                        
                        <label htmlFor="middle_name">Middle Name</label>
                        <input type="text" onChange={handleChange} placeholder='Your middle name' id='middle_name'/>
                        
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" onChange={handleChange} placeholder='Your last name' id='last_name'/>

                        <label htmlFor="email">Email</label>
                        <input type="text" onChange={handleChange} placeholder='Your email' id='email' required/>

                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={handleChange} placeholder='Create a password' id='password' required />
                        
                        <button type="submit" disabled={isLoading}>
                            {
                                isLoading ? 'Creating account...' : 'Create account'
                            }
                        </button>
                    </form>


                    <Divider />
                    <a href="/login" className={styles.link} aria-disabled={isLoading}>I already have an account</a>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
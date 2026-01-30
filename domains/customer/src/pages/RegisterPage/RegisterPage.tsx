import React, { useState, useEffect, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks'
import toast from 'react-hot-toast'
import { Divider, GoogleProviderButton, Logo } from '../../shared/components'
import styles from './RegisterPage.module.css'

const RegisterPage = () => {
    const { signUp, loading } = useAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: null,
        full_name: null,
        birthday: null,
        gender: null,
        phone: null,
        password: null
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
            if (!formData.full_name || !formData.email || !formData.password) {
                const errorMsg = 'Please fill in all required fields'
                setError(errorMsg)
                toast.error(errorMsg)
                return
            }
            await signUp(
                formData.email,
                formData.full_name,
                formData.birthday,
                formData.gender,
                formData.phone,
                formData.password
            )
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
                <img src="https://cdn.cosmos.so/e12c792d-9e07-40a0-ad34-876dacf17cdf?format=jpeg" alt="" className={styles.image} />
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
                        <label htmlFor="email">Email</label>
                        <input type="text" onChange={handleChange} placeholder='Your email' id='email' required/>

                        <label htmlFor="full_name">Full Name</label>
                        <input type="text" onChange={handleChange} placeholder='Your full name' id='full_name' required />

                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" onChange={handleChange} id='birthday' />
                        
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender">
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>

                        <label htmlFor="phone">Phone</label>
                        <input type="text" onChange={handleChange} placeholder='Your phone number' id='phone' required />

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

function register(formData: { email: any; full_name: any; birthday: any; gender: any; phone: any; password: any }) {
    throw new Error('Function not implemented.')
}

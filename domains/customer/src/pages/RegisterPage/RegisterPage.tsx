import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks'
import { Divider, GoogleProviderButton, SpotifyProviderButton, Input, Button, Logo } from '../../shared/components'
import styles from './RegisterPage.module.css'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { session, register } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Session updated:', session)
    }, [session])

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await register(email, password)
            if (result.success) {
                navigate('/menu')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
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
                    <p className={styles.title}>Let's get started</p>

                    {/* Directly login with these options without register */}
                    <GoogleProviderButton text={'Continue with Google'} size={'medium'} />
                    <Divider />
                    
                    {/* Register form */}
                    <form onSubmit={handleSignUp}>
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            size="medium"
                            placeholder="Your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            id="first_name"
                            type="text"
                            label="First Name"
                            size="medium"
                            placeholder="What's your first name?"
                        />
                        <Input
                            id="middle_name"
                            type="text"
                            label="Middle Name"
                            size="medium"
                            placeholder="What's your middle name?"
                        />
                        <Input
                            id="last_name"
                            type="text"
                            label="Last Name"
                            size="medium"
                            placeholder="What's your last name?"
                        />
                        <Input
                            id="gender"
                            type="gender"
                            label="Gender"
                            size="medium"
                            placeholder=""
                        />
                        <Input
                            id="phone"
                            type="phone"
                            label="Phone Number"
                            size="medium"
                            placeholder=""
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            size="medium"
                            placeholder="Create a password"
                        />
                        
                        <br />
                        <Button text={'Create account'} type={'submit'} size={'medium'}/>
                    </form>

                    <Divider />
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button text="I already have an account and Login" type="button" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
import React from 'react'
import { Divider, GoogleProviderButton, SpotifyProviderButton, Button, Input, Logo } from '../../shared/components'
import styles from './LoginPage.module.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <main className={styles.root}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo />
                </div>

                <p className={styles.hint}>Before order, please login.</p>

                <div className={styles.card}>
                    <Input
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your email..."
                    />
                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password..."
                    />
                    <Button text="Login" type="submit"/>
                </div>

                <Divider/>
                <GoogleProviderButton text={'Get in with Google account'}/>
                <SpotifyProviderButton text={'Get in with Spotify account'}/>
                <Divider/>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Button text={'Create an account'} type="button"/>
                </Link>
            </div>
        </main>
    )
}

export default LoginPage
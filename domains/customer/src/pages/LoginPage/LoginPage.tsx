import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks'
import { Divider, GoogleProviderButton, SpotifyProviderButton, Button, Input, Logo } from '../../shared/components'
import styles from './LoginPage.module.css'

const LoginPage = () => {

    return (
        <main className={styles.root}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo />
                </div>

                <p className={styles.hint}>Before order, please login.</p>

                {/* Login form */}
                <div className={styles.card}>
                    <form>
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
                        <br />
                        <Button 
                            text="Login" 
                            type="submit" 
                        />
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
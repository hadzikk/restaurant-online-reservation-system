import React from 'react'
import { Divider, GoogleProviderButton, SpotifyProviderButton, Input, Button, Logo } from '../../shared/components'
import styles from './RegisterPage.module.css'

const RegisterPage = () => {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <video src="https://cdn.cosmos.so/29462f91-c6bc-4a06-964c-867f89b681c3.mp4" autoPlay loop muted/>
            </div>

            <div className={styles.content}>
                <div className={styles.card}>
                    <Logo />
                    <p className={styles.title}>Let's get started</p>

                    <GoogleProviderButton text={'Continue with Google'} size={'medium'} />
                    <SpotifyProviderButton text={'Continue with Spotify'} size={'medium'} />
                    <Divider />
                    <Input
                        id="email"
                        type="email"
                        label="Email"
                        size="medium"
                        placeholder="Your email"
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
                    <br />
                    <Button text={'Create account'} type={'submit'} size={'medium'}/>
                    <Divider />
                    <Button text="I already have an account and Login" type="button" />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
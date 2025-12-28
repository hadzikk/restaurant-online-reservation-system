import React, { type ReactNode } from 'react'
import { Billboard, Navbar, Checkout } from '../../components'
import styles from './Layout.module.css'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children } : LayoutProps) => {
    return (
        <main className={styles.root}>
            <Billboard/>
            {children}
            <Navbar/>
            <Checkout/>
        </main>
    )
}

export default Layout
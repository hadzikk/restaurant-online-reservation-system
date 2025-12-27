import React, { Children, type ReactNode } from 'react'
import { Navbar, Sidebar } from '../../components'
import styles from './Layout.module.css' 

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.root}>
            <Navbar/>
            <main className={styles.container}>
                {children}
            </main>
            <Sidebar/>
        </div>
    )
}

export default Layout
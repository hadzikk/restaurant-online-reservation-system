import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import styles from './TableManagementPage.module.css'

const TableManagementPage = () => {
    return (
        <section className={styles.root}>
            <Navbar/>
            <main className={styles.mainContainer}>

            </main>
            <Rightbar/>
        </section>
    )
}

export default TableManagementPage
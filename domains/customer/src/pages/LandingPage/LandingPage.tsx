import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Logo, Navbar } from '../../shared/components'
import styles from './LandingPage.module.css'

const LandingPage = () => {
    const [activeTable, setActiveTable] = useState(0)
    const [isFixed, setIsFixed] = useState(false)
    const tableRefs = useRef<(HTMLDivElement | null)[]>([])
    const callToActionRef = useRef<HTMLElement>(null)

    const images = [
        'https://cdn.cosmos.so/a6d966bc-7eaa-4068-b79d-7cfe65db74e3?format=jpeg',
        'https://cdn.cosmos.so/dcf67a47-566a-413d-864d-f08ffcfa7cbc?format=jpeg',
        'https://cdn.cosmos.so/87444f4c-efae-45cf-8b6f-69ace4499075?format=jpeg',
        'https://cdn.cosmos.so/665aacb5-fb6c-4063-8f48-900d88481205?format=jpeg'
    ]

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
                
            if (scrollPosition > 100) {
                setIsFixed(true)
            } else {
                setIsFixed(false)
            }

            const viewportHeight = window.innerHeight
            const scrollPercentage = (scrollPosition / (document.body.scrollHeight - viewportHeight)) * 100
                
            const tableCount = tableRefs.current.length
            const activeIndex = Math.min(
                Math.floor((scrollPercentage / 100) * tableCount),
                tableCount - 1
            )
            
            setActiveTable(activeIndex)

            // Auto-scroll to next section when last table is active and user is near bottom
            if (activeIndex === tableCount - 1) {
                const scrollThreshold = 0.9; // 90% scrolled
                if (scrollPosition >= (document.body.scrollHeight - viewportHeight) * scrollThreshold) {
                    const nextSection = document.querySelector(`.${styles.callToAction}`);
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <>
            <Navbar />
            <main className={styles.root}>
                <section className={styles.hero}>
                    <div className={styles.container}>
                        <h1 className={styles.headline}>
                            <Logo />
                            Choose Your Perfect Table Online
                        </h1>

                        <p>Let guests understand every table detail before stepping into restaurant.</p>
                    </div>

                    <div className={`${styles.parallax} ${isFixed ? styles.fixed : ''}`}                    >
                        <figure className={`${styles.figure} ${isFixed ? styles.show : ''}`}>
                            <img src={images[activeTable]} alt="" />
                        </figure>

                        <div className={`${styles.tables} ${isFixed ? styles.expand : ''}`}>
                            {[...Array(4)].map((_, index) => (
                                <div
                                    key={index}
                                    ref={el => tableRefs.current[index] = el}
                                    className={`${styles.table} ${activeTable === index ? styles.active : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                <section  ref={callToActionRef} className={styles.callToAction}>
                    <div className={styles.wrapper}>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Button
                                text="Get started"
                                size="medium"
                                type="button"
                            />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}

export default LandingPage
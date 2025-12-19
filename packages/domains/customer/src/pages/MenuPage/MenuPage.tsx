import React, { useEffect, useState } from 'react'
import { supabase } from '../../libs/supabase'
import Navbar from '../../components/Navbar/Navbar'
import Leftbar from '../../components/LeftBar/LeftBar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Card from '../../components/Card/Card'
import styles from './MenuPage.module.css'

interface MenuImage {
    id: string
    menu_id: number
    image_url: string
}

interface MenuItem {
    id: number
    name: string
    price: number
    description?: string
    menu_images: MenuImage[]
}

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                console.log('Fetching menu items...')
                const { data, error } = await supabase
                    .from('menu_items')
                    .select(`
                        *,
                        menu_images:menu_images(*)
                    `)
                    .order('created_at', { ascending: false })
                
                console.log('Menu items:', data)
                
                if (error) throw error
                
                if (data) {
                    setMenuItems(data as unknown as MenuItem[])
                }
            } catch (error) {
                console.error('Error in fetchMenuItems:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMenuItems()
    }, [])

    const CardSkeleton = () => (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonSubtitle}></div>
            </div>
        </div>
    )

    if (loading) {
        return (
            <main className={styles.root}>
                <Navbar />
                <div className={styles.menuContainer}>
                    {[...Array(6)].map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </main>
        )
    }

    return (
        <main className={styles.root}>
            <Navbar/>
            <div className={styles.menuContainer}>
                {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <Card
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            ratings={0}
                            image={item.menu_images?.[0]?.image_url} // Ambil gambar pertama dari array
                        />
                    ))
                ) : (
                    <p>There's no menu yet.</p>
                )}
            </div>
            <Leftbar /> 
            <Rightbar />
        </main>
    )
}

export default MenuPage
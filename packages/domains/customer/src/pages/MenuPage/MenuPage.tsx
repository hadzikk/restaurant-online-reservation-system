import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../libs/supabase'
import { UseOrder } from '../../contexts'
import { CardSkeleton } from '../../../../shared/components'
import { Card, Layout} from '../../components'
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
    const { orderId } = useContext(UseOrder)
    const [menus, setMenus] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                console.log('Fetching menu items...')
                const { data, error } = await supabase
                    .from('menus')
                    .select(`
                        *,
                        menu_images:menu_images(*)
                    `)
                    .order('created_at', { ascending: false })
                
                console.log('Menu items:', data)
                
                if (error) throw error
                
                if (data) {
                    setMenus(data as unknown as MenuItem[])
                }
            } catch (error) {
                console.error('Error in fetchMenus:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMenus()
    }, [])

    if (loading) {
        return (
            <Layout>
                <div className={styles.menuContainer}>
                    {[...Array(8)].map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className={styles.menuContainer}>
                {menus.length > 0 ? (
                    menus.map((item) => (
                        <Card
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            ratings={0}
                            image={item.menu_images?.[0]?.image_url}
                            order_id={orderId || 0}
                        />
                    ))
                ) : (
                    <p>There's no menu yet.</p>
                )}
            </div>
        </Layout>
    )
}

export default MenuPage
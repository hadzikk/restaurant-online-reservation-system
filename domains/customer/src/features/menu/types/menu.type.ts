import type { MenuImage } from '../types'

export type Menu = {
    id: number
    name: string
    menu_images: MenuImage[] 
    price: number
}
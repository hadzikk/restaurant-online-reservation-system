export type Menu = {
    id: number
    name: string
    menu_images: MenuImage[] 
    price: number
}

export type MenuImage = {
    image_url: string
}
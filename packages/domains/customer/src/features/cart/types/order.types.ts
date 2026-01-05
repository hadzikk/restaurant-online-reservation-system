export type OrderedMenu = {
    id: number
    menu_id: number
    menu_name: string
    quantity: number
    unit_price: number
}

export type OrderedTable = {
    id: number
    table_code: string
}

export type Cart = {
    id: number
    user_id: number
    total: number
    order_menus: OrderedMenu[]
}
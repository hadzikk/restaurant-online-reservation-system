export type OrderedMenu = {
    id: number
    menu_id: number
    menu_name: string
    quantity: number
    unit_price: number
}

export type OrderedTable = {
    id: number
    order_id: number
    table_id: number
    table_code: number
}

export type Cart = {
    id: number
    user_id: number
    total: number
    order_menu_lines: OrderedMenu[]
    order_table_lines: OrderedTable[]
}


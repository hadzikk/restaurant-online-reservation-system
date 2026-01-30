import type { Menu } from '../../menu/types'

export type OrderMenuLine = {
    menu_id: number
    id: number
    menus: Menu
    quantity: number
    snapshot_price: number
}
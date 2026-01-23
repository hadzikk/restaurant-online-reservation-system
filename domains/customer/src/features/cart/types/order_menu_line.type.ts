import type { Menu } from '../../menu/types'

export type OrderMenuLine = {
    id: number
    menus: Menu
    quantity: number
    snapshot_price: number
}
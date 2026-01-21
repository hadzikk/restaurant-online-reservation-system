import type { Menu } from '../../menu/types'

export type OrderMenuLine = {
    id: number
    menu_id: Menu
    quantity: number
    snapshot_price: number
}
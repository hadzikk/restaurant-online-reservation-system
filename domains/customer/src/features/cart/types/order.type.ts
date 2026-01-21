import type { OrderMenuLine, OrderTableLine } from '../types'

export type Order = {
    id: number
    user_id: number
    total: number
    order_menu_lines: OrderMenuLine[]
    order_table_lines: OrderTableLine[]
}

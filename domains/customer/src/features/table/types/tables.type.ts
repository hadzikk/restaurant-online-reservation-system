import type { TableDetails } from './table_details.type'

export interface Tables {
    id: number
    name: string
    width?: number
    height?: number
    top?: number
    left?: number
    table_details?: TableDetails[]
}

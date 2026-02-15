import type { Tables } from './tables.type'
import type { TableLocations } from './table_locations.type'
import type { TableSizes } from './table_sizes.type'
import type { TableFeatures } from './table_features.type'
import type { TableImages } from './table_images.type'

export type TableDetails = {
    id: number
    table_id: number
    location_id: number | null
    size_id: number | null
    capacity: number | null
    created_at: string
    updated_at: string | null
    tables?: Tables
    table_locations?: TableLocations
    table_sizes?: TableSizes
    table_features?: TableFeatures[]
    table_images?: TableImages[]
}
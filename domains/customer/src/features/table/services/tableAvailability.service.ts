import { supabase } from '../../../shared/api/supabase'

export interface TableAvailabilityCheck {
    table_id: number
    reservation_date: string
    reservation_time: string
    duration_hours: number
}

export class TableAvailabilityService {
    static async checkTableAvailability(check: TableAvailabilityCheck): Promise<boolean> {
        const { table_id, reservation_date, reservation_time, duration_hours } = check
        
        // Calculate end time
        const [hours, minutes] = reservation_time.split(':').map(Number)
        const endHour = (hours + duration_hours) % 24
        const endMinute = minutes
        const end_time = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`
        
        // Check for overlapping reservations on the same date
        const { data, error } = await supabase
            .from('order_table_lines')
            .select('*')
            .eq('table_id', table_id)
            .eq('reservation_date', reservation_date)
            .or(`reservation_time.gte.${reservation_time}:00,reservation_time.lt.${end_time}:00`)
            .or(`reservation_time.lte.${reservation_time}:00,reservation_time.gt.${end_time}:00`)

        if (error) {
            console.error('Error checking table availability:', error)
            return false
        }

        // If no overlapping reservations found, table is available
        return !data || data.length === 0
    }

    static async getTableReservations(tableId: number, date: string) {
        const { data, error } = await supabase
            .from('order_table_lines')
            .select('*')
            .eq('table_id', tableId)
            .eq('reservation_date', date)
            .order('reservation_time', { ascending: true })

        if (error) throw error
        return data
    }

    static async getAvailableTables(date: string, time: string, duration: number = 2) {
        // Get all tables
        const { data: allTables, error: tablesError } = await supabase
            .from('tables')
            .select('*')
            .eq('status', 'available')

        if (tablesError) throw tablesError

        // Check availability for each table
        const availableTables = []
        
        for (const table of allTables || []) {
            const isAvailable = await this.checkTableAvailability({
                table_id: table.id,
                reservation_date: date,
                reservation_time: time,
                duration_hours: duration
            })
            
            if (isAvailable) {
                availableTables.push(table)
            }
        }

        return availableTables
    }

    static async isTableReservedAtTime(tableId: number, date: string, time: string): Promise<boolean> {
        const { data, error } = await supabase
            .from('order_table_lines')
            .select('*')
            .eq('table_id', tableId)
            .eq('reservation_date', date)
            .eq('reservation_time', time)

        if (error) {
            console.error('Error checking table reservation:', error)
            return false
        }

        return data && data.length > 0
    }
}

export default TableAvailabilityService

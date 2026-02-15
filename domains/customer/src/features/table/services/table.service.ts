import { supabase } from  '../../../shared/api/supabase'

const TableService = {
    async getAllTables() {
        let { data, error } = await supabase
            .from('tables')
            .select(`
                *,
                table_details(*)
            `)
        if (error) throw new Error(error.message)
        return data || []
    },
    async getTableDetails(id: number) {
        let { data, error } = await supabase
            .from('table_details')
            .select(`
                *,
                tables!table_details_table_id_fkey(*),
                table_locations!table_details_location_id_fkey(*),
                table_sizes!table_details_size_id_fkey(*),
                table_features(*),
                table_images(*)
            `)
            .eq('id', id)
        if (error) throw new Error(error.message)
        return data || null
    }
}

export default TableService
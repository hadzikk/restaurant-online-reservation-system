import { supabase } from  '../../../shared/api/supabase'

const TableService = {
    async getAllTables() {
        let { data, error } = await supabase
            .from('tables')
            .select(`
                *
            `)
        if (error) throw new Error(error.message)
        return data || []
    },
    async getTableDetails(id: number) {
        let { data, error } = await supabase
        .from('tables')
        .select(`
            *,
            table_details(*)
        `)
        .eq('id', id)
        .single()
        if (error) throw new Error(error.message)
        return data || []           
    }
}

export default TableService
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
    }
}

export default TableService
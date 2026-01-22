import { supabase } from  '../../../shared/api/supabase'

const MenuService = {
    async getAllMenus() {
        let { data, error } = await supabase
            .from('menus')
            .select(`
                *,
                menu_images(*)
            `)
            .order('created_at', { ascending: false })
        if (error) throw new Error(error.message)
        return data || []
    }
}

export default MenuService
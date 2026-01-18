import { supabase } from  '../api/supabase'

export const MenuService = {
    async getAllMenus() {
        let { data: menus, error } = await supabase
            .from('menus')
            .select(`
                *,
                menu_images(*)
            `)
            .order('created_at', { ascending: false })
        if (error) throw new Error(error.message)
        return menus || []
    }
}
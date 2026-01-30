import { MenuItem } from '../../components'
import styles from './MenuList.module.css'
import { useMenu } from '../../hooks/useMenu'

const MenuList = () => {
    const { menus } = useMenu()

    return (
        <div className={styles.root}>
            {menus.map((menu) => (
                <MenuItem
                    key={menu.id}
                    menu={menu}
                />
            ))}
        </div>
    )
}

export default MenuList

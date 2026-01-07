import React, { type FC } from 'react'
import type { Menu } from '../../types'
import { MenuItem } from '../../components'
import styles from './MenuList.module.css'

interface MenuListProps {
    menus: Menu[]
}

const MenuList: FC<MenuListProps> = ({ menus }) => {
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

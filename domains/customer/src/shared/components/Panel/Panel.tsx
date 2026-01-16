import { useAuth, usePanel } from '../../hooks'
import toast from 'react-hot-toast'
import styles from './Panel.module.css'

const Panel = () => {
    const { user, logout } = useAuth()
    const { isPanelOpen } = usePanel()

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await logout()
            toast.success('Logout successfully')
        } catch (error) {
            console.error('Failed to logout:', error)
            toast.error('Failed to logout')
        }
    } 
    if (!isPanelOpen) return null
    return (
        <div className={styles.root}>
            <div className={styles.about}>
                <p className={styles.email}>{user?.email}</p>
            </div>
            <a href="" className={styles.action}>
                settings
            </a>
            <a href="" className={styles.action} onClick={handleLogout}>
                logout
            </a>
      </div>
    )
}

export default Panel
import { createContext, useState, type ReactNode } from 'react'
import type { PanelContextType } from '../types'

interface Props {
    children: ReactNode
}

export const PanelContext = createContext<PanelContextType | undefined>(undefined)
const PanelContextProvider = ({ children }: Props) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const togglePanel = () => setIsPanelOpen(prev => !prev)
    const closePanel = () => setIsPanelOpen(false)

    return (
        <PanelContext.Provider value={{ isPanelOpen, togglePanel, closePanel }}>
            {children}
        </PanelContext.Provider>
    )
}

export default PanelContextProvider
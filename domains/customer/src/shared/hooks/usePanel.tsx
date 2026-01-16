import { useContext } from "react"
import { PanelContext } from "../contexts"

export const usePanel = () => {
  const context = useContext(PanelContext)
  if (context === undefined) {
    throw new Error('usePanel must be used within a PanelProvider')
  }
  return context
}
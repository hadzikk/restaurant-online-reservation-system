// main.tsx
import { StrictMode } from 'react'
import { AuthContextProvider } from './shared/contexts'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { createRoot } from 'react-dom/client'
import '../../shared/styles/reset.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
)

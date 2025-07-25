import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { CartProvider } from './context/cartContext.tsx'
import { SearchProvider } from './context/searchContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <AuthProvider>
      <SearchProvider>

      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
      
      </SearchProvider>
    </AuthProvider>
     
  </StrictMode>,
)

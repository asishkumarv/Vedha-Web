import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { SiteContentProvider } from './context/SiteContentContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SiteContentProvider>
        <App />
      </SiteContentProvider>
    </AuthProvider>
  </StrictMode>,
)

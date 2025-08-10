import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { Routes, Route } from 'react-router'
import LandingPage from './pages/public_pages/LandingPage'
import Login from './pages/public_pages/LoginPage'
import PublicLayout from './layouts/PublicLayout'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Route>


      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

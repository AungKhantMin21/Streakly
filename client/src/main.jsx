import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { Routes, Route } from 'react-router'
import LandingPage from './pages/public_pages/LandingPage'
import Login from './pages/public_pages/LoginPage'
import PublicLayout from './layouts/PublicLayout'
import RegistrationPage from './pages/public_pages/RegisterPage'
import OnboardingPage from './pages/public_pages/OnboardingPage'
import SoloAdventureDashboard from './pages/protected_pages/SoloAdventureDashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>
        
        {/* Protected Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/solo-adventure-dashboard" element={<SoloAdventureDashboard />} />
        </Route>


      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar'
import HeroSection from './components/HeroSection'
import DamageSection from './components/damageSection'
import HealingProcess from './components/HealingProcess'
import HealingJourney from './components/HealingJourney'
import Philosophy from './components/ourphilosphy'
import Footer from './components/footer'
import Subscribe from './components/subscribe'

import ProcessDetail from './pages/ProcessDetail'
import ScrollToTop from './components/scrollRestoration';
import Subscription from './pages/Subscription';
import Dashboard from './pages/Dashboard';
import HealingDetail from './components/HealingDetail';
import BrandMessage from './components/BrandMessage';
import ContactLocations from './components/locations';
import React, { useState } from 'react';
import PreloaderScreen from './pages/PreloaderScreen';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSiteLoading } from './context/SiteContentContext';

function App() {
  const [showHome, setShowHome] = useState(false);
  const isLoading = useSiteLoading();

  return (
    <div className="App">
      {(!showHome || isLoading) ? (
        <PreloaderScreen onComplete={() => setShowHome(true)} />
      ) : (
        <div className="home-content">
          <BrowserRouter>
            {/* This component watches the URL. When it changes, it snaps the window to 0,0 instantly. */}
            <ScrollToTop />
            <Navbar />
            <Routes>
              {/* Main Home Page */}
              <Route path="/" element={
                <>
                  <HeroSection />
                  <DamageSection />
                  <HealingProcess />
                  <HealingJourney />
                  <Philosophy />
                  <ContactLocations />
                  <Subscribe />
                  <BrandMessage />
                </>
              } />

              <Route path="/process/:id" element={<ProcessDetail />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/process-detail/:id" element={<ProcessDetail />} />
              <Route path="/healing-detail/:id" element={<HealingDetail />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      )}
    </div>
  )
}

export default App

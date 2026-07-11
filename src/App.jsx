import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import PageTransition from './components/PageTransition';
import { useLenis } from './utils/useLenis';
import './styles/animations.css';

function App() {
  const [page, setPage] = useState('home');
  const [loaderDone, setLoaderDone] = useState(false);

  // Activate Lenis smooth scrolling globally
  useLenis();

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#/about-us')) {
        setPage('about');
      } else if (window.location.hash.startsWith('#/services')) {
        setPage('services');
      } else if (window.location.hash.startsWith('#/doctors')) {
        setPage('doctors');
      } else {
        setPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // initial execution

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F8FBFA] text-[#1E293B] antialiased">
      {/* Premium custom cursor */}
      <CustomCursor />

      {/* Loading screen — shown only on first visit */}
      {!loaderDone && (
        <PageLoader onComplete={() => setLoaderDone(true)} />
      )}

      {/* Page transitions + content */}
      <PageTransition pageKey={page}>
        {/* Global Navigation Bar */}
        <Navbar currentPage={page} />

        {page === 'about' ? (
          <AboutPage />
        ) : page === 'services' ? (
          <ServicesPage />
        ) : page === 'doctors' ? (
          <DoctorsPage />
        ) : (
          <Home />
        )}
      </PageTransition>
    </div>
  );
}

export default App;

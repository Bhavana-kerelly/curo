import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';

function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#/about-us')) {
        setPage('about');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (window.location.hash.startsWith('#/services')) {
        setPage('services');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (window.location.hash.startsWith('#/doctors')) {
        setPage('doctors');
        window.scrollTo({ top: 0, behavior: 'instant' });
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
    </div>
  );
}

export default App;

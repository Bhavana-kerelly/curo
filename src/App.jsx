import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SingleSpecialtyPage from './pages/SingleSpecialtyPage';
import DoctorsPage from './pages/DoctorsPage';
import BlogsPage from './pages/BlogsPage';
import SingleBlogPage from './pages/SingleBlogPage';
import ContactPage from './pages/ContactPage';
import BookingModal from './components/BookingModal';
import { BookingProvider } from './context/BookingContext';
import WhatsAppWidget from './components/WhatsAppWidget';


function App() {

  const [page, setPage] = useState('home');
  const [blogId, setBlogId] = useState(null);
  const [specialtyId, setSpecialtyId] = useState('gynaecology');

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/about-us')) {
        setPage('about');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (path.startsWith('/services')) {
        setPage('services');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (path.startsWith('/specialty/')) {
        const id = path.split('/specialty/')[1];
        setSpecialtyId(id);
        setPage('single-specialty');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (path.startsWith('/doctors')) {
        setPage('doctors');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (path.startsWith('/blogs')) {
        setPage('blogs');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (path.startsWith('/blog/')) {
        const id = path.split('/blog/')[1];
        setBlogId(id);
        setPage('single-blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (path.startsWith('/contact')) {
        setPage('contact');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setPage('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    
    const handleClick = (e) => {
      const a = e.target.closest('a');
      if (a && a.getAttribute('href') && a.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        window.history.pushState({}, '', a.getAttribute('href'));
        handleLocationChange();
      }
    };
    document.addEventListener('click', handleClick);

    handleLocationChange(); // initial execution

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <BookingProvider>
      <div className="w-full min-h-screen bg-transparent text-white antialiased relative">
        {/* Fixed Global Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <img src="/images/curo-hero.jpg" alt="Curo Clinics Background" className="w-full h-full object-cover blur-[6px] scale-105" />
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Global Navigation Bar */}
        <Navbar currentPage={page} />

        {page === 'about' ? (
          <AboutPage />
        ) : page === 'services' ? (
          <ServicesPage />
        ) : page === 'single-specialty' ? (
          <SingleSpecialtyPage key={specialtyId} deptId={specialtyId} />
        ) : page === 'doctors' ? (
          <DoctorsPage />
        ) : page === 'blogs' ? (
          <BlogsPage />
        ) : page === 'single-blog' ? (
          <SingleBlogPage blogId={blogId} />
        ) : page === 'contact' ? (
          <ContactPage />
        ) : (
          <Home />
        )}

        <BookingModal />
        <WhatsAppWidget />

      </div>
    </BookingProvider>
  );
}

export default App;

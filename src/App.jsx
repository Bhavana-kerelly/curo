import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import BlogsPage from './pages/BlogsPage';
import SingleBlogPage from './pages/SingleBlogPage';
import ContactPage from './pages/ContactPage';
import BookingModal from './components/BookingModal';
import { BookingProvider } from './context/BookingContext';

function App() {
  const [page, setPage] = useState('home');
  const [blogId, setBlogId] = useState(null);

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
      } else if (window.location.hash.startsWith('#/blogs')) {
        setPage('blogs');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (window.location.hash.startsWith('#/blog/')) {
        const id = window.location.hash.split('#/blog/')[1];
        setBlogId(id);
        setPage('single-blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (window.location.hash.startsWith('#/contact')) {
        setPage('contact');
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
    <BookingProvider>
      <div className="w-full min-h-screen bg-transparent text-white antialiased relative">
        {/* Fixed Global Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <img src="/curo-hero.jpg" alt="Curo Clinics Background" className="w-full h-full object-cover blur-[6px] scale-105" />
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Global Navigation Bar */}
        <Navbar currentPage={page} />

        {page === 'about' ? (
          <AboutPage />
        ) : page === 'services' ? (
          <ServicesPage />
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
      </div>
    </BookingProvider>
  );
}

export default App;

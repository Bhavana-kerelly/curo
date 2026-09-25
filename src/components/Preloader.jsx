import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we've already shown the preloader in this session
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
    
    if (!hasSeenPreloader) {
      setIsVisible(true);
      sessionStorage.setItem('hasSeenPreloader', 'true');
      
      const timer = setTimeout(() => {
        handleComplete();
      }, 6000); // Hide after 6 seconds

      return () => clearTimeout(timer);
    } else {
      // If already seen, complete immediately
      onComplete();
    }
  }, [onComplete]);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 transition-opacity duration-300">
      
      {/* Curo Logo - Top Left */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <img 
          src={logoImg} 
          alt="Curo Clinics Logo" 
          className="h-10 md:h-12 w-auto object-contain"
        />
      </div>

      <button 
        onClick={handleComplete}
        className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2 bg-white text-gray-800 px-5 py-2 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all z-10 font-semibold border border-gray-200"
      >
        SKIP <span aria-hidden="true">&rarr;</span>
      </button>
      
      <div className="relative w-full max-w-3xl lg:max-w-4xl max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl animate-fade-in flex items-center justify-center mt-8">
        {/* Place your image in public/images/update-poster.jpg or update-poster.png */}
        <img 
          src="/images/update-poster.jpg" 
          alt="Update Poster" 
          className="w-full h-full max-h-[75vh] object-contain bg-transparent"
          onError={(e) => {
            // If image is missing, we don't close it anymore so you can see the preloader working
            console.log("Image not found at public/images/update-poster.jpg");
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;

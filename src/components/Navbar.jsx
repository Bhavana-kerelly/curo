import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = ({ currentPage }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const logoCapsuleRef = useRef(null);
  const menuCapsuleRef = useRef(null);
  const ctaCapsuleRef = useRef(null);
  const indicatorRef = useRef(null);
  const linksRef = useRef([]);

  linksRef.current = [];

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  const navItems = [
    { label: 'Home', href: currentPage !== 'home' ? '/#home' : '#home', id: 'home' },
    { label: 'About Us', href: '#/about-us', id: 'about' },
    { label: 'Services', href: '#/services', id: 'specialties' },
    { label: 'Our Doctors', href: '#/doctors', id: 'doctors' },
    { label: 'Blogs', href: currentPage !== 'home' ? '/#gallery' : '#gallery', id: 'gallery' },
    { label: 'Contact Us', href: currentPage !== 'home' ? '/#schedule' : '#schedule', id: 'schedule' }
  ];

  // ----------------------------------------------------
  // SCROLL TRIGGER ACTIVE SECTION & STICKY NAVBAR
  // ----------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      // Sticky Toggle (Vary styling on scroll > 80px)
      if (scrollPos > 80) {
        if (!isSticky) {
          setIsSticky(true);
          gsap.to(navContainerRef.current, {
            top: '12px',
            width: '88%',
            duration: 0.6,
            ease: 'power3.out'
          });
        }
      } else {
        if (isSticky) {
          setIsSticky(false);
          gsap.to(navContainerRef.current, {
            top: '20px',
            width: '92%',
            duration: 0.6,
            ease: 'power3.out'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  // ----------------------------------------------------
  // ENTRANCE ANIMATIONS & INDICATOR MOTION
  // ----------------------------------------------------
  useEffect(() => {
    const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    entranceTl.fromTo(logoCapsuleRef.current,
      { opacity: 0, y: -25 },
      { opacity: 1, y: 0 }
    );

    entranceTl.fromTo(menuCapsuleRef.current,
      { opacity: 0, y: -25 },
      { opacity: 1, y: 0 },
      '-=0.6'
    );

    entranceTl.fromTo(ctaCapsuleRef.current,
      { opacity: 0, y: -25 },
      { opacity: 1, y: 0 },
      '-=0.6'
    );

    entranceTl.fromTo(indicatorRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6 },
      '-=0.2'
    );
  }, []);

  // ----------------------------------------------------
  // ACTIVE UNDERLINE INDICATOR POSITIONING
  // ----------------------------------------------------
  useEffect(() => {
    const activeLinkEl = linksRef.current.find(
      (el) => el && el.getAttribute('data-id') === activeSection
    );

    if (activeLinkEl && menuCapsuleRef.current) {
      const activeRect = activeLinkEl.getBoundingClientRect();
      const parentRect = menuCapsuleRef.current.getBoundingClientRect();
      
      const leftOffset = activeRect.left - parentRect.left + (activeRect.width - 20) / 2;

      gsap.to(indicatorRef.current, {
        left: `${leftOffset}px`,
        duration: 0.45,
        ease: 'power3.out'
      });
    }
  }, [activeSection]);

  const handleLinkClick = (e, id) => {
    if (id === 'about') {
      e.preventDefault();
      setMobileMenuOpen(false);
      window.location.hash = '#/about-us';
      return;
    }

    if (id === 'specialties') {
      e.preventDefault();
      setMobileMenuOpen(false);
      window.location.hash = '#/services';
      return;
    }

    if (currentPage !== 'home') {
      // Allow default navigation to /#id from inner pages
      setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      window.scrollTo({
        top: targetEl.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        ref={navContainerRef}
        className="fixed top-[20px] left-1/2 -translate-x-1/2 w-[92%] max-w-[1400px] z-50 flex justify-between items-center h-[68px] pointer-events-none"
      >
        {/* LEFT: Logo Capsule */}
        <div
          ref={logoCapsuleRef}
          onClick={(e) => handleLinkClick(e, 'home')}
          className="w-[190px] h-[64px] flex items-center justify-center hover:scale-[1.02] transition-transform duration-300 pointer-events-auto cursor-pointer"
        >
          <img 
            src={logoImg} 
            alt="Curo Clinics logo" 
            className="h-[52px] w-[172px] object-contain select-none rounded-[10px]"
          />
        </div>

        {/* CENTER: Navigation Links Capsule */}
        <div
          ref={menuCapsuleRef}
          className="hidden lg:flex relative h-[68px] items-center px-6 bg-white/72 backdrop-blur-[20px] border border-white/55 shadow-[0_12px_30px_rgba(0,0,0,0.05)] rounded-[24px] pointer-events-auto"
        >
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                ref={addToLinksRef}
                data-id={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`relative py-1 text-[14px] font-medium transition-colors duration-300 select-none cursor-pointer ${
                  activeSection === item.id ? 'text-[#00895A]' : 'text-[#1E293B] hover:text-[#00A86B]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Active Emerald Underline Indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-2 h-[2.5px] w-[20px] bg-gradient-to-r from-[#00A86B] to-[#00895A] rounded-full"
          />
        </div>

        {/* RIGHT: CTA Capsule */}
        <div
          ref={ctaCapsuleRef}
          className="h-[68px] flex items-center pointer-events-auto"
        >
          <div className="flex items-center gap-1.5">
            {/* Book Appointment CTA */}
            <button className="group relative h-[54px] px-6 bg-gradient-to-r from-[#00A86B] to-[#00895A] text-white font-semibold text-[13px] sm:text-[14px] rounded-full flex items-center gap-1.5 shadow-sm hover:shadow-md hover:shadow-emerald-500/10 hover:scale-[1.03] hover:-translate-y-[1px] transition-all duration-300 cursor-pointer">
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="flex lg:hidden w-10 h-10 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 rounded-full items-center justify-center transition-colors cursor-pointer"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN SLIDING OVERLAY MENU */}
      <div 
        className={`fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 w-[80%] max-w-[340px] h-full bg-white/90 backdrop-blur-[24px] border-l border-white/20 p-8 shadow-2xl flex flex-col justify-between transition-transform duration-500 transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between items-center mb-12">
              <img src={logoImg} alt="Curo logo" className="h-7 w-auto object-contain" />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 text-left">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`text-lg font-medium tracking-tight transition-colors ${
                    activeSection === item.id ? 'text-[#00895A]' : 'text-slate-800 hover:text-[#00A86B]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <button className="w-full h-[50px] bg-gradient-to-r from-[#00A86B] to-[#00895A] text-white font-semibold text-xs rounded-full flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10 cursor-pointer">
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

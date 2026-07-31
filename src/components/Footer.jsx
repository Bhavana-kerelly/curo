import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Home,
  HelpCircle,
  Grid,
  Users,
  MessageSquare,
  PhoneCall,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart
} from 'lucide-react';
import { FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';
import logoImg from '../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef(null);
  const brandRef = useRef(null);
  const navRef = useRef(null);
  const contactCardRef = useRef(null);
  const socialRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    // ----------------------------------------------------
    // GSAP ENTRANCE ANIMATIONS (ScrollTrigger)
    // ----------------------------------------------------
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });

    // 1. Background glow & CURO background text fades in
    entranceTl.fromTo('.bg-glow', { opacity: 0 }, { opacity: 1, duration: 1.2 });
    entranceTl.fromTo('.curo-bg-text',
      { opacity: 0, scale: 0.9 },
      { opacity: 0.03, scale: 1, duration: 1.5, ease: 'power2.out' },
      '-=1.0'
    );

    // 2. Logo, Tagline & Description fade upward
    const brandElements = brandRef.current.children;
    entranceTl.fromTo(brandElements,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      '-=0.8'
    );

    // 3. Navigation items stagger upward
    const navItems = navRef.current.querySelectorAll('.nav-item');
    entranceTl.fromTo(navItems,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
      '-=0.6'
    );

    // 4. Contact Card slides upward
    entranceTl.fromTo(contactCardRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    // 5. Social buttons stagger
    const socialButtons = socialRef.current.querySelectorAll('.social-btn');
    entranceTl.fromTo(socialButtons,
      { opacity: 0, scale: 0.8, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // 6. Bottom row elements fade in
    entranceTl.fromTo(bottomRef.current.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      '-=0.4'
    );

    // Continuous floating particles / bubbles
    gsap.to('.float-particle-1', { y: -25, x: 10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.float-particle-2', { y: 20, x: -15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home', icon: <Home className="w-5 h-5" /> },
    { label: 'About Us', href: '#about', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Services', href: '#specialties', icon: <Grid className="w-5 h-5" /> },
    { label: 'Our Doctors', href: '#doctors', icon: <Users className="w-5 h-5" /> },
    { label: 'Blogs', href: '#gallery', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Contact Us', href: '#schedule', icon: <PhoneCall className="w-5 h-5" /> }
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative w-full py-4 sm:py-6 px-6 md:px-12 lg:px-20 bg-[#F8FBFA] flex flex-col justify-between overflow-hidden"
    >
      {/* Huge subtle transparent back logo text */}
      <div className="curo-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00A86B] font-extrabold text-[320px] sm:text-[450px] lg:text-[600px] tracking-[0.15em] select-none pointer-events-none opacity-0 blur-[1px] leading-none">
        CURO
      </div>

      {/* Background decorations */}
      <div className="bg-glow absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none opacity-0" />
      <div className="float-particle-1 absolute top-20 left-10 w-3 h-3 bg-emerald-500/20 rounded-full blur-[1px] pointer-events-none" />
      <div className="float-particle-2 absolute bottom-20 right-10 w-4 h-4 bg-emerald-500/10 rounded-full blur-[2px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">

        {/* Top Brand Area */}
        <div ref={brandRef} className="flex flex-col items-center text-center max-w-2xl mb-6">
          <img
            src={logoImg}
            alt="Curo Clinics logo"
            className="h-12 w-auto mb-6 select-none opacity-0"
          />
          <span className="opacity-0 tracking-[0.45em] text-emerald-600 font-semibold text-xs uppercase block mb-4">
            COMPASSION • CARE • EXCELLENCE
          </span>
          <p className="opacity-0 text-slate-600 text-base leading-relaxed font-light">
            Your trusted destination for comprehensive multispeciality healthcare, bringing together experienced specialists, advanced diagnostics, and patient-first care under one roof.
          </p>
        </div>

        {/* Thin Divider */}
        <div className="w-full h-[1px] bg-emerald-500/10 mb-6" />

        {/* Navigation Strip */}
        <nav
          ref={navRef}
          className="w-full overflow-x-auto scrollbar-none flex justify-center pb-2 mb-4"
        >
          <div className="flex items-center gap-12 sm:gap-16 px-4">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="nav-item opacity-0 group flex flex-col items-center gap-2 cursor-pointer select-none"
              >
                <div className="p-3 bg-white border border-emerald-500/5 group-hover:border-emerald-500/20 rounded-2xl shadow-sm text-slate-400 group-hover:text-emerald-500 group-hover:-translate-y-1 transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 group-hover:text-emerald-600 transition-colors duration-300">
                  {item.label}
                </span>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </nav>

        {/* Contact Info Card */}
        <div
          ref={contactCardRef}
          className="w-full bg-white/70 backdrop-blur-xl border border-emerald-500/10 rounded-[28px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,168,107,0.04)] hover:shadow-[0_20px_50px_rgba(0,168,107,0.08)] hover:bg-white/80 transition-all duration-500 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 divide-y md:divide-y-0 lg:divide-x divide-emerald-500/10">

            {/* Location */}
            <div className="flex items-start gap-4 text-left lg:px-6 first:pl-0">
              <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/15 text-emerald-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase block mb-1">
                  LOCATION
                </span>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  2nd Floor, Kokapet One Mall, <br />
                  210, 211, Kokapet X Road, <br />
                  Narsingi, Gandipet, <br />
                  Hyderabad, Telangana 500075
                </p>
              </div>
            </div>

            {/* Call */}
            <div className="flex items-start gap-4 text-left pt-6 md:pt-0 lg:px-6">
              <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/15 text-emerald-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase block mb-1">
                  CALL US
                </span>
                <a
                  href="tel:+918919942870"
                  className="text-[#0F172A] font-semibold text-base hover:text-emerald-600 transition-colors block mb-1 whitespace-nowrap"
                >
                  +91 89199 42870
                </a>
                <a
                  href="tel:+918106770862"
                  className="text-[#0F172A] font-semibold text-base hover:text-emerald-600 transition-colors block mb-1 whitespace-nowrap"
                >
                  +91 81067 70862
                </a>
                <p className="text-slate-500 text-xs font-light">
                  We are here to assist you with care.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 text-left pt-6 md:pt-0 lg:px-6">
              <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/15 text-emerald-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase block mb-1">
                  EMAIL US
                </span>
                <a
                  href="mailto:curoclinicskokapet@gmail.com"
                  className="text-[#0F172A] font-semibold text-sm sm:text-base hover:text-emerald-600 transition-colors block mb-1 break-all"
                >
                  curoclinicskokapet@gmail.com
                </a>
                <p className="text-slate-500 text-xs font-light">
                  We'll respond as quickly as we can.
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-4 text-left pt-6 md:pt-0 lg:px-6 last:border-r-0">
              <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/15 text-emerald-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase block mb-1">
                  WORKING HOURS
                </span>
                <p className="text-slate-600 text-[13px] leading-relaxed font-light mb-1">
                  <strong>Monday - Friday:</strong> 10:00am - 9:00pm
                </p>
                <p className="text-slate-600 text-[13px] leading-relaxed font-light mb-1">
                  <strong>Saturday:</strong> 9:00am - 9:00pm
                </p>
                <p className="text-slate-600 text-[13px] leading-relaxed font-light">
                  <strong>Sunday:</strong> 9:00am - 4:00pm
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Social Section */}
        <div ref={socialRef} className="flex flex-col items-center w-full mb-8">
          <div className="flex items-center gap-6 w-full max-w-md justify-center mb-6">
            <div className="h-[1px] bg-emerald-500/10 flex-grow" />
            <span className="text-[10px] tracking-[0.2em] font-bold text-slate-400 uppercase whitespace-nowrap">
              FOLLOW US
            </span>
            <div className="h-[1px] bg-emerald-500/10 flex-grow" />
          </div>

          <div className="flex gap-4">
            {[
              { icon: <FaInstagram className="w-5 h-5" />, href: 'https://instagram.com' },
              { icon: <FaFacebookF className="w-5 h-5" />, href: 'https://facebook.com' },
              { icon: <FaYoutube className="w-5 h-5" />, href: 'https://youtube.com' },
              { icon: <FaMapMarkerAlt className="w-5 h-5" />, href: 'https://maps.google.com' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="social-btn opacity-0 w-11 h-11 bg-white border border-emerald-500/5 hover:border-emerald-500/30 hover:bg-emerald-500 hover:text-white rounded-full flex items-center justify-center text-slate-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="w-full h-[1px] bg-emerald-500/10 mb-8" />

        {/* Bottom Bar Columns */}
        <div
          ref={bottomRef}
          className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs font-light"
        >
          {/* Left */}
          <div>
            <span>© 2026 Curo Clinics. All rights reserved.</span>
          </div>



          {/* Right */}
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-emerald-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-emerald-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

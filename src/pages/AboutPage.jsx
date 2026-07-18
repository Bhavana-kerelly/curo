import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Award, Compass, Users, Heart, CheckCircle2, Activity, Stethoscope, Phone, Calendar, Eye, Flag } from 'lucide-react';
import Footer from '../components/Footer';
import VisionMission from '../components/VisionMission';
import card1Img from '../assets/card1.png';
import SplitType from 'split-type';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const { openBookingModal } = useBooking();
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Fade in animations
    gsap.fromTo('.about-hero-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo('.about-hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
    );

    gsap.fromTo('.about-hero-stats',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
    );

    // Scroll reveal sections
    gsap.fromTo('.reveal-item', 
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: '.reveal-container',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { value: '15+', label: 'Experienced Specialists' },
    { value: '25,000+', label: 'Happy Patients' },
    { value: '100%', label: 'Clinical Accuracy' },
    { value: '24/7', label: 'Emergency Support' }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      title: 'Patient-First Compassion',
      desc: 'We treat every patient like family, providing a warm, supportive, and understanding medical environment.'
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: 'Clinical Excellence',
      desc: 'Our board-certified specialists follow rigorous medical guidelines to deliver accurate and high-quality diagnostics.'
    },
    {
      icon: <Compass className="w-6 h-6 text-emerald-600" />,
      title: 'Integrity & Transparency',
      desc: 'No hidden costs, no unnecessary tests. Transparent consultation, treatment planning, and billing systems.'
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: 'Multidisciplinary Care',
      desc: 'Collaborative consultations across 7+ specialties under one roof for complete family healthcare.'
    }
  ];

  return (
    <main ref={pageRef} className="w-full bg-transparent text-white">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative w-full bg-gradient-to-b from-[#F4FAF8] to-[#E8F4F1] pt-[120px] pb-24 sm:pb-32 px-6 md:px-12 lg:px-20 overflow-hidden">
        
        {/* Bottom Waves */}
        <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1440 220" className="w-full h-auto" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 160 C 300 260, 600 60, 1000 160 C 1200 210, 1440 110, 1440 110 L 1440 220 L 0 220 Z" fill="rgba(255,255,255,0.5)" />
            <path d="M0 220 C 400 100, 800 280, 1440 140 L 1440 220 L 0 220 Z" fill="#FFFFFF" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 flex flex-col items-start text-left relative z-20 xl:ml-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 text-[15px] font-medium text-[#7D8E9A] mb-3">
              <span>Home</span>
              <span className="text-[#A5B4BF] text-xs font-bold">&gt;</span>
              <span className="text-[#009B8E]">About Us</span>
            </div>
            <div className="w-10 h-[2px] bg-[#009B8E] mb-8" />

            <h1 className="about-hero-title text-[44px] sm:text-[56px] lg:text-[60px] font-bold text-[#162E3B] tracking-tight leading-[1.1] mb-5">
              Committed to <br className="hidden sm:block" />
              Your <span className="text-[#009B8E]">Well-Being</span>
            </h1>

            {/* Heartbeat Decorative SVG */}
            <div className="mb-6 flex items-center w-full max-w-[260px] opacity-80">
              <div className="h-[2px] flex-1 bg-[#D0E6E1]" />
              <svg className="w-10 h-10 text-[#96C8C0] mx-1 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="h-[2px] flex-1 bg-[#D0E6E1]" />
            </div>

            <p className="about-hero-subtitle text-[#647683] text-[16px] sm:text-[18px] font-light leading-relaxed max-w-[400px]">
              We combine advanced medical expertise with compassionate care to help you live a healthier, happier life.
            </p>
          </div>

          {/* Right Column: Image and Blob */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end items-end h-[400px] sm:h-[480px] mt-8 lg:mt-0 z-10">
            
            {/* Background Blob */}
            <div className="absolute right-0 sm:right-10 bottom-0 w-[95%] sm:w-[75%] h-[95%] bg-[#E0EFEA] rounded-tl-[120px] rounded-br-[20px] rounded-tr-[40px] rounded-bl-[20px] z-0" />
            
            {/* Dot Pattern (Top Right) */}
            <div className="absolute top-10 right-12 sm:right-20 grid grid-cols-2 gap-x-2.5 gap-y-2.5 opacity-60 z-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8BB8AE]" />
              ))}
            </div>

            {/* Doctor Image */}
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&h=800&q=80" 
              alt="Professional Doctor" 
              className="absolute bottom-0 right-10 sm:right-24 h-[98%] w-auto object-contain z-10 drop-shadow-sm"
            />

            {/* Floating Glass Card */}
            <div className="absolute bottom-12 right-[-10px] sm:right-0 bg-white/70 backdrop-blur-xl border border-white/80 rounded-[28px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.04)] z-20 flex flex-col gap-3 min-w-[190px]">
              <div className="w-12 h-12 rounded-2xl bg-[#E5F3F0] flex items-center justify-center text-[#009B8E] mb-1">
                <Heart className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-[#162E3B] font-medium text-[17px] leading-[1.35] tracking-tight">
                <span>Care.</span>
                <span>Compassion.</span>
                <span>Commitment.</span>
              </div>
              <div className="w-6 h-[2px] bg-[#009B8E] mt-1" />
            </div>

          </div>
        </div>
      </section>

      {/* 1.5 Vision & Mission Premium Section */}
      <VisionMission />

      {/* 2. Brand Story / Journey */}
      <section className="relative w-full py-16 sm:py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Interactive Image Box */}
          <div className="relative group rounded-[36px] overflow-hidden border border-white/30 shadow-xl p-2" style={{background: 'rgba(248,251,250,0.25)', backdropFilter: 'blur(12px)'}}>
            <img 
              src="/curo-hero.jpg" 
              alt="Curo Clinics Hospital Exterior" 
              className="w-full h-[400px] sm:h-[500px] object-cover rounded-[28px] transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Embedded Capsule details */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-lg">
              <span className="text-[10px] tracking-wider text-emerald-700 font-bold uppercase block mb-1">OUR LOCATION</span>
              <p className="text-sm font-semibold text-[#102A43]">Kokapet One Mall, Narsingi, Hyderabad</p>
            </div>
          </div>

          {/* Right: Story Text */}
          <div className="flex flex-col text-left">
            <span className="text-[11px] tracking-[0.25em] font-semibold text-emerald-400 uppercase block mb-3">OUR STORY</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">
              Accessible Care, <br />Every Single Day
            </h2>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light mb-6">
              Founded with the vision to make high-quality, continuous medical consultations accessible, Curo Clinics is Kokapet’s leading multispeciality healthcare facility. We bridge the gap between primary care consultation and advanced diagnostics, delivering all services seamlessly under a single roof.
            </p>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light mb-8">
              Whether you need pediatrician guidelines for your children, specialized gynecology support, advanced ENT surgeries, general health checks, or professional dental care, our board-certified specialist team provides custom treatment plans with utmost care.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Extended Consultation Hours', 'Advanced Digital Records', 'In-House Laboratory Tests', 'Compassionate Medical Team'].map((feat, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="reveal-container relative w-full py-16 sm:py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-transparent to-emerald-500/5 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full text-center flex flex-col items-center">
          <span className="text-[11px] tracking-[0.25em] font-semibold text-emerald-400 uppercase block mb-3">OUR CORE VALUES</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-12">
            The Pillars of Our Excellence
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div 
                key={idx}
                className="reveal-item group border border-white/30 hover:border-emerald-500/30 p-8 rounded-[28px] text-left transition-all duration-300 transform hover:-translate-y-1.5 shadow-sm hover:shadow-md" style={{background: 'rgba(248,251,250,0.25)', backdropFilter: 'blur(12px)'}}
              >
                <div className="mb-6 p-4 w-fit bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-colors duration-300">
                  {val.icon}
                </div>
                <h3 className="text-white text-lg font-semibold mb-3">
                  {val.title}
                </h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxury CTA */}
      <section className="relative w-full py-16 sm:py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative w-full border border-white/30 rounded-[48px] p-8 md:p-16 shadow-lg overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10" style={{background: 'rgba(248,251,250,0.25)', backdropFilter: 'blur(12px)'}}>
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="text-left relative z-10 max-w-2xl">
              <span className="text-[11px] tracking-[0.25em] font-semibold text-emerald-400 uppercase block mb-3">EXPERIENCE CURO CLINICS</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
                Redefining Healthcare <br />For Your Whole Family
              </h2>
              <p className="text-gray-200 text-base font-light leading-relaxed">
                Connect with our patient-first coordinators today or schedule an appointment online to experience luxury clinical care.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <button 
                onClick={openBookingModal}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00A86B] to-[#00895A] text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg hover:shadow-emerald-500/15 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a 
                href="tel:+918919942870"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-emerald-500/20 text-emerald-600 font-semibold text-sm rounded-full shadow-sm hover:bg-emerald-500/5 transition-all duration-300"
              >
                <span>Call +91 89199 42870</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer />
    </main>
  );
};

export default AboutPage;

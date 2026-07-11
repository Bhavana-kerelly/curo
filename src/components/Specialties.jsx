import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Baby,
  Smile,
  Stethoscope,
  Dna,
  Sparkles,
  Heart,
  Eye,
  Activity,
  ActivitySquare,
  Shield,
  BriefcaseMedical
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Specialties = () => {
  const sectionRef = useRef(null);
  const leftCardRef = useRef(null);
  const midTopCardRef = useRef(null);
  const midBottomCardRef = useRef(null);
  const rightTopCardRef = useRef(null);
  const rightBottomCardRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // ----------------------------------------------------
    // GSAP SCROLL TRIGGER ENTRANCE ANIMATIONS
    // ----------------------------------------------------
    const cards = [
      leftCardRef.current,
      midTopCardRef.current,
      midBottomCardRef.current,
      rightTopCardRef.current,
      rightBottomCardRef.current
    ];

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );

    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Mouse parallax effect for card content / images
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 15;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;

      gsap.to('.parallax-bg', {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const departments = [
    { name: 'Gynecology', icon: <Heart className="w-6 h-6 text-emerald-500" /> },
    { name: 'ENT', icon: <Stethoscope className="w-6 h-6 text-emerald-500" /> },
    { name: 'Dental', icon: <Smile className="w-6 h-6 text-emerald-500" /> },
    { name: 'Pediatrics', icon: <Baby className="w-6 h-6 text-emerald-500" /> },
    { name: 'Urology', icon: <Activity className="w-6 h-6 text-emerald-500" /> },
    { name: 'General Medicine', icon: <BriefcaseMedical className="w-6 h-6 text-emerald-500" /> },
    { name: 'Diabetic Care', icon: <ActivitySquare className="w-6 h-6 text-emerald-500" /> },
    { name: 'Laparoscopic Surgery', icon: <Shield className="w-6 h-6 text-emerald-500" /> }
  ];

  return (
    <section
      ref={sectionRef}
      id="specialties"
      className="relative w-full bg-[#FAFCFB] py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-14 overflow-hidden font-sans"
    >
      {/* Subtle radial light mint gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#EAF9F2_0%,transparent_60%)] pointer-events-none" />

      {/* Faint oversized DNA strand representation on top right */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-600">
          <path d="M10,0 Q30,50 10,100 M90,0 Q70,50 90,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="20" y1="15" x2="80" y2="15" stroke="currentColor" strokeWidth="1" />
          <line x1="15" y1="35" x2="85" y2="35" stroke="currentColor" strokeWidth="1" />
          <line x1="10" y1="55" x2="90" y2="55" stroke="currentColor" strokeWidth="1" />
          <line x1="18" y1="75" x2="82" y2="75" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-emerald-500/30 rounded-full blur-[1px]" />
        <div className="absolute top-1/3 right-1/4 w-3.5 h-3.5 bg-emerald-500/20 rounded-full blur-[2px]" />
        <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-emerald-500/30 rounded-full blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col">

        {/* Header section (stagger/layout matched) */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16"
        >
          <div className="max-w-3xl text-left">
            <span className="text-emerald-500 font-semibold text-xs tracking-[0.25em] uppercase block mb-3">
              OUR SPECIALTIES
            </span>
            <h2 className="text-[#111827] text-[36px] sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.1] font-light tracking-tight mb-6">
              Expert Care, <br />
              Across Every Stage of <span className="text-emerald-500 font-medium">Life</span>
            </h2>
            <p className="text-[#5F6B76] text-base md:text-lg leading-[1.6] max-w-2xl font-light">
              From preventive healthcare to advanced surgical procedures, our experienced specialists provide personalized treatment using modern medical technology under one roof.
            </p>
          </div>

          <div className="flex items-center">
            <button className="group relative inline-flex items-center gap-3 px-6 py-3.5 bg-white border border-emerald-500/10 hover:border-emerald-500/40 text-emerald-600 font-medium text-sm rounded-full shadow-lg shadow-emerald-500/5 transition-all duration-300 hover:shadow-emerald-500/10 hover:-translate-y-0.5 cursor-pointer">
              <span>View All Specialties</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* COLUMN 1: Large Left Feature Card */}
          <div
            ref={leftCardRef}
            className="group relative h-[500px] lg:h-[620px] rounded-3xl overflow-hidden bg-white border border-emerald-500/5 shadow-xl shadow-emerald-500/5 transition-all duration-500 hover:shadow-emerald-500/10 hover:-translate-y-1 flex flex-col justify-end p-8"
          >
            {/* Background Consultation Image */}
            <div
              className="absolute inset-0 bg-cover bg-center parallax-bg transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80')`
              }}
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-emerald-950/10 mix-blend-multiply" />

            {/* Glass badge Top Left */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/25 flex items-center gap-2">
              <Stethoscope className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] tracking-[0.15em] text-white font-semibold uppercase">
                MULTISPECIALTY CARE
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 text-left text-white">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Complete Family Healthcare
              </h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-6 font-light">
                Trusted specialists providing comprehensive care for every age and every stage of life.
              </p>

              {/* Circular Arrow Button */}
              <div className="w-10 h-10 bg-white hover:bg-emerald-500 hover:text-white rounded-full flex items-center justify-center text-emerald-600 transition-colors duration-300 cursor-pointer shadow-lg">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* COLUMN 2: Stacked Middle Cards */}
          <div className="flex flex-col gap-6">

            {/* Middle Top Card: Pediatrics */}
            <div
              ref={midTopCardRef}
              className="group relative h-[238px] lg:h-[298px] rounded-3xl overflow-hidden bg-white border border-emerald-500/5 shadow-xl shadow-emerald-500/5 transition-all duration-500 hover:shadow-emerald-500/10 hover:-translate-y-1 p-6 flex flex-col justify-between"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Top Section Icon */}
              <div className="relative z-10 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                <Baby className="w-5 h-5 text-white" />
              </div>

              {/* Bottom text */}
              <div className="relative z-10 text-left text-white">
                <h3 className="text-xl font-bold mb-1">Pediatrics</h3>
                <p className="text-white/85 text-xs font-light max-w-xs">
                  Compassionate healthcare for infants, children and adolescents.
                </p>
              </div>
            </div>

            {/* Middle Bottom Card: Dental Care */}
            <div
              ref={midBottomCardRef}
              className="group relative h-[238px] lg:h-[298px] rounded-3xl overflow-hidden bg-white border border-emerald-500/5 shadow-xl shadow-emerald-500/5 transition-all duration-500 hover:shadow-emerald-500/10 hover:-translate-y-1 p-6 flex flex-col justify-between"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Glass Badge top left */}
              <div className="relative z-10 w-fit px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-white" />
                <span className="text-[9px] tracking-wider text-white font-semibold uppercase">DENTAL CARE</span>
              </div>

              {/* Numbers + title */}
              <div className="relative z-10 text-left text-white flex flex-col items-start">
                <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 select-none">
                  15+
                </div>
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-widest mt-1">
                  Years of Clinical Excellence
                </div>
                <p className="text-white/85 text-xs font-light mt-2 max-w-[240px]">
                  Modern dental care with advanced technology.
                </p>
              </div>
            </div>

          </div>

          {/* COLUMN 3: Stacked Right Cards */}
          <div className="flex flex-col gap-6">

            {/* Right Top Card: Department Marquee */}
            <div
              ref={rightTopCardRef}
              className="group relative h-[238px] lg:h-[298px] rounded-3xl overflow-hidden bg-white border border-emerald-500/10 shadow-xl shadow-emerald-500/5 transition-all duration-500 p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] tracking-[0.2em] text-emerald-500 font-bold uppercase block mb-1">
                  OUR SPECIALTIES
                </span>
                <h3 className="text-lg font-bold text-gray-800 text-left">Interactive Departments</h3>
              </div>

              {/* Custom CSS horizontal scroll marquee */}
              <div className="w-full relative overflow-hidden flex flex-col gap-3 py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                {/* Row 1 (scrolls left) */}
                <div className="flex gap-2 w-max animate-marquee-left">
                  {[...departments, ...departments].map((dept, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-[#EAF9F2]/60 hover:bg-[#EAF9F2] border border-emerald-500/10 rounded-full transition-all duration-300 scale-95 hover:scale-100 cursor-pointer shadow-sm"
                    >
                      {dept.icon}
                      <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">{dept.name}</span>
                    </div>
                  ))}
                </div>

                {/* Row 2 (scrolls right) */}
                <div className="flex gap-2 w-max animate-marquee-right">
                  {[...departments, ...departments].reverse().map((dept, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-[#EAF9F2]/60 hover:bg-[#EAF9F2] border border-emerald-500/10 rounded-full transition-all duration-300 scale-95 hover:scale-100 cursor-pointer shadow-sm"
                    >
                      {dept.icon}
                      <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">{dept.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-gray-400 text-left flex items-center gap-1.5 select-none">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Hover a tile to explore or inspect</span>
              </div>
            </div>

            {/* Right Bottom Card: Group of Indian Doctors */}
            <div
              ref={rightBottomCardRef}
              className="group relative h-[238px] lg:h-[298px] rounded-3xl overflow-hidden bg-white border border-emerald-500/10 shadow-xl shadow-emerald-500/5 transition-all duration-500 hover:shadow-emerald-500/10 hover:-translate-y-1 p-6 flex flex-col justify-between"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Top Text overlay */}
              <div className="relative z-10 text-left text-white">
                <h3 className="text-xl font-bold mb-1">Expert Specialists</h3>
                <p className="text-white/80 text-xs font-light max-w-xs">
                  Highly qualified doctors dedicated to compassionate patient care.
                </p>
              </div>

              {/* Floating Department Pills bottom */}
              <div className="relative z-10 flex flex-wrap gap-1.5 max-h-[88px] overflow-hidden justify-start">
                {departments.slice(0, 5).map((dept, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[9px] font-medium tracking-wide shadow-sm hover:bg-emerald-500 hover:border-emerald-400/40 transition-colors duration-300 cursor-pointer"
                  >
                    {dept.name}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Specialties;

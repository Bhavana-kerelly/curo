import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Target, Heart, Users, Microscope, Shield } from 'lucide-react';
import logoImg from '../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const VisionMission = () => {
  const containerRef = useRef(null);
  const headingGlowRef = useRef(null);
  const elementsRef = useRef([]);

  elementsRef.current = [];

  const addToElementsRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Soft Emerald Glow Breathe animation (8s loop, yoyo, scale 1 -> 1.08, opacity 0.12 -> 0.18)
      gsap.fromTo(headingGlowRef.current,
        { scale: 1, opacity: 0.12 },
        {
          scale: 1.08,
          opacity: 0.18,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        }
      );

      // 2. Apple Keynote Style Reveal: Opacity + Blur(12px) + Scale(0.98) -> 1
      elementsRef.current.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, filter: 'blur(12px)', scale: 0.98 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // 3. Quote Banner soft opacity pulse (0.95 -> 1 -> 0.95 every 5 seconds)
      gsap.fromTo('.quote-card-pulse',
        { opacity: 0.93 },
        {
          opacity: 1,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#F8FBFA] py-20 lg:py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* ----------------------------------------------------
          STATIC DECORATIVE BACKGROUNDS (NO ANIMATION)
         ---------------------------------------------------- */}
      {/* Mesh background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E2F5F0]/50 via-[#F8FBFA] to-[#F8FBFA] pointer-events-none" />

      {/* Breathing emerald glow behind the heading */}
      <div 
        ref={headingGlowRef}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none filter blur-xl" 
      />

      {/* Static corner wave vectors */}
      <svg className="absolute top-0 left-0 w-72 h-72 text-emerald-500/5 pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M-50,50 Q20,20 150,50" />
        <path d="M-50,60 Q20,30 150,60" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-72 h-72 text-emerald-500/5 pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M-50,50 Q80,80 150,50" />
        <path d="M-50,40 Q80,70 150,40" />
      </svg>

      {/* Static molecule graphic */}
      <div className="absolute top-1/4 right-10 w-40 h-40 opacity-[0.04] text-emerald-600 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="8" />
          <line x1="50" y1="42" x2="50" y2="15" />
          <circle cx="50" cy="15" r="4" fill="currentColor" />
          <line x1="50" y1="58" x2="50" y2="85" />
          <circle cx="50" cy="85" r="4" fill="currentColor" />
          <line x1="42" y1="50" x2="15" y2="50" />
          <circle cx="15" cy="50" r="4" fill="currentColor" />
          <line x1="58" y1="50" x2="85" y2="50" />
          <circle cx="85" cy="50" r="4" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* ----------------------------------------------------
            SECTION HEADING
           ---------------------------------------------------- */}
        <div 
          ref={addToElementsRef}
          className="text-center w-full"
        >
          <span className="text-[11px] font-semibold text-emerald-600 tracking-[0.35em] uppercase block mb-4">
            ABOUT CURO CLINICS
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-[300] text-[#0F172A] leading-[1.1] mb-5">
            Our{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-[#00895A]">
              Purpose
            </span>
            , Our{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-[#00895A]">
              Promise
            </span>
          </h2>

          <p className="text-[#64748B] text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto mt-5">
            A clear vision and a strong mission guide everything we do—from compassionate patient care to continuous medical excellence.
          </p>
        </div>

        {/* ----------------------------------------------------
            MAIN LAYOUT: 40/60 UNEQUAL WIDTHS
           ---------------------------------------------------- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-8 items-stretch mt-12">
          
          {/* VISION CARD (40% width -> lg:col-span-4) */}
          <div 
            ref={addToElementsRef}
            className="lg:col-span-4"
          >
            <motion.div 
              whileHover={{ 
                y: -4, 
                borderColor: 'rgba(16,185,129,0.3)', 
                backgroundColor: 'rgba(255,255,255,0.85)',
                boxShadow: '0 20px 40px -10px rgba(0,168,107,0.04)'
              }}
              className="h-full bg-white/72 backdrop-blur-[24px] border border-white/45 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group"
            >
              <div>
                {/* Header Icon + Label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(0,168,107,0.25)]">
                    <Eye className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 tracking-[0.25em] uppercase">
                    VISION
                  </span>
                </div>

                {/* Heading */}
                <h3 className="font-serif text-2xl sm:text-3xl font-[350] text-[#0F172A] leading-tight mb-4">
                  Healthcare That <br />
                  Inspires{' '}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-[#00895A]">
                    Trust
                  </span>
                </h3>

                {/* Body Text */}
                <p className="text-[#64748B] text-[13px] sm:text-sm font-light leading-relaxed">
                  To become the most trusted destination for comprehensive multispeciality healthcare by combining exceptional medical expertise, advanced technology, and compassionate patient-centered care.
                </p>
              </div>

              {/* Minimal Static Progress Line */}
              <div className="w-full h-[2px] bg-slate-100/80 rounded-full overflow-hidden mt-8" />
            </motion.div>
          </div>

          {/* MISSION CARD (60% width -> lg:col-span-6) */}
          <div 
            ref={addToElementsRef}
            className="lg:col-span-6"
          >
            <motion.div 
              whileHover={{ 
                y: -4, 
                borderColor: 'rgba(16,185,129,0.3)', 
                backgroundColor: 'rgba(255,255,255,0.85)',
                boxShadow: '0 20px 40px -10px rgba(0,168,107,0.04)'
              }}
              className="h-full bg-white/72 backdrop-blur-[24px] border border-white/45 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group"
            >
              <div>
                {/* Header Icon + Label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(0,168,107,0.25)]">
                    <Target className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 tracking-[0.25em] uppercase">
                    MISSION
                  </span>
                </div>

                {/* Heading */}
                <h3 className="font-serif text-2xl sm:text-3xl font-[350] text-[#0F172A] leading-tight mb-4">
                  Delivering Care <br />
                  with{' '}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-[#00895A]">
                    Compassion
                  </span>
                </h3>

                {/* Body Text */}
                <p className="text-[#64748B] text-[13px] sm:text-sm font-light leading-relaxed mb-6">
                  We are committed to providing accessible, ethical, and evidence-based healthcare through experienced specialists, modern diagnostic services, and a culture that always puts patients first.
                </p>
              </div>

              {/* 2x2 Feature Grid inside Mission */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {[
                  {
                    icon: <Heart className="w-4 h-4 text-emerald-600" />,
                    title: 'Compassionate Care',
                    desc: 'Patient-first treatment at every step.'
                  },
                  {
                    icon: <Users className="w-4 h-4 text-emerald-600" />,
                    title: 'Experienced Specialists',
                    desc: 'Expert doctors across multiple specialities.'
                  },
                  {
                    icon: <Microscope className="w-4 h-4 text-emerald-600" />,
                    title: 'Modern Diagnostics',
                    desc: 'Advanced technology for accurate care.'
                  },
                  {
                    icon: <Shield className="w-4 h-4 text-emerald-600" />,
                    title: 'Trusted Healthcare',
                    desc: 'Quality, integrity and continuous improvement.'
                  }
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/40 border border-white/50 rounded-xl p-3 flex flex-col gap-1.5 transition-colors duration-300 hover:bg-white/95 group/item cursor-default"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center transition-all duration-300 group-hover/item:shadow-[0_0_8px_rgba(0,168,107,0.25)]">
                        {feature.icon}
                      </div>
                      <h4 className="text-[11px] font-bold text-[#0F172A] tracking-tight">{feature.title}</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 font-light leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VisionMission;

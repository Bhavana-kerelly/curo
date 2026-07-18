import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import hospitalBg from '../assets/hospital.png';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const AppointmentCTA = () => {
  const { openBookingModal } = useBooking();
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const doctorRef = useRef(null);

  useEffect(() => {
    // ----------------------------------------------------
    // BACKGROUND KEN BURNS EFFECT (GSAP ScrollTrigger)
    // ----------------------------------------------------
    gsap.fromTo(bgImgRef.current,
      { scale: 1.08 },
      {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // ----------------------------------------------------
    // SPLIT TEXT: Dramatic heading reveal
    // ----------------------------------------------------
    const headingEl = leftContentRef.current.querySelector('h2');
    const paraEl = leftContentRef.current.querySelector('.paragraph');

    // Split the heading lines into individual chars
    const splitHeading = new SplitType(headingEl, { types: 'chars,lines' });
    gsap.set(splitHeading.chars, {
      opacity: 0,
      y: 80,
      rotateX: -90,
      transformOrigin: '0 50%'
    });

    // Split paragraph into words
    const splitPara = new SplitType(paraEl, { types: 'words' });
    gsap.set(splitPara.words, { opacity: 0, y: 20 });

    // ----------------------------------------------------
    // GSAP ENTRANCE ANIMATIONS
    // ----------------------------------------------------
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      }
    });

    // Label fades upward
    entranceTl.fromTo(leftContentRef.current.querySelector('.label'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );

    // Heading chars reveal dramatically line-by-line
    entranceTl.to(splitHeading.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: { amount: 0.8, from: 'start' },
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.3');

    // Paragraph words cascade
    entranceTl.to(splitPara.words, {
      opacity: 1,
      y: 0,
      stagger: 0.025,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4');

    // Button scales in
    entranceTl.fromTo(leftContentRef.current.querySelector('.cta-btn'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    // Phone / Location info fade upward
    entranceTl.fromTo(leftContentRef.current.querySelector('.contact-info'),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    // Doctor portrait slides & fades in
    entranceTl.fromTo(rightContentRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=1.2'
    );

    // ----------------------------------------------------
    // MICRO ANIMATIONS (Breathing & floating elements)
    // ----------------------------------------------------
    // Doctor breathing motion
    gsap.to(doctorRef.current, {
      y: -6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Glass bubbles float
    gsap.to('.bubble-float-1', {
      y: -15,
      x: 10,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.bubble-float-2', {
      y: 12,
      x: -8,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });

    return () => {
      splitHeading.revert();
      splitPara.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[85vh] py-32 px-6 md:px-12 lg:px-24 bg-[#F8FBFA] flex items-center overflow-hidden"
    >

      {/* Radial soft emerald glow behind contents */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-10 items-center gap-16 lg:gap-8">

        {/* Left Side Content - 60% Width */}
        <div ref={leftContentRef} className="lg:col-span-6 flex flex-col text-left">
          <span className="label text-emerald-600 font-semibold text-xs tracking-[0.28em] uppercase block mb-5 opacity-0">
            CURO CLINICS
          </span>

          <h2 className="text-[#0F172A] text-5xl sm:text-6xl lg:text-[72px] font-light tracking-tight leading-[1.0] mb-8" style={{ perspective: '600px' }}>
            Your Health
            <br />Deserves
            <br /><span className="text-emerald-600 font-normal">Exceptional Care</span>
          </h2>

          <div className="paragraph text-slate-600 text-base md:text-lg leading-relaxed max-w-xl mb-10 space-y-4 font-light">
            <p>
              Experience comprehensive, compassionate healthcare with trusted specialists, advanced diagnostic facilities, and personalized treatment—all under one roof at Curo Clinics.
            </p>
            <p>
              Whether it's General Medicine, ENT, Gynecology, Pediatrics, Dental Care, Urology or Laparoscopic Surgery, our team is here to care for you and your family.
            </p>
          </div>

          {/* Primary Button */}
          <div className="cta-btn opacity-0 w-fit">
            <button 
              onClick={openBookingModal}
              className="group relative inline-flex items-center gap-3 px-10 h-[64px] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-base rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
            </button>
          </div>

          {/* Secondary Contact Info */}
          <div className="contact-info opacity-0 mt-12 border-t border-emerald-500/10 pt-8 flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-12">

            {/* Phone */}
            <div className="flex flex-col text-left group cursor-pointer">
              <span className="text-slate-500 font-semibold text-[10px] tracking-[0.18em] uppercase mb-1">
                CALL US TODAY
              </span>
              <a
                href="tel:+918919942870"
                className="flex items-center gap-2.5 text-2xl font-medium text-[#0F172A] group-hover:text-emerald-600 transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-emerald-500" />
                <span>+91 8919 942 870</span>
              </a>
            </div>

            {/* Location */}
            <div className="flex flex-col text-left max-w-xs">
              <span className="text-slate-500 font-semibold text-[10px] tracking-[0.18em] uppercase mb-1">
                OUR LOCATION
              </span>
              <div className="flex items-start gap-2 text-sm text-slate-500 font-light leading-relaxed">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>
                  210 & 211, 2nd Floor, Kokapet One Mall, Narsingi, Hyderabad
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side Doctor Visual - 40% Width */}
        <div
          ref={rightContentRef}
          className="lg:col-span-4 flex items-center justify-center relative min-h-[380px] lg:min-h-[500px]"
        >
          {/* Large emerald radial glow behind doctor */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b981_0%,transparent_65%)] opacity-10 pointer-events-none" />

          {/* Doctor Portrait Image with gradient mask fade */}
          <div
            ref={doctorRef}
            className="relative w-72 h-96 sm:w-80 sm:h-[420px] lg:w-[350px] lg:h-[480px] z-10 select-none pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=600&q=80"
              alt="Expert Doctor at Curo Clinics"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          {/* Floating Glass Bubbles & Shapes */}
          <div className="bubble-float-1 absolute top-12 left-6 w-20 h-20 rounded-full bg-white/20 border border-white/30 backdrop-blur-md z-20 pointer-events-none opacity-60" />
          <div className="bubble-float-2 absolute bottom-24 right-4 w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-md z-20 pointer-events-none opacity-40" />
          <div className="absolute top-1/2 right-12 w-2.5 h-2.5 rounded-full bg-emerald-400/30 blur-[1px] animate-pulse z-0" />
          <div className="absolute bottom-12 left-12 w-3.5 h-3.5 rounded-full bg-emerald-500/20 blur-[2px] animate-pulse z-0" />
        </div>

      </div>
    </section>
  );
};

export default AppointmentCTA;

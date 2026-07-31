import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const AppointmentCTA = () => {
  const { openBookingModal } = useBooking();
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);

  useEffect(() => {
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

    return () => {
      splitHeading.revert();
      splitPara.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[40vh] sm:min-h-[45vh] flex items-center justify-center py-12 sm:py-16 px-6 md:px-12 lg:px-20 overflow-hidden bg-[#042E2A]"
    >
      {/* Radial soft emerald glow behind contents */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Left-aligned content container */}
      <div 
        ref={leftContentRef} 
        className="max-w-7xl mx-auto w-full relative z-20 flex flex-col items-start text-left"
      >
        <span className="label text-emerald-400 font-semibold text-xs tracking-[0.28em] uppercase block mb-5 opacity-0">
          CURO CLINICS
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-8" style={{ perspective: '600px' }}>
          Your Health Deserves
          <br /><span className="text-emerald-400 font-normal">Exceptional Care</span>
        </h2>

        <div className="paragraph text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl mb-10 font-light text-left">
          <p>
            Experience comprehensive, compassionate healthcare with trusted specialists, advanced diagnostic facilities, and personalized treatment—all under one roof at Curo Clinics.
          </p>
        </div>

        {/* Primary Button */}
        <div className="cta-btn opacity-0 w-fit">
          <button 
            onClick={openBookingModal}
            className="group relative inline-flex items-center gap-3 px-10 h-[56px] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-base rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
          >
            <span>Book an Appointment</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
          </button>
        </div>

        {/* Secondary Contact Info */}
        <div className="contact-info opacity-0 mt-12 border-t border-emerald-500/10 pt-8 flex flex-col sm:flex-row items-start gap-8 sm:gap-16 w-full max-w-4xl">

          {/* Phone */}
          <div className="flex flex-col items-start text-left group cursor-pointer">
            <span className="text-gray-300 font-semibold text-[10px] tracking-[0.18em] uppercase mb-2">
              CALL US TODAY
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+918919942870"
                className="flex items-center gap-2.5 text-xl font-medium text-white hover:text-emerald-400 transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>+91 89199 42870</span>
              </a>
              <a
                href="tel:+918106770862"
                className="flex items-center gap-2.5 text-xl font-medium text-white hover:text-emerald-400 transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>+91 81067 70862</span>
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col items-start text-left max-w-md">
            <span className="text-gray-300 font-semibold text-[10px] tracking-[0.18em] uppercase mb-2">
              OUR LOCATION
            </span>
            <div className="text-base sm:text-lg text-emerald-100/90 font-light leading-relaxed flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                <span>
                  2nd floor, Kokapet one mall, 210, 211, Kokapet X Road, Narsingi, Gandipet, Hyderabad, Telangana 500075
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppointmentCTA;

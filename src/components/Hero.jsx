import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useBooking } from '../context/BookingContext';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { openBookingModal } = useBooking();
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef([]);
  const badgeRef = useRef(null);

  // Clear references array on each render
  buttonsRef.current = [];

  const addToButtonsRef = (el) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };

  useEffect(() => {
    // ----------------------------------------------------
    // SPLIT TEXT: Character-level reveal for the hero title
    // ----------------------------------------------------
    const splitTitle = new SplitType(titleRef.current, { types: 'chars,words' });

    // Hide chars initially
    gsap.set(splitTitle.chars, { opacity: 0, y: 60, rotateX: -80, transformOrigin: '50% 0%' });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Video fades in smoothly
    tl.fromTo(videoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Badge slides down from top
    if (badgeRef.current) {
      tl.fromTo(badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=1.0'
      );
    }

    // Characters animate in with stagger (cinematic reveal)
    tl.to(splitTitle.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: { amount: 0.7, from: 'start' },
      duration: 0.7,
      ease: 'back.out(1.4)'
    }, '-=0.5');

    // Description — word-by-word fade in
    const splitDesc = new SplitType(descRef.current, { types: 'words' });
    gsap.set(splitDesc.words, { opacity: 0, y: 15 });
    tl.to(splitDesc.words, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4');

    // Buttons animate upward with stagger
    tl.fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 },
      '-=0.4'
    );

    // ----------------------------------------------------
    // SCROLL ANIMATIONS (ScrollTrigger) — video scale only
    // No opacity change on container to avoid revealing white background
    // ----------------------------------------------------

    // Video scales subtly for depth effect
    gsap.to(videoRef.current, {
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: false,
      }
    });

    // Cleanup animations on unmount
    return () => {
      splitTitle.revert();
      splitDesc.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-brand-deep select-none"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/curo-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none"
      />

      {/* Subtle dark-to-transparent overlay gradient for enhanced text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/90 via-brand-deep/50 to-transparent pointer-events-none" />

      {/* Main Overlay Content */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center">
        {/* Left Side Info - Right Side left empty for Doctor inside video */}
        <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center text-left">

          {/* Animated Badge */}
          <div
            ref={badgeRef}
            className="mb-5 inline-flex items-center gap-2 px-4 py-2 bg-white/8 backdrop-blur-md rounded-full border border-white/15 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-xs font-medium tracking-wider uppercase">Now Open · Kokapet, Hyderabad</span>
          </div>

          <h1
            ref={titleRef}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            style={{ perspective: '600px' }}
          >
            <span className="block whitespace-nowrap">Complete Care</span>
            <span className="block whitespace-nowrap">for Every <span className="text-brand-accent">Family</span></span>
          </h1>

          <p
            ref={descRef}
            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg"
          >
            From children's health to senior care, our experienced specialists provide compassionate, comprehensive healthcare for every member of your family—all under one roof.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button
              ref={addToButtonsRef}
              onClick={openBookingModal}
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-emerald-600 text-white font-medium rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-emerald-500/30 cursor-pointer"
            >
              Book Appointment
            </button>
            <button
              ref={addToButtonsRef}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-medium rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Meet Our Doctors
            </button>
          </div>
        </div>

        {/* Right Side Empty */}
        <div className="hidden md:block w-1/2" />
      </div>

      {/* Elegant Bottom Subtle Ambient Light Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </div>
  );
};

export default Hero;

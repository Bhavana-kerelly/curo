import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef([]);

  // Clear references array on each render
  buttonsRef.current = [];

  const addToButtonsRef = (el) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };

  useEffect(() => {
    // ----------------------------------------------------
    // ENTRANCE ANIMATIONS (On Page Load)
    // ----------------------------------------------------
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Video fades in smoothly
    tl.fromTo(videoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Title slides upward
    tl.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      '-=0.8'
    );

    // Description fades in
    tl.fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.8'
    );

    // Buttons animate upward with stagger
    tl.fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 },
      '-=0.6'
    );

    // ----------------------------------------------------
    // SCROLL ANIMATIONS (ScrollTrigger)
    // ----------------------------------------------------
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true, // Smooth scrub to link progress to scrollbar
        pin: false,
      }
    });

    // 1. Entire hero moves upward slightly and opacity reduces smoothly
    // 2. Video scales from 1 to 1.08
    scrollTl.to(containerRef.current, {
      yPercent: -15,
      opacity: 0.1,
      ease: 'none',
    }, 0);

    scrollTl.to(videoRef.current, {
      scale: 1.08,
      ease: 'none',
    }, 0);

    // Cleanup animations on unmount
    return () => {
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
          <h1
            ref={titleRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Where Luxury Meets <span className="text-brand-accent bg-clip-text">Healing</span>
          </h1>

          <p
            ref={descRef}
            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg"
          >
            Curo Clinics redefines medical care by pairing world-class healthcare specialists with state-of-the-art diagnostic facilities and exceptionally personalized patient suites.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button
              ref={addToButtonsRef}
              className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-emerald-600 text-white font-medium rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-emerald-500/30 cursor-pointer"
            >
              Book Consultation
            </button>
            <button
              ref={addToButtonsRef}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-medium rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Explore Services
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

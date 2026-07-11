import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// Particle data — static so it doesn't re-randomise on re-render
const PARTICLES = [
  { top: '18%', left: '8%',  size: 5,  dur: 7.2, delay: 0 },
  { top: '42%', left: '3%',  size: 4,  dur: 6.5, delay: 1.2 },
  { top: '65%', left: '12%', size: 3,  dur: 8.1, delay: 0.7 },
  { top: '25%', left: '22%', size: 6,  dur: 5.8, delay: 0.4 },
  { top: '78%', left: '6%',  size: 4,  dur: 7.6, delay: 1.9 },
  { top: '12%', left: '88%', size: 5,  dur: 6.9, delay: 0.3 },
  { top: '55%', left: '92%', size: 3,  dur: 8.4, delay: 1.5 },
  { top: '82%', left: '85%', size: 6,  dur: 6.2, delay: 0.9 },
  { top: '35%', left: '78%', size: 4,  dur: 7.0, delay: 2.1 },
  { top: '70%', left: '95%', size: 3,  dur: 5.5, delay: 0.6 },
];

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef     = useRef(null);
  const titleRef     = useRef(null);
  const descRef      = useRef(null);
  const buttonsRef   = useRef([]);
  const btn1Ref      = useRef(null);
  const btn2Ref      = useRef(null);

  buttonsRef.current = [];
  const addToButtonsRef = (el) => {
    if (el && !buttonsRef.current.includes(el)) buttonsRef.current.push(el);
  };

  useEffect(() => {
    // ── SplitType word reveal ───────────────────────────────
    const split = new SplitType(titleRef.current, { types: 'words' });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Video fade in
    tl.fromTo(videoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Words reveal upward with stagger
    tl.fromTo(split.words,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, stagger: 0.07, duration: 0.9 },
      '-=1.0'
    );

    // Description fades up
    tl.fromTo(descRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.6'
    );

    // Buttons slide up
    tl.fromTo([btn1Ref.current, btn2Ref.current],
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
      '-=0.6'
    );

    // ── Scroll parallax ─────────────────────────────────────
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    scrollTl.to(containerRef.current, { yPercent: -15, opacity: 0.1, ease: 'none' }, 0);
    scrollTl.to(videoRef.current, { scale: 1.1, ease: 'none' }, 0);

    // ── Magnetic buttons ────────────────────────────────────
    const setupMagnetic = (el) => {
      if (!el) return;
      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(0, 80 - dist) / 80;
        gsap.to(el, { x: dx * pull * 0.45, y: dy * pull * 0.45, duration: 0.35, ease: 'power2.out' });
      };
      const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
      document.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        document.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    };

    const cleanBtn1 = setupMagnetic(btn1Ref.current);
    const cleanBtn2 = setupMagnetic(btn2Ref.current);

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
      cleanBtn1?.();
      cleanBtn2?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-brand-deep select-none"
    >
      {/* ── Background Video ──────────────────────────────── */}
      <video
        ref={videoRef}
        src="/curo-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      />

      {/* ── Gradient overlay ─────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/90 via-brand-deep/50 to-transparent pointer-events-none" />

      {/* ── Floating particles ───────────────────────────── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="bg-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.35,
          }}
          aria-hidden="true"
        />
      ))}

      {/* ── ECG heartbeat line ───────────────────────────── */}
      <svg
        className="absolute bottom-12 left-0 w-full opacity-20 pointer-events-none"
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          className="hero-ecg"
          d="M0 24 L240 24 L270 10 L285 38 L300 4 L315 44 L330 24 L480 24 L510 10 L525 38 L540 4 L555 44 L570 24 L720 24 L750 10 L765 38 L780 4 L795 44 L810 24 L960 24 L990 10 L1005 38 L1020 4 L1035 44 L1050 24 L1200 24 L1230 10 L1245 38 L1260 4 L1275 44 L1290 24 L1440 24"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ── Hero Content ─────────────────────────────────── */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center">
        <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center text-left">
          <h1
            ref={titleRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 overflow-hidden"
          >
            Where Luxury Meets <span className="text-brand-accent">Healing</span>
          </h1>

          <p
            ref={descRef}
            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg"
          >
            Curo Clinics redefines medical care by pairing world-class healthcare specialists with state-of-the-art diagnostic facilities and exceptionally personalized patient suites.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button
              ref={btn1Ref}
              className="magnetic-btn w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-emerald-600 text-white font-medium rounded-full shadow-lg shadow-emerald-500/20 transition-colors duration-300 cursor-pointer relative overflow-hidden group"
            >
              <span className="card-shimmer" aria-hidden="true" />
              Book Consultation
            </button>

            <button
              ref={btn2Ref}
              className="magnetic-btn w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-medium rounded-full border border-white/20 backdrop-blur-md transition-colors duration-300 cursor-pointer relative overflow-hidden group"
            >
              <span className="card-shimmer" aria-hidden="true" />
              Explore Services
            </button>
          </div>
        </div>

        {/* Right side empty — doctor visible in video */}
        <div className="hidden md:block w-1/2" />
      </div>

      {/* Ambient bottom light line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </div>
  );
};

export default Hero;

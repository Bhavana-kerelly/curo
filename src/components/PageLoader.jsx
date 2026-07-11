import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logoImg from '../assets/logo.png';

/**
 * PageLoader — Premium glass loading screen.
 * Shows once on first mount, then fades out and calls onComplete.
 *
 * @prop {function} onComplete  — called when the exit animation finishes
 */
const PageLoader = ({ onComplete }) => {
  const loaderRef   = useRef(null);
  const ecgRef      = useRef(null);
  const barRef      = useRef(null);
  const logoRef     = useRef(null);
  const textRef     = useRef(null);

  useEffect(() => {
    document.body.classList.add('loading');

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('loading');
        onComplete?.();
      }
    });

    // 1. Fade in the glass panel
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.88, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );

    // 2. Reveal text beneath logo
    tl.fromTo(textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.4'
    );

    // 3. Draw ECG path
    tl.to(ecgRef.current,
      { strokeDashoffset: 0, duration: 1.1, ease: 'power1.inOut' },
      '-=0.3'
    );

    // 4. Fill progress bar
    tl.to(barRef.current,
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center' },
      '-=0.8'
    );

    // 5. Hold briefly
    tl.to({}, { duration: 0.3 });

    // 6. Slide loader UP and out
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="page-loader" role="progressbar" aria-label="Loading">
      {/* Glass logo panel */}
      <div ref={logoRef} className="loader-logo-glass" style={{ opacity: 0 }}>
        <img
          src={logoImg}
          alt="Curo Clinics"
          className="h-12 w-auto object-contain"
          style={{ filter: 'brightness(1.1)' }}
        />
      </div>

      {/* ECG heartbeat SVG */}
      <svg
        width="220"
        height="48"
        viewBox="0 0 220 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          ref={ecgRef}
          className="loader-ecg"
          d="M0 24 L40 24 L52 10 L60 38 L68 4 L76 44 L84 24 L120 24 L132 10 L140 38 L148 4 L156 44 L164 24 L220 24"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Tagline */}
      <p ref={textRef} className="text-white/40 text-[11px] font-light tracking-[0.3em] uppercase" style={{ opacity: 0 }}>
        Where Luxury Meets Healing
      </p>

      {/* Progress bar */}
      <div className="loader-progress-track">
        <div ref={barRef} className="loader-progress-bar" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  );
};

export default PageLoader;

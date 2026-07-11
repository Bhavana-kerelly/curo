import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope, Dna, HeartHandshake, Clock } from 'lucide-react';
import SplitType from 'split-type';
import hospitalImg from '../assets/hospital.png';

gsap.registerPlugin(ScrollTrigger);

const WhyCuro = () => {
  const sectionRef  = useRef(null);
  const bgRef       = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const cardsRef    = useRef([]);
  const glowsRef    = useRef([]);

  cardsRef.current = [];
  glowsRef.current = [];

  const addToCards = (el) => { if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el); };
  const addToGlows = (el) => { if (el && !glowsRef.current.includes(el)) glowsRef.current.push(el); };

  useEffect(() => {
    // ── Parallax background ─────────────────────────────────
    gsap.to(bgRef.current, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
    });

    // ── SplitType heading ────────────────────────────────────
    const splitH = new SplitType(headingRef.current, { types: 'words' });

    const contentTl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
    });

    // Badge label fades first
    contentTl.fromTo(subRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
    );

    // Words reveal upward
    contentTl.fromTo(splitH.words,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, stagger: 0.05, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    );

    // Cards stagger in
    contentTl.fromTo(cardsRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.75, ease: 'power3.out' },
      '-=0.5'
    );

    // ── Glow pulse rings (breathing) ────────────────────────
    gsap.to(glowsRef.current, {
      scale: 1.4,
      opacity: 0,
      duration: 2,
      stagger: 0.5,
      repeat: -1,
      ease: 'power1.out'
    });

    // ── Idle floating on cards ──────────────────────────────
    const floatClasses = ['glass-float-1','glass-float-2','glass-float-3','glass-float-4'];
    cardsRef.current.forEach((card, i) => {
      card.classList.add(floatClasses[i % floatClasses.length]);
    });

    // ── Ambient glow circles drift ─────────────────────────
    gsap.to('.whycuro-ambient', {
      y: -20,
      x: 10,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 2,
    });

    return () => {
      splitH.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // ── 3D card tilt ─────────────────────────────────────────
  const handleCardEnter = (e) => {
    const icon = e.currentTarget.querySelector('.lucide');
    if (icon) gsap.to(icon, { rotate: 12, scale: 1.15, duration: 0.35, ease: 'power2.out' });
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.lucide');
    if (icon) gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - cx) / (rect.width  / 2)) *  6;
    gsap.to(card, { rotateX: rx, rotateY: ry, scale: 1.02, duration: 0.35, ease: 'power2.out', transformPerspective: 800 });
  };

  const cardData = [
    { icon: <Stethoscope className="w-8 h-8 text-emerald-500" />, title: 'Experienced Specialists',    desc: 'Access to elite board-certified surgeons and clinical practitioners dedicated to precision treatment.' },
    { icon: <Dna          className="w-8 h-8 text-emerald-500" />, title: 'Advanced Diagnostics',      desc: 'Harnessing state-of-the-art diagnostic imaging and custom genetic mapping technology.' },
    { icon: <HeartHandshake className="w-8 h-8 text-emerald-500" />, title: 'Personalized Care',       desc: 'Tailored clinical pathways and private healing sanctuaries designed around your comfort.' },
    { icon: <Clock        className="w-8 h-8 text-emerald-500" />, title: '24×7 Concierge Support',   desc: 'Seamless immediate assistance and proactive post-treatment follow-ups at any hour.' },
  ];

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden bg-brand-dark flex items-center">
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${hospitalImg})` }}
      />
      <div className="absolute inset-0 bg-brand-dark/45 backdrop-blur-[3px] pointer-events-none" />
      <div className="absolute inset-0 bg-white/[0.04] pointer-events-none" />

      {/* Drifting ambient glows */}
      <div className="whycuro-ambient absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="whycuro-ambient absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        <div className="w-full flex flex-col items-center text-center mb-16">
          <h2 ref={subRef} className="font-display text-base font-semibold tracking-wider text-brand-accent uppercase mb-3">
            Why Choose Curo Clinics
          </h2>
          <p ref={headingRef} className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl leading-[1.2] overflow-hidden">
            Redefining Healthcare Through Premium Innovation
          </p>
        </div>

        {/* Glass cards */}
        <div className="w-full flex flex-row overflow-x-auto lg:grid lg:grid-cols-4 gap-6 py-4 snap-x snap-mandatory scrollbar-none">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              ref={addToCards}
              onMouseEnter={handleCardEnter}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className="group glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-between cursor-pointer min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start flex-shrink-0 flex-grow lg:flex-grow-0 relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Shimmer sweep */}
              <span className="card-shimmer" aria-hidden="true" />

              <div>
                {/* Icon with pulse ring */}
                <div className="mb-6 w-fit relative">
                  <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300 relative z-10">
                    {card.icon}
                  </div>
                  {/* Pulse ring */}
                  <div
                    ref={addToGlows}
                    className="absolute inset-0 rounded-2xl border border-emerald-500/40 scale-100"
                    style={{ transformOrigin: 'center' }}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-white text-xl font-semibold mb-3 font-display text-left">{card.title}</h3>
                <p  className="text-gray-300 text-sm font-light leading-relaxed text-left">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCuro;

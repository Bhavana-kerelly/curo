import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Stethoscope, Dna, HeartHandshake, Clock } from 'lucide-react';
import hospitalImg from '../assets/hospital.png';

gsap.registerPlugin(ScrollTrigger);

const WhyCuro = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);

  cardsRef.current = [];

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // ----------------------------------------------------
    // BACKGROUND PARALLAX ANIMATION
    // ----------------------------------------------------
    gsap.to(bgRef.current, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // ----------------------------------------------------
    // SPLIT TEXT: Label character-by-character reveal
    // ----------------------------------------------------
    const splitHeading = new SplitType(headingRef.current, { types: 'chars' });
    gsap.set(splitHeading.chars, { opacity: 0, y: 15 });

    // Split the large description text (big heading) into words
    const splitDesc = new SplitType(descRef.current, { types: 'words,lines' });
    gsap.set(splitDesc.words, { opacity: 0, y: 40, skewY: 3 });

    // ----------------------------------------------------
    // SCROLL ANIMATIONS FOR CONTENT
    // ----------------------------------------------------
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      }
    });

    // Label chars shimmer in
    contentTl.to(splitHeading.chars, {
      opacity: 1,
      y: 0,
      stagger: { amount: 0.4, from: 'start' },
      duration: 0.4,
      ease: 'power2.out'
    });

    // Large heading words cascade upward with skew correction
    contentTl.to(splitDesc.words, {
      opacity: 1,
      y: 0,
      skewY: 0,
      stagger: 0.06,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.3');

    // Cards animate one after another (stagger)
    contentTl.fromTo(cardsRef.current,
      { opacity: 0, y: 35, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      },
      '-=0.4'
    );

    // Clean up
    return () => {
      splitHeading.revert();
      splitDesc.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const cardData = [
    {
      icon: <Stethoscope className="w-8 h-8 text-emerald-500 transition-transform duration-500" />,
      title: 'Experienced Specialists',
      desc: 'Access to elite board-certified surgeons and clinical practitioners dedicated to precision treatment.'
    },
    {
      icon: <Dna className="w-8 h-8 text-emerald-500 transition-transform duration-500" />,
      title: 'Advanced Diagnostics',
      desc: 'Harnessing state-of-the-art diagnostic imaging and custom genetic mapping technology.'
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-emerald-500 transition-transform duration-500" />,
      title: 'Personalized Care',
      desc: 'Tailored clinical pathways and private healing sanctuaries designed around your comfort.'
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-500 transition-transform duration-500" />,
      title: '24×7 Concierge Support',
      desc: 'Seamless immediate assistance and proactive post-treatment follow-ups at any hour.'
    }
  ];

  // Helper for hover icon rotation & lift effect
  const handleMouseEnter = (e) => {
    const icon = e.currentTarget.querySelector('.lucide');
    if (icon) {
      gsap.to(icon, { rotate: 15, scale: 1.1, duration: 0.3 });
    }
  };

  const handleMouseLeave = (e) => {
    const icon = e.currentTarget.querySelector('.lucide');
    if (icon) {
      gsap.to(icon, { rotate: 0, scale: 1, duration: 0.3 });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden bg-brand-dark flex items-center"
    >
      {/* Parallax Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${hospitalImg})`,
        }}
      />

      {/* Blur Filter Layer */}
      <div className="absolute inset-0 bg-brand-dark/45 backdrop-blur-[3px] pointer-events-none" />

      {/* Premium Translucent White Overlay */}
      <div className="absolute inset-0 bg-white/[0.04] pointer-events-none" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">

        {/* Centered Heading Content */}
        <div className="w-full flex flex-col items-center text-center mb-16">
          <h2
            ref={headingRef}
            className="font-display text-base font-semibold tracking-wider text-brand-accent uppercase mb-3"
          >
            Why Choose Curo Clinics
          </h2>
          <p
            ref={descRef}
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-3xl leading-[1.2]"
          >
            Redefining Healthcare Through Premium Innovation
          </p>
        </div>

        {/* Grid of Glass Cards - Horizontal Layout (always horizontal, scrollable on mobile/tablet) */}
        <div className="w-full flex flex-row overflow-x-auto lg:grid lg:grid-cols-4 gap-6 py-4 snap-x snap-mandatory scrollbar-none">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              ref={addToCardsRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group glass-panel glass-panel-hover p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 cursor-pointer min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start flex-shrink-0 flex-grow lg:flex-grow-0"
            >
              <div>
                <div className="mb-6 p-4 w-fit bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="text-white text-xl font-semibold mb-3 font-display text-left">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed text-left">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyCuro;

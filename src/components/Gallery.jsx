import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  cardRefs.current = [];

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const galleryItems = [
    {
      title: 'Reception Area',
      caption: 'A welcoming space designed for patient comfort.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      span: 'lg:col-span-8 h-[380px] lg:h-[450px]'
    },
    {
      title: 'Consultation Room',
      caption: 'Private and comfortable specialist consultations.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      span: 'lg:col-span-4 h-[380px] lg:h-[450px]'
    },
    {
      title: 'Diagnostics Lab',
      caption: 'Advanced diagnostic technology for accurate results.',
      image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=800&q=80',
      span: 'lg:col-span-4 h-[380px] lg:h-[450px]'
    },
    {
      title: 'Operation Theatre',
      caption: 'Modern surgical suites equipped for precision.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
      span: 'lg:col-span-8 h-[380px] lg:h-[450px]'
    },
    {
      title: 'Patient Lounge',
      caption: 'Comfortable waiting areas for families and visitors.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      span: 'lg:col-span-6 h-[300px] lg:h-[380px]'
    },
    {
      title: 'Dental Clinic',
      caption: 'Modern dental care in a calm environment.',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80',
      span: 'lg:col-span-6 h-[300px] lg:h-[380px]'
    }
  ];

  useEffect(() => {
    // SPLIT TEXT for gallery header
    const labelEl = headerRef.current.querySelector('.label');
    const titleEl = headerRef.current.querySelector('.title');
    const subtitleEl = headerRef.current.querySelector('.subtitle');

    const splitLabel = new SplitType(labelEl, { types: 'chars' });
    gsap.set(splitLabel.chars, { opacity: 0, y: 8 });

    const splitTitle = new SplitType(titleEl, { types: 'words' });
    gsap.set(splitTitle.words, { opacity: 0, y: 40, skewY: 4 });

    const splitSubtitle = new SplitType(subtitleEl, { types: 'words' });
    gsap.set(splitSubtitle.words, { opacity: 0, y: 16 });

    // ----------------------------------------------------
    // ENTRANCE ANIMATIONS (ScrollTrigger)
    // ----------------------------------------------------
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    // Label chars shimmer
    entranceTl.to(splitLabel.chars, {
      opacity: 1,
      y: 0,
      stagger: { amount: 0.3, from: 'start' },
      duration: 0.35,
      ease: 'power2.out'
    });

    // Title words cascade
    entranceTl.to(splitTitle.words, {
      opacity: 1,
      y: 0,
      skewY: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.2');

    // Subtitle words fade
    entranceTl.to(splitSubtitle.words, {
      opacity: 1,
      y: 0,
      stagger: 0.025,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.5');

    // Cards reveal in staggered order
    entranceTl.fromTo(cardRefs.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      },
      '-=0.4'
    );

    // ----------------------------------------------------
    // RANDOMIZED SUBTLE FLOATING (Continuous Micro Animations)
    // ----------------------------------------------------
    cardRefs.current.forEach((card, idx) => {
      // Randomize float range and duration slightly
      const randomY = 4 + Math.random() * 4; // 4 to 8px
      const randomDuration = 3 + Math.random() * 3; // 3 to 6s

      gsap.to(card, {
        y: `-=${randomY}`,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: idx * 0.1
      });
    });

    // ----------------------------------------------------
    // MOUSE CURSOR IMAGE PARALLAX EFFECT
    // ----------------------------------------------------
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 12; // Subtle movement
      const yPercent = (clientY / window.innerHeight - 0.5) * 12;

      gsap.to('.gallery-img', {
        x: xPercent,
        y: yPercent,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      splitLabel.revert();
      splitTitle.revert();
      splitSubtitle.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Card Hover Animations using inline GSAP
  const onCardEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.gallery-img');
    const overlay = card.querySelector('.overlay-bg');
    const shine = card.querySelector('.shine-sweep');

    // Scale image to 1.08
    gsap.to(img, { scale: 1.08, duration: 0.5, ease: 'power2.out' });
    // Lift card upward by 10px and add emerald shadow / glow
    gsap.to(card, {
      y: -10,
      boxShadow: '0 25px 50px rgba(0, 168, 107, 0.12)',
      borderColor: 'rgba(0, 168, 107, 0.4)',
      duration: 0.5,
      ease: 'power2.out'
    });
    // Darken overlay
    gsap.to(overlay, { opacity: 0.85, duration: 0.4 });
    // Shine sweep effect
    gsap.fromTo(shine,
      { x: '-100%', opacity: 0.3 },
      { x: '100%', opacity: 0, duration: 0.8, ease: 'power2.out' }
    );
  };

  const onCardLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector('.gallery-img');
    const overlay = card.querySelector('.overlay-bg');

    // Reset image scale
    gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
    // Reset card lift and shadow
    gsap.to(card, {
      y: 0,
      boxShadow: '0 15px 45px rgba(0,0,0,0.08)',
      borderColor: 'rgba(0, 168, 107, 0.05)',
      duration: 0.5,
      ease: 'power2.out'
    });
    // Reset overlay
    gsap.to(overlay, { opacity: 0.7, duration: 0.4 });
  };

  return (
    <section 
      ref={sectionRef}
      className="glass-section relative w-full pt-10 sm:pt-12 pb-16 sm:pb-20 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Very subtle emerald radial glow behind gallery */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle floating ambient blur circles */}
      <div className="absolute top-1/3 left-10 w-36 h-36 bg-teal-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-44 h-44 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Faint medical particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-500/30 rounded-full blur-[1px]" />
        <div className="absolute bottom-1/4 right-1/4 w-3.5 h-3.5 bg-emerald-500/20 rounded-full blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col items-center">

        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-3xl mb-20 flex flex-col items-center">
          <span className="label text-emerald-600 font-semibold text-xs tracking-[0.25em] uppercase block mb-5">
            HOSPITAL GALLERY
          </span>
          <h2 className="title text-[#0F172A] text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
            Experience Our<br />Healing Environment
          </h2>
          <p className="subtitle text-slate-600 text-lg leading-relaxed max-w-3xl mt-[28px] font-light">
            Explore the thoughtfully designed spaces of Curo Clinics, where advanced healthcare meets comfort, cleanliness and a patient-first experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              ref={addToCardRefs}
              onMouseEnter={onCardEnter}
              onMouseLeave={onCardLeave}
              className={`group relative overflow-hidden rounded-[32px] border border-emerald-500/5 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer flex-shrink-0 ${item.span}`}
            >
              {/* Card Background Image (Parallax movement) */}
              <div
                className="gallery-img absolute inset-[-12px] bg-cover bg-center transition-transform duration-700 ease-out"
                style={{
                  backgroundImage: `url(${item.image})`
                }}
              />

              {/* Soft dark-to-light gradient overlay bottom */}
              <div className="overlay-bg absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-70 z-10 transition-opacity duration-300" />

              {/* Shine Sweep Overlay (Glass effect sweep on hover) */}
              <div className="shine-sweep absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 translate-x-[-100%] pointer-events-none z-20" />

              {/* Bottom text info */}
              <div className="absolute bottom-8 left-8 right-8 z-20 text-left text-white">
                <h3 className="text-2xl font-semibold tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/80 font-light leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;

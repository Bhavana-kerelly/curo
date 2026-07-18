import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import card1Img from '../assets/card1.png';

gsap.registerPlugin(ScrollTrigger);

const AboutFounders = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const cardsGridRef = useRef(null);

  const cards = [
    {
      value: "7+",
      title: "Specialties Under One Roof",
      desc: "ENT, Pediatrics, Gynecology, Dental Care, Urology, General Medicine and General Surgery—all working together for complete family healthcare.",
      image: card1Img,
      placement: "left-6 right-6 bottom-6",
      clipPath: "polygon(64px 0, calc(100% - 14px) 0, calc(100% - 4px) 4px, 100% 14px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px), 0 64px)",
      offset: false
    },
    {
      value: "100%",
      title: "Patient-First Care",
      desc: "Every consultation is built around compassion, transparency and personalized treatment plans tailored to each patient's health journey.",
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80",
      placement: "left-6 bottom-20",
      clipPath: "polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 64px 100%, 0 calc(100% - 64px))",
      offset: true
    },
    {
      value: "24/7",
      title: "Advanced Healthcare Experience",
      desc: "Modern diagnostics, digital records, convenient appointments and extended consultation hours designed around your lifestyle.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      placement: "left-6 right-28 bottom-6",
      clipPath: "polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px))",
      offset: false
    }
  ];

  useEffect(() => {
    // -------------------------------------------------------
    // SPLIT TEXT: Big heading character-by-character 3D reveal
    // -------------------------------------------------------
    const splitHeading = new SplitType(headingRef.current, { types: 'chars,lines' });
    gsap.set(splitHeading.chars, { opacity: 0, y: 50, rotateY: -30, transformOrigin: '50% 50%' });

    // Split description paragraphs into words
    const paras = descRef.current.querySelectorAll('p');
    const splitParas = Array.from(paras).map(p => new SplitType(p, { types: 'words' }));
    splitParas.forEach(sp => gsap.set(sp.words, { opacity: 0, y: 15 }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    // Characters cascade in with slight 3D rotation
    tl.to(splitHeading.chars, {
      opacity: 1,
      y: 0,
      rotateY: 0,
      stagger: { amount: 0.6, from: 'start' },
      duration: 0.5,
      ease: 'power3.out'
    });

    // Description paragraphs words cascade
    splitParas.forEach((sp, i) => {
      tl.to(sp.words, {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: 'power2.out'
      }, i === 0 ? '-=0.4' : '-=0.6');
    });

    // Cards grid fades in
    tl.fromTo(cardsGridRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      splitHeading.revert();
      splitParas.forEach(sp => sp.revert());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="glass-section relative py-16 sm:py-20 px-6 sm:px-10 overflow-hidden"
    >
      {/* Inner wrapper */}
      <div className="max-w-7xl mx-auto w-full relative z-20">

        {/* Top row -- heading + description */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20 text-[#102A43]">

          {/* Left side -- Section heading */}
          <div className="lg:w-1/2" style={{ perspective: '800px' }}>
            <h2
              ref={headingRef}
              className="font-firs text-[38px] sm:text-[52px] lg:text-[60px] font-semibold uppercase tracking-tight leading-[0.95]"
            >
              ABOUT<br />CURO CLINICS
            </h2>
          </div>

          {/* Right side -- Description block */}
          <div ref={descRef} className="lg:w-1/2 flex flex-col max-w-xl">
            <p className="text-[17px] sm:text-[18px] leading-[1.7] text-[#486581]">
              Curo Clinics was founded with a simple vision — to make world-class healthcare accessible to every family in Kokapet and the surrounding communities. Our multidisciplinary team combines clinical expertise with compassionate care, creating a healthcare experience built around trust and patient wellbeing.
            </p>
            <p className="text-[17px] sm:text-[18px] leading-[1.7] text-[#486581] mt-5">
              With advanced diagnostics, experienced specialists and modern treatment facilities under one roof, Curo Clinics delivers comprehensive healthcare that is accessible, transparent and personalized for every patient.
            </p>

            {/* Discover Our Story Link */}
            <div className="mt-6">
              <a
                href="#story"
                className="group inline-flex items-center gap-4 text-[14px] font-medium text-[#102A43] hover:opacity-80 transition-opacity"
              >
                <span>Discover Our Story</span>
                <span
                  className="flex items-center justify-center w-8 h-8 border border-[#102A43] transition-transform group-hover:-translate-y-0.5"
                  style={{
                    clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
                  }}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Stats cards grid */}
        <div ref={cardsGridRef} className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`relative w-full h-[280px] sm:h-[340px] transition-transform duration-500 hover:scale-[1.01] ${card.offset ? 'lg:mt-24' : ''
                }`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                padding: '1.5px',
                clipPath: card.clipPath
              }}
            >
              {/* Inner container serving as the image fill & inset border */}
              <div
                className="relative w-full h-full overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${card.image})`,
                  clipPath: card.clipPath,
                  mixBlendMode: 'normal'
                }}
              >
                {/* Soft darken overlay for readability */}
                <div className="absolute inset-0 bg-[#102A43]/15 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent" />

                {/* Text overlay inside each card */}
                <div className={`absolute ${card.placement} max-w-[66%] z-10 text-left`}>
                  <div
                    className="font-firs font-semibold uppercase leading-none text-[38px] sm:text-[54px] select-none"
                    style={{
                      background: 'linear-gradient(294deg, #0BAF74 20%, #46D39A 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      display: 'inline-block'
                    }}
                  >
                    {card.value}
                  </div>
                  <h4 className="mt-2 text-[15px] font-bold text-[#102A43] tracking-wide">
                    {card.title}
                  </h4>
                  <p className="mt-1.5 text-[13px] sm:text-[14px] leading-[1.4] text-[#334E68] font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom fade overlay */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(248, 251, 250, 0) 0%, rgba(248, 251, 250, 0.7) 60%, #F8FBFA 100%)'
        }}
      />
    </section>
  );
};

export default AboutFounders;

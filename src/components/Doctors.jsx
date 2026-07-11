import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Doctors = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const tweenRef = useRef(null);

  const doctors = [
    {
      name: 'Dr. Sivani Payneni',
      specialty: 'Physician & Diabetologist',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=550&q=80'
    },
    {
      name: 'Dr. Feroz Basha Shaik',
      specialty: 'ENT & Head and Neck Surgeon',
      image: '/feroz_basha.jpg'
    },
    {
      name: 'Dr. Anand',
      specialty: 'Urologist',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&h=550&q=80'
    },
    {
      name: 'Dr. Nagarjuna Doppalapudi',
      specialty: 'General & Laparoscopic Surgeon',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=550&q=80'
    },
    {
      name: 'Dr. Neha',
      specialty: 'General Pediatrics',
      image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&h=550&q=80'
    },
    {
      name: 'Dr. Sivaharika Rayudu',
      specialty: 'Gynecologist',
      image: '/sivaharika.jpg'
    },
    {
      name: 'Dr. Ravinder Raja',
      specialty: 'Consultant ENT Specialist',
      image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=400&h=550&q=80'
    },
    {
      name: 'Dr. Yogini Khetawat',
      specialty: 'Dentist',
      image: '/yogini.jpg'
    }
  ];

  // Duplicate list to achieve smooth infinite looping
  const duplicatedDoctors = [...doctors, ...doctors];

  useEffect(() => {
    // ----------------------------------------------------
    // ENTRANCE ANIMATIONS (Heading, Subtitle, Cards)
    // ----------------------------------------------------
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    const titleEl = headerRef.current.querySelector('.title');
    const splitH = new SplitType(titleEl, { types: 'words' });
    gsap.set(splitH.words, { overflow: 'hidden' });

    entranceTl.fromTo(headerRef.current.querySelector('.label'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );

    entranceTl.fromTo(splitH.words,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, stagger: 0.06, duration: 0.85, ease: 'power3.out' },
      '-=0.4'
    );

    entranceTl.fromTo(headerRef.current.querySelector('.subtitle'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    entranceTl.fromTo(marqueeContainerRef.current,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    // ----------------------------------------------------
    // GSAP INFINITE MARQUEE TWEEN (Desktop / Tablet)
    // ----------------------------------------------------
    const setupMarquee = () => {
      const track = marqueeTrackRef.current;
      if (!track) return;

      // Only run marquee if desktop/tablet (width >= 1024px or similar)
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (tweenRef.current) {
          tweenRef.current.kill();
          tweenRef.current = null;
        }
        gsap.set(track, { x: 0 });
        return;
      }

      // Calculate half the width of the track containing all duplicated cards
      const scrollWidth = track.scrollWidth / 2;

      // Reset track position
      gsap.set(track, { x: 0 });

      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      tweenRef.current = gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        duration: 40, // very slow, smooth movement
        repeat: -1
      });
    };

    // Initial setup
    setupMarquee();

    // Re-setup on resize to prevent broken layouts
    window.addEventListener('resize', setupMarquee);

    return () => {
      window.removeEventListener('resize', setupMarquee);
      if (tweenRef.current) tweenRef.current.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current && window.innerWidth >= 768) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current && window.innerWidth >= 768) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
    }
  };

  const onCardEnter = (e) => {
    const card = e.currentTarget;
    const img  = card.querySelector('.doctor-img');
    const shine = card.querySelector('.shine-overlay');
    gsap.to(img,  { scale: 1.07, duration: 0.4, ease: 'power2.out' });
    gsap.to(card, { y: -12, scale: 1.015, boxShadow: '0 24px 48px rgba(0,168,107,0.1)', borderColor: 'rgba(0,168,107,0.3)', duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(shine, { x: '-120%', opacity: 0.4 }, { x: '120%', opacity: 0, duration: 0.9, ease: 'power2.out' });
  };

  const onCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -4;
    const ry = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  4;
    gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.3, ease: 'power2.out', transformPerspective: 900, overwrite: 'auto' });
  };

  const onCardLeave = (e) => {
    const card = e.currentTarget;
    const img  = card.querySelector('.doctor-img');
    gsap.to(img,  { scale: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(card, { y: 0, scale: 1, rotateX: 0, rotateY: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', borderColor: 'rgba(0,168,107,0.04)', duration: 0.5, ease: 'power2.out' });
  };

  return (
    <section
      ref={sectionRef}
      id="doctors"
      className="relative w-full py-14 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-14 bg-[#F8FBFA] overflow-hidden"
    >
      {/* Soft emerald radial glow behind header */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle floating ambient blur circles */}
      <div className="absolute top-1/3 left-10 w-24 h-24 bg-teal-500/5 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        
        {/* Heading Section */}
        <div ref={headerRef} className="text-center max-w-3xl mb-16 flex flex-col items-center">
          <span className="label text-emerald-600 font-semibold text-xs tracking-[0.25em] uppercase block mb-3 opacity-0">
            OUR DOCTORS
          </span>
          <h2 className="title text-[#111827] text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 opacity-0">
            Meet Our Specialists
          </h2>
          <p className="subtitle text-[#5F6B76] text-sm sm:text-base md:text-lg leading-[1.6] opacity-0 max-w-2xl font-light">
            Our experienced team of specialists combines advanced medical expertise with compassionate care to deliver personalized treatment for every patient.
          </p>
        </div>

        {/* Marquee Card Strip */}
        <div 
          ref={marqueeContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full relative overflow-x-auto md:overflow-hidden snap-x snap-mandatory flex scrollbar-none py-6 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div 
            ref={marqueeTrackRef}
            className="flex gap-6 w-max select-none"
          >
            {duplicatedDoctors.map((doc, idx) => (
              <div
                key={idx}
                onMouseEnter={onCardEnter}
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
                className="group relative w-[280px] h-[380px] rounded-[28px] overflow-hidden border border-emerald-500/5 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-colors duration-400 ease-out cursor-pointer flex-shrink-0 snap-start"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Doctor Portrait Image */}
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="doctor-img absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
                />

                {/* Ambient dark-to-light gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent z-10" />

                {/* Shine Sweep Overlay (Glass effect sweep on hover) */}
                <div className="shine-overlay absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] pointer-events-none z-20" />

                {/* Bottom Text Details */}
                <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                  <h3 className="font-semibold text-xl text-[#0F172A] leading-tight mb-1">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                    {doc.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14">
          <button className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-white border border-emerald-500/20 text-emerald-600 hover:text-white font-medium text-sm rounded-full shadow-md transition-all duration-300 hover:bg-emerald-600 hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/15 hover:-translate-y-0.5 cursor-pointer">
            <span>View All Doctors</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Doctors;

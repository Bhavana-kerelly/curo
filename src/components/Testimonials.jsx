import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ChevronLeft, ChevronRight, Star, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const quoteContainerRef = useRef(null);
  const quoteRef = useRef(null);
  const infoRef = useRef(null);
  const bottomRef = useRef(null);
  const navRef = useRef(null);
  const timerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      quote: "Dr. Sivani Payneni has transformed my understanding of diabetes management. Her thorough explanations and personalized treatment plan have helped me maintain better blood sugar control than I've had in years.",
      patient: "Mrs. Lakshmi Devi",
      initials: "LD",
      profession: "Kokapet Resident",
      doctor: "Dr. Sivani Payneni",
      specialty: "General Medicine & Diabetes"
    },
    {
      quote: "Dr. Shivaharika Rayudu My pregnancy journey became far less stressful thanks to the expertise and reassurance I received. I always felt confident that I was in the best hands.",
      patient: "Priya Sharma",
      initials: "PS",
      profession: "Software Engineer",
      doctor: "Dr. Shivaharika Rayudu",
      specialty: "Gynecology & Women's Health"
    },
    {
      quote: "After years of chronic sinus problems, I finally found lasting relief. The diagnosis, treatment and follow-up care completely exceeded my expectations.",
      patient: "Ravi Kumar",
      initials: "RK",
      profession: "Local Business Owner",
      doctor: "Dr. Feroz Basha Shaik",
      specialty: "ENT & Head & Neck Surgery"
    },
    {
      quote: "Our family's dental visits have become comfortable and stress-free. The gentle approach with children and exceptional care for adults has earned our complete trust.",
      patient: "Anjali Reddy",
      initials: "AR",
      profession: "Marketing Professional",
      doctor: "Dr. Yogini Khetawat",
      specialty: "Dental Care"
    },
    {
      quote: "The modern facilities together with expert ENT care made a remarkable difference in my treatment. Every detail of my experience reflected professionalism and genuine compassion.",
      patient: "Suresh Patel",
      initials: "SP",
      profession: "Business Owner",
      doctor: "Dr. Feroz Basha Shaik",
      specialty: "ENT & Head & Neck Surgery"
    }
  ];

  // ----------------------------------------------------
  // ENTRANCE ANIMATIONS (ScrollTrigger)
  // ----------------------------------------------------
  useEffect(() => {
    // SPLIT TEXT for testimonials header
    const labelEl = headerRef.current.querySelector('.label');
    const titleEl = headerRef.current.querySelector('.title');
    const subtitleEl = headerRef.current.querySelector('.subtitle');

    const splitLabel = new SplitType(labelEl, { types: 'chars' });
    gsap.set(splitLabel.chars, { opacity: 0, y: 8 });

    const splitTitle = new SplitType(titleEl, { types: 'words,lines' });
    gsap.set(splitTitle.words, { opacity: 0, y: 50, skewY: 4 });

    const splitSubtitle = new SplitType(subtitleEl, { types: 'words' });
    gsap.set(splitSubtitle.words, { opacity: 0, y: 18 });

    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });

    // Label chars appear
    entranceTl.to(splitLabel.chars, {
      opacity: 1,
      y: 0,
      stagger: { amount: 0.3, from: 'start' },
      duration: 0.35,
      ease: 'power2.out'
    });

    // Title words cascade with skew correction
    entranceTl.to(splitTitle.words, {
      opacity: 1,
      y: 0,
      skewY: 0,
      stagger: 0.07,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.1');

    // Subtitle words fade
    entranceTl.to(splitSubtitle.words, {
      opacity: 1,
      y: 0,
      stagger: 0.025,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.5');

    entranceTl.fromTo(quoteContainerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    entranceTl.fromTo(navRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    );

    entranceTl.fromTo(bottomRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      splitLabel.revert();
      splitTitle.revert();
      splitSubtitle.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // ----------------------------------------------------
  // TESTIMONIAL CHANGING ANIMATION
  // ----------------------------------------------------
  const handleTransition = (nextIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
      }
    });

    // Current testimonial fades out, blurs, and moves upward
    tl.to([quoteRef.current, infoRef.current], {
      opacity: 0,
      y: -20,
      filter: 'blur(6px)',
      duration: 0.4,
      stagger: 0.05,
      ease: 'power3.in'
    });
  };

  useEffect(() => {
    // Current state transition triggers fade-in of the new testimonial
    gsap.fromTo(quoteRef.current,
      { opacity: 0, filter: 'blur(6px)', y: 20 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo(infoRef.current,
      { opacity: 0, filter: 'blur(6px)', y: 15 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.6, ease: 'power3.out', delay: 0.15 }
    );
  }, [currentIndex]);

  // ----------------------------------------------------
  // AUTOPLAY EFFECT (Pause on Hover)
  // ----------------------------------------------------
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovered, isTransitioning]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    handleTransition(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    handleTransition(prevIndex);
  };

  // Touch Swipe for Mobile
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart.current - touchEnd.current > 75) {
      handleNext(); // Swipe left -> Next
    }
    if (touchStart.current - touchEnd.current < -75) {
      handlePrev(); // Swipe right -> Previous
    }
  };

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full py-10 sm:py-12 px-6 md:px-12 lg:px-20 bg-[#F8FBFA] overflow-hidden"
    >
      {/* Background radial glow and floating circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Medical-inspired float particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 right-10 w-2 h-2 bg-emerald-600/30 rounded-full blur-[1px]" />
        <div className="absolute bottom-20 left-10 w-3 h-3 bg-emerald-500/20 rounded-full blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col items-center">

        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-3xl mb-12 flex flex-col items-center">
          <span className="label text-emerald-600 font-semibold text-xs tracking-[0.25em] uppercase block mb-5">
            PATIENT TESTIMONIALS
          </span>
          <h2 className="title text-[#0F172A] text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
            Healing Experiences, <br />
            Shared by Our Patients
          </h2>
          <p className="subtitle text-slate-600 text-lg leading-[1.6] max-w-3xl mt-[28px] font-light">
            Every patient journey reflects our commitment to compassionate care, clinical excellence, and personalized treatment across every specialty at Curo Clinics.
          </p>
        </div>

        {/* Immersive Single Testimonial Quote */}
        <div
          ref={quoteContainerRef}
          className="relative w-full max-w-5xl text-center mb-8 flex flex-col items-center min-h-[220px] lg:min-h-[160px]"
        >
          {/* Huge quotation marks behind the text */}
          <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 text-emerald-500/5 text-[150px] sm:text-[220px] font-serif pointer-events-none select-none">
            “
          </div>

          <div ref={quoteRef} className="relative z-10 text-slate-800 text-2xl sm:text-3xl lg:text-[32px] font-light leading-[1.5] max-w-4xl px-4">
            {current.quote}
          </div>

          {/* Patient Details & Consulted Doctor */}
          <div ref={infoRef} className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            {/* Initials Avatar */}
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 rounded-full flex items-center justify-center font-semibold text-lg shadow-sm">
              {current.initials}
            </div>

            <div className="text-left flex flex-col items-center sm:items-start">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-lg text-slate-900">{current.patient}</span>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[10px] font-semibold rounded-full uppercase tracking-wider">
                  Consulted {current.doctor}
                </span>
              </div>
              <span className="text-xs text-slate-500 mt-1 sm:mt-0">
                {current.profession} · {current.specialty}
              </span>
            </div>
          </div>
        </div>

        {/* Circular Next/Prev Navigation */}
        <div ref={navRef} className="flex items-center gap-4 mb-8">
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="w-[52px] h-[52px] bg-white border border-emerald-500/20 hover:bg-emerald-600 hover:text-white rounded-full flex items-center justify-center text-emerald-600 shadow-md transition-all duration-300 transform hover:scale-108 cursor-pointer disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="w-[52px] h-[52px] bg-white border border-emerald-500/20 hover:bg-emerald-600 hover:text-white rounded-full flex items-center justify-center text-emerald-600 shadow-md transition-all duration-300 transform hover:scale-108 cursor-pointer disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>



      </div>
    </section>
  );
};

export default Testimonials;

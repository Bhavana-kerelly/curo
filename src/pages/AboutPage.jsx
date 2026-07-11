import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Award, Compass, Users, Heart, CheckCircle2, Activity, Stethoscope, Phone, Calendar, Eye, Flag } from 'lucide-react';
import Footer from '../components/Footer';
import VisionMission from '../components/VisionMission';
import hospitalImg from '../assets/hospital.png';
import card1Img from '../assets/card1.png';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Fade in animations
    gsap.fromTo('.about-hero-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo('.about-hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
    );

    gsap.fromTo('.about-hero-stats',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
    );

    // Scroll reveal sections
    gsap.from('.reveal-item', {
      scrollTrigger: {
        trigger: '.reveal-container',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { value: '15+', label: 'Experienced Specialists' },
    { value: '25,000+', label: 'Happy Patients' },
    { value: '100%', label: 'Clinical Accuracy' },
    { value: '24/7', label: 'Emergency Support' }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      title: 'Patient-First Compassion',
      desc: 'We treat every patient like family, providing a warm, supportive, and understanding medical environment.'
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: 'Clinical Excellence',
      desc: 'Our board-certified specialists follow rigorous medical guidelines to deliver accurate and high-quality diagnostics.'
    },
    {
      icon: <Compass className="w-6 h-6 text-emerald-600" />,
      title: 'Integrity & Transparency',
      desc: 'No hidden costs, no unnecessary tests. Transparent consultation, treatment planning, and billing systems.'
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: 'Multidisciplinary Care',
      desc: 'Collaborative consultations across 7+ specialties under one roof for complete family healthcare.'
    }
  ];

  return (
    <main className="w-full bg-[#EBF1F5] text-[#1E293B] pt-[90px]">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative w-full bg-gradient-to-br from-[#A6DDD5] via-[#5FB1A5] to-[#085249] pt-16 pb-32 sm:pb-44 px-6 md:px-12 lg:px-20">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left pb-10">
            <h1 className="about-hero-title font-display text-[44px] sm:text-[58px] lg:text-[72px] font-bold text-white tracking-tight leading-[1.05] mb-6">
              The Best Medical <br />
              and Treatment <br />
              Center for You
            </h1>
            <p className="about-hero-subtitle text-white/90 text-base sm:text-lg font-light leading-relaxed max-w-xl mb-10">
              We understand that injuries and acute pain can happen unexpectedly. Our emergency
            </p>
            
            <a 
              href="/#schedule"
              className="about-hero-subtitle inline-flex items-center justify-center px-10 py-4 bg-white text-[#085249] hover:bg-slate-100 font-semibold text-sm rounded-full shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              Make Appointment
            </a>
          </div>

          {/* Right Column: Custom Doctor Cutout Layout */}
          <div className="lg:col-span-5 flex justify-center items-end relative h-[420px] sm:h-[520px] mt-10 lg:mt-0">
            {/* Circular Base Backdrop */}
            <div className="absolute w-[290px] h-[290px] sm:w-[370px] sm:h-[370px] rounded-full bg-[#0A3D29] flex items-end justify-center overflow-hidden border-[6px] border-emerald-500/10 shadow-xl bottom-4">
              {/* Doctor Cutout inside circle */}
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&h=800&q=80" 
                alt="Professional Doctor Cutout" 
                className="h-[340px] sm:h-[440px] w-auto object-contain z-10 relative -bottom-2"
              />
            </div>
            
            {/* Crescent Outline Rings (Left and Right Arcs matching reference screenshot) */}
            <div className="absolute border-[12px] border-l-transparent border-t-transparent border-b-transparent border-[#80C0B0]/30 w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] rounded-full pointer-events-none rotate-[45deg] bottom-0" />
            <div className="absolute border-[12px] border-r-transparent border-t-transparent border-b-transparent border-[#80C0B0]/20 w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full pointer-events-none rotate-[-45deg] bottom-[-20px]" />
          </div>
        </div>
      </section>

      {/* 1.5 Vision & Mission Premium Section */}
      <VisionMission />

      {/* 2. Brand Story / Journey */}
      <section className="relative w-full py-16 sm:py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Interactive Image Box */}
          <div className="relative group rounded-[36px] overflow-hidden border border-emerald-500/10 shadow-xl bg-white p-2">
            <img 
              src={hospitalImg} 
              alt="Curo Clinics Hospital Exterior" 
              className="w-full h-[400px] sm:h-[500px] object-cover rounded-[28px] transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Embedded Capsule details */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-lg">
              <span className="text-[10px] tracking-wider text-emerald-700 font-bold uppercase block mb-1">OUR LOCATION</span>
              <p className="text-sm font-semibold text-[#102A43]">Kokapet One Mall, Narsingi, Hyderabad</p>
            </div>
          </div>

          {/* Right: Story Text */}
          <div className="flex flex-col text-left">
            <span className="text-[11px] tracking-[0.25em] font-semibold text-emerald-700 uppercase block mb-3">OUR STORY</span>
            <h2 className="font-firs text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#102A43] mb-6">
              Accessible Care, <br />Every Single Day
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light mb-6">
              Founded with the vision to make high-quality, continuous medical consultations accessible, Curo Clinics is Kokapet’s leading multispeciality healthcare facility. We bridge the gap between primary care consultation and advanced diagnostics, delivering all services seamlessly under a single roof.
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light mb-8">
              Whether you need pediatrician guidelines for your children, specialized gynecology support, advanced ENT surgeries, general health checks, or professional dental care, our board-certified specialist team provides custom treatment plans with utmost care.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Extended Consultation Hours', 'Advanced Digital Records', 'In-House Laboratory Tests', 'Compassionate Medical Team'].map((feat, idx) => (
                <li key={idx} className="flex items-center gap-3 text-[#102A43] text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="reveal-container relative w-full py-16 sm:py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-transparent to-emerald-500/5 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full text-center flex flex-col items-center">
          <span className="text-[11px] tracking-[0.25em] font-semibold text-emerald-700 uppercase block mb-3">OUR CORE VALUES</span>
          <h2 className="font-firs text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#102A43] mb-12">
            The Pillars of Our Excellence
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div 
                key={idx}
                className="reveal-item group bg-white border border-emerald-500/5 hover:border-emerald-500/30 p-8 rounded-[28px] text-left transition-all duration-300 transform hover:-translate-y-1.5 shadow-sm hover:shadow-md"
              >
                <div className="mb-6 p-4 w-fit bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-colors duration-300">
                  {val.icon}
                </div>
                <h3 className="text-[#102A43] text-lg font-semibold mb-3 font-display">
                  {val.title}
                </h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxury CTA */}
      <section className="relative w-full py-16 sm:py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative w-full bg-white border border-emerald-500/10 rounded-[48px] p-8 md:p-16 shadow-lg overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="text-left relative z-10 max-w-2xl">
              <span className="text-[11px] tracking-[0.25em] font-semibold text-emerald-700 uppercase block mb-3">EXPERIENCE CURO CLINICS</span>
              <h2 className="font-firs text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#102A43] mb-4">
                Redefining Healthcare <br />For Your Whole Family
              </h2>
              <p className="text-slate-500 text-base font-light leading-relaxed">
                Connect with our patient-first coordinators today or schedule an appointment online to experience luxury clinical care.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a 
                href="/#schedule"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00A86B] to-[#00895A] text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg hover:shadow-emerald-500/15 hover:scale-[1.02] transition-all duration-300"
              >
                <span>Book Appointment</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a 
                href="tel:+918919942870"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-emerald-500/20 text-emerald-600 font-semibold text-sm rounded-full shadow-sm hover:bg-emerald-500/5 transition-all duration-300"
              >
                <span>Call +91 89199 42870</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer />
    </main>
  );
};

export default AboutPage;

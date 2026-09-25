import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  ArrowLeft, CheckCircle2, Calendar, Phone, Clock, 
  AlertCircle, Layers, Sparkles, Stethoscope, ChevronRight, ArrowRight
} from 'lucide-react';
import Footer from '../components/Footer';
import { specialtiesData } from '../data/specialtiesData';
import { useBooking } from '../context/BookingContext';

const SingleSpecialtyPage = ({ deptId }) => {
  const pageRef = useRef(null);
  const { openBookingModal } = useBooking();

  // Robustly clean and match target department data by exact ID first
  const cleanId = (deptId || '').split('?')[0].split('/')[0].trim().toLowerCase();
  const specialty = specialtiesData.find(s => s.id.toLowerCase() === cleanId) ||
                    specialtiesData.find(s => s.name.toLowerCase() === cleanId) ||
                    specialtiesData.find(s => s.name.toLowerCase().startsWith(cleanId)) ||
                    specialtiesData[0];
  const otherSpecialties = specialtiesData.filter(s => s.id.toLowerCase() !== specialty.id.toLowerCase());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      gsap.fromTo('.specialty-fade',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [deptId]);

  return (
    <main ref={pageRef} className="w-full bg-[#052E2B]/10 text-slate-800 overflow-hidden font-sans">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative w-full pt-[140px] pb-24 lg:pt-[170px] lg:pb-32 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#0C3E38] via-[#053D38] to-[#022421] text-white overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="specialty-fade flex items-center gap-2 text-xs text-emerald-200/80 mb-6 font-medium">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <a href="/services" className="hover:text-white transition-colors">Specialties</a>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-emerald-400 font-semibold">{specialty.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="specialty-fade inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold text-emerald-300 tracking-[0.2em] uppercase">
                  {specialty.category}
                </span>
              </div>

              <h1 className="specialty-fade font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] text-white tracking-tight">
                {specialty.name}
              </h1>

              <p className="specialty-fade text-emerald-100/90 text-lg md:text-xl font-light italic border-l-2 border-emerald-400/60 pl-4">
                "{specialty.heroTagline}"
              </p>

              <p className="specialty-fade text-white/80 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                {specialty.introduction}
              </p>

              {/* Action buttons */}
              <div className="specialty-fade flex flex-wrap gap-4 pt-2">
                <button
                  onClick={openBookingModal}
                  className="px-7 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-xs rounded-full shadow-lg shadow-emerald-500/20 hover:scale-[1.03] transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
                <a
                  href="tel:+918919942870"
                  className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-xs rounded-full backdrop-blur-md hover:scale-[1.03] transition-all duration-300 flex items-center gap-2.5"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call +91 89199 42870</span>
                </a>
              </div>
            </div>

            {/* Right Card / Banner Image */}
            <div className="lg:col-span-5 relative specialty-fade">
              <div className="relative rounded-[32px] overflow-hidden border-2 border-white/20 shadow-2xl group h-[380px] lg:h-[420px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${specialty.bgImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022421]/90 via-[#022421]/30 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-left text-white z-10">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">CURO CLINICS KOKAPET</span>
                  <h3 className="text-xl font-bold">{specialty.name} Department</h3>
                  <p className="text-white/70 text-xs font-light mt-1">State-of-the-art diagnostic and clinical setup</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DOCTOR SPECIALIST SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 bg-gradient-to-br from-emerald-50/60 via-white to-slate-50 border border-emerald-500/15 rounded-[36px] p-8 md:p-12 shadow-xl shadow-emerald-500/5">
            
            {/* Doctor Image */}
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-2xl flex-shrink-0 relative">
              <img 
                src={specialty.doctor.image} 
                alt={specialty.doctor.name} 
                className={`w-full h-full object-cover ${
                  specialty.doctor.name?.toLowerCase().includes('feroz') || specialty.doctor.image?.includes('feroz') ? 'object-[center_60%]' : 'object-top'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent pointer-events-none" />
            </div>

            {/* Doctor Meta */}
            <div className="text-left space-y-4 max-w-2xl">
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/90 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                LEAD CONSULTANT SPECIALIST
              </span>

              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800">
                {specialty.doctor.name}
              </h2>

              <p className="text-emerald-700 text-sm font-semibold">
                {specialty.doctor.qualification}
              </p>

              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                <span>{specialty.doctor.experience}</span>
              </div>

              <p className="text-slate-600 text-sm font-light leading-relaxed">
                {specialty.doctor.bio}
              </p>

              {/* Consultation Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={`https://wa.me/918919942870?text=${encodeURIComponent(`Hello Curo Clinics,\n\nI would like to book an appointment for ${specialty.name} with ${specialty.doctor.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#053D38] hover:bg-emerald-900 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book via WhatsApp</span>
                </a>
                <a
                  href="tel:+918919942870"
                  className="px-6 py-3.5 bg-emerald-100/80 hover:bg-emerald-200/80 text-[#053D38] font-bold text-xs rounded-full transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 89199 42870</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CONDITIONS TREATED & TREATMENTS GRID */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-slate-50/70">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* CONDITIONS TREATED */}
          <div className="text-left">
            <span className="text-[10px] font-bold text-emerald-700 tracking-[0.25em] uppercase block mb-2">
              CLINICAL COVERAGE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-8">
              Conditions We Treat
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialty.conditions.map((condition, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 p-5 rounded-2xl flex items-start gap-3.5 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 pt-1">{condition}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TREATMENTS & SERVICES */}
          <div className="text-left">
            <span className="text-[10px] font-bold text-emerald-700 tracking-[0.25em] uppercase block mb-2">
              SERVICES & CARE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-8">
              Treatments & Clinical Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialty.treatments.map((treatment, idx) => (
                <div key={idx} className="bg-white border border-emerald-500/15 p-5 rounded-2xl flex items-start gap-3.5 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-100/70 flex items-center justify-center flex-shrink-0 text-emerald-700 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 pt-1">{treatment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ADVANCED PROCEDURES & TECH */}
          <div className="bg-gradient-to-br from-[#053D38] to-[#022421] rounded-[32px] p-8 md:p-12 text-white text-left shadow-2xl">
            <span className="text-[10px] font-bold text-emerald-400 tracking-[0.25em] uppercase block mb-2">
              CLINICAL EXCELLENCE
            </span>
            <h2 className="font-serif text-3xl font-light mb-6">
              Advanced Procedures & Technologies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specialty.procedures.map((procedure, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-start gap-3">
                  <Layers className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-white">{procedure}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE CURO & HOURS */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Why Choose Us */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-[10px] font-bold text-emerald-700 tracking-[0.25em] uppercase block">
              PATIENT REASSURANCE
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-800">
              Why Choose Curo Clinics for {specialty.name}?
            </h2>

            <div className="space-y-4">
              {specialty.whyChooseUs.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-slate-700 text-sm font-light leading-relaxed">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold text-xs mt-0.5">
                    ✓
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Hours & Support */}
          <div className="lg:col-span-5 bg-emerald-50/70 border border-emerald-500/20 rounded-[28px] p-8 text-left space-y-6">
            <h3 className="font-serif text-2xl font-bold text-slate-800">
              Consultation Schedule
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-700 text-xs">
                <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-800 mb-1">OPD Timings</span>
                  <p className="font-light leading-relaxed">{specialty.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-emerald-800 text-xs font-semibold pt-2 border-t border-emerald-200/60">
                <AlertCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block mb-1">Emergency Support</span>
                  <p className="font-light text-slate-700">{specialty.emergency}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={openBookingModal}
                className="w-full py-4 bg-[#053D38] hover:bg-emerald-950 text-white font-bold text-xs rounded-full shadow-md transition-all text-center cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. EXPLORE OTHER SPECIALTIES */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-slate-900 text-white text-left">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 tracking-[0.25em] uppercase block mb-1">
                MULTISPECIALTY CARE
              </span>
              <h2 className="font-serif text-3xl font-bold text-white">Explore Other Specialties</h2>
            </div>
            <a href="/services" className="text-emerald-400 font-bold text-xs hover:underline flex items-center gap-1">
              <span>View All Departments</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherSpecialties.map((other) => (
              <a
                key={other.id}
                href={`/specialty/${other.id}`}
                className="group bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block mb-2">{other.category}</span>
                  <h4 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors mb-2">{other.name}</h4>
                  <p className="text-slate-400 text-xs font-light line-clamp-2">{other.introduction}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Department</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default SingleSpecialtyPage;

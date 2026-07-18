import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBooking } from '../context/BookingContext';
import { 
  Search, Calendar, Phone, Clock, Globe, Award, BookOpen, 
  CheckCircle2, Compass, Stethoscope, ChevronLeft, ChevronRight, X 
} from 'lucide-react';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Helper for 3D tilt effects on Doctor Profile Image
const LargeDoctorImage = ({ src, name }) => {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -15;
    const rotateY = ((x / rect.width) - 0.5) * 15;
    containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    containerRef.current.style.setProperty('--mx', `${x}px`);
    containerRef.current.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-full aspect-[4/5] rounded-[36px] overflow-hidden border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white/10 backdrop-blur-[20px] group cursor-pointer transition-all duration-300 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {/* Glass reflections & soft glow overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), rgba(24,200,160,0.18), transparent 75%)`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#053D38]/10 via-transparent to-white/10 pointer-events-none" />
    </motion.div>
  );
};

const DoctorsPage = () => {
  const { openBookingModal } = useBooking();
  const pageRef = useRef(null);
  const scrollerTrackRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeDoctorOverlay, setActiveDoctorOverlay] = useState(null);

  const doctorsData = [
    {
      id: 'sivani-payneni',
      name: 'Dr. Sivani Payneni',
      specialty: 'Consultant Physician & Diabetologist',
      department: 'General Medicine & Diabetes',
      experience: '8+ Years Experience',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=550&q=80',
      about: 'Dr. Sivani Payneni is a highly dedicated and experienced Consultant Physician & Diabetologist with over 8 years of clinical experience in managing chronic lifestyle diseases and metabolic conditions. Based in Kondapur, Hyderabad, she is known for her patient-centric approach, combining accurate diagnosis with evidence-based treatment plans tailored to each individual.\n\nShe holds a Fellowship in Diabetology (F. DIAB) and specializes in the management of diabetes, hypertension, thyroid disorders, dyslipidemia, and obesity. Dr. Sivani provides both outpatient and inpatient care, focusing on long-term disease control and overall wellness. Her strong emphasis on lifestyle management, diet counseling, and non-communicable disease (NCD) prevention has made her a trusted health partner in the community.',
      education: [
        'MBBS, Andhra Medical College, Visakhapatnam (2007)',
        'PG Diploma in Clinical Endocrinology & Diabetes, Royal College of Physicians, London (2017-18)',
        'Certificate in Gestational Diabetes Mellitus (CCGDM), Dr. Mohan’s, Hyderabad (2019)',
        'Certificate in Management of Thyroid Disorders (CCMTD), PHFI (2017-18)',
        'Certificate in Evidence-Based Diabetes Management (CCEBDM), Dr. Mohan’s (2016)',
        'Certificate Course in Management of Hypertension (2018-19)'
      ],
      specializations: [
        'Diagnosing and Managing all general ailments including SARS COV 19 infections',
        'Managing all types of Diabetes (Type 1, Type 2, GDM)',
        'Managing acute and chronic complications of Diabetes',
        'Comorbidities: Hypertension, Dyslipidemia, Thyroid disorders, Obesity',
        'Comprehensive Diet Counselling'
      ],
      languages: ['English', 'Telugu', 'Hindi'],
      timings: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      conditions: [
        'Prediabetes & Metabolic Syndrome',
        'Type 1 & Type 2 Diabetes Mellitus',
        'Hypertension (High Blood Pressure)',
        'Hypercholesterolemia (High Cholesterol)',
        'Thyroid Dysfunction (Hypo/Hyperthyroidism)',
        'Viral Fevers & Chronic Internal Diseases'
      ],
      memberships: [
        'Lifetime member in RSSDI',
        'House Physician in Gastroenterology at PGIMER - Chandigarh (2009-2010)',
        'Consultant Physician at Dr. Mohan’s Diabetes Specialty Center (2016-2020)',
        'Consultant Physician at Apollo Sugar Clinics, Kondapur (2021-date)',
        'Consultant Physician for Zyla Health (2023-date)'
      ],
      awards: [
        'Successfully helped numerous patients achieve better control over diabetes and lifestyle-related complications through comprehensive treatment plans.',
        'Over 8 years of experience in internal medicine and diabetology, managing thousands of chronic disease cases with high patient satisfaction.',
        'Attended National & Regional CMEs and Webinars as a Speaker.'
      ]
    },
    {
      id: 'feroz-basha',
      name: 'Dr. Feroz Basha Shaik',
      specialty: 'Consultant ENT / Otorhinolaryngologist',
      department: 'ENT Care',
      experience: '8+ Years Experience',
      image: '/feroz_basha.jpg',
      about: 'Dr. Feroz Basha Shaik is a highly experienced ENT specialist with a focused approach to diagnosing and treating a wide range of ear, nose, and throat conditions. With over a decade of experience, he combines deep clinical knowledge with advanced techniques to deliver effective, patient-centered care.\n\nHe completed his MBBS from Dr. NTR University of Health Sciences, Andhra Pradesh in 2013, followed by his MS in ENT from NRI Medical College, Guntur in 2017. Dr. Feroz is known for his thorough diagnostic skills and individualized treatment plans that prioritize both recovery and comfort. His expertise covers a wide array of ENT issues—from common complaints like ear discharge and nasal congestion to complex cases involving head & neck masses, voice disorders, and swallowing difficulties.',
      education: [
        'MBBS from Dr. NTR University of Health Sciences (2013)',
        'MS in ENT from NRI Medical College, Guntur (2017)'
      ],
      specializations: [
        'Hernia Surgery (Open and Laparoscopic)',
        'Appendix Surgery (Appendectomy)',
        'Hemorrhoids Treatments (Laser/stapler/conventional)',
        'Fistula-in-ano (Fistulotomy) & Fissure-in-ano (Sphincterotomy)',
        'Gall Bladder Surgery (Laparoscopic Cholecystectomy)',
        'Thyroid Disorders (Medical Management, Thyroidectomy)',
        'Wound Care (Debridement, Skin Grafting, Diabetic Foot)',
        'G.I, Biliary Tract & Pancreatic Disorders'
      ],
      languages: ['English', 'Telugu', 'Hindi', 'Urdu'],
      timings: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      conditions: [
        'Ear Discharge & Nasal Congestion',
        'Head & Neck Masses',
        'Voice Disorders',
        'Swallowing Difficulties',
        'Allergic Rhinitis',
        'Sensorineural Hearing Loss'
      ],
      memberships: [
        'Known for patient care, understanding, and treatment with minimal pain and best recovery possible.',
        'Over 8 years of clinical experience treating ENT-related disorders across diverse age groups.'
      ],
      awards: [
        'GARLAPATI SARABANDI GOLD MEDAL (2015)',
        'A Comparative Study of Cetirizine vs. Nasal Spray in Allergic Rhinitis (Publication)',
        'Association between Diabetes Mellitus and Sensorineural Hearing Loss (Publication)',
        'Comprehensive Clinical Analysis of Non-Malignant Laryngeal Lesions (Publication)',
        'A Clinical Study of Laryngeal Cysts (Publication)',
        'Foreign Bodies of External Auditory Canal in Children (Publication)',
        'Comparison of the Efficacy between Ginkgo Biloba and Caroverine in Idiopathic Tinnitus (Publication)',
        'Schwannoma of the Submandibular Gland: A Rare Case Report (Publication)',
        'Type I Tympanoplasty: Five Golden Rules for 100% Success (Publication)'
      ]
    },

    {
      id: 'nagarjuna-doppalapudi',
      name: 'Dr. Nagarjuna Doppalapudi',
      specialty: 'General & Laparoscopic Surgery',
      department: 'General & Laparoscopic Surgery',
      experience: '8+ Years Experience',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=550&q=80',
      about: 'Dr. Nagarjuna Doppalapudi is a highly skilled and experienced General and Laparoscopic Surgeon with over 8+ years of clinical expertise. A graduate of Southern Medical University (MBBS, 2013), he completed his DNB in General Surgery from the Southern Railway Headquarters Hospital in 2018 and holds a Fellowship in Minimal Access Surgery (FIAGES), enhancing his proficiency in advanced laparoscopic procedures.\n\nKnown for his precision and dedication, Dr. Nagarjuna has worked at several reputed institutions, including Mahavir Institute of Medical Sciences (Vikarabad), GR Hospital (Coimbatore), PRK Hospitals (Chanda Nagar), and Citi Neuro Centre (Miyapur). His practice focuses on both conventional and minimally invasive surgical techniques, offering safe and effective solutions for a wide spectrum of surgical conditions.',
      education: [
        'MBBS - Southern Medical University (2013)',
        'DNB in General Surgery - Southern Railway Headquarters Hospital (2018)',
        'Fellowship in Minimal Access Surgery (FIAGES) (2018)'
      ],
      specializations: [
        'Over 8 years of surgical experience in high-volume hospitals and multi-specialty centers.',
        'Successfully performed numerous laparoscopic and open surgeries with excellent outcomes.'
      ],
      languages: ['English', 'Telugu', 'Hindi'],
      timings: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      conditions: [
        'Gallstones & Gallbladder Disease',
        'Appendicitis (Acute & Recurrent)',
        'Inguinal, Umbilical, Femoral & Incisional Hernias',
        'Piles (Hemorrhoids), Anal Fissures & Fistula-in-ano',
        'Varicose Veins & Chronic Venous Inadequacy',
        'Thyroid Goiters & Skin/Subcutaneous Swellings'
      ],
      memberships: [
        'Mahavir Institute of Medical Sciences (Vikarabad)',
        'GR Hospital (Coimbatore)',
        'PRK Hospitals (Chanda Nagar)',
        'Citi Neuro Centre (Miyapur)'
      ],
      awards: [
        'Dr. Nagarjuna Doppalapudi is a highly skilled and experienced Consultant General & Laparoscopic Surgeon with over 8+ years of clinical expertise.',
        'Fellowship in Minimal Access Surgery (FIAGES) (2018) - Completed the prestigious FIAGES Fellowship, specializing in advanced laparoscopic techniques.',
        'Overall Expertise (2019) - Recognized for his patient-first approach, surgical precision, and ethical clinical practice.'
      ]
    },

    {
      id: 'sivaharika-rayudu',
      name: 'Dr. Sivaharika Rayudu',
      specialty: 'Obstetrician & Gynecologist',
      department: "Gynaecology & Women's Health",
      experience: '7+ Years Experience',
      image: '/sivaharika.jpg',
      about: 'Dr. Sivaharika Rayudu, MBBS, DNB, holds advanced qualifications including a Diploma in Assisted Reproductive Technology (ART) from KIEL, Germany, and a Diploma in Cosmetic Gynaecology from ICCG. With a compassionate approach and a deep commitment to women’s health, she offers a wide range of gynecological and reproductive care services. Her expertise spans menstrual disorders, PCOS, endometriosis, adolescent gynecology, and infertility treatments. She provides comprehensive pre-conceptional counseling, antenatal care, and specializes in managing high-risk pregnancies, painless deliveries, and LSCS.\n\nDr. Sivaharika Rayudu also focuses on postnatal rehabilitation, family planning, and cervical cancer screening, ensuring holistic care for women at every stage of life. Her personalized and confidential care makes her a trusted choice for women seeking modern, evidence-based gynecological solutions.',
      education: [
        'MBBS from Southern Medical University (2013)',
        'DNB OBG from Kuppuswamy Naidu Memorial Hospital (2019)',
        'Advance Diploma in ART (KIEL-Germany)',
        'Diploma in Cosmetic Gynaecology (ICCG)'
      ],
      specializations: [
        'Menstrual Disorders & PCOS',
        'Endometriosis & Adolescent Gynecology',
        'Infertility Treatments',
        'High-risk Pregnancies & Painless Deliveries',
        'Postnatal Rehabilitation & Family Planning'
      ],
      languages: ['English', 'Telugu', 'Hindi'],
      timings: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      conditions: [
        'Polycystic Ovary Syndrome (PCOS)',
        'Endometriosis, Menstrual Cramps & Irregular Periods',
        'High-Risk Gestation (Gestational Diabetes, Preeclampsia)',
        'Uterine Fibroids & Ovarian Cystic Swellings',
        'Infertility & Preconception Hurdles',
        'Menopausal Symptoms & Osteoporosis Risks'
      ],
      memberships: [
        'Federation of Obstetric and Gynaecological Societies of India (FOGSI)',
        'Hyderabad Obstetric and Gynaecological Society (HOGS)'
      ],
      awards: [
        'Regularly invited to speak at national and international conferences on reproductive medicine and women’s wellness.',
        'Acknowledged for her patient-centric approach and clinical excellence by peers and patients alike.',
        'Recognized for excellence in women’s healthcare and infertility management with several accolades university.',
        'Actively involved in community outreach programs promoting adolescent health, cervical cancer awareness, and preventive gynecology.'
      ]
    },

    {
      id: 'yogini-khetawat',
      name: 'Dr. Yogini Khetawat',
      specialty: 'Dentist',
      department: 'Dental Care',
      experience: '12 Years Experience',
      image: '/yogini.jpg',
      about: 'With over a decade of clinical experience, Dr. Yogini Khetawat is a skilled and compassionate Dentist and Cosmetologist, renowned for her work, specialized in Dental related surgeries. Her advanced expertise covers a wide range of complex procedures.\n\nPreviously associated with Mark Hospitals, Suncity, Dr. Yogini is known for blending clinical precision with artistic insight, helping restore both function and appearance for patients with dental enhancement. Her deep commitment to patient care, especially in dental field and has earned her respect and trust from both patients and peers.',
      education: [
        'Dental Surgeon'
      ],
      specializations: [
        'Over 7 years of experience in dental, reconstructive, and cosmetic surgical care.',
        'Widely appreciated for complex surgeries.'
      ],
      languages: ['English', 'Telugu', 'Hindi', 'Gujarati'],
      timings: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      conditions: [
        'Dental Caries, Cavities & Tooth Sensitivity',
        'Gingivitis & Advanced Periodontitis (Gum Disease)',
        'Malocclusion & Misaligned Teeth spacing',
        'Tooth loss & partial edentulous arches',
        'Abscesses, severe toothaches & pulpitis',
        'Impacted Wisdom Teeth pain'
      ],
      memberships: [
        'Mark Hospitals (2018) - Valued team member known for empathetic approach and multidisciplinary collaboration.',
        'Expertise in Field (2020) - Regularly attends national surgical and cosmetic conferences to stay at the forefront of modern techniques.'
      ],
      awards: [
        'Dr Yogini is a highly skilled and experienced Dental specialist known for her skills and experience.',
        'Valued team member at Mark Hospitals, Suncity, known for her empathetic approach and multidisciplinary collaboration.',
        'Regularly attends national surgical and cosmetic conferences to stay at the forefront of modern techniques.'
      ]
    }
  ];

  // Set initial selected doctor
  useEffect(() => {
    if (doctorsData.length > 0 && !selectedDoctor) {
      setSelectedDoctor(doctorsData[0]);
    }
  }, []);

  // Filter doctors based on search and department
  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Departments list for filter dropdown
  const departments = ['All', ...new Set(doctorsData.map(doc => doc.department))];

  // GSAP animations for list, cards, floating hero circles
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Floating hero elements animation
      gsap.fromTo('.hero-avatar',
        { y: 15 },
        { 
          y: -15, 
          duration: 3.5, 
          repeat: -1, 
          yoyo: true, 
          ease: 'sine.inOut', 
          stagger: {
            each: 0.5,
            from: 'random'
          }
        }
      );

      // 2. Page fade in reveal
      gsap.fromTo('.fade-in-section',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Sync active doctor when search or filter reduces active selection
  useEffect(() => {
    if (filteredDoctors.length > 0) {
      // If current selected doctor is not in the filtered list, select the first filtered doctor
      const isStillInList = filteredDoctors.some(doc => doc.id === selectedDoctor?.id);
      if (!isStillInList) {
        setSelectedDoctor(filteredDoctors[0]);
      }
    } else {
      setSelectedDoctor(null);
    }
  }, [searchQuery, selectedDept, filteredDoctors, selectedDoctor]);

  const handleDoctorSelect = (doc) => {
    setSelectedDoctor(doc);
    // Smooth scroll to Featured Doctor card
    const element = document.getElementById('featured-doctor-spotlight');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Wheel scrolling translation for horizontal list
  const handleScrollWheel = (e) => {
    if (e.deltaY !== 0 && scrollerTrackRef.current) {
      e.preventDefault();
      scrollerTrackRef.current.scrollLeft += e.deltaY * 0.95;
    }
  };

  return (
    <main ref={pageRef} className="w-full bg-transparent text-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-[175px] pb-20 lg:pt-[207px] lg:pb-28 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#A6DDD5] via-[#5FB1A5] to-[#085249] overflow-hidden text-white">
        {/* Ambient Blur spheres */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-sm">
              <Compass className="w-4 h-4 text-teal-100 animate-spin-slow" />
              <span className="text-[10px] font-bold text-white tracking-[0.25em] uppercase">
                Kokapet's Medical Center
              </span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-6xl font-[300] tracking-tight leading-[1.1] mb-6">
              Meet Our <br />
              <span className="font-semibold text-teal-500 bg-white px-4 py-1 rounded-[24px] inline-block shadow-sm text-teal-950 mt-2">Specialists</span>
            </h1>
            
            <p className="text-white/90 text-sm sm:text-base font-light leading-relaxed max-w-md">
              Our experienced specialists provide personalized, compassionate care under one roof. Consult with Hyderabad's leading healthcare experts today.
            </p>
          </div>

          {/* Right Floating Doctors Column */}
          <div className="lg:col-span-6 flex justify-center items-center h-[350px] sm:h-[400px] relative">
            {/* Overlay Circle 1 (Dr. Sivani) */}
            <div className="hero-avatar absolute top-[10%] left-[10%] w-24 h-24 rounded-full overflow-hidden border-4 border-white/80 shadow-lg bg-emerald-500/10 backdrop-blur-[5px]">
              <img src={doctorsData[0].image} alt="" className="w-full h-full object-cover object-top" />
            </div>
            {/* Overlay Circle 2 (Dr. Feroz) */}
            <div className="hero-avatar absolute top-[5%] right-[20%] w-28 h-28 rounded-full overflow-hidden border-4 border-white/80 shadow-lg bg-emerald-500/10 backdrop-blur-[5px]">
              <img src={doctorsData[1].image} alt="" className="w-full h-full object-cover object-top" />
            </div>
            {/* Overlay Circle 3 (Dr. Anand) */}
            <div className="hero-avatar absolute top-[40%] left-[38%] w-32 h-32 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl bg-emerald-500/10 backdrop-blur-[5px]">
              <img src={doctorsData[2].image} alt="" className="w-full h-full object-cover object-top" />
            </div>
            {/* Overlay Circle 4 (Dr. Nagarjuna) */}
            <div className="hero-avatar absolute bottom-[8%] left-[12%] w-26 h-26 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white/80 shadow-lg bg-emerald-500/10 backdrop-blur-[5px]">
              <img src={doctorsData[3].image} alt="" className="w-full h-full object-cover object-top" />
            </div>
            {/* Overlay Circle 5 (Dr. Neha) */}
            <div className="hero-avatar absolute bottom-[10%] right-[12%] w-24 h-24 rounded-full overflow-hidden border-4 border-white/80 shadow-lg bg-emerald-500/10 backdrop-blur-[5px]">
              <img src={doctorsData[4].image} alt="" className="w-full h-full object-cover object-top" />
            </div>

          </div>
        </div>
      </section>

      {/* 2. HORIZONTAL DOCTOR CAROUSEL */}
      <section className="glass-section relative w-full py-8 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div 
            ref={scrollerTrackRef}
            onWheel={handleScrollWheel}
            className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-none"
          >
            {doctorsData.map((doc) => {
              const isActive = selectedDoctor?.id === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => handleDoctorSelect(doc)}
                  className="snap-start outline-none text-left"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    className={`w-[190px] p-4 rounded-[26px] bg-white/70 backdrop-blur-[15px] border transition-all duration-300 relative flex flex-col items-center text-center cursor-pointer select-none
                      ${isActive 
                        ? 'border-emerald-500/50 shadow-[0_12px_28px_rgba(0,168,107,0.08)] bg-white' 
                        : 'border-white/50 shadow-[0_8px_20px_rgba(0,0,0,0.02)]'
                      }
                    `}
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-3.5 border-2 border-white shadow-md relative">
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-emerald-500 rounded-full animate-ping opacity-60" />
                      )}
                    </div>
                    
                    <h3 className="font-serif text-sm font-semibold text-slate-800 line-clamp-1 mb-0.5">
                      {doc.name.replace('Dr. ', '')}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mb-2">
                      {doc.specialty}
                    </p>
                    
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {doc.department.split(' ')[0]}
                    </span>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SEARCH & SPECIALIST FILTER */}
      <section className="glass-section relative w-full py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row gap-4 items-center">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search Doctor by Name, Specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-full text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500/40 focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* Department Select Dropdown */}
          <div className="relative w-full sm:w-[240px]">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-full text-slate-600 text-sm appearance-none focus:outline-none focus:border-emerald-500/40 focus:bg-white transition-all shadow-sm cursor-pointer"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'All' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-4 w-2 h-2 border-b-2 border-r-2 border-slate-400 transform rotate-45 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 4. FEATURED DOCTOR (MAIN SECTION) */}
      <section id="featured-doctor-spotlight" className="relative w-full py-20 px-6 md:px-12 lg:px-20 bg-transparent">
        <div className="max-w-6xl mx-auto">
          
          {filteredDoctors.length === 0 ? (
            <div className="w-full text-center py-16">
              <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-medium text-white mb-2">No Specialists Found</h3>
              <p className="text-slate-400 text-sm">Try resetting your search query or department filters.</p>
            </div>
          ) : selectedDoctor ? (
            <motion.div 
              key={selectedDoctor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              
              {/* Doctor Image Column (Nearly Half) */}
              <div className="lg:col-span-5 flex justify-center">
                <LargeDoctorImage src={selectedDoctor.image} name={selectedDoctor.name} />
              </div>

              {/* Doctor Quick Info & Details */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-emerald-600 tracking-[0.2em] uppercase mb-2 block">
                  Featured Specialist
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-1 leading-tight">
                  {selectedDoctor.name}
                </h2>
                <p className="text-emerald-400 text-sm font-semibold mb-3">
                  {selectedDoctor.specialty} — <span className="text-gray-300 font-light">{selectedDoctor.experience}</span>
                </p>

                <div className="w-full h-[1px] bg-white/20 my-4" />

                <p className="text-gray-200 text-sm leading-relaxed font-light mb-6">
                  {selectedDoctor.about}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-xs text-gray-300">
                  <div className="flex gap-3">
                    <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white block mb-1">Education</span>
                      <p className="font-light leading-relaxed">{selectedDoctor.education[1] || selectedDoctor.education[0]}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white block mb-1">Hospital Timings</span>
                      <p className="font-light leading-relaxed">{selectedDoctor.timings}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveDoctorOverlay(selectedDoctor)}
                    className="px-8 py-4 bg-[#053D38] hover:bg-emerald-950 text-white font-bold text-xs rounded-full shadow-md flex items-center gap-2 transition-colors duration-300"
                  >
                    <span>View Full Profile</span>
                  </motion.button>
                  
                  <a 
                    href="tel:+918919942870"
                    className="px-6 py-4 bg-emerald-500/10 border border-emerald-500/20 text-[#053D38] hover:bg-emerald-500/20 font-bold text-xs rounded-full flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div>

              </div>

            </motion.div>
          ) : null}

        </div>
      </section>

      {/* 5. FULL PROFILE OVERLAY (VISION OS FLOATING STYLE) */}
      <AnimatePresence>
        {activeDoctorOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Blurry dark background overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDoctorOverlay(null)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-[35px] transition-all"
            />

            {/* VisionOS Floating Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative bg-white/70 backdrop-blur-[35px] border border-white/50 w-full max-w-[900px] h-[85vh] rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col z-10"
            >
              {/* Close Button Sticky */}
              <button 
                onClick={() => setActiveDoctorOverlay(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-200/80 hover:scale-110 flex items-center justify-center text-slate-600 transition-all z-35 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 sm:p-12 scrollbar-thin">
                <div className="flex flex-col items-center text-center pb-8 border-b border-slate-100">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-[4px] border-white shadow-lg mb-4 relative">
                    <img src={activeDoctorOverlay.image} alt={activeDoctorOverlay.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    {activeDoctorOverlay.department}
                  </span>
                  
                  <h2 className="font-serif text-3xl font-semibold text-slate-800">
                    {activeDoctorOverlay.name}
                  </h2>
                  <p className="text-slate-500 text-xs font-semibold mt-1">
                    {activeDoctorOverlay.specialty}
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5 font-light">
                    {activeDoctorOverlay.experience}
                  </p>
                </div>

                <div className="mt-8 space-y-8">
                  {/* About section */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-emerald-600" />
                      About The Specialist
                    </h3>
                    <p className="text-slate-600 text-sm font-light leading-relaxed">
                      {activeDoctorOverlay.about}
                    </p>
                  </div>

                  {/* Education / Degrees */}
                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      Education & Training
                    </h3>
                    <ul className="space-y-3">
                      {activeDoctorOverlay.education.map((edu, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="font-light">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specializations & Skills */}
                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Core Specializations
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeDoctorOverlay.specializations.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="font-light">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Conditions Treated */}
                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                      Conditions Treated
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeDoctorOverlay.conditions.map((cond, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="font-light">{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Memberships & Accreditations */}
                  {activeDoctorOverlay.memberships && (
                    <div className="border-t border-slate-100 pt-6">
                      <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-emerald-600" />
                        Professional Memberships
                      </h3>
                      <ul className="space-y-3">
                        {activeDoctorOverlay.memberships.map((memb, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="font-light">{memb}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Awards */}
                  {activeDoctorOverlay.awards && (
                    <div className="border-t border-slate-100 pt-6">
                      <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        Awards & Recognition
                      </h3>
                      <ul className="space-y-3">
                        {activeDoctorOverlay.awards.map((aw, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <Award className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="font-light">{aw}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Timings & CTAs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6 text-xs text-slate-600">
                    <div>
                      <span className="font-bold text-slate-800 block mb-2">Hospital Timings</span>
                      <div className="flex items-center gap-2 font-light">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{activeDoctorOverlay.timings}</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block mb-2">Consultation Languages</span>
                      <p className="font-light">{activeDoctorOverlay.languages.join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* Footer CTAs inside Modal */}
                <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-8 mt-8">
                  <button 
                    onClick={() => {
                      setActiveDoctorOverlay(null);
                      openBookingModal();
                    }}
                    className="flex-1 py-4 bg-[#053D38] hover:bg-emerald-950 text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 shadow-md transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                  <a 
                    href="tel:+918919942870"
                    className="flex-1 py-4 bg-emerald-500/10 border border-emerald-500/20 text-[#053D38] hover:bg-emerald-500/20 font-bold text-xs rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Clinic Now</span>
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default DoctorsPage;

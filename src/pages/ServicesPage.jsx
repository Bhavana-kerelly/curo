import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Heart, Activity, Shield, ArrowRight, Sparkles, 
  Stethoscope, Brain, Baby, Layers, ChevronRight, 
  CheckCircle2, ClipboardList, Scissors, Eye, Target,
  X, Phone, Calendar, Clock, AlertCircle
} from 'lucide-react';
import SplitType from 'split-type';
import Footer from '../components/Footer';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);


// Doctor Profile Image with 3D Mouse Parallax and Hover Glow
const DoctorProfileImage = ({ src, name }) => {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -15;
    const rotateY = ((x / rect.width) - 0.5) * 15;
    imgRef.current.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    imgRef.current.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <motion.div
      ref={imgRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="w-44 h-44 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative group cursor-pointer transition-all duration-300 ease-out"
      style={{
        boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 30px rgba(16,185,129,0.15)',
        transformStyle: 'preserve-3d'
      }}
    >
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

// Bento Card Component with Mouse Parallax, Glowing Edges, and Floating Icon
const BentoCard = ({ dept, index, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      layoutId={`dept-card-${dept.id}`}
      className={`bento-card-reveal cursor-pointer bg-white/40 backdrop-blur-[25px] border border-white/50 rounded-[36px] p-8 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all duration-300 ease-out relative group min-h-[250px] overflow-hidden ${dept.bentoClass}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 180px at var(--mx, 50%) var(--my, 50%), rgba(24,200,160,0.15), transparent 70%)`
        }}
      />

      {dept.bgImage && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-95"
            style={{ backgroundImage: `url(${dept.bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
        </div>
      )}

      <div 
        className="absolute right-[-10px] bottom-[-10px] w-48 h-48 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 ease-out pointer-events-none z-0"
        style={{
          transform: 'translateZ(10px)'
        }}
      >
        {dept.illustration}
      </div>

      <div className="flex justify-between items-start mb-6 z-10" style={{ transform: 'translateZ(20px)' }}>
        <motion.div 
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 60%, rgba(16,185,129,0.2) 100%)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.03), inset 0 2px 4px rgba(255,255,255,0.45)'
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/60 bg-white/70 shadow-sm relative transition-transform duration-300 group-hover:scale-110"
        >
          {dept.icon}
        </motion.div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Explore
        </span>
      </div>

      <div className="mt-auto z-10 transition-transform duration-300" style={{ transform: 'translateZ(30px)' }}>
        <span className="text-[10px] font-bold tracking-[0.15em] text-emerald-600 uppercase block mb-1">
          {dept.category}
        </span>
        <h3 className="font-serif text-2xl font-semibold text-[#0F172A] leading-tight">
          {dept.name}
        </h3>
      </div>
    </motion.div>
  );
};

const ServicesPage = () => {
  const { openBookingModal } = useBooking();
  const pageRef = useRef(null);
  const deptRowRef = useRef(null);
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  const exploreHeadingRef = useRef(null);
  const exploreSectionRef = useRef(null);
  
  const [activeDept, setActiveDept] = useState('gynaecology');
  const [selectedDeptModal, setSelectedDeptModal] = useState(null);

  const departments = [
    {
      id: 'gynaecology',
      name: "Gynaecology & Women's Health",
      category: 'Maternal & Women\'s Health',
      bentoClass: 'lg:col-span-2',
      bgImage: './images/gynecology-card.jpg',
      illustration: (
        <svg className="w-full h-full text-emerald-500/30 stroke-emerald-500/80 stroke-[2] overflow-visible" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="24" r="12" stroke="currentColor" />
          <path d="M32 36V52" stroke="currentColor" />
          <path d="M24 44H40" stroke="currentColor" />
          <path d="M20 24C20 30.627 25.373 36 32 36C38.627 36 44 30.627 44 24" stroke="currentColor" />
        </svg>
      ),
      icon: <Heart className="w-5 h-5 text-emerald-600" />,
      introduction: 'Empowering women with comprehensive health solutions from adolescence through pregnancy, childbirth, and menopause. We emphasize patient-centered evidence-based care in private, comfortable consultation rooms.',
      doctor: {
        name: 'Dr. Sivaharika Rayudu',
        image: './images/sivaharika.jpg',
        qualification: 'MBBS, MD (Obstetrics & Gynaecology), DNB',
        experience: '12+ Years of Medical Experience'
      },
      treatments: [
        'High-Risk Pregnancy Care',
        'Laparoscopic Keyhole Gynae Surgeries',
        'PCOS & Hormonal Therapeutics',
        'Preconception Counseling & Fertility Diagnostic Screens',
        'Cervical Cancer Screening & Breast Exams',
        'Menopause Symptom Management'
      ],
      conditions: [
        'Polycystic Ovary Syndrome (PCOS)',
        'Endometriosis & Adenomyosis',
        'Menstrual Disorders & Heavy Bleeding',
        'High-Risk Pregnancies & Fetal Care',
        'Uterine Fibroids & Ovarian Cysts',
        'Adolescent Gynae Concerns'
      ],
      procedures: [
        'Laparoscopic Hysterectomy & Cystectomy',
        'Colposcopy for Cervical Screening',
        'Confidential Teen Health Diagnostics',
        'Custom PCOS Management Protocols'
      ],
      whyChooseUs: [
        'Led by Dr. Sivaharika Rayudu, obstetrician & gynecologist with 12+ years of expertise.',
        'Comprehensive, comfortable, and private suite consultations.',
        'Holistic programs including Teen Health Clinic & PCOS Management Clinic.',
        'Emotional support and evidence-based clinical protocols.'
      ],
      hours: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      emergency: '24/7 Emergency Labor & Gynae Room Support'
    },
    {
      id: 'dental',
      name: 'Dental Care',
      category: 'Oral Aesthetics & Care',
      bentoClass: 'lg:col-span-2',
      bgImage: './images/dental-chair.jpg',
      illustration: (
        <svg className="w-full h-full text-emerald-500/30 stroke-emerald-500/80 stroke-[2] overflow-visible" viewBox="0 0 64 64" fill="none">
          <path d="M18 18C18 15 24 12 32 15C40 12 46 15 46 18C46 28 44 38 40 44C38 47 34 44 32 41C30 44 26 47 24 44C20 38 18 28 18 18Z" stroke="currentColor" />
          <path d="M26 22 C28 24, 36 24, 38 22" stroke="currentColor" />
        </svg>
      ),
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      introduction: 'Providing holistic dental care services ranging from preventive maintenance to modern cosmetic dentistry and implants, blending clinical precision with artistic insight to restore your smile.',
      doctor: {
        name: 'Dr. Yogini Khetawat',
        image: './images/yogini.jpg',
        qualification: 'B.D.S., Dental Surgeon & Cosmetologist',
        experience: '12+ Years of Dental & Cosmetology Practice'
      },
      treatments: [
        'Preventive Dental Checkups & Cleanings',
        'Restorative Fillings, Crowns & Bridges',
        'Microscopic Root Canal Therapy',
        'Premium Dental Implants',
        'Teeth Whitening & Veneers',
        'Invisible Teeth Aligners (Invisalign)'
      ],
      conditions: [
        'Dental Cavities & Tooth Decay',
        'Gum Disease (Periodontitis & Gingivitis)',
        'Misaligned or Crooked Teeth',
        'Missing Teeth & Tooth Loss',
        'Oral Infections & Severe Toothaches',
        'Impacted Wisdom Teeth'
      ],
      procedures: [
        'Advanced Dental Implant Placements',
        'Precision Laser Dentistry procedures',
        'Computerized Digital Intraoral OPG Scanning',
        'Aesthetic Smile Correction & Veneers'
      ],
      whyChooseUs: [
        'Led by cosmetologist Dr. Yogini Khetawat with over a decade of clinical experience.',
        'High-end dental technologies including low-dose digital OPG X-ray.',
        'Highly sterile clinical environment following strict safety protocols.',
        'Gentle and customized family and senior care.'
      ],
      hours: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      emergency: 'Dental Pain & Fracture Emergency Services'
    },
    {
      id: 'ent',
      name: 'ENT Care',
      category: 'Ear, Nose & Throat Clinics',
      bentoClass: 'lg:col-span-2',
      bgImage: './images/ent-care.jpg',
      illustration: (
        <svg className="w-full h-full text-emerald-500/30 stroke-emerald-500/80 stroke-[2] overflow-visible" viewBox="0 0 64 64" fill="none">
          <path d="M42 48 C42 46, 44 42, 44 38 C44 34, 42 30, 42 22 C42 14, 34 12, 28 12 C20 12, 18 20, 18 26 C18 30, 20 32, 22 34 L18 38 C16 40, 18 42, 22 42 L24 44 C24 46, 22 48, 20 50 L34 50" stroke="currentColor" />
          <path d="M38 26 C41 26, 41 32, 38 34 C36 34, 36 26, 38 26" stroke="currentColor" />
        </svg>
      ),
      icon: <Eye className="w-5 h-5 text-emerald-600" />,
      introduction: 'World-class care for conditions affecting the ear, nose, throat, sinuses, and related structures of the head and neck, utilizing advanced diagnostic tools and minimally invasive therapies.',
      doctor: {
        name: 'Dr. Feroz Basha Shaik',
        image: './images/feroz_basha.jpg',
        qualification: 'MBBS, MS (ENT), Head & Neck Surgeon',
        experience: '8+ Years of Clinical Excellence'
      },
      treatments: [
        'Diagnostic Nasal Endoscopy (DNE)',
        'Video Laryngoscopy (VLS) & Otoscopy',
        'Audiological Hearing Evaluations',
        'Tonsillectomy & Adenoidectomy',
        'Snoring & Obstructive Sleep Apnea Clinic',
        'Minor Ear & Throat Procedures'
      ],
      conditions: [
        'Sinusitis, Allergic Rhinitis & Nasal Blockages',
        'Ear Discharge, Infections & Earache',
        'Hearing Loss & Ringing Sensation (Tinnitus)',
        'Difficulty Swallowing (Dysphagia) & Voice Changes',
        'Oral Ulcers & Head / Neck Masses',
        'Thyroid Enlargement & Nodules'
      ],
      procedures: [
        'Functional Endoscopic Sinus Surgery (FESS)',
        'Endoscopic & Microscopic Tympanoplasty',
        'Coblation-assisted Adenotonsillectomy',
        'Coblation Turbinate reduction',
        'Thyroidectomy & Sleep Apnea Surgery'
      ],
      whyChooseUs: [
        'Staffed by veteran ENT surgeon Dr. Feroz Basha Shaik.',
        'Advanced, minimally invasive diagnostics including video endoscopy units.',
        'High-end coblation and debrider surgical technology.',
        '24/7 support for ENT foreign body removals.'
      ],
      hours: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      emergency: 'Foreign Body Removals Available 24/7'
    },
    {
      id: 'surgery',
      name: 'General & Laparoscopic Surgery',
      category: 'Minimally Invasive Surgery',
      bentoClass: 'lg:col-span-3',
      bgImage: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
      illustration: (
        <svg className="w-full h-full text-emerald-500/30 stroke-emerald-500/80 stroke-[2] overflow-visible" viewBox="0 0 64 64" fill="none">
          <line x1="24" y1="40" x2="40" y2="24" stroke="currentColor" />
          <line x1="40" y1="40" x2="24" y2="24" stroke="currentColor" />
          <circle cx="21" cy="43" r="4" stroke="currentColor" />
          <circle cx="43" cy="43" r="4" stroke="currentColor" />
          <circle cx="32" cy="32" r="2" fill="currentColor" stroke="currentColor" />
          <line x1="32" y1="32" x2="24" y2="16" stroke="currentColor" />
          <line x1="32" y1="32" x2="40" y2="16" stroke="currentColor" />
        </svg>
      ),
      icon: <Scissors className="w-5 h-5 text-emerald-600" />,
      introduction: 'Providing advanced laparoscopic and keyhole surgeries that offer patient benefits such as less pain, minimal scarring, and faster discharge, ensuring optimal surgical outcomes.',
      doctor: {
        name: 'Dr. Nagarjuna Doppalapudi',
        image: './images/nagarjuna_doppalapudi.jpg',
        qualification: 'MBBS, DNB (General Surgery), FIAGES',
        experience: '10+ Years of Surgical Practice'
      },
      treatments: [
        'Abdominal Surgery Consultations',
        'Laparoscopic Cholecystectomy (Gallstones)',
        'Laparoscopic & Open Herniorrhaphy',
        'Minimally Invasive Appendectomy',
        'Piles, Fissure & Fistula Laser Surgery',
        'Varicose Veins Laser Therapy & Sclerotherapy'
      ],
      conditions: [
        'Gallstones & Gallbladder Disease',
        'Appendicitis (Acute & Chronic)',
        'Inguinal, Umbilical, & Incisional Hernias',
        'Piles (Hemorrhoids), Fissures, & Fistulas',
        'Varicose Veins & Venous Insufficiency',
        'Thyroid Nodules & Abdominal Masses'
      ],
      procedures: [
        'Laparoscopic Cholecystectomy & Appendectomy',
        'Laser proctology surgeries (Painless Piles treatment)',
        'Laser ablation for Varicose Veins',
        'Minimal Access General Surgery'
      ],
      whyChooseUs: [
        'Led by Consultant General and Laparoscopic Surgeon Dr. Nagarjuna Doppalapudi.',
        'FIAGES Fellowship credentials with over a decade of clinical experience.',
        'Advanced laparoscopic towers and clean laminar-flow operating theaters.',
        'Excellent post-op recovery care and minimum hospital stay.'
      ],
      hours: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      emergency: '24/7 Emergency Surgery Support'
    },

    {
      id: 'medicine',
      name: 'General Medicine & Diabetes',
      category: 'Comprehensive Medicine',
      bentoClass: 'lg:col-span-3',
      bgImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      illustration: (
        <svg className="w-full h-full text-emerald-500/30 stroke-emerald-500/80 stroke-[2] overflow-visible" viewBox="0 0 64 64" fill="none">
          <circle cx="26" cy="32" r="13" stroke="currentColor" />
          <path d="M26 24V40 M18 32H34" stroke="currentColor" />
          <rect x="42" y="28" width="12" height="18" rx="2" stroke="currentColor" />
          <rect x="45" y="32" width="6" height="5" stroke="currentColor" />
          <circle cx="48" cy="41" r="1.5" fill="currentColor" />
        </svg>
      ),
      icon: <Stethoscope className="w-5 h-5 text-emerald-600" />,
      introduction: 'The primary clinical contact for adults, offering comprehensive medical screening, chronic disease management, and customized wellness profiles, with a strong focus on diabetology.',
      doctor: {
        name: 'Dr. Sivani Payneni',
        image: './images/sivani_payneni.jpg',
        qualification: 'MBBS, MD (General Medicine), Diabetologist',
        experience: '10+ Years of Academic & Clinical Practice'
      },
      treatments: [
        'Customized Diabetes Management Plans (Type 1, Type 2 & Gestational)',
        'Hypertension & High Cholesterol Screening',
        'Metabolic Health Screening & Thyroid management',
        'Infectious Disease Treatments',
        'Preventative Executive Health Checkups',
        'Annual Wellness Screenings'
      ],
      conditions: [
        'Diabetes Mellitus (Prediabetes, Type 1 & 2)',
        'Hypertension & Cholesterol Disorders',
        'Thyroid Dysfunction & Obesity Management',
        'Acute Fevers, viral infections & respiratory conditions',
        'Chronic lifestyle-related medical conditions'
      ],
      procedures: [
        'Continuous Glucose Monitoring (CGM) setup',
        'HbA1c & metabolic panel screening',
        'Diabetic foot care assessments',
        'Cardiac health profiling & diagnostics'
      ],
      whyChooseUs: [
        'Led by expert Physician & Diabetologist Dr. Sivani Payneni.',
        'Focus on preventative medicine, lifestyle therapies, and clinical care.',
        'State-of-the-art pathology labs and in-house pharmacy setup.',
        'Patient-centered monitoring for chronic metabolic diseases.'
      ],
      hours: 'Mon - Sat: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM',
      emergency: '24/7 Emergency Medical Support'
    }
  ];


  const clinicalServices = [
    {
      id: 'gynaecology',
      title: "Gynaecology & Women's Health",
      desc: 'Comprehensive care for women at all stages of life, including prenatal, postnatal, laparoscopic surgeries, and menopause management.',
      doctorsCount: 8,
      treatments: ['Painless Delivery Care', 'Laparoscopic Hysterectomy', 'PCOS & Fertility Clinic Support']
    },
    {
      id: 'dental',
      title: 'Dental Care Center',
      desc: 'High-end dental treatments, root canal therapy, smile design, dental implants, and pediatric dentistry in a sterile environment.',
      doctorsCount: 4,
      treatments: ['Microscopic Root Canals', 'Premium Dental Implants', 'Smile Aligners & Aesthetics']
    },
    {
      id: 'ent',
      title: 'ENT Care Specialist Suite',
      desc: 'Advanced medical and surgical treatment for ear, nose, throat, sinuses, and sleep disorders using laser procedures.',
      doctorsCount: 6,
      treatments: ['Sinus Endoscopy & Surgery', 'Tympanoplasty (Ear Drum)', 'Snoring & Sleep Apnea Clinic']
    },
    {
      id: 'surgery',
      title: 'General & Laparoscopic Surgery',
      desc: 'Minimally invasive keyhole surgeries for gallstones, hernia, appendix, and gastrointestinal conditions for rapid recovery.',
      doctorsCount: 7,
      treatments: ['Laparoscopic Gallbladder', 'Hernia Mesh Repair', 'Laser Piles & Fistula Care']
    },

    {
      id: 'medicine',
      title: 'General Medicine & Diabetes',
      desc: 'Comprehensive primary care for chronic diseases, diabetes management, hypertension, and family health wellness.',
      doctorsCount: 10,
      treatments: ['Advanced Diabetes Panel', 'Hypertension & Lipid Care', 'Wellness Checkup Program']
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.fromTo('.services-hero-text',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', stagger: 0.15 }
      );

      // 2. Entire Section Entrance Animation
      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current,
          { opacity: 0, scale: 0.97, filter: 'blur(12px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // 3. Split Text Style Heading Reveal
      if (headingRef.current) {
        const letters = headingRef.current.querySelectorAll('.char-reveal');
        gsap.fromTo(letters,
          { opacity: 0, y: 40, rotationX: 25 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.025,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%'
            }
          }
        );
      }

      // 4. Orb Entry
      gsap.fromTo('.orb-container',
        { opacity: 0, y: 50, scale: 0.75 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.dept-row-container',
            start: 'top 85%'
          }
        }
      );

      // 5. Explore Specialities Entrance Reveal
      gsap.fromTo(exploreSectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: exploreSectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Bento cards staggered entrance
      gsap.fromTo('.bento-card-reveal',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bento-grid-trigger',
            start: 'top 80%'
          }
        }
      );

      // 6. Ambient Background Glow breathing
      gsap.fromTo('.ambient-glow-circle',
        { scale: 1, opacity: 0.06 },
        {
          scale: 1.12,
          opacity: 0.14,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        }
      );
    }, pageRef);

    // Keyboard ESC key modal close listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedDeptModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Horizontal mouse wheel scroll translation
  const handleWheel = (e) => {
    if (e.deltaY !== 0 && deptRowRef.current) {
      e.preventDefault();
      deptRowRef.current.scrollLeft += e.deltaY * 0.95;
    }
  };

  const handleDeptClick = (id) => {
    setActiveDept(id);
    const targetEl = document.getElementById(`explore-${id}`);
    if (targetEl) {
      window.scrollTo({
        top: targetEl.offsetTop - 140,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main ref={pageRef} className="w-full bg-transparent text-white overflow-hidden">
      {/* 1. Services Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-[#A6DDD5] via-[#5FB1A5] to-[#085249] pt-[170px] pb-64 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <div className="services-hero-text inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="text-[11px] font-semibold text-white/90 tracking-[0.35em] uppercase">
              Our Medical Specialties
            </span>
          </div>

          <h1 className="services-hero-text font-serif text-4xl sm:text-6xl font-[300] text-white tracking-tight leading-[1.1] mb-6">
            Smarter Care. <br />
            Better Diagnoses. <br />
            <span className="font-semibold text-teal-100">Brighter Health.</span>
          </h1>

          <p className="services-hero-text text-white/90 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Curo Clinics brings together world-class specialists and high-end diagnostics to deliver seamless medical services all under one roof.
          </p>
        </div>
      </section>

      {/* 2. Apple VisionOS-inspired Selector Section */}
      <section 
        ref={sectionRef}
        className="glass-section relative w-full py-24 px-6 lg:px-20 overflow-visible"
      >
        {/* Ambient Glows */}
        <div className="ambient-glow-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(24,200,160,0.06)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none filter blur-2xl" />

        {/* Decorative particles */}
        <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-emerald-500/10 pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-3 h-3 rounded-full bg-emerald-500/10 pointer-events-none animate-pulse" />

        <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
          {/* Badge */}
          <div className="px-5 py-1.5 bg-white/70 backdrop-blur-md border border-emerald-500/10 rounded-full shadow-sm mb-6">
            <span className="text-[10px] font-bold text-emerald-700 tracking-[0.3em] uppercase block">
              OUR SPECIALITIES
            </span>
          </div>

          {/* Heading */}
          <h2 
            ref={headingRef}
            className="font-serif text-4xl sm:text-5xl font-light text-white leading-tight text-center mb-5 perspective-[1000px]"
          >
            {"Choose Your ".split("").map((char, i) => (
              <span key={i} className="char-reveal inline-block origin-bottom">{char === " " ? "\u00A0" : char}</span>
            ))}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-[#00895A] relative overflow-hidden inline-block char-reveal origin-bottom">
              Department
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-gray-200 text-sm sm:text-base font-light text-center max-w-[620px] mb-16">
            Select a department below to explore expert care, treatments and specialists.
          </p>

          {/* Department Horizontal Slider Container */}
          <div 
            ref={deptRowRef}
            onWheel={handleWheel}
            className="dept-row-container w-full overflow-x-auto overflow-y-visible pb-12 snap-x snap-mandatory scroll-smooth scrollbar-none"
          >
            <div className="flex gap-[28px] px-4 md:px-8 lg:px-0 justify-start min-w-max py-10 overflow-y-visible">
              {departments.map((dept) => {
                const isActive = activeDept === dept.id;

                return (
                  <button
                    key={dept.id}
                    onClick={() => handleDeptClick(dept.id)}
                    className="snap-start outline-none"
                  >
                    <motion.div
                      whileHover={{ 
                        y: -8, 
                        scale: 1.03, 
                        borderColor: 'rgba(16,185,129,0.35)',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.06), 0 0 40px rgba(24,200,160,0.1)'
                      }}
                      transition={{ duration: 0.35, ease: 'power3.out' }}
                      className={`dept-card-item relative w-[190px] h-[250px] rounded-[30px] p-5 py-6 flex flex-col items-center justify-between transition-all duration-350 cursor-pointer select-none text-left overflow-hidden
                        ${isActive 
                          ? 'border border-emerald-500/40 bg-white/35 shadow-[0_20px_50px_rgba(0,168,107,0.08)]' 
                          : 'bg-white/20 backdrop-blur-xl border border-white/55 shadow-[0_15px_35px_rgba(0,0,0,0.03),_0_0_25px_rgba(24,200,160,0.04)]'
                        }
                      `}
                    >
                      {/* Glass Light Reflection Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_7s_infinite_linear] pointer-events-none z-0" />

                      {/* VisionOS Floating Orb (Fully inside, static upper placement, no continuous float offset) */}
                      <div className={`orb-container w-[92px] h-[92px] rounded-full flex items-center justify-center transition-all duration-350 z-20 relative
                        ${isActive 
                          ? 'scale-[1.08] shadow-[0_12px_24px_rgba(0,168,107,0.18)]' 
                          : 'shadow-[0_8px_16px_rgba(0,0,0,0.04)]'
                        }
                      `}
                      style={{
                        background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.15) 60%, rgba(16,185,129,0.22) 100%)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.65)',
                        boxShadow: isActive ? '0 12px 24px rgba(0,168,107,0.18), inset 0 2px 4px rgba(255,255,255,0.45)' : '0 8px 16px rgba(0,0,0,0.04), inset 0 2px 4px rgba(255,255,255,0.45)'
                      }}
                      >
                        {/* Soft under-orb glow */}
                        <div className="absolute bottom-2 w-8 h-2 bg-emerald-500/20 rounded-full filter blur-[5px] pointer-events-none" />
                        
                        {/* Illustration */}
                        <div className="relative z-10 scale-[0.88] transition-transform duration-350">
                          {dept.illustration}
                        </div>
                      </div>

                      {/* Department Name & Active Indicator */}
                      <div className="flex flex-col items-center gap-3 w-full text-center relative z-10 group-hover:-translate-y-1 transition-transform duration-350">
                        <span className="font-semibold text-[15px] tracking-tight text-[#0f172a] line-clamp-2 max-w-[170px] transition-transform duration-350">
                          {dept.name}
                        </span>
                        
                        {/* Active Bottom Indicator Line */}
                        <div className="h-1.5 w-12 flex justify-center items-center">
                          {isActive ? (
                            <div className="w-12 h-[4px] rounded-full bg-gradient-to-r from-[#00C896] to-[#8EF7D2]" />
                          ) : (
                            <div className="w-0 h-0" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </div>



        </div>
      </section>

      {/* 3. Explore Our Specialities (Bento Grid Section) */}
      <section 
        ref={exploreSectionRef}
        className="glass-section relative w-full py-24 px-6 lg:px-20 overflow-visible"
      >
        {/* Soft mint glows */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(24,200,160,0.05)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(16,185,129,0.04)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none filter blur-3xl" />

        <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
          {/* Badge */}
          <div className="px-5 py-1.5 bg-white/70 backdrop-blur-md border border-emerald-500/10 rounded-full shadow-sm mb-6">
            <span className="text-[10px] font-bold text-emerald-700 tracking-[0.3em] uppercase block">
              OUR DEPARTMENTS
            </span>
          </div>

          {/* Heading */}
          <h2 
            ref={exploreHeadingRef}
            className="font-serif text-4xl sm:text-5xl font-light text-white leading-tight text-center mb-5"
          >
            Explore Every{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-[#00895A]">
              Department
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-gray-200 text-sm sm:text-base font-light text-center max-w-[620px] mb-16">
            Select any department to learn about our specialists, treatments and facilities.
          </p>          {/* Bento Grid */}
          <div className="bento-grid-trigger w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-[28px] items-stretch">
            {departments.map((dept, index) => (
              <BentoCard 
                key={dept.id} 
                dept={dept} 
                index={index} 
                onClick={() => setSelectedDeptModal(dept)} 
              />
            ))}
          </div>


        </div>
      </section>


      {/* 5. Scheduling & Call To Action */}
      <section className="relative w-full py-20 px-6 md:px-12 lg:px-20 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <ClipboardList className="w-10 h-10 text-emerald-600 mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Need consultation from our experts?
          </h2>
          <p className="text-gray-200 text-base font-light leading-relaxed max-w-xl mb-8">
            Connect with our frontdesk team to schedule an appointment with one of our specialized doctors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-2">
              <a 
                href="tel:+918919942870"
                className="px-6 py-4 bg-[#053D38] text-white hover:bg-emerald-950 font-semibold text-xs rounded-full shadow-md hover:scale-[1.02] transition-transform duration-350"
              >
                Call +91 89199 42870
              </a>
              <a 
                href="tel:+918106770862"
                className="px-6 py-4 bg-[#053D38] text-white hover:bg-emerald-950 font-semibold text-xs rounded-full shadow-md hover:scale-[1.02] transition-transform duration-350"
              >
                Call +91 81067 70862
              </a>
            </div>
            <button 
              onClick={openBookingModal}
              className="px-8 py-4 bg-white border border-slate-200 text-[#053D38] hover:bg-slate-50 font-semibold text-sm rounded-full shadow-sm hover:scale-[1.02] transition-transform duration-350 cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </section>

      {/* 6. Apple-style Premium Glass Modal */}
      <AnimatePresence>
        {selectedDeptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden">
            {/* Dark Overlay with Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDeptModal(null)}
              className="fixed inset-0 bg-black/25 backdrop-blur-[20px] transition-all"
            />

            {/* Modal Box */}
            <motion.div
              layoutId={`dept-card-${selectedDeptModal.id}`}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative bg-white/75 backdrop-blur-[30px] border border-white/50 w-full max-w-[1100px] h-[80vh] rounded-[36px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row z-10"
            >
              {/* Close Button Sticky */}
              <button 
                onClick={() => setSelectedDeptModal(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-200/80 hover:scale-110 flex items-center justify-center text-slate-600 transition-all z-30 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Doctor Profile */}
              <div className="w-full md:w-[35%] bg-emerald-950/5 border-r border-slate-100 p-8 flex flex-col justify-between items-center text-center relative overflow-hidden">
                <div className="absolute top-[-50px] w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col items-center w-full mt-6 z-10">
                  <DoctorProfileImage src={selectedDeptModal.doctor.image} name={selectedDeptModal.doctor.name} />

                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-3 mt-6">
                    Department Specialist
                  </span>
                  
                  <h4 className="font-serif text-2xl font-semibold text-slate-800 leading-tight">
                    {selectedDeptModal.doctor.name}
                  </h4>
                  <p className="text-slate-500 text-xs font-medium mt-1.5">
                    {selectedDeptModal.doctor.qualification}
                  </p>
                  <p className="text-slate-400 text-[11px] mt-1 font-light">
                    {selectedDeptModal.doctor.experience}
                  </p>
                </div>

                <div className="w-full mt-8 flex flex-col gap-3 z-10">
                  <a 
                    href={`https://wa.me/918919942870?text=${encodeURIComponent(`Hello Curo Clinics,\n\nI would like to book an appointment for ${selectedDeptModal.name} with ${selectedDeptModal.doctor.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedDeptModal(null)}
                    className="w-full py-4 bg-[#053D38] hover:bg-emerald-900 text-white font-bold text-xs rounded-full shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-emerald-500/25 hover:shadow-lg active:scale-95 cursor-pointer text-center"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment via WhatsApp</span>
                  </a>
                  <a 
                    href="tel:+918919942870"
                    className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-[#053D38] hover:bg-emerald-500/20 font-bold text-xs rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call +91 89199 42870</span>
                  </a>
                  <a 
                    href="tel:+918106770862"
                    className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-[#053D38] hover:bg-emerald-500/20 font-bold text-xs rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call +91 81067 70862</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Detailed Info Scrollable */}
              <div className="w-full md:w-[65%] p-8 sm:p-12 flex flex-col justify-between overflow-y-auto scrollbar-thin">
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 tracking-[0.15em] uppercase block mb-1">
                      {selectedDeptModal.category}
                    </span>
                    <h3 className="font-serif text-3xl font-semibold text-slate-800 mb-4">
                      {selectedDeptModal.name}
                    </h3>

                    <p className="text-[#64748B] text-sm font-light leading-relaxed">
                      {selectedDeptModal.introduction}
                    </p>
                  </div>

                  {/* Conditions Treated */}
                  <div className="border-t border-slate-100 pt-6">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-4">Conditions We Treat</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedDeptModal.conditions.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatments list */}
                  <div className="border-t border-slate-100 pt-6">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-4">Treatments & Services</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedDeptModal.treatments.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Advanced Procedures & Tech */}
                  <div className="border-t border-slate-100 pt-6">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-4">Advanced Procedures & Technologies</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedDeptModal.procedures.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Layers className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Why Choose Us & Working hours info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6 text-xs text-slate-600">
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider block mb-3">Why Choose Curo</span>
                      <ul className="space-y-2">
                        {selectedDeptModal.whyChooseUs.map((point, idx) => (
                          <li key={idx} className="font-light leading-relaxed flex items-start gap-1.5">
                            <span className="text-emerald-500 font-semibold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider block mb-3">Consultation Hours</span>
                      <div className="flex items-center gap-1.5 font-light">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{selectedDeptModal.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-light mt-2.5 text-emerald-700 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{selectedDeptModal.emergency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default ServicesPage;

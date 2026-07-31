import React, { useEffect, useRef, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';
import gsap from 'gsap';

const doctors = [
  "Dr. Sivani Payneni",
  "Dr. Feroz Basha Shaik",
  "Dr. Anand",
  "Dr. Nagarjuna Doppalapudi",
  "Dr. Neha",
  "Dr. Sivaharika Rayudu",
  "Dr. Ravinder Raja",
  "Dr. Yogini Khetawat",
  "Dr. Sharatchandra Reddy Atla"
];

const departments = [
  "Urology",
  "Gynaecology & Women's Health",
  "Dental Care",
  "ENT Care",
  "General & Laparoscopic Surgery",
  "Pediatrics",
  "General Medicine & Diabetes",
  "Pulmonology"
];

const BookingModal = () => {
  const { isBookingOpen, closeBookingModal } = useBooking();
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    department: '',
    mobile: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
      
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power4.out' }
      );
      
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.92, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power4.out' }
      );
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isBookingOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.92,
      filter: 'blur(10px)',
      duration: 0.4,
      ease: 'power3.in'
    });
    
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        closeBookingModal();
        setFormData({ name: '', doctor: '', department: '', mobile: '' });
        setErrors({});
      }
    });
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isBookingOpen) handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isBookingOpen]);

  if (!isBookingOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 10) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Patient Name is required';
    if (!formData.doctor) newErrors.doctor = 'Please select a doctor';
    if (!formData.department) newErrors.department = 'Please select a department';
    if (formData.mobile.length !== 10) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        const phoneNumber = '918919942870';
        const message = `Hello Curo Clinics,\n\nI would like to book an appointment.\n\nPatient Name:\n${formData.name}\n\nDoctor:\n${formData.doctor}\n\nDepartment:\n${formData.department}\n\nMobile Number:\n${formData.mobile}\n\nKindly let me know the available appointment slots.\n\nThank you.`;
        
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        handleClose();
      }, 500);
    }
  };

  return (
    <div 
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#010a08]/70 backdrop-blur-md opacity-0 overflow-y-auto"
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-[520px] bg-white/10 backdrop-blur-[30px] border border-white/45 rounded-[28px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] my-auto"
      >
        <div className="absolute inset-0 bg-emerald-500/10 rounded-[28px] pointer-events-none blur-xl" />

        <button 
          onClick={handleClose}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="relative z-10 p-6 md:p-10">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 mb-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              BOOK APPOINTMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-3 tracking-tight">
              Book Your <span className="text-emerald-400 font-medium">Consultation</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-light">
              Fill in your details and we'll help you schedule your appointment with the right specialist.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="block text-white/80 text-xs uppercase tracking-wider font-semibold mb-2 ml-1">
                Patient Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full bg-white/5 border ${errors.name ? 'border-red-400/80' : 'border-white/20'} rounded-[18px] px-5 py-4 text-white placeholder:text-white/40 outline-none focus:bg-white/10 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-400/20 transition-all shadow-sm`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>}
            </div>

            <div className="relative">
              <label className="block text-white/80 text-xs uppercase tracking-wider font-semibold mb-2 ml-1">
                Doctor
              </label>
              <div className="relative">
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.doctor ? 'border-red-400/80' : 'border-white/20'} rounded-[18px] px-5 py-4 text-white appearance-none outline-none focus:bg-white/10 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-400/20 transition-all shadow-sm cursor-pointer`}
                >
                  <option value="" disabled className="text-gray-900">Select Doctor</option>
                  {doctors.map(doc => (
                    <option key={doc} value={doc} className="text-gray-900">{doc}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              {errors.doctor && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.doctor}</p>}
            </div>

            <div className="relative">
              <label className="block text-white/80 text-xs uppercase tracking-wider font-semibold mb-2 ml-1">
                Department / Service
              </label>
              <div className="relative">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.department ? 'border-red-400/80' : 'border-white/20'} rounded-[18px] px-5 py-4 text-white appearance-none outline-none focus:bg-white/10 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-400/20 transition-all shadow-sm cursor-pointer`}
                >
                  <option value="" disabled className="text-gray-900">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="text-gray-900">{dept}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              {errors.department && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.department}</p>}
            </div>

            <div className="relative">
              <label className="block text-white/80 text-xs uppercase tracking-wider font-semibold mb-2 ml-1">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 font-medium">
                  +91
                </div>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className={`w-full bg-white/5 border ${errors.mobile ? 'border-red-400/80' : 'border-white/20'} rounded-[18px] pl-16 pr-5 py-4 text-white placeholder:text-white/40 outline-none focus:bg-white/10 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-400/20 transition-all shadow-sm`}
                />
              </div>
              {errors.mobile && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.mobile}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full group overflow-hidden mt-8 px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-[18px] flex items-center justify-center gap-3 text-white font-medium text-lg shadow-[0_10px_20px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_20px_30px_-15px_rgba(16,185,129,0.8)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[50%] transition-transform duration-1000 ease-in-out" />
              
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span>Book via WhatsApp</span>
                  <FaWhatsapp className="w-6 h-6" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

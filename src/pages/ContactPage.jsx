import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Footer from '../components/Footer';

const ContactPage = () => {
  const pageRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, message } = formData;
    
    // Format the message for WhatsApp
    const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Message:* ${message}`;
    
    // Clinic WhatsApp Number (using country code 91)
    const whatsappNumber = '918919942870';
    
    // Open WhatsApp URL
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo('.contact-fade',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
    );

    gsap.fromTo(formRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
    );
  }, []);

  return (
    <main ref={pageRef} className="w-full bg-white text-slate-800 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center pt-[120px] pb-10 px-6 md:px-12 lg:px-20 bg-[#085249] overflow-hidden text-white">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: 'url("/images/contact-hero-bg.jpg")' }}
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#085249]/90 via-[#085249]/40 to-transparent pointer-events-none" />

        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
          <div className="contact-fade inline-flex items-center justify-center mb-6">
            <span className="text-[11px] font-bold text-white tracking-[0.25em] uppercase px-4 py-1 border border-white/30 rounded-full">
              Get in Touch
            </span>
          </div>
          
          <h1 className="contact-fade font-serif text-4xl sm:text-5xl lg:text-7xl font-[300] tracking-tight leading-[1.1] mb-6">
            We are here for <br />
            <span className="font-semibold text-teal-100">Your Health</span>
          </h1>
          
          <p className="contact-fade text-white/90 text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-8">
            Reach out to us to schedule an appointment, inquire about our services, or ask any questions you may have. We look forward to welcoming you to Curo Clinics.
          </p>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM SECTION */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-[#F4F9F8] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <h2 className="contact-fade text-3xl sm:text-4xl font-serif font-semibold text-slate-800 mb-4">Contact Information</h2>
              <p className="contact-fade text-slate-600 font-light text-lg">
                Have questions or need assistance? Connect with us through any of the channels below.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              
              {/* Address */}
              <div className="contact-fade flex items-start gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">Clinic Address</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    2nd Floor, Kokapet One Mall,<br />
                    210, 211, Kokapet X Road,<br />
                    Narsingi, Gandipet,<br />
                    Hyderabad, Telangana 500075
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-fade flex items-start gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">Phone Number</h3>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+918919942870" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                      +91 89199 42870
                    </a>
                    <a href="tel:+918106770862" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                      +91 81067 70862
                    </a>
                  </div>
                  <p className="text-slate-500 font-light text-sm mt-1">Available during working hours</p>
                </div>
              </div>

              {/* Email */}
              <div className="contact-fade flex items-start gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">Email Address</h3>
                  <a href="mailto:curoclinicskokapet@gmail.com" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                    curoclinicskokapet@gmail.com
                  </a>
                  <p className="text-slate-500 font-light text-sm mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="contact-fade flex items-start gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">Working Hours</h3>
                  <p className="text-slate-600 font-medium">Monday - Friday: <span className="font-light text-slate-500 text-sm">10:00am - 9:00pm</span></p>
                  <p className="text-slate-600 font-medium mt-1">Saturday: <span className="font-light text-slate-500 text-sm">9:00am - 9:00pm</span></p>
                  <p className="text-slate-600 font-medium mt-1">Sunday: <span className="font-light text-slate-500 text-sm">9:00am - 4:00pm</span></p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div ref={formRef} className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Send us a message</h3>
              <p className="text-slate-500 font-light mb-8">Fill out the form below and our team will get back to you shortly.</p>
              
              <form className="flex flex-col gap-6" onSubmit={handleWhatsAppSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-light" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="+91 98765 43210" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-light" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-light" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required placeholder="How can we help you today?" rows="5" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-light resize-none"></textarea>
                </div>

                <button type="submit" className="w-full bg-[#053D38] hover:bg-emerald-950 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 mt-4 transition-all duration-300 hover:scale-[1.01] shadow-lg">
                  <span>Send Message via WhatsApp</span>
                  <Send className="w-4 h-4 ml-1" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[400px] bg-slate-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.568165682054!2d78.3323!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMTknNTYuMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Curo Clinics Location"
          className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
        ></iframe>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;

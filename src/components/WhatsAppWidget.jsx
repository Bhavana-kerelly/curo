import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const WhatsAppWidget = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show the tooltip after a small delay like a greeting
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = '918919942870';
  const defaultMessage = 'Hi! I would like to know more about your services.';
  
  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Call Button */}
      <a
        href="tel:8919942870"
        className="w-14 h-14 bg-sky-600 hover:bg-sky-500 text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(2,132,199,0.4)] transition-all duration-300 hover:scale-110 relative group"
        aria-label="Call Us"
      >
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-sky-600 rounded-full animate-ping opacity-75 duration-1000"></div>
        
        {/* Phone Icon */}
        <Phone className="w-6 h-6 relative z-10" />
      </a>

      {/* WhatsApp Button Group */}
      <div 
        className="relative flex flex-col items-end"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip / Chat Bubble */}
        <div 
          className={`hidden md:block absolute bottom-full right-0 mb-3 bg-white text-slate-800 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-emerald-100 min-w-[200px] transition-all duration-500 origin-bottom-right ${
            showTooltip ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
              <span className="text-emerald-700 text-[10px] font-extrabold uppercase">AI</span>
            </div>
            <div className="pt-0.5">
              <p className="text-sm font-semibold text-slate-700">Hello! 👋</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">How can we help you today?</p>
            </div>
          </div>
          
          {/* Triangle pointer pointing down */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-emerald-100 transform rotate-45"></div>
          
          {/* Close button for tooltip */}
          <button 
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-[10px] hover:bg-slate-200 transition-colors shadow-sm"
          >
            ✕
          </button>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleClick}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 relative group"
          aria-label="Contact us on WhatsApp"
        >
          {/* Pulse effect */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75 duration-1000"></div>
          
          {/* WhatsApp Icon */}
          <svg 
            viewBox="0 0 24 24" 
            width="28" 
            height="28" 
            fill="currentColor" 
            className="relative z-10"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WhatsAppWidget;

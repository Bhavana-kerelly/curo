import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, User, ArrowLeft, Heart, BookOpen, Clock, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import { blogsData } from '../data/blogsData';
import blogsContent from '../data/blogsContent.json';

const SingleBlogPage = ({ blogId }) => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  
  const blog = blogsData.find(b => b.id.toString() === blogId.toString());

  // Filter 3 related/other blogs
  const relatedBlogs = blogsData
    .filter(b => b.id.toString() !== blogId.toString())
    .slice(0, 3);

  // Helper to find matching doctor details
  const getAuthorDoctor = () => {
    if (!blog) return null;
    const titleLower = blog.title.toLowerCase();
    if (titleLower.includes('yogini')) {
      return {
        name: 'Dr. Yogini Khetawat',
        specialty: 'Dentist',
        image: './images/yogini.jpg',
        whatsapp: 'https://wa.me/918919942870?text=Hello%20Dr.%20Yogini%20Khetawat,%20I%20would%20like%20to%20book%20a%20dental%20appointment.'
      };
    }
    if (titleLower.includes('feroz')) {
      return {
        name: 'Dr. Feroz Basha Shaik',
        specialty: 'ENT Specialist',
        image: './images/feroz_basha.jpg',
        whatsapp: 'https://wa.me/918919942870?text=Hello%20Dr.%20Feroz%20Basha%20Shaik,%20I%20would%20like%20to%20book%20an%20ENT%20appointment.'
      };
    }
    if (titleLower.includes('sivaharika')) {
      return {
        name: 'Dr. Sivaharika Rayudu',
        specialty: 'Obstetrician & Gynecologist',
        image: './images/sivaharika.jpg',
        whatsapp: 'https://wa.me/918919942870?text=Hello%20Dr.%20Sivaharika%20Rayudu,%20I%20would%20like%20to%20book%20a%20gynecology%20appointment.'
      };
    }
    if (titleLower.includes('nagarjuna')) {
      return {
        name: 'Dr. Nagarjuna Doppalapudi',
        specialty: 'General & Laparoscopic Surgeon',
        image: './images/nagarjuna_doppalapudi.jpg',
        whatsapp: 'https://wa.me/918919942870?text=Hello%20Dr.%20Nagarjuna%20Doppalapudi,%20I%20would%20like%20to%20book%20a%20surgery%20consultation.'
      };
    }
    if (titleLower.includes('sivani')) {
      return {
        name: 'Dr. Sivani Payneni',
        specialty: 'Physician & Diabetologist',
        image: './images/sivani_payneni.jpg',
        whatsapp: 'https://wa.me/918919942870?text=Hello%20Dr.%20Sivani%20Payneni,%20I%20would%20like%20to%20book%20a%20general%20medicine%20appointment.'
      };
    }
    if (titleLower.includes('sharatchandra')) {
      return {
        name: 'Dr. Sharatchandra Reddy Atla',
        specialty: 'Internal Medicine Specialist',
        image: './images/sharatchandra_reddy.jpg',
        whatsapp: 'https://wa.me/918919942870?text=Hello%20Dr.%20Sharatchandra%20Reddy%20Atla,%20I%20would%20like%20to%20book%20an%20appointment.'
      };
    }
    return null;
  };

  const doctor = getAuthorDoctor();

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo('.single-blog-fade',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }, [blogId]);

  if (!blog) {
    return (
      <main className="w-full min-h-screen bg-white text-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <a href="#/blogs" className="text-emerald-600 font-bold hover:underline">Return to Blogs</a>
        </div>
      </main>
    );
  }

  return (
    <main ref={pageRef} className="w-full bg-[#F8FAFC] text-slate-800 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full pt-[130px] pb-32 lg:pt-[150px] lg:pb-40 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#0C3E38] via-[#053D38] to-[#022421] overflow-hidden text-white">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          <a 
            href="#/blogs" 
            className="single-blog-fade inline-flex items-center gap-2 text-emerald-300 hover:text-white transition-colors font-medium text-sm mb-6 self-start sm:self-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </a>

          <div className="single-blog-fade inline-flex items-center justify-center mb-6">
            <span className="text-[11px] font-bold text-emerald-300 tracking-[0.25em] uppercase px-4 py-1.5 border border-emerald-500/30 rounded-full bg-emerald-500/10">
              {blog.category}
            </span>
          </div>
          
          <h1 className="single-blog-fade text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.25] max-w-4xl mb-6 text-white font-sans">
            {blog.title}
          </h1>

          <div className="single-blog-fade flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm font-light mt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN GRID LAYOUT */}
      <section className="w-full py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Featured Image Card (Outside grid on top) */}
          <div className="single-blog-fade w-full h-auto rounded-[32px] overflow-hidden shadow-2xl -mt-24 relative z-20 bg-white border border-slate-100">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-auto block transition-transform duration-700 hover:scale-[1.01]" 
            />
          </div>

          {/* 2-Column Content and Sidebar Grid (Starts below featured image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT: Article Content */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-slate-100/80">
              <div className="prose prose-lg prose-slate max-w-none prose-p:font-light prose-p:text-slate-600 prose-p:leading-relaxed">
                {(() => {
                  let contentArray = blog.content;
                  if (!contentArray && blog.docFile && blogsContent[blog.docFile]) {
                    contentArray = blogsContent[blog.docFile].split('\n').filter(p => p.trim() !== '');
                  }
                  
                  if (contentArray) {
                    return contentArray.map((paragraph, idx) => {
                      // Check if it is a heading/sub-header
                      if (paragraph.length < 90 && !paragraph.endsWith('.') && !paragraph.endsWith('?') && !paragraph.endsWith('"')) {
                        return (
                          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-10 mb-5 pb-2 border-b border-slate-100">
                            {paragraph}
                          </h3>
                        );
                      }
                      // Regular paragraph
                      return (
                        <p key={idx} className="text-[16px] sm:text-[17px] leading-[1.85] text-[#475569] mb-6 font-light">
                          {paragraph}
                        </p>
                      );
                    });
                  } else {
                    return (
                      <p className="text-[17px] leading-[1.85] text-[#475569] mb-6 font-light">
                        {blog.summary || blog.excerpt}
                      </p>
                    );
                  }
                })()}
              </div>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Matching Doctor Sidebar Widget */}
              {doctor && (
                <div className="single-blog-fade bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center relative z-20">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-emerald-500/20 shadow-md">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full mb-2">
                    Featured Specialist
                  </span>
                  <h4 className="text-lg font-bold text-[#0F172A]">{doctor.name}</h4>
                  <p className="text-xs text-slate-500 mb-4">{doctor.specialty}</p>
                  <div className="w-full h-[1px] bg-slate-100 my-4" />
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    Consult directly with {doctor.name} at our Kokapet clinic for expert, personalized guidance.
                  </p>
                  <a
                    href={doctor.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#053D38] hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Book Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

            {/* Quick CTA Card */}
            <div className="single-blog-fade bg-gradient-to-br from-[#0C3E38] to-[#053D38] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              {/* Decorative radial blur */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
              
              <h4 className="text-lg font-bold mb-2">Need Medical Help?</h4>
              <p className="text-xs text-white/80 leading-relaxed mb-5">
                Our clinic in Kokapet features state-of-the-art facilities and a highly experienced clinical team to address all your healthcare needs.
              </p>
              
              <div className="flex flex-col gap-2">
                <a 
                  href="tel:+918106770862"
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-center rounded-xl text-xs font-semibold transition-colors"
                >
                  Call +91 81067 70862
                </a>
                <a 
                  href="https://wa.me/918919942870?text=Hello,%20I%20would%20like%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-center rounded-xl text-xs font-semibold transition-colors shadow-sm"
                >
                  Book via WhatsApp
                </a>
              </div>
            </div>

            {/* Recommended Articles Sidebar Widget */}
            <div className="single-blog-fade bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recommended Articles</h4>
                <a href="#/blogs" className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                  View All
                </a>
              </div>
              <div className="flex flex-col gap-4">
                {relatedBlogs.map((item) => (
                  <a
                    key={item.id}
                    href={`#/blog/${item.id}`}
                    className="group flex flex-col gap-3 hover:bg-[#F8FAFC]/60 p-3 rounded-2xl transition-all duration-300 border border-slate-100/50"
                  >
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-100/80 shadow-sm">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                      <span className="text-[10px] text-slate-400 font-semibold">{item.date}</span>
                      <h5 className="font-bold text-sm text-[#0F172A] leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {item.title}
                      </h5>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

      <Footer />
    </main>
  );
};

export default SingleBlogPage;

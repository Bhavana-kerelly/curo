import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Footer from '../components/Footer';
import { blogsData } from '../data/blogsData';

gsap.registerPlugin(ScrollTrigger);

const BlogsPage = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Hero animations
    gsap.fromTo('.blogs-hero-text',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    // Blog cards staggered fade up
    gsap.fromTo('.blog-card',
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.blogs-grid',
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <main ref={pageRef} className="w-full bg-white text-slate-800 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[600px] flex items-center justify-center pt-[120px] pb-10 px-6 md:px-12 lg:px-20 bg-[#085249] overflow-hidden text-white">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: 'url("/images/blogs-hero-bg.jpg")' }}
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#085249]/90 via-[#085249]/40 to-transparent pointer-events-none" />

        {/* Ambient Blur spheres */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
          <div className="blogs-hero-text inline-flex items-center justify-center mb-6">
            <span className="text-[11px] font-bold text-white tracking-[0.25em] uppercase px-4 py-1 border border-white/30 rounded-full">
              Health & Wellness Insights
            </span>
          </div>
          
          <h1 className="blogs-hero-text font-serif text-4xl sm:text-6xl lg:text-7xl font-[300] tracking-tight leading-[1.1] mb-6">
            Our Latest <br />
            <span className="font-semibold text-teal-100">Medical Articles</span>
          </h1>
          
          <p className="blogs-hero-text text-white/90 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Stay informed with the latest health tips, medical news, and expert advice from our leading specialists at Curo Clinics.
          </p>
        </div>
      </section>

      {/* 2. BLOGS GRID SECTION */}
      <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-[#F4F9F8]">
        <div className="max-w-7xl mx-auto">
          <div className="blogs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsData.map((blog) => (
              <a href={`/blog/${blog.slug}`} key={blog.id} className="block">
                <article className="blog-card flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,168,107,0.08)] hover:-translate-y-2 cursor-pointer group h-full">
                
                {/* Blog Image */}
                <div className="relative w-full overflow-hidden bg-[#F4F9F8]">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-8 flex flex-col flex-1">
                  


                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-800 leading-snug mb-3 group-hover:text-emerald-600 transition-colors line-clamp-3">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm group/btn">
                    Read Article 
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </div>

                </div>
              </article>
            </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogsPage;

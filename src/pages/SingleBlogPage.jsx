import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import { blogsData } from '../data/blogsData';

const SingleBlogPage = ({ blogId }) => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  
  const blog = blogsData.find(b => b.id === blogId);

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo('.single-blog-fade',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
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
    <main ref={pageRef} className="w-full bg-white text-slate-800 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full pt-[120px] pb-24 lg:pt-[140px] lg:pb-32 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#A6DDD5] via-[#5FB1A5] to-[#085249] overflow-hidden text-white">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          <a href="#/blogs" className="single-blog-fade inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium text-sm mb-4 self-start sm:self-center">
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </a>

          <div className="single-blog-fade inline-flex items-center justify-center mb-4">
            <span className="text-[11px] font-bold text-white tracking-[0.25em] uppercase px-4 py-1 border border-white/30 rounded-full">
              {blog.category}
            </span>
          </div>
          
          <h1 className="single-blog-fade font-serif text-3xl sm:text-4xl lg:text-5xl font-[300] tracking-tight leading-[1.2] mb-6">
            {blog.title}
          </h1>
          
          <div className="single-blog-fade flex items-center justify-center gap-6 text-sm font-medium text-white/90">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BLOG CONTENT SECTION */}
      <section className="w-full py-16 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          
          {/* Featured Image */}
          <div className="single-blog-fade w-full h-[300px] sm:h-[450px] md:h-[550px] rounded-[32px] overflow-hidden shadow-xl mb-16 -mt-32 relative z-20">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Text */}
          <div className="single-blog-fade prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-slate-800 prose-p:font-light prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-emerald-600">
            {blog.content.map((paragraph, idx) => {
              // If paragraph is short and ends without punctuation, treat it as a heading
              if (paragraph.length < 60 && !paragraph.endsWith('.') && !paragraph.endsWith('?')) {
                return <h3 key={idx} className="text-2xl font-semibold text-slate-800 mt-10 mb-4">{paragraph}</h3>;
              }
              return <p key={idx} className="text-[17px] leading-[1.8] text-[#556976] mb-6">{paragraph}</p>;
            })}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SingleBlogPage;

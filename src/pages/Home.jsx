import React from 'react';
import Hero from '../components/Hero';
import WhyCuro from '../components/WhyCuro';
import AboutFounders from '../components/AboutFounders';
import Specialties from '../components/Specialties';
import Doctors from '../components/Doctors';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import AppointmentCTA from '../components/AppointmentCTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main className="relative w-full bg-[#F8FBFA]">
      {/* Cinematic Video Background Hero Section */}
      <div id="home">
        <Hero />
      </div>

      {/* Why Choose Curo Clinics Section */}
      <WhyCuro />

      {/* About Curo Clinics & Founders Section */}
      <AboutFounders />

      {/* Specialties Grid Section */}
      <Specialties />

      {/* Meet Our Doctors Strip Section */}
      <Doctors />

      {/* Immersive Patient Testimonials Section */}
      <Testimonials />

      {/* Hospital Environment Bento Gallery Section */}
      <Gallery />

      {/* Schedule Your Appointment CTA Section */}
      <AppointmentCTA />

      {/* Premium Spacious Footer Section */}
      <Footer />
    </main>
  );
};

export default Home;

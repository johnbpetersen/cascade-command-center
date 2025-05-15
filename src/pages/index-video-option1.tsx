// pages/index-video-option1.tsx

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroVideoOption1 from '@/components/HeroVideoOption1';
import TrophicDefinition from '../components/TrophicDefinition';
import WisdomThreeDots from '../components/WisdomThreeDots';
import SingleTestimonial from '../components/SingleTestimonial';
import About from '../components/About';
import Services from '../components/Services';
import Approach from '../components/Approach';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const IndexVideoOption1: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll<HTMLElement>('[class*="animate-"]')
              .forEach((el) => (el.style.animationPlayState = 'running'));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((s) => observer.observe(s));
    return () => document.querySelectorAll('section').forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <div className="min-h-screen bg-cascade-off-white">
      <Navbar />
      <HeroVideoOption1 />
      <TrophicDefinition />
      <WisdomThreeDots />
      <SingleTestimonial />
      <About />
      <Services />
      <Approach />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default IndexVideoOption1;
// src/pages/index-video.tsx
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroVideo from '@/components/HeroVideo';
import TrophicDefinition from '@/components/TrophicDefinition';
import WisdomThreeDots from '@/components/WisdomThreeDots';
import SingleTestimonial from '@/components/SingleTestimonial';
import About from '@/components/About';
import Services from '@/components/Services';
import Approach from '@/components/Approach';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HeroVideoOption1 from '@/components/HeroVideoOption1';
import HeroVideoOption2 from '@/components/HeroVideoOption2';
import HeroVideoOption3 from '@/components/HeroVideoOption3';

const IndexVideo: React.FC = () => {
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
    <div className="bg-cascade-off-white">
      {/* Existing Sections */}
      <Navbar />
      <HeroVideo />
      <TrophicDefinition />
      <WisdomThreeDots />
      <SingleTestimonial />
      <About />
      <Testimonials />
      <Contact />
      <Services />
      <Approach />
      <Footer />

      {/* Video Option Heroes */}
      <HeroVideoOption1 />
      <HeroVideoOption2 />
      <HeroVideoOption3 />
    </div>
  );
};

export default IndexVideo;
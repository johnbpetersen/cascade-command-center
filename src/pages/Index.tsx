
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrophicDefinition from '@/components/TrophicDefinition';
import About from '@/components/About';
import Services from '@/components/Services';
import Approach from '@/components/Approach';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  // Intersection Observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animatedElements = entry.target.querySelectorAll('[class*="animate-"]');
          animatedElements.forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.animationPlayState = 'running';
            }
          });
        }
      });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-cascade-off-white">
      <Navbar />
      <Hero />
      <TrophicDefinition />
      <About />
      <Services />
      <Approach />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

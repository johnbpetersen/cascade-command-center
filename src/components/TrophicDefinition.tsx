
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TrophicDefinition = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    
    if (section && text) {
      // Animate the highlight on scroll
      gsap.fromTo(
        text.querySelector('.highlight'),
        { 
          backgroundColor: 'rgba(255,255,255,0.1)',
        },
        { 
          backgroundColor: 'rgba(255,255,255,0.3)',
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="trophic-cascade-definition"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/water-background.jpg)',
        backgroundAttachment: 'fixed', // Subtle parallax effect
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cascade-blue to-cascade-blue-light opacity-30" />

      {/* Decorative Blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-cascade-blue-light rounded-full opacity-20 filter blur-xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cascade-blue rounded-full opacity-20 filter blur-2xl animate-pulse" />

      <div className="container-custom relative z-10 text-center">
        <h3 className="text-xl md:text-2xl font-medium tracking-wider text-white uppercase">
          Trophic Cascade
        </h3>
        <p className="mt-2 text-sm md:text-base italic text-white/80">
          noun.
        </p>
        <p className="mt-8 text-3xl md:text-4xl lg:text-5xl font-bold leading-snug text-white" ref={textRef}>
          the profound <span className="highlight inline-block bg-white/30 text-white px-2 py-1 rounded-lg animate-[pulse_3s_ease-in-out_infinite]">ripple effect</span> that occurs when a single, balanced force ignites transformation across the entire ecosystem
        </p>
      </div>
    </section>
  );
};

export default TrophicDefinition;

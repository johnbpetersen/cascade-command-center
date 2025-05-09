import React from 'react';
import { ArrowRight } from 'lucide-react';
import CanvasBackground from './CanvasBackground';

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden"
      id="hero"
    >
      {/* <-- Three.js background */}
      <CanvasBackground />

      {/* <-- Your existing Hero content */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <span className="inline-block text-cascade-blue font-medium mb-3 opacity-0 animate-fade-in [animation-delay:0.2s]">
              LEADERSHIP DEVELOPMENT
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight mb-6 opacity-0 animate-fade-in [animation-delay:0.4s]">
              <span className="block text-black">
                Elevate Your Leadership.
              </span>
              <span className="block text-gradient">
                Transform Your Impact.
              </span>
            </h1>
            <p className="text-cascade-gray text-xl max-w-2xl mb-8 opacity-0 animate-fade-in [animation-delay:0.6s]">
              Strategic coaching for sales professionals in enterprise software. Develop the mindset, skills, and presence to lead with confidence and impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center opacity-0 animate-fade-in [animation-delay:0.8s]">
              <a href="#services" className="btn-primary flex items-center justify-center gap-2 group">
                Explore Our Approach
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#testimonials" className="text-cascade-gray-dark hover:text-cascade-blue transition-colors duration-200 font-medium flex items-center gap-1">
                <span>View Success Stories</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden" id="hero">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-white to-cascade-gray-light opacity-70"></div>
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-cascade-blue opacity-5 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-cascade-blue-light opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cascade-blue opacity-5 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <span className="inline-block text-cascade-blue font-medium mb-3 opacity-0 animate-fade-in [animation-delay:0.2s]">LEADERSHIP DEVELOPMENT</span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight mb-6 opacity-0 animate-fade-in [animation-delay:0.4s]">
              Elevate Your <span className="text-gradient">Leadership</span> Potential
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
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end opacity-0 animate-fade-in [animation-delay:0.2s]">
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-[1.5px] border-cascade-blue/30 flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/0bec4c11-b6f4-42a0-af4b-2c4cb2782ab4.png"
                    alt="Trophic Cascade Wolf"
                    className="w-32 md:w-40 h-auto"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 md:w-32 md:h-32 rounded-full bg-cascade-blue-light/10 backdrop-blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 rounded-full bg-cascade-blue/10 backdrop-blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

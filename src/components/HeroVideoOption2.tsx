// src/components/HeroVideoOption2.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroVideoOption2: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 pb-24 bg-cascade-off-white overflow-hidden"
    >
      {/* full-screen looping video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/clouds.mp4"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/clouds.mp4" type="video/mp4" />
        <p>Video not supported. Please contact support.</p>
      </video>
      {/* white overlay */}
      <div className="absolute inset-0 bg-white/25 pointer-events-none" />
      {/* Option Label */}
      <div className="absolute top-4 left-4 text-cascade-blue text-sm font-medium bg-white/50 px-2 py-1 rounded z-20">
        Option 2: Urban Energy
      </div>
      {/* Hero content */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <span
              className="inline-block text-cascade-blue font-medium mb-3 opacity-0 animate-fade-in [animation-delay:0.2s]"
            >
              CAN YOU BE THE NEXT TROPHIC CASCADE?
            </span>
            <h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight mb-6 opacity-0 animate-fade-in [animation-delay:0.4s]"
            >
              <span className="block text-black">Elevate Your Leadership.</span>
              <span className="block text-gradient">Transform Your Impact.</span>
            </h1>
            <p
              className="text-cascade-gray text-xl max-w-2xl mb-8 opacity-0 animate-fade-in [animation-delay:0.6s]"
            >
              Strategic coaching for sales professionals in enterprise software. Develop the mindset, skills, and presence to lead with confidence and impact.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 sm:items-center opacity-0 animate-fade-in [animation-delay:0.8s]"
            >
              <a
                href="#services"
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                Book a Free Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideoOption2;
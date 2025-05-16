
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <section 
      id="contact" 
      className="relative min-h-[60vh] flex items-center justify-center flex-col text-center"
      style={{
        background: 'linear-gradient(to bottom, #0E3A6D, #010314)',
      }}
    >
      {/* Subtle top glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-52 bg-[#1675FF]/25 blur-3xl" 
        aria-hidden="true"
      ></div>
      
      <div className="container-custom max-w-4xl px-6 md:px-10 py-24 md:py-32 relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6 text-white">
          Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D6DCE3] via-white to-[#1675FF]">Transform Your Leadership?</span>
        </h2>
        
        <p className="text-lg md:text-xl text-[#D6DCE3]/90 mb-10 max-w-3xl mx-auto">
          Book a complimentary strategy call and discover how the wolf's cascade can unlock your next promotion, performance leap, and purpose-driven impact.
        </p>
        
        <div className="flex flex-col items-center space-y-6">
          <Button 
            className="inline-flex items-center gap-2 rounded-full bg-[#1675FF] hover:bg-white hover:text-[#0E3A6D] py-4 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-transform hover:scale-105 h-auto"
          >
            Book My Strategy Call <ArrowRight className="h-5 w-5" />
          </Button>
          
          <p className="text-[#D6DCE3]">
            Prefer to explore first?{" "}
            <a 
              href="/assets/TrophicCascade_Overview.pdf" 
              className="underline text-[#D6DCE3] hover:text-white transition-colors"
            >
              Download the program overview (PDF)
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

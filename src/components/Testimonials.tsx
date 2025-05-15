
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 opacity-0 animate-fade-in [animation-delay:0.2s] [animation-fill-mode:forwards] [animation-play-state:paused]">
            What People Are <span className="text-gradient">Saying</span>
          </h2>
          <p className="text-lg text-cascade-gray opacity-0 animate-fade-in [animation-delay:0.4s] [animation-fill-mode:forwards] [animation-play-state:paused]">
            Hear from leaders who have experienced transformative growth through our programs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative opacity-0 animate-fade-in [animation-delay:0.6s] [animation-fill-mode:forwards] [animation-play-state:paused]">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-2/3">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-cascade-blue" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl italic mb-6">
                  {testimonials[activeIndex].quote}
                </p>
                <div>
                  <h4 className="font-serif text-xl">{testimonials[activeIndex].name}</h4>
                  <p className="text-cascade-gray">{testimonials[activeIndex].title}</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 flex flex-col space-y-4">
                <div className="bg-cascade-gray-light h-48 rounded-md flex items-center justify-center text-cascade-gray">
                  <span className="text-4xl">⟁</span>
                </div>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full border border-cascade-gray-light flex items-center justify-center text-cascade-gray hover:text-cascade-blue hover:border-cascade-blue transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <span className="text-cascade-gray">
                    {activeIndex + 1}/{testimonials.length}
                  </span>
                  <button 
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full border border-cascade-gray-light flex items-center justify-center text-cascade-gray hover:text-cascade-blue hover:border-cascade-blue transition-colors"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    quote: "Working with Trophic Cascade transformed my approach to leadership. I gained the confidence and strategic mindset to navigate complex enterprise deals with clarity and purpose. The ROI has been immeasurable.",
    name: "Sarah Johnson",
    title: "VP of Enterprise Sales, Tech Innovations Inc.",
  },
  {
    quote: "The executive presence training has been game-changing. I'm now leading enterprise conversations with a level of gravitas and strategic insight that has dramatically improved our win rates and team morale.",
    name: "Michael Roberts",
    title: "Regional Sales Director, CloudForce Solutions",
  },
  {
    quote: "Trophic Cascade's approach is unlike any leadership development I've experienced. They truly understand the unique challenges of enterprise software sales leadership, and their methods create lasting change.",
    name: "David Chen",
    title: "Chief Revenue Officer, DataStream",
  },
];

export default Testimonials;

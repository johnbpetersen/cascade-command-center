
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TestimonialQuote: React.FC = () => {
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current.querySelectorAll('.animate-item'),
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%"
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="testimonial-quote"
      ref={quoteRef}
      className="relative bg-cover bg-center bg-no-repeat py-24"
      style={{
        backgroundImage: 'url(/images/yellowstone.jpg)',
        backgroundColor: 'rgba(79, 70, 229, 0.4)',
        backgroundBlendMode: 'overlay',
        backgroundAttachment: 'fixed', // Enables subtle parallax
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-serif text-white italic leading-relaxed mb-8 animate-item">
            "Working with David was a complete game-changer for my sales career. His coaching unlocked a deep confidence within me, taught me to lead with genuine connection, and gave me a vision that turned every deal into a mission. I'm not just closing more sales—I'm building a legacy."
          </blockquote>
          <cite className="block text-lg text-white font-sans not-italic animate-item">
            — Sarah Elizabeth Thompson, Senior Sales Director at Horizon Enterprises
          </cite>
        </div>
      </div>
    </section>
  );
};

export default TestimonialQuote;

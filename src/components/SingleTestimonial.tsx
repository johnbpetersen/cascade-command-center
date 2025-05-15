import React from 'react';

const TestimonialQuote: React.FC = () => {
  return (
    <section
      id="testimonial-quote"
      className="relative bg-cover bg-center bg-no-repeat py-24"
      style={{
        // Unsplash image URL
        backgroundImage: 'url(/images/yellowstone.jpg)',
        backgroundColor: 'rgba(79, 70, 229, 0.4)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-serif text-white italic leading-relaxed mb-8">
            “Working with David was a complete game-changer for my sales career. His coaching unlocked a deep confidence within me, taught me to lead with genuine connection, and gave me a vision that turned every deal into a mission. I’m not just closing more sales—I’m building a legacy.”
          </blockquote>
          <cite className="block text-lg text-white font-sans not-italic">
            — Sarah Elizabeth Thompson, Senior Sales Director at Horizon Enterprises
          </cite>
        </div>
      </div>
    </section>
  );
};

export default TestimonialQuote;
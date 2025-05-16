import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    quote: "Working with David was a complete game-changer for my sales career. His coaching unlocked a deep confidence within me, taught me to lead with genuine connection, and gave me a vision that turned every deal into a mission. I’ve tripled my sales numbers in just six months, and now I’m mentoring my team to achieve the same transformative growth.",
    name: "Sarah Thompson",
    title: "Senior Sales Director, Horizon Enterprises",
    featured: true,
    backgroundImage: '/images/river-valley.jpg',
  },
  {
    quote: "The trophic cascade approach transformed my entire leadership style. I went from managing transactions to creating ecosystems of success.",
    name: "Michael Roberts",
    title: "Regional Sales Director, CloudForce Solutions",
    backgroundImage: '/images/moose.jpg',
  },
  {
    quote: "David's coaching doesn't just improve results—it completely redefines what's possible. The ripple effect has transformed our entire organization.",
    name: "David Chen",
    title: "Chief Revenue Officer, DataStream",
    backgroundImage: '/images/waterfalls.jpg',
  },
  {
    quote: "Working with Trophic Cascade transformed my approach to leadership. I gained the confidence and strategic mindset to navigate complex enterprise deals with clarity and purpose.",
    name: "Jessica Miller",
    title: "VP of Enterprise Sales, Tech Innovations",
    backgroundImage: '/images/lake-sunset.jpg',
  },
  {
    quote: "The executive presence training was revolutionary. I now lead conversations with a level of gravitas that has dramatically improved our win rates.",
    name: "Robert Wilson",
    title: "Account Executive, SkyFusion",
    backgroundImage: '/images/bison.jpg',
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
  const isFeatured = testimonial.featured;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && testimonial.backgroundImage) {
      cardRef.current.style.setProperty('--bg-image', `url(${testimonial.backgroundImage})`);
    }
  }, [testimonial.backgroundImage]);

  return (
    <div className="card-wrapper">
      <Card
        ref={cardRef}
        className={`glass-card ${isFeatured ? 'md:col-span-2 border-[#1675FF]/50' : ''}`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '1rem',
          overflow: 'visible',
          height: '360px',
          position: 'relative',
        }}
      >
        <div className="relative flex flex-col p-5 h-full">
          <div className="absolute inset-0 bg-[#0E3A6D]/70 rounded-lg z-0" />
          
          <div className="absolute top-4 left-4 text-[#1675FF] z-10">
            <Quote size={24} className="drop-shadow-[0_0_6px_rgba(22,117,255,0.5)]" />
          </div>

          <div className="mt-10 flex-grow overflow-y-auto z-10">
            <p className="text-lg md:text-xl italic text-white leading-relaxed">
              "{testimonial.quote}"
            </p>
          </div>

          <div className="mt-4 bg-[#0E3A6D] p-3 rounded-b-lg z-10">
            <p className="text-sm tracking-wide uppercase text-white font-semibold">{testimonial.name}</p>
            <p className="text-sm tracking-wide uppercase text-white/80">{testimonial.title}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter((card) => card !== null) as HTMLDivElement[];

    if (!section || cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 20 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    cards.forEach((card) => {
      const wrapper = card.closest('.card-wrapper');
      if (!wrapper) return;

      wrapper.addEventListener('mouseenter', () => {
        gsap.to(wrapper, {
          scale: 1.03,
          duration: 0.3,
        });
        gsap.to(card, {
          boxShadow: '0 8px 24px 4px rgba(22, 117, 255, 0.3)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3,
        });
      });

      wrapper.addEventListener('mouseleave', () => {
        gsap.to(wrapper, {
          scale: 1,
          duration: 0.3,
        });
        gsap.to(card, {
          boxShadow: '0 4px 16px 2px rgba(0, 14, 46, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          duration: 0.3,
        });
      });
    });

    return () => {
      cards.forEach((card) => {
        const wrapper = card.closest('.card-wrapper');
        if (wrapper) {
          wrapper.removeEventListener('mouseenter', () => {});
          wrapper.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24"
      style={{
        background: 'linear-gradient(to bottom, #0E3A6D, #020617)',
      }}
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">
            What People Are <span className="text-gradient">Saying</span>
          </h2>
          <p className="text-lg text-[#D6DCE3]">
            Hear how the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D6DCE3] via-white to-[#1675FF]">cascade</span> reshapes careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={testimonial.featured ? 'md:col-span-2' : ''}
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .card-wrapper {
            transition: transform 0.3s ease-out;
          }

          .glass-card {
            box-shadow: 0 4px 16px 2px rgba(0, 14, 46, 0.2);
            transition: box-shadow 0.3s ease-out, border-color 0.3s ease-out;
          }

          .glass-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: var(--bg-image);
            background-size: cover;
            background-position: center;
            border-radius: 1rem;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }

          .card-wrapper:hover .glass-card {
            border: 1px solid rgba(22, 117, 255, 0.7);
            box-shadow: 0 8px 24px 4px rgba(22, 117, 255, 0.3);
          }

          .card-wrapper:hover .glass-card::before {
            opacity: 1;
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;
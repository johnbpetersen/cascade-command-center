
import React, { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    quote: "Working with David was a complete game-changer for my sales career. His coaching unlocked a deep confidence within me, taught me to lead with genuine connection, and gave me a vision that turned every deal into a mission.",
    name: "Sarah Thompson",
    title: "Senior Sales Director, Horizon Enterprises",
    featured: true
  },
  {
    quote: "The trophic cascade approach transformed my entire leadership style. I went from managing transactions to creating ecosystems of success.",
    name: "Michael Roberts",
    title: "Regional Sales Director, CloudForce Solutions"
  },
  {
    quote: "David's coaching doesn't just improve results—it completely redefines what's possible. The ripple effect has transformed our entire organization.",
    name: "David Chen",
    title: "Chief Revenue Officer, DataStream"
  },
  {
    quote: "Working with Trophic Cascade transformed my approach to leadership. I gained the confidence and strategic mindset to navigate complex enterprise deals with clarity and purpose.",
    name: "Jessica Miller",
    title: "VP of Enterprise Sales, Tech Innovations"
  },
  {
    quote: "The executive presence training was revolutionary. I now lead conversations with a level of gravitas that has dramatically improved our win rates.",
    name: "Robert Wilson",
    title: "Account Executive, SkyFusion"
  },
  {
    quote: "David's approach to sales leadership is unlike any training I've experienced in 15 years. It's not about tactics—it's about transformation.",
    name: "Emily Zhang",
    title: "Sales Enablement Director, NexusPoint"
  },
  {
    quote: "I've worked with many coaches, but David is the only one who transformed not just my results, but my entire approach to value creation.",
    name: "Thomas Jackson",
    title: "Enterprise Solution Architect, Quantum Systems"
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  const randomHeight = useRef(Math.floor(Math.random() * (360 - 220) + 220));
  const isFeatured = testimonial.featured;
  
  return (
    <Card 
      className={`glass-card opacity-0 translate-y-10 ${
        isFeatured ? 'row-span-2 col-span-1 md:col-span-2' : ''
      }`}
      style={{ 
        height: isFeatured ? 'auto' : `${randomHeight.current}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        transition: 'all 0.4s ease-out',
      }}
    >
      <div className="relative flex flex-col p-6 h-full">
        <div className="absolute top-6 left-6 text-[#1675FF] opacity-70">
          <Quote size={28} className="drop-shadow-[0_0_8px_rgba(22,117,255,0.5)]" />
        </div>
        
        <div className="mt-12 flex-grow">
          <p className="text-lg md:text-xl italic text-[#F4F7FA]/95 leading-relaxed">
            "{testimonial.quote}"
          </p>
        </div>
        
        <div className="mt-6 -mx-6 -mb-6 bg-[#0E3A6D]/70 p-4">
          <p className="text-sm tracking-wide uppercase text-white font-semibold">
            {testimonial.name}
          </p>
          <p className="text-sm tracking-wide uppercase text-white/80">
            {testimonial.title}
          </p>
        </div>
      </div>
    </Card>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  
  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    
    if (!section || cards.length === 0) return;
    
    // Create pinned section effect
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "120vh",
      pin: true,
      pinSpacing: true,
    });
    
    // Animate cards with stagger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      }
    });
    
    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.3,
      ease: "power2.out",
      filter: "blur(0px)"
    });
    
    // Add hover effects to all cards
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: card.classList.contains('row-span-2') ? 1.06 : 1.04,
          boxShadow: '0 20px 40px rgba(22, 117, 255, 0.4)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 8px 32px rgba(0, 14, 46, 0.35)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          duration: 0.3
        });
      });
    });
    
    // Add pulse animation to featured card
    const featuredCard = cards.find(card => card.classList.contains('row-span-2'));
    if (featuredCard) {
      gsap.to(featuredCard, {
        boxShadow: '0 0 30px rgba(22, 117, 255, 0.6)',
        repeat: -1,
        yoyo: true,
        duration: 6,
        ease: "sine.inOut"
      });
    }
    
    // Create floating wolf watermark effect
    const watermarkEl = document.createElement('div');
    watermarkEl.classList.add('wolf-watermark');
    watermarkEl.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 60%;
      background-image: url('/images/wolf-profile.jpeg');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.05;
      filter: grayscale(1) contrast(1.2);
      z-index: 0;
      pointer-events: none;
    `;
    section.appendChild(watermarkEl);
    
    gsap.to(watermarkEl, {
      x: 40,
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Clean up
    return () => {
      pinTrigger.kill();
      cards.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
      if (watermarkEl.parentNode) {
        watermarkEl.parentNode.removeChild(watermarkEl);
      }
    };
  }, []);
  
  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-[120vh] py-24"
      style={{
        background: 'linear-gradient(to bottom, #0E3A6D, #020617)',
        overflowX: 'hidden'
      }}
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 opacity-0"
             ref={el => el && gsap.to(el, {
               opacity: 1,
               duration: 1,
               scrollTrigger: {
                 trigger: el,
                 start: "top 80%"
               }
             })}
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">
            What People Are <span className="text-gradient">Saying</span>
          </h2>
          <p className="text-lg text-[#D6DCE3]">
            Hear how the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D6DCE3] via-white to-[#1675FF]">cascade</span> reshapes careers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 auto-rows-auto">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={testimonial.featured ? "md:col-span-2" : ""}
              style={{
                filter: "blur(5px)",
                transition: "all 0.4s ease"
              }}
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      <style>
        {`
        @keyframes border-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        
        .glass-card {
          box-shadow: 0 8px 32px rgba(0, 14, 46, 0.35);
          transition: all 0.3s ease-out;
        }
        
        .glass-card:hover {
          border-image: linear-gradient(
            90deg, 
            rgba(22, 117, 255, 0.7), 
            rgba(255, 255, 255, 0.5),
            rgba(22, 117, 255, 0.7)
          ) 1;
          border-image-slice: 1;
          animation: border-flow 4s linear infinite;
        }
      `}
      </style>
    </section>
  );
};

export default Testimonials;

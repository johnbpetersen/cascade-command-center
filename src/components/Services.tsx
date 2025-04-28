
import React from 'react';

const Services = () => {
  // Intersection Observer to trigger animations
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animatedElements = entry.target.querySelectorAll('[class*="animate-"]');
          animatedElements.forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.animationPlayState = 'running';
            }
          });
        }
      });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 opacity-0 animate-fade-in [animation-delay:0.2s] [animation-fill-mode:forwards] [animation-play-state:paused]">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-cascade-gray opacity-0 animate-fade-in [animation-delay:0.4s] [animation-fill-mode:forwards] [animation-play-state:paused]">
            Tailored programs designed specifically for sales professionals in the enterprise software space.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="card-premium border-t-4 border-t-cascade-blue flex flex-col opacity-0 animate-slide-up"
              style={{animationDelay: `${0.3 + index * 0.15}s`, animationFillMode: 'forwards', animationPlayState: 'paused'}}
            >
              <h3 className="font-serif text-2xl mb-4">{service.title}</h3>
              <p className="text-cascade-gray mb-4 flex-grow">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-cascade-blue mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="text-cascade-blue hover:text-cascade-blue-light transition-colors font-medium inline-flex items-center">
                Learn More
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const services = [
  {
    title: "Executive Coaching",
    description: "One-on-one coaching tailored to your specific leadership challenges and growth opportunities.",
    features: [
      "Strategic thinking development",
      "Executive presence cultivation",
      "Decision-making frameworks",
      "Personal brand refinement"
    ]
  },
  {
    title: "Team Development",
    description: "Transform your sales team's capabilities through collaborative learning and strategic development.",
    features: [
      "Cross-functional collaboration",
      "High-performance team culture",
      "Strategic communication",
      "Conflict resolution mastery"
    ]
  },
  {
    title: "Leadership Workshops",
    description: "Immersive learning experiences focused on critical leadership competencies and practical application.",
    features: [
      "Enterprise selling strategy",
      "Influential storytelling",
      "Authentic leadership presence",
      "Strategic relationship building"
    ]
  }
];

export default Services;

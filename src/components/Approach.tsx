
import React from 'react';

const Approach = () => {
  return (
    <section id="approach" className="section-padding subtle-gradient">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 opacity-0 animate-fade-in [animation-delay:0.2s] [animation-fill-mode:forwards] [animation-play-state:paused]">
              Our <span className="text-gradient">Approach</span>
            </h2>
            <p className="text-lg text-cascade-gray opacity-0 animate-fade-in [animation-delay:0.4s] [animation-fill-mode:forwards] [animation-play-state:paused]">
              We combine proven methodologies with innovative techniques to deliver transformative results.
            </p>
          </div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className="flex flex-col md:flex-row gap-6 md:gap-12 items-start opacity-0 animate-slide-up"
                style={{animationDelay: `${0.3 + index * 0.15}s`, animationFillMode: 'forwards', animationPlayState: 'paused'}}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-cascade-blue border border-cascade-blue/10">
                    <span className="font-serif text-2xl">{index + 1}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
                  <p className="text-cascade-gray">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Discovery & Assessment",
    description: "We begin with a comprehensive assessment to understand your unique challenges, strengths, and growth opportunities. This personalized approach ensures our work together is targeted to your specific needs."
  },
  {
    title: "Strategic Development",
    description: "Based on your assessment, we craft a tailored development plan that aligns with your goals and organizational context. Each plan combines proven frameworks with innovative approaches."
  },
  {
    title: "Immersive Learning",
    description: "Through one-on-one coaching, team workshops, and real-world application, you'll develop and practice new skills in a supportive environment designed for maximum retention and impact."
  },
  {
    title: "Sustained Implementation",
    description: "We provide ongoing support and accountability to ensure new behaviors become lasting habits. This includes follow-up coaching, peer learning, and progress measurements."
  }
];

export default Approach;

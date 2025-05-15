import React from 'react';
import DotDivider from './DotDivider';

const About = () => {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-cascade-off-white to-transparent" />

      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2
            className="
              font-serif text-4xl md:text-5xl mb-6
              opacity-0 animate-fade-in
              [animation-delay:0.2s]
              [animation-fill-mode:forwards]
              [animation-play-state:paused]
            "
          >
            Who is <span className="text-gradient">David Wolf</span>?
          </h2>

          {/* perfectly tight, equilateral triangle of dots */}
          <DotDivider
            size={8}
            gapX={16}
            className="
              my-4
              opacity-0 animate-fade-in
              [animation-delay:0.3s]
              [animation-fill-mode:forwards]
              [animation-play-state:paused]
            "
          />

          <p
            className="
              text-lg text-cascade-gray
              opacity-0 animate-fade-in
              [animation-delay:0.4s]
              [animation-fill-mode:forwards]
              [animation-play-state:paused]
            "
          >
            Trophic Cascade represents a powerful phenomenon in nature where
            apex predators create positive change throughout an entire
            ecosystem. We apply this principle to leadership development,
            creating waves of positive change through organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="card-premium opacity-0 animate-slide-up"
              style={{
                animationDelay: `${0.3 + i * 0.15}s`,
                animationFillMode: 'forwards',
                animationPlayState: 'paused',
              }}
            >
              <div className="mb-4">
                <div
                  className="
                    w-12 h-12 rounded-full bg-cascade-blue/10
                    flex items-center justify-center text-cascade-blue
                  "
                >
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-serif text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-cascade-gray">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: 'Strategic Vision',
    description:
      'Develop clarity and foresight to navigate complex business environments and lead with purpose and direction.',
    icon: <span className="text-2xl">✦</span>,
  },
  {
    title: 'Executive Presence',
    description:
      'Cultivate the gravitas, communication skills, and confidence to command attention and inspire action.',
    icon: <span className="text-2xl">★</span>,
  },
  {
    title: 'Transformative Impact',
    description:
      'Create cascading positive change that elevates your team’s performance and organizational outcomes.',
    icon: <span className="text-2xl">⟁</span>,
  },
];

export default About;
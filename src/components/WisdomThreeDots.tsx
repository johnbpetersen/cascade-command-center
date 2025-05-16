// src/components/WisdomThreeDots.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DotDivider from './DotDivider';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: 0,
    number: 1,
    title: 'Self',
    copy: 'Your inner foundation—aligning mind, body, and spirit to unlock authentic confidence and purpose in every sale.',
  },
  {
    id: 1,
    number: 2,
    title: 'Life',
    copy: 'The art of connection—leading with empathy and purpose to transform relationships and inspire trust.',
  },
  {
    id: 2,
    number: 3,
    title: 'Divine',
    copy: 'The spark of vision—tapping into a higher purpose to fuel resilience and create lasting impact.',
  },
];

const dotProps = {
  inactive: { scale: 1, opacity: 0.3, filter: 'blur(2px)', boxShadow: 'none' },
  active: {
    scale: 1.5,
    opacity: 1,
    filter: 'blur(0px)',
    boxShadow: '0 0 20px rgba(79, 70, 229, 0.8)',
  },
};

const textProps = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const WisdomThreeDots: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const textsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || dotsRef.current.some(el => !el) || textsRef.current.some(el => !el)) {
      return;
    }

    dotsRef.current.forEach(dot => {
      if (dot) gsap.set(dot, dotProps.inactive);
    });
    textsRef.current.forEach(text => {
      if (text) gsap.set(text, textProps.hidden);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=500%',
        scrub: 0.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    const numSteps = STEPS.length;
    const animationTransitionDuration = 0.05;
    const timeSlotPerStep = 1.0 / numSteps;

    STEPS.forEach((_, index) => {
      const dot = dotsRef.current[index];
      const text = textsRef.current[index];

      if (!dot || !text) return;

      const stepActivationStartTime = index * timeSlotPerStep;
      const stepDeactivationStartTime = (index + 1) * timeSlotPerStep;

      tl.to(dot, { ...dotProps.active, duration: animationTransitionDuration }, stepActivationStartTime);
      tl.to(
        dot.querySelector('span'),
        { opacity: 1, duration: animationTransitionDuration },
        stepActivationStartTime
      );
      tl.to(text, { ...textProps.visible, duration: animationTransitionDuration }, stepActivationStartTime);

      if (index === numSteps - 1) {
        const lastStepDeactivationTime = 0.9 - animationTransitionDuration;
        tl.to(dot, { ...dotProps.inactive, duration: animationTransitionDuration }, lastStepDeactivationTime);
        tl.to(
          dot.querySelector('span'),
          { opacity: 0, duration: animationTransitionDuration },
          lastStepDeactivationTime
        );
        tl.to(text, { ...textProps.hidden, duration: animationTransitionDuration }, lastStepDeactivationTime);
      } else {
        tl.to(dot, { ...dotProps.inactive, duration: animationTransitionDuration }, stepDeactivationStartTime);
        tl.to(
          dot.querySelector('span'),
          { opacity: 0, duration: animationTransitionDuration },
          stepDeactivationStartTime
        );
        tl.to(text, { ...textProps.hidden, duration: animationTransitionDuration }, stepDeactivationStartTime);
      }
    });

    tl.fromTo(
      textsRef.current.filter(el => el),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: animationTransitionDuration * 2,
        stagger: animationTransitionDuration,
      },
      0.9
    );

    tl.to(
      dotsRef.current.filter(el => el),
      { ...dotProps.active, duration: animationTransitionDuration * 2 },
      0.9
    );
    tl.to(
      dotsRef.current.map(dot => dot.querySelector('span')).filter(el => el),
      { opacity: 1, duration: animationTransitionDuration * 2 },
      0.9
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      dotsRef.current = [];
      textsRef.current = [];
    };
  }, []);

  return (
    <section
      id="wisdom-three-dots"
      ref={sectionRef}
      className="relative bg-white"
    >
      <header className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center px-4 z-10">
        <h2 className="text-5xl font-serif text-[#1A2526] mb-2">
          The Wisdom of <span className="text-gradient">Three Dots</span>
        </h2>
        <DotDivider
          size={8}
          gapX={16}
          className="
            my-1
            opacity-0 animate-fade-in
            [animation-delay:0.3s]
            [animation-fill-mode:forwards]
            [animation-play-state:paused]
          "
        />
        <p className="max-w-[700px] text-lg text-gray-600 leading-tight mt-6">
          At Trophic Cascade, we believe that lasting impact starts with a powerful inner harmony. These are the three pillars that turns strategic coaching into a cascading wave of growth and a leadership legacy that endures.
        </p>
      </header>

      <div ref={canvasRef} className="sticky top-0 h-screen flex items-center justify-center pt-40 overflow-hidden">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 px-6">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] shrink-0 mt-8">
            <img
              src="/images/logo.png"
              alt="Trophic Cascade Logo"
              className="absolute w-16 h-16 md:w-20 md:h-20 object-contain"
              style={{
                left: '50%',
                top: '57.7%',
                transform: 'translate(-50%, -50%)',
                zIndex: 5,
                opacity: 0.8,
              }}
            />
            {STEPS.map((step, i) => (
              <div
                key={`dot-${i}`}
                ref={(el) => (dotsRef.current[i] = el!)}
                className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: '#A3BFFA',
                  left: i === 0 ? '0%' : i === 1 ? '100%' : '50%',
                  top: i === 2 ? '0%' : '86.6%',
                  transform: `
                    ${i === 2 ? 'translateX(-50%)' : ''}
                    ${i === 1 ? 'translateX(-100%)' : ''}
                  `.trim(),
                }}
              >
                <span
                  className="text-white text-sm md:text-base font-bold"
                  style={{ opacity: 0 }}
                >
                  {step.number}
                </span>
              </div>
            ))}
          </div>

          <div className="relative flex-1 h-auto min-h-[400px] w-full lg:w-auto flex justify-center mt-8">
            {STEPS.map((step, i) => (
              <div
                key={`text-${step.id}`}
                ref={(el: HTMLDivElement | null) => {
                  if (el) textsRef.current[i] = el;
                }}
                className="absolute w-full max-w-lg mx-auto"
                style={{
                  top: `${i * 30 + 10}%`,
                }}
              >
                <h3 className="text-3xl md:text-4xl font-serif text-indigo-900 mb-4 text-center">{`${step.number}. ${step.title}`}</h3>
                <p className="text-lg text-gray-600 max-w-lg text-center mb-4">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WisdomThreeDots;
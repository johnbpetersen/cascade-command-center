// src/components/TrophicDefinition.tsx
import React from 'react';

const TrophicDefinition = () => {
  return (
    <section
      id="trophic-cascade-definition"
      className="relative py-32 overflow-hidden bg-gradient-to-r from-cascade-blue to-cascade-blue-light"
    >
      {/* Placeholder image background */}
      <div className="absolute inset-0">
  <img
    src="/images/water-background.jpg"
    alt="Background placeholder"
    className="w-full h-full object-cover opacity-30"
  />
</div>
      {/* Decorative blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-cascade-blue-light rounded-full opacity-20 filter blur-xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cascade-blue rounded-full opacity-20 filter blur-2xl animate-pulse" />

      <div className="container-custom relative z-10 text-center">
        <h3 className="text-xl md:text-2xl font-medium tracking-wider text-white uppercase">
          Trophic Cascade
        </h3>
        <p className="mt-2 text-sm md:text-base italic text-white/80">
          noun.
        </p>
        <p className="mt-8 text-3xl md:text-4xl lg:text-5xl font-bold leading-snug text-white">
          the profound <span className="inline-block bg-white/30 text-white px-2 py-1 rounded-lg animate-[pulse_3s_ease-in-out_infinite]">ripple effect</span> that occurs when a single, balanced force ignites transformation across the entire ecosystem
        </p>
      </div>
    </section>
  );
};

export default TrophicDefinition;
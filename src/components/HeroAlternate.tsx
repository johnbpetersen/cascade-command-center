import React from 'react';

const HeroVideoAlt: React.FC = () => {
  return (
    <section
      id="hero-alt"
      className="hero relative min-h-screen flex items-center justify-center bg-cascade-off-white overflow-hidden"
    >
      {/* Full-screen looping video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/wolf-feet-background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay for logo contrast */}
      <div className="absolute inset-0 bg-gray-900/40 pointer-events-none" />

      {/* Centered logo with liquid glass effect */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <img
          src="/images/logo-huge.png"
          alt="Trophic Cascade Logo"
          className="logo-liquid-glass w-[80vmin] h-[80vmin] max-w-[90vw] max-h-[90vh] object-contain"
        />
      </div>
    </section>
  );
};

export default HeroVideoAlt;
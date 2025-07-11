import React from 'react';
import { ArrowRight, Star, Zap, TrendingUp } from 'lucide-react';

const HeroVideo: React.FC = () => {
  return (
    <section
      id="hero"
      className="hero relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden"
    >
      {/* full-screen looping video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/wolf-feet-background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-primary/30 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Floating elements */}
      <div className="absolute top-20 right-10 opacity-20 animate-pulse">
        <div className="w-32 h-32 rounded-full bg-primary/20 blur-xl"></div>
      </div>
      <div className="absolute bottom-32 left-16 opacity-30 animate-pulse [animation-delay:1s]">
        <div className="w-24 h-24 rounded-full bg-accent/30 blur-lg"></div>
      </div>

      {/* Hero content */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 order-2 lg:order-1">
            
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 opacity-0 animate-fade-in [animation-delay:0.2s]">
              <Star className="w-4 h-4 text-accent" fill="currentColor" />
              <span className="text-white font-medium text-sm tracking-wide">ELITE LEADERSHIP TRANSFORMATION</span>
            </div>

            {/* Main headline with premium typography */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 opacity-0 animate-fade-in [animation-delay:0.4s]">
              <span className="block text-white mb-2">
                Unleash Your
              </span>
              <span className="block bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent font-black tracking-tight">
                Apex Potential
              </span>
            </h1>

            {/* Compelling subheadline */}
            <p className="text-white/90 text-xl md:text-2xl max-w-3xl mb-10 leading-relaxed opacity-0 animate-fade-in [animation-delay:0.6s]">
              Transform from software sales professional to 
              <span className="text-accent font-semibold"> industry apex predator</span>. 
              Master the cascade effect that elevates entire ecosystems.
            </p>

            {/* CTA section with multiple options */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center opacity-0 animate-fade-in [animation-delay:0.8s]">
              <a
                href="#services"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-primary rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <span>Claim Your Alpha Session</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <div className="text-white/80 text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-accent" />
                  <span>Free 60-min strategy call</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span>$50K+ average income increase</span>
                </div>
              </div>
            </div>

            {/* Social proof indicators */}
            <div className="flex items-center gap-8 mt-12 opacity-0 animate-fade-in [animation-delay:1s]">
              <div className="text-center">
                <div className="text-white font-bold text-2xl">500+</div>
                <div className="text-white/60 text-sm">Leaders Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-2xl">98%</div>
                <div className="text-white/60 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-2xl">3.2x</div>
                <div className="text-white/60 text-sm">Avg. Revenue Growth</div>
              </div>
            </div>
          </div>

          {/* Right side floating card */}
          <div className="lg:col-span-4 order-1 lg:order-2 opacity-0 animate-fade-in [animation-delay:1.2s]">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center">
                <div className="text-accent font-bold text-3xl mb-2">Next Cohort</div>
                <div className="text-white text-lg mb-4">Starting February 2025</div>
                <div className="text-white/80 text-sm mb-6">Limited to 12 high-performers</div>
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Only 3 Spots Remaining
                </div>
                <a href="#contact" className="block w-full bg-white text-primary py-3 rounded-full font-semibold hover:bg-white/90 transition-colors">
                  Reserve My Spot
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
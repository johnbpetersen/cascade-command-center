import React, { useEffect, useRef, useState } from 'react';
import DotDivider from './DotDivider';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  // For portrait slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % portraitImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden min-h-[80vh] py-24 md:py-32"
      style={{
        background: "linear-gradient(to bottom right, #D6DCE3, #F4F7FA)",
        backgroundImage: "url('/subtle-texture.png'), linear-gradient(to bottom right, #D6DCE3, #F4F7FA)",
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-cascade-off-white to-transparent" />

      <div className="container-custom max-w-7xl px-8 md:px-16">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-3 opacity-0 animate-slide-up" 
               style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationPlayState: 'paused' }}>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight mb-8">
              I am the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0E3A6D] to-[#1675FF]">wolf altering rivers</span> causing the trophic cascade in all that I am and all that I do through leading self in alignment with life and the divine. Each day I wake up focused on building my kingdom brick by brick.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 my-8">
              {credentials.map((credential, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl bg-white/80 shadow-lg backdrop-blur px-6 py-4 text-sm md:text-base font-medium"
                  style={{ 
                    animationDelay: `${0.5 + idx * 0.15}s`, 
                    animationFillMode: 'forwards',
                    animationPlayState: 'paused',
                    opacity: 0 
                  }}
                  className="animate-fade-in"
                >
                  {credential}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                className="inline-flex items-center gap-2 rounded-full bg-[#0E3A6D] hover:bg-[#1675FF] text-white py-3 px-6 font-semibold shadow-md hover:scale-105 transition"
              >
                See Full Credentials <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="md:col-span-2 opacity-0 animate-slide-up" 
               style={{ animationDelay: '0.6s', animationFillMode: 'forwards', animationPlayState: 'paused' }}>
            <div className="relative aspect-[3/4] w-full mx-auto">
              {portraitImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    currentImage === index ? "opacity-100" : "opacity-0"
                  )}
                >
                  <img
                    src={image}
                    alt={`David Wolf portrait ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-2xl outline outline-2 outline-[#0E3A6D]/40"
                  />
                </div>
              ))}
              
              <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
                {portraitImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      currentImage === index ? "bg-cascade-blue w-6" : "bg-cascade-gray/30"
                    )}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const credentials = [
  "Youngest SAP NA exec – 9 promotions in 12 yrs",
  "5× Winners' Circle – $150k invested in elite coaching",
  "Lean Six Sigma Black Belt – rebuilt worst → best org",
  "Eagle Scout & amateur natural bodybuilder – multimillion net worth"
];

const portraitImages = [
  "/images/yellowstone.jpg", // Placeholder, replace with actual images
  "/images/water-background.jpg",
  "/images/logo.png"
];

export default About;

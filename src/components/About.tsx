import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import DotDivider from './DotDivider';
import { Award, Star, Trophy, Zap } from 'lucide-react';

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % portraitImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen py-16 bg-white flex items-center justify-center">
      <div className="relative container mx-auto max-w-6xl px-4 text-center">
        {/* Header with Dot Divider */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-6xl text-[#1A2526] mb-4"
        >
          Who is <span className="text-gradient">David Wolf</span>?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <DotDivider size={8} gapX={16} className="my-6" />
        </motion.div>

        {/* Vision Statement with Full-Width Blue Bar */}
        <div className="bg-[#0E3A6D] py-12 -mx-4">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-3xl md:text-4xl text-white leading-relaxed max-w-4xl mx-auto px-4"
          >
            I am the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4B9EFF] to-[#A1CFFF]">wolf altering rivers</span>, igniting a trophic cascade in all I am and do—leading self in harmony with life and the divine. Each dawn, I rise to forge my kingdom, brick by eternal brick.
          </motion.h3>
        </div>

        {/* Image and Accomplishments Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-16">
          {/* Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-full aspect-[4/5] max-w-md mx-auto"
          >
            {portraitImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentImage === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`David Wolf portrait ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl shadow-2xl border border-gray-200"
                />
              </div>
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              {portraitImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentImage === index ? 'bg-[#4B9EFF] w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Accomplishments with Blurb */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-6"
          >
            {/* Blurb */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-[#1A2526] text-lg leading-relaxed"
            >
              I am a go-getter, team oriented, outgoing, adventurous, and driven. Going the extra mile to get the job done the right way is built into my DNA and something I cannot shy away from. Do it right the first time....do it right every time. I believe in putting forth the best effort in everything I do.
            </motion.p>

            {/* Accomplishments with Icons */}
            {credentials.map((credential, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 + 1 }}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all"
              >
                {credentialIcons[idx]}
                <span className="text-[#1A2526] text-base font-medium">{credential}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="mt-6"
            >
              <Button className="rounded-full bg-gradient-to-r from-[#4B9EFF] to-[#A1CFFF] text-white py-3 px-8 font-semibold shadow-lg hover:scale-105 transition">
                Full Credentials <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const credentials = [
  'Youngest SAP NA exec – 9 promotions in 12 yrs',
  '5× Winners’ Circle – $150k in elite coaching',
  'Lean Six Sigma Black Belt – rebuilt worst to best org',
  'Eagle Scout & bodybuilder – multimillion net worth',
];

const credentialIcons = [
  <Zap key="0" className="h-8 w-8 text-[#4B9EFF]" />,
  <Star key="1" className="h-8 w-8 text-[#4B9EFF]" />,
  <Trophy key="2" className="h-8 w-8 text-[#4B9EFF]" />,
  <Award key="3" className="h-8 w-8 text-[#4B9EFF]" />,
];

const portraitImages = [
  '/images/wolf-profile.jpeg',
  '/images/water-background.jpg',
  '/images/logo.png',
];

export default About;
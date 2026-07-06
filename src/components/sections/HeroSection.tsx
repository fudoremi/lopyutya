import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Capybara } from "../illustrations/Capybara";
import { DoodleHeart } from "../illustrations/Doodles";
import { MagneticButton } from "../ui/MagneticButton";
import { WarmGradientMesh } from "../illustrations/Gradients";
import type { TrackInfo } from "../layout/MusicPlayer";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px -80% 0px" });

  useEffect(() => {
    if (isInView) {
      const track: TrackInfo = {
        videoId: "ytMxh-_6EcI", // Foto Kita Blur
        title: "Foto Kita Blur",
        artist: "Sal Priadi",
        start: 60, // approximate chorus
      };
      window.dispatchEvent(new CustomEvent("changeMusic", { detail: track }));
    }
  }, [isInView]);
  return (
    <section id="story" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      <WarmGradientMesh />
      
      {/* Floating Elements Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div className="absolute top-1/4 left-1/4 text-hazelnut/40" animate={{ y: [0, -20, 0], rotate: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity }}>
          <DoodleHeart className="w-16 h-16" />
        </motion.div>
        <motion.div className="absolute top-1/3 right-1/4 text-muted-gold/30" animate={{ y: [0, 30, 0], rotate: [15, -15, 15] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }}>
          <DoodleHeart className="w-24 h-24" />
        </motion.div>
        <motion.div className="absolute bottom-1/4 left-1/3 text-soft-brown/20" animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }}>
          <DoodleHeart className="w-12 h-12" />
        </motion.div>
      </div>

      <div className="container max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <Capybara variant="waving" className="w-48 h-36 md:w-64 md:h-48 drop-shadow-2xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-chocolate leading-tight mb-6"
        >
          Our Little <br className="md:hidden" />
          <span className="relative inline-block">
            <span className="relative z-10 italic text-soft-brown">Story</span>
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-2 left-0 h-4 bg-muted-gold/30 -z-0 -rotate-2" 
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-2xl text-soft-brown max-w-2xl mb-12 font-light"
        >
          A collection of warm memories, silly moments, and every reason why you make me smile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <MagneticButton variant="primary" onClick={() => document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Begin the Journey</span>
            <DoodleHeart className="w-5 h-5 ml-2" animated={false} />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-soft-brown"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-12 bg-gradient-to-b from-soft-brown to-transparent"
        />
      </motion.div>
    </section>
  );
};

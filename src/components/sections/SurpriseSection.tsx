import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Capybara } from "../illustrations/Capybara";
import { DoodleHeart } from "../illustrations/Doodles";
import { ScratchCard } from "../ui/ScratchCard";

export const SurpriseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen py-32 bg-chocolate text-cream overflow-hidden flex items-center justify-center px-6">
      
      {/* Dark background floating elements */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "110vh", opacity: 0, x: Math.random() * window.innerWidth }}
              animate={{ 
                y: "-10vh", 
                opacity: [0, 1, 1, 0],
                x: `+=${(Math.random() - 0.5) * 200}px`
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
              className="absolute text-muted-gold/20"
            >
              <DoodleHeart className="w-8 h-8" animated={false} />
            </motion.div>
          ))}
        </div>
      )}

      <div ref={ref} className="container max-w-3xl mx-auto relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
          className="mb-12"
        >
          <Capybara variant="waving" className="w-48 h-36 filter drop-shadow-[0_0_15px_rgba(216,179,106,0.3)]" />
        </motion.div>

        <ScratchCard>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-5xl md:text-7xl mb-8 text-warm-beige"
          >
            Thank You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl text-cream/80 font-light leading-relaxed max-w-2xl mb-8"
          >
            For exploring this little journey, for every shared moment, and for being you. You make the ordinary feel extraordinary.
            <br /><br />
            <span className="font-serif text-3xl md:text-4xl text-muted-gold font-medium italic mt-4 block">Cyintya Putri Mahdani</span>
            <br />
            <span className="font-serif text-xl md:text-2xl text-cream/90 font-medium italic block">I will always love you so much more everyday and forever my princess</span>
          </motion.p>
        </ScratchCard>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <DoodleHeart className="w-16 h-16 text-muted-gold" />
        </motion.div>
      </div>
    </section>
  );
};

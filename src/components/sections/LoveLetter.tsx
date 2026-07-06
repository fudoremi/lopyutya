import { useState } from "react";
import { motion } from "framer-motion";
import { Capybara } from "../illustrations/Capybara";

export const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(false);

  const text = "Setiap momen denganmu terasa seperti hari Minggu pagi yang tenang. Kamu membawa kehangatan, kenyamanan, dan kebahagiaan tanpa akhir ke dalam hidupku. Aku tidak akan pernah menukar perjalanan kita dengan apapun di dunia ini.";
  const letters = Array.from(text);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setIsRead(true), 1200); // Wait for paper to slide out
  };

  return (
    <section id="letter" className="relative min-h-screen py-32 flex items-center justify-center px-6 overflow-hidden bg-warm-beige/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cream via-cream/50 to-transparent pointer-events-none z-0" />
      
      <div className="container max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate mb-4">A Note For You</h2>
          <p className="text-soft-brown text-lg">Click the envelope to open</p>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative w-full max-w-md h-72 md:h-80 mx-auto cursor-pointer perspective-1000 mt-20" onClick={!isOpen ? handleOpen : undefined}>
          
          {/* Envelope Back */}
          <motion.div 
            animate={isOpen ? { opacity: 0, scale: 0.9, y: 50 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute inset-0 bg-hazelnut rounded-lg shadow-2xl" 
          />

          {/* Letter Paper */}
          <motion.div
            initial={false}
            animate={isOpen ? { 
              y: -100, 
              scale: 1.1, 
              height: "150%", 
              zIndex: 30,
              opacity: 1 
            } : { 
              y: 0, 
              scale: 0.85, 
              height: "90%", 
              zIndex: 10,
              opacity: 0
            }}
            transition={{ duration: 1, ease: "easeInOut", delay: isOpen ? 0.2 : 0 }}
            className="absolute left-2 right-2 md:left-4 md:right-4 top-4 bg-cream/95 backdrop-blur-md rounded-xl shadow-2xl border border-warm-beige flex flex-col overflow-hidden"
          >
            <div className="w-full flex justify-center py-6 shrink-0 border-b border-warm-beige/30 bg-cream/80 backdrop-blur-sm z-10 shadow-sm relative">
              <Capybara variant="sleeping" className="w-16 h-12 drop-shadow-sm" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
              <p className="font-serif text-lg md:text-xl text-chocolate leading-relaxed whitespace-pre-wrap">
                {isRead ? (
                  letters.map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.05, delay: index * 0.03 }}
                    >
                      {letter}
                    </motion.span>
                  ))
                ) : null}
              </p>
              
              {isRead && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: letters.length * 0.03 + 0.5 }}
                  className="mt-8 text-right w-full text-muted-gold font-medium italic"
                >
                  Forever yours,
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Envelope Front Flap */}
          <motion.div
            initial={false}
            animate={isOpen ? { rotateX: -180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: "top" }}
            className="absolute top-0 left-0 w-full h-[150px] z-20 opacity-90 drop-shadow-md"
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-soft-brown">
              <path d="M 0 0 L 100 0 L 50 100 Z" fill="currentColor" />
            </svg>
          </motion.div>

          {/* Envelope Front Pocket */}
          <motion.div 
            animate={isOpen ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-0 left-0 w-full h-[70%] bg-soft-brown rounded-b-lg z-20 pointer-events-none flex items-center justify-center border-t border-hazelnut/30" 
          >
            <Capybara variant="default" className="w-20 h-20 opacity-30 mt-10" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

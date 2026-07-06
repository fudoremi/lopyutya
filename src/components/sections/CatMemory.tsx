import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DoodleHeart } from "../illustrations/Doodles";
import type { TrackInfo } from "../layout/MusicPlayer";

export const CatMemory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      const track: TrackInfo = {
        videoId: "3GEGy9b7oZA", // Ada Titik Titik
        title: "Ada Titik-Titik...",
        artist: "Sal Priadi",
        start: 75, // approximate chorus
      };
      window.dispatchEvent(new CustomEvent("changeMusic", { detail: track }));
    }
  }, [isInView]);

  return (
    <section id="angel" ref={ref} className="relative py-32 px-6 bg-gradient-to-b from-cream to-warm-beige/30 overflow-hidden">
      
      {/* Soft floating background elements */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-[50px]"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-20 w-48 h-48 bg-muted-gold/20 rounded-full blur-[60px]"
        />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <DoodleHeart className="w-12 h-12 text-muted-gold mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate mb-4">Our Little Angel</h2>
          <p className="text-soft-brown text-lg max-w-2xl mx-auto italic font-light">
            Meski sekarang kamu udah lari-lari di surga kucing, bulu-bulu lembutmu dan suara meongmu akan selalu punya tempat paling hangat di hati kami. We miss you every single day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Photo 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-square bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center rotate-[-3deg] hover:rotate-0 transition-all duration-300 group"
          >
            <div className="w-full h-full rounded-xl overflow-hidden bg-hazelnut/20 flex items-center justify-center relative">
              <img 
                src="/photo1.jpg" 
                alt="Our angel photo 1" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute text-chocolate/50 font-medium text-center px-4">
                Simpan foto kucing di<br/>`public/photo1.jpg`
              </div>
            </div>
            <span className="mt-4 font-serif text-chocolate/80 italic text-sm">Forever in our hearts</span>
          </motion.div>

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="aspect-square md:aspect-auto md:h-full bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center hover:-translate-y-2 transition-all duration-300 group relative z-10"
          >
            <div className="w-full h-full rounded-xl overflow-hidden bg-warm-beige/30 flex items-center justify-center relative">
              <video 
                src="/video (1).mp4" 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute text-chocolate/50 font-medium text-center px-4">
                Simpan video kucing di<br/>`public/video (1).mp4`
              </div>
            </div>
            <span className="mt-4 font-serif text-chocolate/80 italic text-sm">Precious moments</span>
          </motion.div>

          {/* Photo 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="aspect-square bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center rotate-[3deg] hover:rotate-0 transition-all duration-300 group"
          >
            <div className="w-full h-full rounded-xl overflow-hidden bg-hazelnut/20 flex items-center justify-center relative">
              <img 
                src="/photo2.jpg" 
                alt="Our angel photo 2" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute text-chocolate/50 font-medium text-center px-4">
                Simpan foto kucing di<br/>`public/photo2.jpg`
              </div>
            </div>
            <span className="mt-4 font-serif text-chocolate/80 italic text-sm">Sleep tight, little one</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Memory = {
  id: number;
  title: string;
  subtitle: string;
  colSpan: string;
  imgSrc: string;
  type: "image" | "video";
};

const memories: Memory[] = [
  { 
    id: 1, 
    title: "Matching Energies", 
    subtitle: "Sama kaya Toothless & Light Fury 🖤", 
    colSpan: "col-span-12 md:col-span-6", 
    imgSrc: "/eyes.jpg",
    type: "image"
  },
  { 
    id: 2, 
    title: "Holding On", 
    subtitle: "Tangan kamu, tempat favorit aku.", 
    colSpan: "col-span-12 md:col-span-6", 
    imgSrc: "/hands.jpg",
    type: "image"
  },
  { 
    id: 3, 
    title: "Late Night Strolls", 
    subtitle: "Jalan malam berdua, tenang dan nyaman.", 
    colSpan: "col-span-12", 
    imgSrc: "/night-walk.jpg",
    type: "image"
  },
  { 
    id: 4, 
    title: "Morning Bubur Ayam", 
    subtitle: "Sarapan bubur ayam, comfort food kita.", 
    colSpan: "col-span-12 md:col-span-6", 
    imgSrc: "/bubur.jpg",
    type: "image"
  },
  { 
    id: 5, 
    title: "Nge-Bakso Bareng", 
    subtitle: "Momen sederhana tapi paling bahagia.", 
    colSpan: "col-span-12 md:col-span-6", 
    imgSrc: "/bakso.jpg",
    type: "image"
  },
  { 
    id: 6, 
    title: "Our Footsteps", 
    subtitle: "Melangkah bersama ke mana pun arahnya.", 
    colSpan: "col-span-12", 
    imgSrc: "/foot.mp4",
    type: "video"
  },
];

export const MemoryGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMemory(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="memories" ref={containerRef} className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate mb-4">Gallery of Our First Meet</h2>
          <p className="text-soft-brown text-lg max-w-xl mx-auto">Fragments of time colored by our shared warmth.</p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 items-start">
          {memories.map((mem, index) => {
            const yTransform = index % 2 === 0 ? y1 : y2;
            return (
              <motion.div
                key={mem.id}
                style={{ y: yTransform }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setSelectedMemory(mem)}
                className={`${mem.colSpan} group relative rounded-3xl overflow-hidden cursor-pointer bg-warm-beige shadow-lg hover:shadow-2xl transition-all duration-500`}
              >
                {/* Background Media */}
                {mem.type === "video" ? (
                  <video
                    src={mem.imgSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto max-h-[500px] object-cover block transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-hazelnut', 'to-cream', 'min-h-[300px]');
                    }}
                  />
                ) : (
                  <img 
                    src={mem.imgSrc} 
                    alt={mem.title}
                    className="w-full h-auto max-h-[500px] object-cover block transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-hazelnut', 'to-cream', 'min-h-[300px]');
                    }}
                  />
                )}

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10 pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20 pointer-events-none">
                  <div className="glass-panel p-4 md:p-6 inline-block w-full backdrop-blur-lg bg-white/30 border-white/40">
                    <h3 className="font-serif text-xl md:text-3xl text-chocolate mb-1">{mem.title}</h3>
                    <p className="text-chocolate/90 font-medium text-sm md:text-base">{mem.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedMemory(null)}
          >
            <button 
              className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors bg-black/50 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMemory(null);
              }}
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-black/50 flex items-center justify-center">
                {selectedMemory.type === "video" ? (
                  <video
                    src={selectedMemory.imgSrc}
                    autoPlay
                    loop
                    controls
                    playsInline
                    className="w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <img
                    src={selectedMemory.imgSrc}
                    alt={selectedMemory.title}
                    className="w-full max-h-[80vh] object-contain"
                  />
                )}
              </div>
              
              <div className="mt-6 text-center text-white">
                <h3 className="font-serif text-3xl md:text-4xl text-cream mb-2">{selectedMemory.title}</h3>
                <p className="text-cream/70 text-lg">{selectedMemory.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DoodleHeart } from "../illustrations/Doodles";

const reasons = [
  "Because you always know how to make me laugh.",
  "Because of the way you look at me.",
  "Because you support my wildest dreams.",
  "Because your hugs feel like home.",
  "Because you remember the little things.",
  "Because you are perfectly you.",
];

export const ReasonsCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="reasons" className="relative py-32 bg-cream overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl text-chocolate"
        >
          Reasons Why...
        </motion.h2>
        <p className="text-soft-brown mt-4 italic">Swipe to explore</p>
      </div>

      <motion.div ref={carouselRef} className="cursor-grab overflow-hidden active:cursor-grabbing px-6">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-8 w-max"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 20 }}
              className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] bg-white rounded-3xl p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(90,70,51,0.08)] border border-warm-beige/50 group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-muted-gold text-6xl font-serif opacity-30 group-hover:opacity-100 transition-opacity">
                "{index + 1}
              </div>
              <p className="font-serif text-2xl md:text-3xl text-chocolate text-center leading-relaxed">
                {reason}
              </p>
              <div className="flex justify-center">
                <DoodleHeart className="w-10 h-10 text-soft-brown group-hover:text-muted-gold transition-colors" animated={false} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

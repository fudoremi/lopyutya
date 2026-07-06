import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DoodleHeart } from "../illustrations/Doodles";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "orb" | "heart" | "star";
  rotation: number;
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const types: ("orb" | "heart" | "star")[] = ["orb", "orb", "orb", "heart", "star"];
      
      for (let i = 0; i < 35; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // percentage
          y: Math.random() * 100, // percentage
          size: Math.random() * 15 + 5, // 5px to 20px depending on type
          duration: Math.random() * 15 + 15, // 15s to 30s
          delay: Math.random() * 10,
          type: types[Math.floor(Math.random() * types.length)],
          rotation: Math.random() * 360,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => {
        const isShape = p.type === "heart" || p.type === "star";
        
        return (
          <motion.div
            key={p.id}
            className="absolute flex items-center justify-center opacity-20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.1, 0.4, 0.1],
              rotate: isShape ? [p.rotation, p.rotation + 180, p.rotation + 360] : 0,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          >
            {p.type === "heart" && (
              <DoodleHeart className="text-muted-gold/40" style={{ width: p.size, height: p.size }} animated={false} />
            )}
            {p.type === "star" && (
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-warm-beige/60" style={{ width: p.size, height: p.size }}>
                <path d="M50 10 L62 40 L95 40 L68 60 L78 90 L50 72 L22 90 L32 60 L5 40 L38 40 Z" />
              </svg>
            )}
            {p.type === "orb" && (
              <div 
                className="bg-muted-gold rounded-full"
                style={{ width: p.size * 0.4, height: p.size * 0.4, filter: 'blur(2px)' }} 
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

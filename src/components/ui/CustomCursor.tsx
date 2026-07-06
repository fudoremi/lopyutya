import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Magic Trail Particles */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-2 h-2 bg-muted-gold rounded-full pointer-events-none z-40"
          style={{ filter: 'blur(1px)' }}
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: isHovering ? 0 : Math.max(0, 1 - i * 0.15),
            opacity: isHovering ? 0 : Math.max(0, 0.8 - i * 0.1),
          }}
          transition={{ 
            type: "spring", 
            stiffness: Math.max(50, 400 - i * 60), 
            damping: Math.max(10, 25 - i * 2), 
            mass: 0.1 + i * 0.1 
          }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-soft-brown rounded-full pointer-events-none z-50 mix-blend-multiply"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-hazelnut rounded-full pointer-events-none z-50 mix-blend-multiply flex items-center justify-center"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(199, 161, 122, 0.2)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      />
    </>
  );
};

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import type { HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export const MagneticButton = ({ children, className, variant = "primary", ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-medium transition-colors duration-300 overflow-hidden group";
  
  const variants = {
    primary: "bg-chocolate text-cream hover:bg-soft-brown",
    secondary: "bg-hazelnut text-chocolate hover:bg-warm-beige",
    outline: "border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-cream",
    ghost: "text-chocolate hover:bg-warm-beige/50",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const WarmGradientMesh = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-warm-beige/60 blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-hazelnut/30 blur-[120px]"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-muted-gold/20 blur-[150px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </div>
  );
};

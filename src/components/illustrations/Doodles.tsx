import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const DoodleHeart = ({ className, animated = true }: { className?: string; animated?: boolean }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.5, ease: "easeInOut" as any }, opacity: { duration: 0.5 } }
    }
  };

  return (
    <motion.svg viewBox="0 0 100 100" className={cn("w-10 h-10 overflow-visible", className)}>
      <motion.path
        d="M 50 85 C 50 85 10 55 10 35 C 10 15 35 10 50 35 C 65 10 90 15 90 35 C 90 55 50 85 50 85 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        initial={animated ? "hidden" : "visible"}
        whileInView={animated ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {animated && (
        <motion.path
          d="M 50 85 C 50 85 10 55 10 35 C 10 15 35 10 50 35 C 65 10 90 15 90 35 C 90 55 50 85 50 85 Z"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          viewport={{ once: true }}
        />
      )}
    </motion.svg>
  );
};

export const DoodleArrow = ({ className }: { className?: string }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1, ease: "easeOut" as any }, opacity: { duration: 0.1 } }
    }
  };

  return (
    <motion.svg viewBox="0 0 100 100" className={cn("w-12 h-12 overflow-visible", className)}>
      <motion.path
        d="M 10 50 Q 50 10 90 50 M 70 30 L 90 50 L 70 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </motion.svg>
  );
};

export const DoodleUnderline = ({ className }: { className?: string }) => {
  return (
    <motion.svg viewBox="0 0 200 20" preserveAspectRatio="none" className={cn("w-full h-3 overflow-visible", className)}>
      <motion.path
        d="M 5 15 Q 100 0 195 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
      />
    </motion.svg>
  );
};

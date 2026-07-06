import { motion } from "framer-motion";

interface CapybaraProps {
  className?: string;
  variant?: "default" | "sleeping" | "waving" | "walking";
}

export const Capybara = ({ className, variant = "default" }: CapybaraProps) => {
  const isSleeping = variant === "sleeping";
  const isWaving = variant === "waving";
  const isWalking = variant === "walking";

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 150"
      className={`w-32 h-24 ${className}`}
      animate={
        isWalking
          ? { y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.5 } }
          : { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
      }
    >
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#5A4633" floodOpacity="0.1" />
        </filter>
      </defs>

      <g filter="url(#shadow)">
        {/* Body */}
        <motion.path
          d="M 140 100 C 160 100 170 80 160 60 C 150 40 120 40 90 40 C 60 40 30 50 20 70 C 10 90 20 110 40 110 L 120 110 C 130 110 135 105 140 100 Z"
          fill="#C7A17A"
        />
        
        {/* Head */}
        <motion.path
          d="M 140 60 C 170 50 185 70 175 90 C 165 110 145 115 130 105 Z"
          fill="#C7A17A"
          animate={isSleeping ? { rotate: 5, y: 5 } : { rotate: 0, y: 0 }}
        />

        {/* Ear */}
        <path d="M 145 45 C 150 40 160 45 155 55 Z" fill="#8B6B4A" />

        {/* Snout */}
        <path d="M 175 75 C 185 80 180 90 170 95 Z" fill="#E8DCCB" opacity="0.6" />
        <ellipse cx="172" cy="82" rx="3" ry="2" fill="#5A4633" />

        {/* Eye */}
        {isSleeping ? (
          <path d="M 150 70 Q 155 75 160 70" stroke="#5A4633" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <motion.circle
            cx="155"
            cy="70"
            r="3"
            fill="#5A4633"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2], repeatDelay: 2 }}
          />
        )}

        {/* Legs */}
        <motion.path
          d="M 50 105 L 50 125 C 50 130 55 130 55 125 L 55 110"
          stroke="#8B6B4A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={isWalking ? { rotate: [0, -15, 15, 0], originY: 0 } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
        <motion.path
          d="M 110 105 L 110 125 C 110 130 115 130 115 125 L 115 110"
          stroke="#8B6B4A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={isWalking ? { rotate: [0, 15, -15, 0], originY: 0 } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
        <motion.path
          d="M 125 105 L 125 125 C 125 130 130 130 130 125 L 130 110"
          stroke="#8B6B4A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={
            isWaving
              ? { rotate: [0, -40, 10, -40, 0], originY: 0, originX: "125px" }
              : isWalking
              ? { rotate: [0, -15, 15, 0], originY: 0 }
              : {}
          }
          transition={isWaving ? { duration: 1.5, repeat: Infinity, repeatDelay: 2 } : { repeat: Infinity, duration: 0.5 }}
        />
        
        {/* Zzz for sleeping */}
        {isSleeping && (
          <g>
            <motion.text
              x="160" y="40" fontSize="12" fill="#5A4633" fontWeight="bold"
              animate={{ opacity: [0, 1, 0], y: [0, -20], x: [0, 10] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              z
            </motion.text>
            <motion.text
              x="170" y="30" fontSize="16" fill="#5A4633" fontWeight="bold"
              animate={{ opacity: [0, 1, 0], y: [0, -25], x: [0, 15] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            >
              Z
            </motion.text>
          </g>
        )}
      </g>
    </motion.svg>
  );
};

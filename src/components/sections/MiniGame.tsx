import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Capybara } from "../illustrations/Capybara";
import { MagneticButton } from "../ui/MagneticButton";

interface Heart {
  id: number;
  x: number;
  speed: number;
  size: number;
}

export const MiniGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);

  const spawnHeart = useCallback(() => {
    const newHeart: Heart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% width
      speed: Math.random() * 2 + 2, // 2s to 4s duration
      size: Math.random() * 20 + 30, // 30px to 50px
    };
    setHearts((prev) => [...prev, newHeart]);
  }, []);

  useEffect(() => {
    let spawnInterval: ReturnType<typeof setInterval>;
    let gameTimer: ReturnType<typeof setInterval>;

    if (isPlaying && timeLeft > 0) {
      spawnInterval = setInterval(spawnHeart, 800);
      gameTimer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
    }

    return () => {
      clearInterval(spawnInterval);
      clearInterval(gameTimer);
    };
  }, [isPlaying, timeLeft, spawnHeart]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setHearts([]);
    setGameOver(false);
    setIsPlaying(true);
  };

  const catchHeart = (id: number) => {
    if (!isPlaying) return;
    setScore((s) => s + 1);
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <section id="play" className="relative py-32 bg-warm-beige/30 px-6 overflow-hidden">
      <div className="container max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate mb-4">Catch My Heart</h2>
          <p className="text-soft-brown text-lg">A little game just for fun.</p>
        </div>

        <div className="relative w-full max-w-2xl mx-auto h-[500px] glass-panel border-2 border-muted-gold/30 rounded-3xl overflow-hidden bg-white/50">
          {/* HUD */}
          <div className="absolute top-4 w-full px-8 flex justify-between items-center z-20">
            <div className="text-xl font-serif text-chocolate bg-white/80 px-4 py-2 rounded-full shadow-sm">
              Score: {score}
            </div>
            <div className="text-xl font-serif text-chocolate bg-white/80 px-4 py-2 rounded-full shadow-sm">
              Time: {timeLeft}s
            </div>
          </div>

          {/* Game Area */}
          <div className="absolute inset-0 z-10">
            <AnimatePresence>
              {hearts.map((heart) => (
                <motion.button
                  key={heart.id}
                  initial={{ y: -50, x: `${heart.x}%`, opacity: 0 }}
                  animate={{ y: 600, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: heart.speed, ease: "linear" }}
                  onAnimationComplete={() => setHearts((prev) => prev.filter((h) => h.id !== heart.id))}
                  onClick={() => catchHeart(heart.id)}
                  className="absolute text-chocolate hover:text-muted-gold transition-colors focus:outline-none"
                  style={{ width: heart.size, height: heart.size, left: `${heart.x}%` }}
                >
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M 50 85 C 50 85 10 55 10 35 C 10 15 35 10 50 35 C 65 10 90 15 90 35 C 90 55 50 85 50 85 Z" />
                  </svg>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Screens */}
          <AnimatePresence>
            {!isPlaying && !gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-cream/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Capybara variant="default" className="w-32 h-24 mb-6" />
                <h3 className="text-2xl font-serif text-chocolate mb-6">Ready to play?</h3>
                <MagneticButton onClick={startGame}>Start Game</MagneticButton>
              </motion.div>
            )}

            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-cream/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center"
              >
                <Capybara variant={score > 10 ? "waving" : "sleeping"} className="w-32 h-24 mb-6" />
                <h3 className="text-3xl font-serif text-chocolate mb-2">
                  {score > 10 ? "You're amazing!" : "Good try!"}
                </h3>
                <p className="text-soft-brown mb-6">You caught {score} hearts.</p>
                <MagneticButton onClick={startGame}>Play Again</MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Capybara Mascot at bottom */}
          <div className="absolute bottom-[-10px] right-10 z-0">
            <Capybara variant="walking" className="w-24 h-20 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

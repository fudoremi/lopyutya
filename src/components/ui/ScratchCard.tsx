import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DoodleHeart } from "./../illustrations/Doodles";

interface ScratchCardProps {
  children: React.ReactNode;
}

export const ScratchCard = ({ children }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCleared, setIsCleared] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isCleared) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Fill with golden color
      ctx.fillStyle = "#C7A17A"; // hazelnut color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add a nice pattern or text
      ctx.fillStyle = "#8B6B4A"; // soft-brown
      ctx.font = "italic 32px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch to reveal...", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isCleared]);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isCleared) return;
    setIsDrawing(true);
    const pos = getPointerPos(e);
    lastPos.current = pos;
    scratch(pos.x, pos.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isCleared) return;
    const pos = getPointerPos(e);
    scratch(pos.x, pos.y);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    lastPos.current = null;
    checkClearedPercentage();
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 60; // Brush size

    ctx.beginPath();
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
    } else {
      ctx.moveTo(x, y);
    }
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPos.current = { x, y };
  };

  const checkClearedPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    // Check alpha channel of every 4th pixel (RGBA)
    for (let i = 3; i < pixels.length; i += 16) { 
      if (pixels[i] < 128) { // If alpha is mostly transparent
        transparentPixels++;
      }
    }

    const totalPixelsChecked = pixels.length / 16;
    const percentCleared = (transparentPixels / totalPixelsChecked) * 100;

    if (percentCleared > 40) {
      setIsCleared(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full rounded-2xl overflow-hidden cursor-crosshair touch-none">
      <div className="relative w-full h-full z-0 p-8 flex flex-col items-center justify-center">
        {children}
      </div>
      
      <AnimatePresence>
        {!isCleared && (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="absolute inset-0 z-10 w-full h-full touch-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isCleared && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-4 right-4 z-20 pointer-events-none animate-pulse"
          >
            <DoodleHeart className="w-8 h-8 text-cream opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

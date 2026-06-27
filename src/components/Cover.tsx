"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const services = [
  "Sites web",
  "Applications sur-mesure",
  "Jeux interactifs",
  "Progressive Web Apps",
  "Dashboards analytiques"
];

// 1. Définition de l'interface pour accepter la fonction onReveal
interface CoverProps {
  onReveal: () => void;
}

export default function Cover({ onReveal }: CoverProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentService, setCurrentService] = useState(0);

  // Fonction utilitaire pour déclencher la révélation et le callback
  const handleReveal = () => {
    setIsRevealed(true);
    onReveal(); // Appelle la fonction passée par le parent
  };

  useEffect(() => {
    if (!isRevealed) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";

      const handleWheelDown = (e: WheelEvent) => {
        if (e.deltaY > 30) handleReveal();
      };

      let touchStartY = 0;
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };
      const handleTouchMoveDown = (e: TouchEvent) => {
        const touchEndY = e.touches[0].clientY;
        if (touchStartY - touchEndY > 40) handleReveal(); 
      };

      window.addEventListener("wheel", handleWheelDown);
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMoveDown);

      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("wheel", handleWheelDown);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMoveDown);
      };
    } else {
      window.scrollTo(0, 0); 
      document.body.style.overflow = "auto";

      const handleWheelUp = (e: WheelEvent) => {
        if (window.scrollY <= 0 && e.deltaY < -40) {
          setIsRevealed(false);
        }
      };

      let touchStartY = 0;
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };
      const handleTouchMoveUp = (e: TouchEvent) => {
        if (window.scrollY <= 0) {
          const touchEndY = e.touches[0].clientY;
          if (touchEndY - touchStartY > 40) setIsRevealed(false); 
        }
      };

      window.addEventListener("wheel", handleWheelUp);
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMoveUp);

      return () => {
        window.removeEventListener("wheel", handleWheelUp);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMoveUp);
      };
    }
  }, [isRevealed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isRevealed ? "-100vh" : 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center border-b border-surface shadow-2xl"
    >
      {/* ... le reste de ton JSX reste identique ... */}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-8 left-8"
      >
        <span className="text-xs tracking-[0.2em] text-text-muted uppercase font-medium">
          Amina Zouane
        </span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-8 right-8 max-md:hidden"
      >
        <span className="text-xs tracking-[0.2em] text-text-muted uppercase font-medium">
          Portfolio — 2026
        </span>
      </motion.div>

      <div className="text-center px-4 flex flex-col items-center">
        <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter text-text-light leading-none mb-6">
          Créatrice d'interfaces .
        </h1>
        <div className="h-10 md:h-12 relative w-full flex justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentService}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute text-sm md:text-xl font-thin tracking-[0.3em] uppercase text-primary"
            >
              {services[currentService]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 flex flex-col items-center cursor-pointer"
        onClick={handleReveal} // Utilisation de la nouvelle fonction
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-[10px] tracking-widest text-primary uppercase mb-4 font-semibold">
          Découvrir
        </span>
        <div className="w-[1px] h-16 bg-surface relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-primary absolute top-0"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
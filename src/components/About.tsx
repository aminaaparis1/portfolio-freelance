"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileModal from "./ProfileModal"; // Import de ton nouveau composant

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="about" className="h-screen flex flex-col items-center justify-center px-10 relative">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-7xl flex flex-col items-center translate-y-12"
      >
        <h2 className="text-[1.8rem] md:text-[3.25rem] lg:text-[4.5rem] font-medium leading-[1.1] text-background tracking-tighter text-center">
          <span>Vos besoins, traduits en <span className="text-primary italic">solutions digitales</span> :</span>
          <br />
          <span>je crée les outils qui libèrent votre temps et optimisent vos tâches.</span>
        </h2>
        
        <div className="flex justify-center mt-24">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative px-14 py-6 border border-background bg-transparent overflow-hidden transition-all duration-300"
          >
            <span className="absolute inset-0 bg-background transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
            <span className="relative uppercase tracking-[0.4em] text-[11px] font-bold text-background group-hover:text-light-bg transition-colors duration-300">
              En savoir plus sur mon parcours
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* La modale est gérée ici, l'AnimatePresence permet l'animation de sortie */}
      <AnimatePresence>
        {isOpen && <ProfileModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
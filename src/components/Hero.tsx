"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden py-20">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] md:blur-[120px] -z-10 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl z-10"
      >
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
          Architecte de <span className="text-primary italic">données</span> <br />
          & Créatrice d'interfaces.
        </h1>
        
        <p className="text-text-muted text-base md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
          Étudiante en Master 1 MIAGE à Paris 1 Panthéon-Sorbonne (avec un Master 2 intégralement dispensé en anglais), je conçois des applications web performantes et des systèmes d'information robustes. De l'architecture back-end aux interfaces élégantes.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full max-w-md md:max-w-none mx-auto">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="bg-primary text-background font-semibold py-3 px-8 rounded-full transition-colors hover:bg-primary-hover text-center"
          >
            Discuter d'un projet
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projets" 
            className="border border-text-muted text-text-light font-medium py-3 px-8 rounded-full transition-colors hover:border-primary hover:text-primary text-center"
          >
            Découvrir FastLib
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

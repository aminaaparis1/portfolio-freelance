"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const services = [
    {
      title: "Développement",
      desc: "Maîtrise des technologies modernes pour créer des applications robustes et performantes.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      title: "Analyse & Veille",
      desc: "Toujours à l'affût des innovations pour vous proposer des solutions avant-gardistes.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      )
    },
    {
      title: "Ergonomie",
      desc: "Une approche centrée sur l'utilisateur pour concevoir des interfaces intuitives.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      )
    },
    {
      title: "Engagement",
      desc: "Beaucoup de cœur à l'ouvrage et un investissement total dans vos projets.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      )
    }
  ];

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

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="modal-overlay"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div 
              className="absolute inset-0 bg-background/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => {
                e.stopPropagation();
                if (activeCard !== null) setActiveCard(null); 
              }} 
              className={`absolute bg-light-bg border border-background shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
                isMaximized ? "inset-0" : "inset-4 md:inset-10 lg:inset-20"
              }`}
            >
              <div className="h-14 border-b border-background/20 flex items-center px-6 bg-light-bg shrink-0 z-50">
                <div className="flex gap-2.5">
                  <div onClick={() => setIsOpen(false)} className="w-4 h-4 rounded-full bg-primary cursor-pointer hover:scale-110 transition-transform" title="Fermer" />
                  <div onClick={() => setIsMaximized(false)} className="w-4 h-4 rounded-full bg-primary/70 cursor-pointer hover:scale-110 transition-transform" title="Réduire" />
                  <div onClick={() => setIsMaximized(!isMaximized)} className="w-4 h-4 rounded-full bg-primary/40 cursor-pointer hover:scale-110 transition-transform" title="Agrandir" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:px-8 md:py-6 flex flex-col items-center">
                <div className="max-w-6xl mx-auto w-full flex flex-col items-center"> 
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 uppercase tracking-tighter text-center text-background"
                  >
                    Mon Profil
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl font-light text-background leading-relaxed text-center max-w-3xl mx-auto mb-3"
                  >
                    Étudiante en <strong className="font-semibold">Master 2 MIAGE Intelligent Business Informatics</strong> à la{' '}
                    <a 
                      href="https://formations.pantheonsorbonne.fr/fr/catalogue-des-formations/master-M/master-miage-KBUNM1QC.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary italic hover:underline underline-offset-4"
                    >
                      Sorbonne
                    </a>, concevoir et développer des solutions web est ma véritable passion.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-px w-16 bg-primary mx-auto mb-4"
                  />

                  <motion.div 
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="relative w-full h-[280px] md:h-[320px] flex justify-center items-end"
                  >
                    {services.map((service, index) => {
                      const rotations = [-12, -4, 4, 12];
                      const xOffsets = [-80, -25, 25, 80]; 
                      const yOffsets = [15, 0, 0, 15]; 
                      
                      const isActive = activeCard === index;
                      const hasActive = activeCard !== null;

                      return (
                        <motion.div
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCard(isActive ? null : index);
                          }}
                          animate={{
                            rotate: isActive ? 0 : rotations[index],
                            x: isActive ? 0 : xOffsets[index],
                            y: isActive ? -30 : yOffsets[index],
                            scale: isActive ? 1.15 : (hasActive ? 0.9 : 1),
                            zIndex: isActive ? 50 : (hasActive ? 10 : 20 + index),
                            opacity: (hasActive && !isActive) ? 0.7 : 1,
                          }}
                          whileHover={{
                            scale: isActive ? 1.15 : (hasActive ? 0.95 : 1.05),
                            y: isActive ? -30 : yOffsets[index] - 15,
                            zIndex: 40
                          }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className={`group absolute bottom-0 w-[240px] md:w-[280px] bg-light-bg p-8 rounded-3xl flex flex-col items-center text-center cursor-pointer origin-bottom transition-all duration-300 ${
                            isActive 
                              ? 'border-2 border-primary shadow-2xl shadow-primary/20' 
                              : 'border border-background/10 hover:border-primary/50 shadow-xl'
                          }`}
                        >
                          <motion.div 
                            animate={isActive ? { y: [0, -6, 0] } : { y: 0 }}
                            transition={isActive ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-all duration-300 ${
                              isActive 
                                ? 'bg-primary text-light-bg shadow-lg shadow-primary/40' 
                                : 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110'
                            }`}
                          >
                            {service.icon}
                          </motion.div>
                          
                          <h4 className="text-xl md:text-2xl font-bold text-background mb-3">{service.title}</h4>
                          <p className="text-sm text-background/80 font-medium leading-relaxed">
                            {service.desc}
                          </p>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: activeCard === null ? 1 : 0 }}
                    className="text-center mt-12 md:mt-16 text-sm text-primary font-medium italic"
                  >
                    Cliquez sur une carte pour la mettre en avant
                  </motion.p>

                </div>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
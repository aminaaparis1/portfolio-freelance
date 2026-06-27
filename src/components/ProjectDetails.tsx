"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDetailsProps {
  project: any;
  category: "web" | "mobile" | null;
  onClose: () => void;
}

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("react")) return <svg className="w-4 h-4 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4"/></svg>;
  if (t.includes("angular")) return <svg className="w-4 h-4 text-[#DD0031]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 5.5l1.5 13 8.5 4.5 8.5-4.5L22 5.5zm0 2.5l5.5 12h-2.5l-1.5-3.5h-3L9 16.5H6.5z"/></svg>;
  if (t.includes("tailwind")) return <svg className="w-4 h-4 text-[#38B2AC]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6a4 4 0 0 0-4 4c0 2 1 2 2 4s-1 2-2 2a4 4 0 0 1 4-4c0-2-1-2-2-4s1-2 2-2zM20 10a4 4 0 0 0-4 4c0 2 1 2 2 4s-1 2-2 2a4 4 0 0 1 4-4c0-2-1-2-2-4s1-2 2-2z"/></svg>;
  if (t.includes("node")) return <svg className="w-4 h-4 text-[#339933]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5l7.5 4.5v8L12 21.5l-7.5-4.5v-8L12 4.5z"/></svg>;
  if (t.includes("next")) return <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 16V8l6 8V8"/></svg>;
  if (t.includes("typescript") || t.includes("ts")) return <svg className="w-4 h-4 text-[#3178C6]" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h20v20H2z" fill="none"/><rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/><path d="M9 10H6v1.5h1.5v4H9v-4h1.5V10H9zm7 1.5c0-1.5-1-2.5-2.5-2.5h-3v5.5h1.5v-2h1c1.5 0 2.5-1 2.5-2.5zM14.5 13h-1v-1.5h1c.5 0 1 .5 1 1s-.5.5-1 .5z"/></svg>;
  if (t.includes("firebase")) return <svg className="w-4 h-4 text-[#FFCA28]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M4 17l6-11 3 6 4-8 3 13H4z"/></svg>;
  if (t.includes("vitest") || t.includes("jest")) return <svg className="w-4 h-4 text-[#FCC72C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 3v4l-4 9v2h14v-2l-4-9V3h-2v4h-2V3z"/></svg>;
  if (t.includes("api")) return <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"></path></svg>;
  if (t.includes("stripe")) return <svg className="w-4 h-4 text-[#008CDD]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2 14.5c-3.5 0-5.5-1.5-5.5-4 0-3 3-4 6-4s3 1 3 2.5h-2c0-.5-1-1-2-1s-2 .5-2 1.5c0 1.5 4 1.5 4 3.5 0 2-2 3.5-4 3.5z"/></svg>;
  return <svg className="w-4 h-4 text-light-bg/60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
};

export default function ProjectDetails({ project, category, onClose }: ProjectDetailsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = project?.images || (project?.image ? [project.image] : []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!project) return null;

  return (
    <motion.div 
      key="details"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row min-h-full"
    >
      <div className="w-full md:w-5/12 min-h-[350px] md:min-h-full bg-[#0d0d0d] border-b md:border-b-0 md:border-r border-light-bg/5 relative overflow-hidden flex items-center justify-center p-8 md:p-12">
         
         <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
         >
            <div className="w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
         </motion.div>

         <button 
           onClick={onClose}
           className="absolute top-6 left-6 z-[70] text-light-bg/70 font-bold tracking-widest text-[10px] uppercase px-4 py-2 border border-light-bg/20 hover:bg-light-bg hover:text-black transition-all duration-300 backdrop-blur-md rounded-none flex items-center gap-2"
         >
           <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
           Retour
         </button>

         <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            /* TAILLE MAXIMALE ICI : w-[260%] pour tout faire péter */
            className={`relative z-20 flex justify-center items-center ${category === "web" ? "w-[130%]" : "w-[260%] md:w-[220%] lg:w-[240%]"}`}
         >
            <img src={category === "web" ? "/mac.png" : "/iphone.webp"} alt="Mockup Detail" className="w-full h-auto drop-shadow-2xl relative z-20 pointer-events-none" />
            
            <div className="absolute z-10 flex flex-col items-center justify-center overflow-hidden bg-[#111] group/screen" style={category === "web" ? { top: '4.5%', bottom: '14%', left: '12%', right: '12%' } : { top: '6%', bottom: '6%', left: '31%', right: '31%', borderRadius: '12%' }}>
              
              {images.length > 0 ? (
                <div className="relative w-full h-full">
                  <AnimatePresence>
                    <motion.img 
                      key={currentIndex}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}
                      src={images[currentIndex]} 
                      alt={`${project.title} - vue ${currentIndex + 1}`} 
                      className={`absolute inset-0 w-full h-full object-cover z-10 ${category === "web" ? "object-top" : "object-center"}`} 
                    />
                  </AnimatePresence>

                  {images.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm hover:bg-primary hover:text-black text-white rounded-full opacity-0 group-hover/screen:opacity-100 transition-all duration-300 z-[60] cursor-pointer">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                      </button>
                      <button onClick={nextImage} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm hover:bg-primary hover:text-black text-white rounded-full opacity-0 group-hover/screen:opacity-100 transition-all duration-300 z-[60] cursor-pointer">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-[60] opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300">
                        {images.map((_: any, i: number) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-white/50"}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-[#1a1a1a] opacity-90" />
                  <h4 className="relative z-10 text-white font-black uppercase text-center px-2 text-xl md:text-2xl drop-shadow-md">{project.title}</h4>
                </>
              )}
            </div>
         </motion.div>
      </div>

      <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-start md:justify-center relative overflow-y-auto scrollbar-hide">
        
        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[8rem] md:text-[12rem] font-black text-light-bg/[0.02] whitespace-nowrap pointer-events-none z-0">
          {project.title}
        </div>

        <div className="relative z-10">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-2 px-3 py-1.5 border border-primary/40 text-primary text-[10px] uppercase tracking-widest bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.1)] rounded-none">
              {category === "web" ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              )}
              {category === "web" ? "Site Web" : "Application Mobile"}
            </span>
            
            {project.year && (
              <span className="flex items-center gap-1.5 text-light-bg/40 text-xs font-mono">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                {project.year}
              </span>
            )}
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8 text-white drop-shadow-lg">
            {project.title}
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-light-bg/70 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            {project.description}
          </motion.p>

          <motion.hr initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "100%" }} transition={{ delay: 0.4 }} className="border-light-bg/10 mb-8 max-w-md" />

          <div>
            <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[10px] uppercase tracking-[0.2em] text-light-bg/40 font-bold mb-4">
              Technologies & Outils
            </motion.h4>
            <div className="flex flex-wrap gap-3">
              {project.techs.map((tech: string, i: number) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1), type: "spring", stiffness: 200 }}
                  whileHover={{ y: -4 }}
                  key={i} 
                  className="group relative flex items-center gap-2.5 px-4 py-2 text-[11px] font-bold tracking-wider bg-white/5 text-white/80 border border-white/10 cursor-default transition-all duration-300 rounded-none overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  
                  <div className="relative z-10 flex items-center gap-2.5">
                    <span className="transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12 group-hover:text-primary">
                      {getTechIcon(tech)}
                    </span>
                    <span className="mt-[1px] transition-colors duration-300 group-hover:text-white">
                      {tech}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-20" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
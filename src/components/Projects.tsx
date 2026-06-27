"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projects";
import ProjectDetails from "./ProjectDetails";

export default function Projects() {
  const [hoveredSection, setHoveredSection] = useState<"web" | "mobile" | null>(null);
  const [activeCategory, setActiveCategory] = useState<"web" | "mobile" | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (activeCategory) {
      setIsMaximized(false);
      setSelectedProject(null);
    }
  }, [activeCategory]);

  return (
    <section id="projects" className="h-[90vh] min-h-[600px] w-full bg-[#050505] text-light-bg overflow-hidden relative font-sans">
      
      <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-full text-center px-4">
        <h3 className="text-light-bg font-light tracking-[0.3em] md:tracking-[0.5em] text-xl md:text-2xl uppercase opacity-90 drop-shadow-xl">
          Mes Projets
        </h3>
      </div>

      <div className="flex flex-col md:flex-row h-full w-full">
        
        {/* SECTION GAUCHE : WEB (MAC) */}
        <motion.div
          onMouseEnter={() => setHoveredSection("web")}
          onMouseLeave={() => setHoveredSection(null)}
          onClick={() => setActiveCategory("web")}
          animate={{ flex: hoveredSection === "web" ? 1.4 : hoveredSection === "mobile" ? 0.6 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="relative h-full flex items-center justify-center cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-light-bg/10 group"
        >
          <div className={`absolute w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full transition-opacity duration-700 ${hoveredSection === "web" ? 'opacity-100' : 'opacity-0'} pointer-events-none`} />

          <motion.div 
            animate={{ scale: hoveredSection === "web" ? 1.05 : 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-[80%] md:w-[75%] max-w-[850px] 2xl:max-w-[1250px] z-10"
          >
            <img src="/mac.png" alt="Mac Frame" className="w-full h-auto relative z-20 pointer-events-none" />
            <div className="absolute z-10 flex flex-col items-center justify-center overflow-hidden" style={{ top: '4.5%', bottom: '14%', left: '12%', right: '12%' }}>
              <motion.h2 
                animate={{ scale: hoveredSection === "web" ? 1.05 : 1, y: hoveredSection === "web" ? -10 : 0 }}
                className={`relative z-10 text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter transition-colors duration-500 ${hoveredSection === "web" ? 'text-primary' : 'text-light-bg/30 text-stroke'}`}
                style={hoveredSection !== "web" ? { WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" } : {}}
              >
                Web
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: hoveredSection === "web" ? 1 : 0, height: hoveredSection === "web" ? "auto" : 0 }}
                className="relative z-10 overflow-hidden mt-6"
              >
                <span className="inline-block px-6 py-3 border-2 border-primary/50 text-primary font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:bg-primary hover:text-light-bg transition-colors duration-300 whitespace-nowrap">
                  Explorer les sites
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* SECTION DROITE : MOBILE (IPHONE) */}
        <motion.div
          onMouseEnter={() => setHoveredSection("mobile")}
          onMouseLeave={() => setHoveredSection(null)}
          onClick={() => setActiveCategory("mobile")}
          animate={{ flex: hoveredSection === "mobile" ? 1.4 : hoveredSection === "web" ? 0.6 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="relative h-full flex items-center justify-center cursor-pointer overflow-hidden group"
        >
          <div className={`absolute w-[400px] h-[400px] bg-primary/10 blur-[150px] rounded-full transition-opacity duration-700 ${hoveredSection === "mobile" ? 'opacity-100' : 'opacity-0'} pointer-events-none`} />

          <motion.div 
            animate={{ scale: hoveredSection === "mobile" ? 1.02 : 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-[68%] md:w-[60%] max-w-[480px] lg:max-w-[650px] xl:max-w-[750px] z-10"
          >
            <img src="/iphone.webp" alt="iPhone Frame" className="w-full h-auto relative z-20 pointer-events-none" />
            
            <div className="absolute z-10 flex flex-col items-center justify-center overflow-hidden" style={{ top: '6%', bottom: '6%', left: '31%', right: '31%', borderRadius: '12%' }}>
              <motion.h2 
                animate={{ scale: hoveredSection === "mobile" ? 1.02 : 1, y: hoveredSection === "mobile" ? -5 : 0 }}
                className={`relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter transition-colors duration-500 ${hoveredSection === "mobile" ? 'text-primary' : 'text-light-bg/30'}`}
                style={hoveredSection !== "mobile" ? { WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" } : {}}
              >
                Mobile
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: hoveredSection === "mobile" ? 1 : 0, height: hoveredSection === "mobile" ? "auto" : 0 }}
                className="relative z-10 overflow-hidden mt-3 md:mt-4 lg:mt-6"
              >
                <span className="inline-block px-4 py-2 border-2 border-primary/50 text-primary font-bold uppercase tracking-[0.2em] text-[8px] lg:text-[10px] hover:bg-primary hover:text-light-bg transition-colors duration-300 whitespace-nowrap">
                  Voir les apps
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* --- FENÊTRE MODALE --- */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div 
            key="projects-modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center ${isMaximized ? "p-0" : "p-4 md:p-10"}`}
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => { setActiveCategory(null); setSelectedProject(null); }}
            />
            
            <motion.div 
              layout 
              initial={{ scale: 0.95, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} 
              className={`relative bg-[#0a0a0a] border border-light-bg/10 shadow-2xl flex flex-col overflow-hidden rounded-none ${isMaximized ? "w-full h-full" : "w-full max-w-7xl h-[85vh]"}`}
            >
              <div className="h-14 border-b border-light-bg/10 flex items-center px-6 bg-[#0a0a0a] shrink-0 z-50">
                <div className="flex gap-2.5">
                  <div onClick={() => { setActiveCategory(null); setSelectedProject(null); }} className="w-4 h-4 rounded-full bg-primary cursor-pointer hover:scale-110 transition-transform flex items-center justify-center group/close">
                     <span className="opacity-0 group-hover/close:opacity-100 text-[#0a0a0a] text-[8px] font-black">X</span>
                  </div>
                  <div onClick={() => setIsMaximized(false)} className="w-4 h-4 rounded-full bg-primary/70 cursor-pointer hover:scale-110 transition-transform" />
                  <div onClick={() => setIsMaximized(!isMaximized)} className="w-4 h-4 rounded-full bg-primary/40 cursor-pointer hover:scale-110 transition-transform" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 font-medium text-xs tracking-widest uppercase text-light-bg/40">
                  dossier / {activeCategory === "web" ? "Sites_Web" : "Apps_Mobile"} 
                  {selectedProject && ` / ${selectedProject.title}`}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-hide relative">
                <AnimatePresence mode="wait">
                  
                  {!selectedProject ? (
                    <motion.div 
                      key="gallery"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="p-6 md:p-12"
                    >
                      {/* LE PUDDING EST ICI */}
                      <h3 className="text-4xl md:text-5xl font-black mb-24 uppercase tracking-tighter text-center md:text-left">
                        Projets <span className="text-primary italic">{activeCategory === "web" ? "Web" : "Mobile"}</span>
                      </h3>

                      <div className={`grid gap-16 md:gap-24 place-items-center ${
                        activeCategory === "web" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8"
                      }`}>
                        {projectsData[activeCategory].map((project, index) => {
                          const coverImage = project.images?.[0] || project.image;
                          
                          return (
                            <motion.div 
                              key={project.id}
                              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}
                              onClick={() => setSelectedProject(project)}
                              className="relative group cursor-pointer w-full max-w-[500px]"
                            >
                              <div className="absolute inset-10 bg-white/10 opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-500 pointer-events-none rounded-full" />
                              
                              <div className="relative transition-transform duration-500 group-hover:scale-105">
                                
                                {/* ENCORE PLUS GROS : scale-[1.75] pour les iPhones dans la grille */}
                                <div className={activeCategory === "mobile" ? "scale-[1.75]" : ""}>
                                  <img src={activeCategory === "web" ? "/mac.png" : "/iphone.webp"} alt="Mockup" className="w-full h-auto relative z-20 drop-shadow-xl pointer-events-none" />
                                  
                                  <div className="absolute z-10 flex flex-col items-center justify-center overflow-hidden bg-[#111]" style={activeCategory === "web" ? { top: '4.5%', bottom: '14%', left: '12%', right: '12%' } : { top: '6%', bottom: '6%', left: '31%', right: '31%', borderRadius: '12%' }}>
                                    
                                    {coverImage ? (
                                      <img src={coverImage} alt={project.title} className={`absolute inset-0 w-full h-full object-cover z-10 ${activeCategory === "web" ? "object-top" : "object-center"}`} />
                                    ) : (
                                      <>
                                        <div className="absolute inset-0 bg-[#1a1a1a] opacity-90" />
                                        <h4 className="relative z-10 text-white font-black uppercase text-center px-2 text-xl md:text-2xl drop-shadow-md">
                                          {project.title}
                                        </h4>
                                      </>
                                    )}

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">
                                      <span className="px-4 py-2 border border-white text-white text-[10px] uppercase tracking-widest font-bold">Découvrir</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    
                    <ProjectDetails 
                      project={selectedProject} 
                      category={activeCategory} 
                      onClose={() => setSelectedProject(null)} 
                    />
                    
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
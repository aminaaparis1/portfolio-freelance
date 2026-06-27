"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const [formData, setFormData] = useState({
    fromEmail: "",
    subject: "",
    name: "",
    company: "",
    projectDetails: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ fromEmail: "", subject: "", name: "", company: "", projectDetails: "" });
      setIsOpen(false);
      setIsMaximized(false);
      alert("Votre message a bien été envoyé. À très vite !");
    }, 1500);
  };

  return (
    <section id="contact" className="h-screen bg-light-bg text-background flex flex-col relative overflow-hidden font-sans border-t-2 border-background">
      
      {/* --- ZONE CENTRALE --- */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-[9rem] lg:text-[11rem] font-black uppercase tracking-tighter text-background mb-10 text-center leading-none"
        >
          Discutons.
        </motion.h2>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center justify-center px-10 py-5 border-2 border-background bg-transparent text-background overflow-hidden transition-colors duration-300"
        >
          <span className="absolute inset-0 bg-background transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out origin-bottom" />
          <span className="relative z-10 font-bold uppercase tracking-[0.3em] text-sm group-hover:text-light-bg transition-colors duration-300">
            Démarrer un projet
          </span>
        </motion.button>
      </div>

      {/* --- FOOTER : RÉSEAUX SOCIAUX & EMAIL --- */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t-2 border-background bg-light-bg shrink-0">
        
        {/* Email - Pastille 1 (primary/40) */}
        <a href="mailto:hello@aminazouane.com" className="group flex items-center justify-center py-8 border-b-2 md:border-b-0 md:border-r-2 border-background hover:bg-primary/40 transition-colors duration-500">
          <div className="flex items-center text-background group-hover:text-white transition-colors duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="mr-4">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span className="text-sm font-bold uppercase tracking-[0.2em]">Email</span>
          </div>
        </a>

        {/* LinkedIn - Pastille 2 (primary/70) */}
        <a href="#" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center py-8 border-b-2 md:border-b-0 md:border-r-2 border-background hover:bg-primary/70 transition-colors duration-500">
          <div className="flex items-center text-background group-hover:text-white transition-colors duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="mr-4">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span className="text-sm font-bold uppercase tracking-[0.2em]">LinkedIn</span>
          </div>
        </a>

        {/* Instagram - Pastille 3 (primary/100) */}
        <a href="#" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center py-8 hover:bg-primary transition-colors duration-500">
          <div className="flex items-center text-background group-hover:text-white transition-colors duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="mr-4">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="text-sm font-bold uppercase tracking-[0.2em]">Instagram</span>
          </div>
        </a>

      </div>

      {/* --- FENÊTRE MODALE TYPE "CLIENT EMAIL" --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="contact-modal"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center ${isMaximized ? "p-0" : "p-4 md:p-10"}`}
          >
            {/* Le fond flouté */}
            <div 
              className="absolute inset-0 bg-background/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* La fenêtre */}
            <motion.div 
              layout
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} 
              className={`relative bg-[#FAFAFA] flex flex-col overflow-hidden ${
                isMaximized 
                  ? "w-full h-full border-none shadow-none" 
                  : "w-full max-w-4xl h-[85vh] md:h-[75vh] border border-background shadow-2xl"
              }`}
            >
              {/* 1. Barre de titre Mac OS avec dégradé rose */}
              <div className="h-12 border-b border-background/20 flex items-center justify-between px-4 bg-light-bg shrink-0">
                <div className="flex gap-2.5 w-1/3">
                  <div 
                    onClick={() => { setIsOpen(false); setIsMaximized(false); }} 
                    className="w-3.5 h-3.5 rounded-full bg-primary/40 cursor-pointer hover:scale-110 hover:bg-primary/60 transition-colors" 
                    title="Fermer" 
                  />
                  <div 
                    onClick={() => setIsMaximized(false)} 
                    className="w-3.5 h-3.5 rounded-full bg-primary/70 cursor-pointer hover:scale-110 hover:bg-primary/90 transition-colors" 
                    title="Réduire" 
                  />
                  <div 
                    onClick={() => setIsMaximized(!isMaximized)} 
                    className="w-3.5 h-3.5 rounded-full bg-primary cursor-pointer hover:scale-110 transition-transform" 
                    title="Plein écran" 
                  />
                </div>
                <div className="w-1/3 text-center text-xs font-semibold text-background/60">
                  Nouveau message
                </div>
                <div className="w-1/3"></div> {/* Espaceur pour centrer le titre */}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                
                {/* 2. En-têtes de l'email */}
                <div className="flex flex-col border-b border-background/10 bg-white shrink-0">
                  <div className="flex items-center px-6 py-3 border-b border-background/10">
                    <span className="text-background/50 font-medium w-20 text-sm">À :</span>
                    <span className="text-background font-medium text-sm bg-background/5 px-2 py-0.5 rounded">hello@aminazouane.com</span>
                  </div>

                  <div className="flex items-center px-6 py-3 border-b border-background/10 group">
                    <span className="text-background/50 font-medium w-20 text-sm">De :</span>
                    <input 
                      type="email" 
                      required
                      title="Veuillez renseigner une adresse email valide."
                      placeholder="votre@email.com"
                      value={formData.fromEmail}
                      onChange={(e) => setFormData({...formData, fromEmail: e.target.value})}
                      className="flex-1 bg-transparent focus:outline-none text-background text-sm placeholder-background/30"
                    />
                  </div>

                  <div className="flex items-center px-6 py-3 group">
                    <span className="text-background/50 font-medium w-20 text-sm">Objet :</span>
                    <input 
                      type="text" 
                      required
                      minLength={3}
                      title="L'objet doit faire au moins 3 caractères."
                      placeholder="Proposition de collaboration..."
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="flex-1 bg-transparent focus:outline-none text-background font-medium text-sm placeholder-background/30"
                    />
                  </div>
                </div>

                {/* 3. Corps de l'email (Police réduite text-base md:text-lg) */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
                  <div className="text-base md:text-lg font-medium leading-[2.2] md:leading-[2.2] text-background/90 max-w-2xl">
                    Bonjour Amina, 
                    <br />
                    <br />
                    Je m'appelle 
                    <input 
                      type="text" 
                      required
                      pattern="^[A-Za-zÀ-ÿ\s\-']+$"
                      title="Le nom ne doit contenir que des lettres."
                      placeholder="votre nom"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="inline-block bg-transparent border-b-2 border-background/20 focus:border-primary text-primary focus:outline-none placeholder-background/30 text-center mx-2 w-32 md:w-40 transition-colors duration-300"
                    /> 
                    et je travaille pour 
                    <input 
                      type="text" 
                      placeholder="entreprise"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="inline-block bg-transparent border-b-2 border-background/20 focus:border-primary text-primary focus:outline-none placeholder-background/30 text-center mx-2 w-36 md:w-48 transition-colors duration-300"
                    />.
                    <br />
                    J'ai consulté votre portfolio et j'aimerais qu'on discute de la création de 
                    <input 
                      type="text" 
                      required
                      minLength={3}
                      title="Veuillez décrire brièvement le projet."
                      placeholder="site, app mobile..."
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({...formData, projectDetails: e.target.value})}
                      className="inline-block bg-transparent border-b-2 border-background/20 focus:border-primary text-primary focus:outline-none placeholder-background/30 text-center mx-2 w-48 md:w-64 transition-colors duration-300"
                    />.
                    <br />
                    Dans l'attente de votre retour, je vous souhaite une excellente journée.
                    <br />
                    <br />
                    Cordialement.
                  </div>
                </div>

                {/* 4. Footer de l'email */}
                <div className="h-16 border-t border-background/10 bg-light-bg flex items-center justify-end px-6 shrink-0">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2 font-bold text-sm hover:bg-background transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Envoi..." : "Envoyer"}
                    {!isSubmitting && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // ÉTATS POUR LE CONFIGURATEUR DE PROJET
  const [step, setStep] = useState(1);
  const [clientType, setClientType] = useState<"pro" | "particulier" | null>(null);
  const [projectType, setProjectType] = useState<"web" | "mobile" | "data" | null>(null);
  
  // États de survol pour l'effet d'expansion
  const [hoveredClient, setHoveredClient] = useState<"pro" | "particulier" | null>(null);
  const [hoveredProject, setHoveredProject] = useState<"web" | "mobile" | "data" | null>(null);

  const valeurs = [
    {
      title: "Écoute Active",
      desc: "L'empathie avant le code. Je traduis vos enjeux réels en architecture logicielle.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4.5a2 2 0 1 1 2 0 2 2 0 1 1-2 0Z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M5 12H3"/><path d="M21 12h-2"/><path d="M19.07 4.93l-1.41 1.41"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 19.07l-1.41-1.41"/><path d="M6.34 6.34 4.93 4.93"/><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
      )
    },
    {
      title: "Créativité",
      desc: "Des interfaces qui sortent du lot, pour des expériences mémorables et uniques.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
      )
    },
    {
      title: "Rigueur",
      desc: "Un code propre, robuste et des délais respectés avec une transparence totale.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
      )
    },
    {
      title: "Engagement",
      desc: "Un investissement sincère. Je mets autant de cœur dans vos projets que dans les miens.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      )
    }
  ];

  // MATRICE DES SERVICES
  const servicesMatrix = {
    pro: {
      web: [
        { title: "Plateformes SaaS & Portails", desc: "Conception d'outils métiers robustes et d'interfaces B2B sur-mesure (Next.js, Supabase).", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
        { title: "Sites Corporate & Vitrines", desc: "Sites institutionnels ultra-rapides et sécurisés pour asseoir l'autorité de votre entreprise.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }
      ],
      mobile: [
        { title: "Outils Internes & CRM", desc: "Applications nomades pour vos équipes sur le terrain, gestion de flotte et suivi B2B.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><ellipse cx="12" cy="5" rx="9" ry="3"/></svg> },
        { title: "Gestion Logistique", desc: "Scanners et interfaces de terrain directement couplés à vos bases de données existantes.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> }
      ],
      data: [
        { title: "Dashboards Décisionnels", desc: "Tableaux de bord interactifs Power BI pour piloter votre croissance via vos KPI.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg> },
        { title: "Modélisation & Audit", desc: "Analyse experte de vos bases de données pour optimiser vos processus métiers.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> }
      ]
    },
    particulier: {
      web: [
        { title: "Portfolios Sur-Mesure", desc: "Mettez en valeur votre travail ou votre CV avec une interface web mémorable et animée.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg> },
        { title: "Landing Pages", desc: "Des pages uniques et esthétiques pour vos projets personnels ou événements (mariage, asso).", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> }
      ],
      mobile: [
        { title: "Apps de Suivi Personnel", desc: "Traqueurs d'habitudes, journaux de bord ou applications de coaching sur-mesure.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
        { title: "Outils d'Organisation", desc: "Des solutions mobiles légères pour simplifier la gestion de votre quotidien et vos projets.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
      ],
      data: [
        { title: "Suivi & Budget Perso", desc: "Visualisation claire de vos finances personnelles ou investissements avec des graphiques.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
        { title: "Analyse Associative", desc: "Mise en forme et traitement de données pour vos projets étudiants ou associatifs.", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></svg> }
      ]
    }
  };

  const handleReset = () => {
    setStep(1);
    setClientType(null);
    setProjectType(null);
    setHoveredClient(null);
    setHoveredProject(null);
  };

  return (
    <motion.div 
      key="modal-overlay"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
    >
      <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => { e.stopPropagation(); if (activeCard !== null) setActiveCard(null); }} 
        className={`absolute bg-light-bg border border-background shadow-2xl flex flex-col overflow-hidden rounded-none transition-all duration-500 ease-in-out ${
          isMaximized ? "inset-0" : "inset-4 md:inset-10 lg:inset-20"
        }`}
      >
        <div className="h-14 border-b border-background/20 flex items-center px-6 bg-light-bg shrink-0 z-50 sticky top-0">
          <div className="flex gap-2.5">
            <div onClick={onClose} className="w-4 h-4 rounded-full bg-primary cursor-pointer hover:scale-110 transition-transform" title="Fermer" />
            <div onClick={() => setIsMaximized(false)} className="w-4 h-4 rounded-full bg-primary opacity-80 cursor-pointer hover:scale-110 transition-transform" title="Réduire" />
            <div onClick={() => setIsMaximized(!isMaximized)} className="w-4 h-4 rounded-full bg-primary opacity-60 cursor-pointer hover:scale-110 transition-transform" title="Agrandir" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:px-12 md:py-6 flex flex-col items-center custom-scrollbar">
          <div className="max-w-6xl mx-auto w-full flex flex-col items-center"> 
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold mb-2 uppercase tracking-tighter text-center text-background"
            >
              Mon Profil
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl font-light text-background leading-relaxed text-center max-w-3xl mx-auto mb-8"
            >
              Étudiante en <strong className="font-semibold text-primary">Master 1 MIAGE Intelligent Business Informatics</strong> à{' '}
              <a href="https://formations.pantheonsorbonne.fr/" target="_blank" rel="noopener noreferrer" className="text-primary italic hover:underline underline-offset-4">Paris 1 Panthéon-Sorbonne</a>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px w-16 bg-primary mx-auto mb-16"
            />

            {/* SECTION 1 : MES SERVICES */}
            <div className="w-full max-w-5xl mb-24">
              
              <div className="text-center mb-12">
                <h4 className="text-4xl md:text-5xl font-extrabold text-background mb-4 uppercase tracking-tighter">
                  Mes <span className="text-primary">services</span>
                </h4>
                <p className="text-lg text-background opacity-60 font-medium max-w-2xl mx-auto">
                  Explorez mes domaines d'expertise à travers ce petit parcours interactif.
                </p>
              </div>
              
              <div className="w-full flex flex-col justify-center relative min-h-[350px]">
                <AnimatePresence mode="wait">
                  
                  {/* ÉTAPE 1 : PRO OU PARTICULIER */}
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center w-full"
                    >
                      <div className="flex flex-col md:flex-row gap-4 w-full h-[400px] md:h-[350px]">
                        
                        <motion.button 
                          onMouseEnter={() => setHoveredClient("pro")}
                          onMouseLeave={() => setHoveredClient(null)}
                          onClick={() => { setClientType("pro"); setStep(2); setHoveredClient(null); }}
                          // CORRECTION : On anime flexGrow au lieu de flex + ajout de flex-1 basis-0
                          animate={{ flexGrow: hoveredClient === "pro" ? 1.5 : hoveredClient === "particulier" ? 0.7 : 1 }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          className={`flex-1 basis-0 relative flex flex-col items-center justify-center border bg-light-bg overflow-hidden transition-colors duration-300 group ${hoveredClient === "pro" ? 'border-primary' : 'border-background/20'}`}
                        >
                          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary opacity-30 blur-[60px] rounded-full transition-opacity duration-500 ${hoveredClient === "pro" ? 'opacity-100' : 'opacity-0'}`} />
                          
                          <motion.div animate={{ scale: hoveredClient === "pro" ? 1.2 : 1, y: hoveredClient === "pro" ? -10 : 0 }} transition={{ type: "spring", bounce: 0.5 }} className="relative z-10 text-background mb-6 group-hover:text-primary transition-colors">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                          </motion.div>
                          
                          <span className="font-bold text-background text-2xl uppercase tracking-widest relative z-10">Professionnel</span>
                          
                          <motion.div animate={{ opacity: hoveredClient === "pro" ? 1 : 0, height: hoveredClient === "pro" ? "auto" : 0, marginTop: hoveredClient === "pro" ? 12 : 0 }} className="relative z-10 text-background opacity-60 font-medium overflow-hidden">
                            Entreprise, Startup, Indépendant
                          </motion.div>
                        </motion.button>

                        <motion.button 
                          onMouseEnter={() => setHoveredClient("particulier")}
                          onMouseLeave={() => setHoveredClient(null)}
                          onClick={() => { setClientType("particulier"); setStep(2); setHoveredClient(null); }}
                          // CORRECTION : flexGrow
                          animate={{ flexGrow: hoveredClient === "particulier" ? 1.5 : hoveredClient === "pro" ? 0.7 : 1 }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          className={`flex-1 basis-0 relative flex flex-col items-center justify-center border bg-light-bg overflow-hidden transition-colors duration-300 group ${hoveredClient === "particulier" ? 'border-primary' : 'border-background/20'}`}
                        >
                          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary opacity-30 blur-[60px] rounded-full transition-opacity duration-500 ${hoveredClient === "particulier" ? 'opacity-100' : 'opacity-0'}`} />
                          
                          <motion.div animate={{ scale: hoveredClient === "particulier" ? 1.2 : 1, y: hoveredClient === "particulier" ? -10 : 0 }} transition={{ type: "spring", bounce: 0.5 }} className="relative z-10 text-background mb-6 group-hover:text-primary transition-colors">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          </motion.div>
                          
                          <span className="font-bold text-background text-2xl uppercase tracking-widest relative z-10">Particulier</span>
                          
                          <motion.div animate={{ opacity: hoveredClient === "particulier" ? 1 : 0, height: hoveredClient === "particulier" ? "auto" : 0, marginTop: hoveredClient === "particulier" ? 12 : 0 }} className="relative z-10 text-background opacity-60 font-medium overflow-hidden">
                            Projet perso, Portfolio, Association
                          </motion.div>
                        </motion.button>

                      </div>
                    </motion.div>
                  )}

                  {/* ÉTAPE 2 : TYPE DE PROJET */}
                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center w-full"
                    >
                      <h5 className="text-sm font-bold text-background opacity-50 mb-6 uppercase tracking-widest text-center">Quel est votre besoin principal ?</h5>
                      <div className="flex flex-col md:flex-row gap-4 w-full h-[500px] md:h-[350px]">
                        
                        <motion.button 
                          onMouseEnter={() => setHoveredProject("web")} onMouseLeave={() => setHoveredProject(null)} onClick={() => { setProjectType("web"); setStep(3); setHoveredProject(null); }}
                          // CORRECTION : flexGrow
                          animate={{ flexGrow: hoveredProject === "web" ? 1.5 : hoveredProject ? 0.7 : 1 }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          className={`flex-1 basis-0 relative flex flex-col items-center justify-center border bg-light-bg overflow-hidden transition-colors duration-300 group ${hoveredProject === "web" ? 'border-primary' : 'border-background/20'}`}
                        >
                          <div className={`absolute inset-0 bg-primary opacity-20 blur-[60px] transition-opacity duration-500 ${hoveredProject === "web" ? 'opacity-100' : 'opacity-0'}`} />
                          <motion.div animate={{ scale: hoveredProject === "web" ? 1.2 : 1, y: hoveredProject === "web" ? -5 : 0 }} className="relative z-10 text-background mb-4 group-hover:text-primary transition-colors">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                          </motion.div>
                          <span className="font-bold text-background text-lg uppercase tracking-widest relative z-10">Création Web</span>
                        </motion.button>

                        <motion.button 
                          onMouseEnter={() => setHoveredProject("mobile")} onMouseLeave={() => setHoveredProject(null)} onClick={() => { setProjectType("mobile"); setStep(3); setHoveredProject(null); }}
                          // CORRECTION : flexGrow
                          animate={{ flexGrow: hoveredProject === "mobile" ? 1.5 : hoveredProject ? 0.7 : 1 }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          className={`flex-1 basis-0 relative flex flex-col items-center justify-center border bg-light-bg overflow-hidden transition-colors duration-300 group ${hoveredProject === "mobile" ? 'border-primary' : 'border-background/20'}`}
                        >
                          <div className={`absolute inset-0 bg-primary opacity-20 blur-[60px] transition-opacity duration-500 ${hoveredProject === "mobile" ? 'opacity-100' : 'opacity-0'}`} />
                          <motion.div animate={{ scale: hoveredProject === "mobile" ? 1.2 : 1, y: hoveredProject === "mobile" ? -5 : 0 }} className="relative z-10 text-background mb-4 group-hover:text-primary transition-colors">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                          </motion.div>
                          <span className="font-bold text-background text-lg uppercase tracking-widest relative z-10">App Mobile</span>
                        </motion.button>

                        <motion.button 
                          onMouseEnter={() => setHoveredProject("data")} onMouseLeave={() => setHoveredProject(null)} onClick={() => { setProjectType("data"); setStep(3); setHoveredProject(null); }}
                          // CORRECTION : flexGrow
                          animate={{ flexGrow: hoveredProject === "data" ? 1.5 : hoveredProject ? 0.7 : 1 }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          className={`flex-1 basis-0 relative flex flex-col items-center justify-center border bg-light-bg overflow-hidden transition-colors duration-300 group ${hoveredProject === "data" ? 'border-primary' : 'border-background/20'}`}
                        >
                          <div className={`absolute inset-0 bg-primary opacity-20 blur-[60px] transition-opacity duration-500 ${hoveredProject === "data" ? 'opacity-100' : 'opacity-0'}`} />
                          <motion.div animate={{ scale: hoveredProject === "data" ? 1.2 : 1, y: hoveredProject === "data" ? -5 : 0 }} className="relative z-10 text-background mb-4 group-hover:text-primary transition-colors">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></svg>
                          </motion.div>
                          <span className="font-bold text-background text-lg uppercase tracking-widest relative z-10">Data & KPI</span>
                        </motion.button>

                      </div>
                      <button onClick={() => setStep(1)} className="mt-8 text-xs font-bold text-background opacity-40 hover:text-primary uppercase tracking-widest transition-colors">
                        ← Revenir au profil
                      </button>
                    </motion.div>
                  )}

                  {/* ÉTAPE 3 : RÉSULTATS */}
                  {step === 3 && clientType && projectType && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center w-full"
                    >
                      <div className="flex items-center gap-4 mb-12">
                        <span className="text-xs font-bold uppercase text-primary tracking-widest">{clientType}</span>
                        <span className="w-1 h-1 rounded-full bg-background opacity-20"></span>
                        <span className="text-xs font-bold uppercase text-primary tracking-widest">{projectType}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* @ts-ignore */}
                        {servicesMatrix[clientType][projectType].map((service: any, idx: number) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                            className="bg-light-bg border border-background opacity-80 p-8 flex flex-col group hover:border-primary transition-colors duration-300"
                          >
                            <div className="text-background opacity-40 mb-6 group-hover:text-primary group-hover:opacity-100 transition-all">{service.icon}</div>
                            <h6 className="text-xl font-bold text-background mb-3 uppercase tracking-tighter">{service.title}</h6>
                            <p className="text-sm text-background opacity-70 font-medium leading-relaxed">{service.desc}</p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex gap-8 mt-16 items-center">
                        <button onClick={handleReset} className="text-xs font-bold text-background opacity-40 hover:text-primary uppercase tracking-widest transition-colors">
                          ← Recommencer
                        </button>
                        <a href="mailto:contact@aminazouane.fr" className="px-8 py-4 border-2 border-background hover:bg-background hover:text-white text-background text-xs font-bold uppercase tracking-widest transition-colors">
                          Me Contacter
                        </a>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* SECTION 2 : MES VALEURS */}
            <div className="w-full max-w-6xl pt-16 border-t border-background/10 mb-32">
              <div className="text-center mb-16">
                <h4 className="text-4xl md:text-5xl font-extrabold text-background mb-4 uppercase tracking-tighter">
                  Mes <span className="text-primary">valeurs</span>
                </h4>
                <p className="text-lg text-background opacity-60 font-medium max-w-2xl mx-auto">
                  Découvrez les principes fondamentaux qui guident mon travail au quotidien.
                </p>
              </div>

              <div className="relative w-full h-[280px] md:h-[320px] flex justify-center items-end">
                {valeurs.map((valeur, index) => {
                  const baseRotations = [-12, -4, 4, 12];
                  const xOffsets = [-80, -25, 25, 80]; 
                  
                  const isActive = activeCard === index;
                  const hasActive = activeCard !== null;

                  let targetRotate = baseRotations[index];
                  let targetX = xOffsets[index];
                  let targetY = 0;
                  let targetScale = 1;
                  let targetZ = 20 + index;
                  let targetFilter = "blur(0px) brightness(1)";

                  if (isActive) {
                    targetRotate = 0; targetX = 0; targetY = -30; targetScale = 1.15; targetZ = 50;
                    targetFilter = "blur(0px) brightness(1)";
                  } else if (hasActive) {
                    const pushDirection = index < activeCard ? -1 : 1;
                    targetRotate = baseRotations[index] * 0.8;
                    targetX = xOffsets[index] + (pushDirection * 60);
                    targetY = 20;
                    targetScale = 0.9;
                    targetZ = 10;
                    targetFilter = "blur(3px) brightness(0.85)"; 
                  }

                  return (
                    <motion.div
                      key={index}
                      onClick={(e) => { e.stopPropagation(); setActiveCard(isActive ? null : index); }}
                      animate={{ rotate: targetRotate, x: targetX, y: targetY, scale: targetScale, zIndex: targetZ, filter: targetFilter }}
                      transition={{ type: "spring", damping: 22, stiffness: 300 }}
                      className={`group absolute bottom-0 w-[240px] md:w-[280px] bg-light-bg p-8 rounded-none flex flex-col items-center text-center cursor-pointer origin-bottom transition-colors duration-300 ${
                        isActive ? 'border-2 border-primary shadow-2xl' : 'border border-background/20 hover:border-primary shadow-xl'
                      }`}
                    >
                      <div className={`w-16 h-16 flex items-center justify-center mb-5 transition-all duration-300 ${
                        isActive 
                          ? 'text-primary scale-110' 
                          : 'text-background opacity-40 group-hover:opacity-100 group-hover:text-primary group-hover:scale-110'
                      }`}>
                        {valeur.icon}
                      </div>
                      <h4 className="text-xl font-bold text-background mb-3">{valeur.title}</h4>
                      <p className="text-sm text-background opacity-80 font-medium">{valeur.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
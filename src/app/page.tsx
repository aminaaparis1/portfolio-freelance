"use client";

import { useRef } from "react";
import Cover from "../components/Cover";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Projects from "../components/Projects";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Fonction pour forcer le retour en haut de page lors de l'ouverture
  const resetScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  };

  return (
    <main 
      ref={mainRef}
      className="min-h-screen bg-light-bg relative selection:bg-primary selection:text-background"
    >
      {/* Couverture interactive */}
      <Cover onReveal={resetScroll} />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Section À Propos avec modale */}
      <About />
      
      {/* Section Projets */}
      <Projects />
      
      {/* Section Contact */}
      <section id="contact" className="py-32 px-4 flex flex-col items-center justify-center text-center">
         <h2 className="text-6xl md:text-[8rem] font-bold tracking-tighter text-background mb-8">
            Discutons.
         </h2>
         <a 
           href="mailto:amina.zouane@exemple.com" 
           className="text-2xl border-b-2 border-primary text-background hover:text-primary transition-colors pb-1"
         >
           amina.zouane@exemple.com
         </a>
      </section>
    </main>
  );
}
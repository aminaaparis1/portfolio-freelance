"use client";

import { useRef } from "react";
import Cover from "../components/Cover";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

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
      <Contact />
    </main>
  );
}
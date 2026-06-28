export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full px-12 py-8 flex justify-between items-center z-40 bg-light-bg/90 backdrop-blur-sm">
      {/* Ton Nom - Logo textuel */}
      <a href="/" className="text-sm font-bold tracking-[0.3em] uppercase text-background hover:text-primary transition-colors">
        Amina Zouane
      </a>
      
      {/* Liens de navigation */}
      <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-background">
        <a href="#about" className="hover:text-primary transition-colors">À propos</a>
        <a href="#projects" className="hover:text-primary transition-colors">Projets</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
    </nav>
  );
}
"use client";

import { motion } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Application B2S",
    description: "Progressive Web App (PWA) sécurisée avec gestion avancée des rôles et suivi de progression.",
    tags: ["Next.js", "Supabase", "PostgreSQL"],
  },
  {
    id: 2,
    title: "FastLib",
    description: "Conception et développement d'un outil métier sur-mesure, optimisé pour l'expérience utilisateur.",
    tags: ["React", "Tailwind CSS", "Figma"],
  },
  {
    id: 3,
    title: "Plateforme Alchimie",
    description: "Développement d'un site vitrine moderne et création de scripts d'automatisation des données.",
    tags: ["Next.js", "Python", "Docker"],
  }
];

export default function Projects() {
  return (
    <section id="projets" className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Études de <span className="text-primary italic">cas</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border border-surface hover:border-primary transition-colors duration-300 rounded-2xl p-8 flex flex-col h-full"
            >
              <h3 className="text-2xl font-bold mb-3 text-text-light">{project.title}</h3>
              <p className="text-text-muted mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs font-medium px-3 py-1 bg-background text-primary rounded-full border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
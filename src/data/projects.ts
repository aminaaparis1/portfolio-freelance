// src/data/projects.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  techs: string[];
  gradient: string;
  image?: string;
  images?: string[]; // Utilisé pour le carrousel
  links?: {
    liveUrl?: string;
    githubUrl?: string;
  };
  year?: number;
}

export interface ProjectsData {
  web: Project[];
  mobile: Project[];
}

export const projectsData: ProjectsData = {
  web: [
    {
      id: "w1",
      title: "Culture Go",
      description: "Plateforme interactive répertoriant les événements culturels aux États-Unis, alimentée par l'intégration d'une API externe en temps réel. Application SPA moderne développée avec Angular.",
      techs: ["Angular 21", "TypeScript", "Vitest", "API REST"],
      gradient: "from-blue-600 to-indigo-700",
      images: [
        "/projects/culturego/culturego-app.png",
        "/projects/culturego/culturego-app2.png",
        "/projects/culturego/culturego-app3.png",
        "/projects/culturego/culturego-app4.png",
        "/projects/culturego/culturego-app5.png",
        "/projects/culturego/culturego-app6.png",
        "/projects/culturego/culturego-app7.png",
      ],
      year: 2026,
      links: {
        liveUrl: ""
      }
    }
  ],
  mobile: [
    {
      id: "m1",
      title: "Undercover",
      description: "Application mobile multijoueur du célèbre jeu de mots et de rôles cachés. Attribution secrète (Civil, Undercover, Mr. White), gestion des tours de parole et système de vote en temps réel. Une fonctionnalité sur mesure permet également aux joueurs de créer et d'intégrer leurs propres listes de mots.",
      techs: ["React Native", "Firebase", "WebSockets"],
      gradient: "from-red-500 to-rose-700",
      images: [
        "/projects/undercover/undercover.PNG",
        "/projects/undercover/undercover2.PNG",
        "/projects/undercover/undercover3.PNG",
        "/projects/undercover/undercover4.PNG",
        "/projects/undercover/undercover5.PNG",
        "/projects/undercover/undercover6.PNG",
        "/projects/undercover/undercover7.PNG",
        "/projects/undercover/undercover8.PNG"
      ],
      year: 2026
    }
  ]
};
// Chemins des images - fichiers servis depuis le dossier public/
export const projet1 = '/images/projet1.jpeg';
export const projet2 = '/images/projet2.jpeg';
export const projet3  = '/images/projet3.jpeg';
export const projet4 = '/images/projet4.jpeg';
export const projet5 = '/images/projet5.jpeg';
export const projet6= '/images/projet6.jpeg';
export const projet7 = '/images/projet7.png';
export const profileImage = '/images/beya1.jpeg';
export const profile1Image = '/images/beya.jpeg';
export const bgImage = '/images/background.jpeg';
export const logoImages ='/images/logobeya.jpeg';
export const ouvrage1 = '/images/ouvrage1.jpeg';
export const ouvrage2 = '/images/ouvrage2.jpeg';


export const about =
  "Expert en relations publiques doté d'une solide expertise en maintenance système, j'assure la synergie entre la performance technique de nos outils et le rayonnement de notre agence. Mon rôle : garantir que nos systèmes ne tombent jamais et que nos partenariats ne cessent de croître.";

export const skills = [
  'Négociation',
  'Communication de crise',
  'Vulgarisation technique',
  'Gestion de projet',

  // Systèmes et réseaux
 
  'Administration Linux/Windows',
  'Docker',
  'gestion de serveurs Cloud (AWS/Vercel/DigitalOcean)',
  'Monotoring (Prometheus, Grafana)',

  // Communication
  'Rédaction de communiqués',
  'Réseaux sociaux professionnels (LinkedIn)',
  'Organisation d/événements IT.',

  // Sécurité
  'Audits de sécurité système', 
  'Gestion des sauvegardes',
  'Protocoles de protection des données (RGPD)', 
];

export const experiences = [
  {
    role: 'Communication & Image',
    company: 'Muamokel Agency',
    year: '2026-Présent',
    type: 'Stratégie de communication externe',
    description:
      "Concevoir et diffuser le narratif de l'agence (expertises en code, nouvelles technologies, transformation digitale) auprès des médias et des partenaires.",
  },

  {
    role: 'Communication & Image',
    company: 'Muamokel Agency',
    year: '2025-Présent',
    type: 'Événementiel et Presse ',
    description:
      "Organiser des webinaires, des conférences ou des lancements de produits informatiques et rédiger des communiqués de presse ciblés.",
  },

  {
    role: 'Communication & Image',
    company: 'Muamokel Agency',
    year: '2025-Présent',
    type: 'Veille et Gestion de crise',
    description:
      " Anticiper les risques de réputation liés à des bugs ou des cyberattaques et mettre en place des plans de communication de crise. ",
  },

  {
    role: 'Support & Infrastructure',
    company: 'Mwamokel Agency',
    year: '2025-Présent',
    type: 'Entretien du parc informatique',
    description:
      "Installer, configurer et mettre à jour le matériel (serveurs, PC) et les licences logicielles nécessaires au développement.",
  },
  {
    role: 'Support & Infrastructure',
    company: 'Mwamokel Agency',
    year: '2023-Présent',
    type: 'Sécurité et Sauvegarde',
    description:
      'Mettre en place des solutions de cybersécurité, gérer les VPN, les certificats SSL et assurer la pérennité des données par des sauvegardes régulières.',
  },
  {
    role: 'Support & Infrastructure',
    company: 'Mwamokel Agency',
    year: '2025-Présent',
    type: 'Support technique (Helpdesk)',
    description:
      "Diagnostiquer et réparer les pannes réseaux ou hardware pour minimiser les interruptions de service.",
  },

 {
    role: 'Support & Infrastructure',
    company: 'Mwamokel Agency',
    year: '2025-Présent',
    type: 'Gestion des accès Cloud :',
    description:
      "Administrer les services Cloud (Office 365, AWS, Azure) pour garantir l'accessibilité des projets n'importe où.",
  },

];
// --- IMPORT DES IMAGES (Assurez-vous que les fichiers existent ou utilisez des URLs) ---
// import viteImg1 from './images/vite-lancement.jpg'; 

export const projets = [
  {
    titre: 'Lancement VITE - Kinshasa',
    description: 'Première phase opérationnelle du projet VITE visant l’autonomisation des jeunes entrepreneurs kinois.',
    image: projet1, // Image Pro
    lienDemo: '#',
    lienGithub: '#',
    technologies: ['Entrepreneuriat', 'Terrain', 'Impact'],
    fonctionnalites: [
      'Identification de 50 porteurs de projets',
      'Ateliers de structuration de business plan',
      'Mise en place d’un réseau de mentorat local',
      'Accompagnement à la formalisation administrative',
    ],
  },
  {
    titre: 'Tournée Éveil des Consciences',
    description: 'Série de conférences dans les universités de la RDC pour stimuler le leadership citoyen.',
    image: 'https://unsplash.com',
    lienDemo: '#',
    lienGithub: '#',
    technologies: ['Coaching', 'Éducation', 'Leadership'],
    fonctionnalites: [
      'Plus de 5000 étudiants sensibilisés',
      'Distribution de guides de résilience',
      'Création de cellules de réflexion locales',
      'Partenariats avec 5 institutions académiques',
    ],
  },
  {
    titre: 'Incubateur VITE - Goma',
    description: 'Extension du Projet VITE dans l’Est pour soutenir la résilience par l’activité économique.',
    image: 'https://unsplash.com',
    lienDemo: '#',
    lienGithub: '#',
    technologies: ['Résilience', 'Innovation', 'Action'],
    fonctionnalites: [
      'Soutien aux micro-entreprises de transformation',
      'Formation en gestion de crise financière',
      'Accès aux outils digitaux de vente',
      'Suivi post-incubation de 6 mois',
    ],
  },
  {
    titre: 'Publication : Guide de Résilience',
    description: 'Manuel pratique accompagnant la sortie de mon dernier livre pour passer de la lecture à l’application.',
    image: 'https://unsplash.com',
    lienDemo: '#',
    lienGithub: '#',
    technologies: ['Auteur', 'Manuel', 'Pratique'],
    fonctionnalites: [
      '30 exercices d’auto-coaching',
      'Feuilles de route entrepreneuriales',
      'Espace de prise de notes interactif',
      'Disponible en version physique et PDF',
    ],
  },
  {
    titre: 'Programme Mentorat Femmes',
    description: 'Branche spécifique de VITE dédiée au leadership féminin dans la société congolaise.',
    image: 'https://unsplash.com',
    lienDemo: '#',
    lienGithub: '#',
    technologies: ['Femmes Leaders', 'Empowerment'],
    fonctionnalites: [
      'Cercles de parole et d’échange',
      'Ateliers sur la confiance en soi',
      'Accompagnement au pitch de projet',
      'Networking avec des femmes entrepreneures',
    ],
  },
  {
    titre: 'VITE Digital Hub',
    description: 'Plateforme en ligne centralisant les ressources de formation pour les jeunes éloignés des centres urbains.',
    image: 'https://unsplash.com',
    lienDemo: '#',
    lienGithub: '#',
    technologies: ['Digital', 'Formation', 'Accessibilité'],
    fonctionnalites: [
      'Cours en ligne accessibles hors-connexion',
      'Bibliothèque numérique de livres inspirants',
      'Forum d’entraide entre membres VITE',
      'Système de certification VITE-Action',
    ],
  },
];


export const works = [
  // 'Direction de projet e-commerce multilingue (équipe de 10 développeurs)',
  "Architecture et développement d'API RESTful pour plateforme bancaire",
  'Mise en place de pipeline CI/CD et automatisation des tests',
  "Développement Full Stack de plateforme de gestion d'entreprise (ERP)",
  'Consultation en transformation digitale pour PME',
  // 'Formation et mentorat de développeurs juniors',
];

export const contact = [
  { label: 'Email', link: 'beverlymalu04@gmail.com' },
  {
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/',
  },
  // { label: 'GitHub', link: 'https://github.com/' },
  {
    label: 'Instagram',
    link: 'https://instagram.com/',
  },
  {
    label: 'Facebook',
    link: 'https://facebook.com/',
  },
  {
    label: 'WhatsApp',
    link: 'https://wa.me/',
  },
];

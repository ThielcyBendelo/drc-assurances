import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { FaBirthdayCake, FaLightbulb, FaUtensils, FaArrowRight, FaCheckCircle, FaUsers, FaAward } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import QuoteModal from "./QuoteModal";
import { profileImage } from '../assets/assets.js';
import { gateau1, gateau2, gateau3, gateau4, gateau5, gateau6 } from "../assets/assets";

// Galerie des créations phares Cake Design de M-DELICE Abidjan
const creationsCakeDesign = [
  {
    title: "Pièce Montée Prestige Blanc & Or",
    subtitle: "Mariages d'exception",
    description: "Une création majestueuse sur plusieurs étages arborant de fines feuilles d'or 24 carats et des fleurs en sucre modelées à la main.",
    details: [{ label: "Parts", value: "+150 parts" }, { label: "Atelier", value: "48h de travail" }, { label: "Style", value: "Mariage" }],
    points: ["Biscuit Vanille Bourbon", "Croustillant Praliné", "Fleurs comestibles"],
    tag: "Mariage",
    image: gateau1, // Remplacer par la photo de votre pièce montée
  },
  {
    title: "Le Gâteau Safari Royale",
    subtitle: "Anniversaires Enfants",
    description: "Un univers magique sculpté en pâte à sucre mettant en scène les animaux de la savane pour émerveiller votre enfant.",
    details: [{ label: "Parts", value: "30 parts" }, { label: "Thème", value: "Safari Animaux" }, { label: "Saveurs", value: "Choco / Oreo" }],
    points: ["Modelages faits main", "Ganache chocolat lait", "Moins de sucre"],
    tag: "Enfant",
    image: gateau2,
  },
  {
    title: "Le Box Corporate M-DELICE",
    subtitle: "Événements d'entreprise",
    description: "Gâteau épuré aux lignes géométriques arborant le logo de votre entreprise en impression alimentaire haute définition.",
    details: [{ label: "Focus", value: "Identité de Marque" }, { label: "Format", value: "Rectangulaire" }, { label: "Statut", value: "Sur mesure" }],
    points: ["Logo personnalisable", "Cocktail dinatoire", "Livraison sur site"],
    tag: "Professionnel",
    image: gateau3,
  },
  {
    title: "L'Élégance Nude Cake & Fruits Rouges",
    subtitle: "Tendances Épurées",
    description: "Un gâteau d'anniversaire chic et minimaliste laissant entrevoir le biscuit moelleux, sublimé par des fruits frais d'exception.",
    details: [{ label: "Finition", value: "Semi-nu / Rustique" }, { label: "Parfum", value: "Citron / Fraise" }, { label: "Type", value: "Moderne" }],
    points: ["Crème légère", "Fruits de saison", "Design épuré"],
    tag: "Tendance",
    image: gateau4,
  },
  {
    title: "Gâteau Haute Couture Rose Poudré",
    subtitle: "Baby Shower & Baptêmes",
    description: "Douceur et raffinement pour célébrer les plus beaux moments de la vie. Effets drapés et matelassés en sucre.",
    details: [{ label: "Cible", value: "Fêtes Privées" }, { label: "Teinte", value: "Pastel / Pastel d'Or" }, { label: "Format", value: "Rond 2 étages" }],
    points: ["Mousse fruits de la passion", "Ambiance douce", "Effet matelassé"],
    tag: "Célébration",
    image: gateau5,
  },
  {
    title: "Sweet Table Thématique Complète",
    subtitle: "Buffets Sucrés Clé en Main",
    description: "Une table d'honneur assortie comprenant le gâteau principal accompagné de cupcakes, biscuits décorés et macarons assortis.",
    details: [{ label: "Inclus", value: "+80 douceurs" }, { label: "Décor", value: "Harmonisé" }, { label: "Portée", value: "Buffet complet" }],
    points: ["Cupcakes assortis", "Magnum cakes", "Installation sur place"],
    tag: "Buffet",
    image: gateau6,
  }
];

export default function CakeDesign() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const navigate = useNavigate();

  const handleJoinProject = (title) => {
    setSelectedProject(`Demande de modèle : ${title}`);
    setModalOpen(true);
  };

  const pointsForts = [
    { title: "Créativité", desc: "Donner vie visuellement et gustativement aux gâteaux les plus fous de votre imagination.", icon: <FaLightbulb className="text-orange-500" /> },
    { title: "Excellence", desc: "Un équilibre parfait entre un visuel spectaculaire et des saveurs équilibrées en sucre.", icon: <FaBirthdayCake className="text-amber-600" /> },
    { title: "Savoir-Faire", desc: "Une fabrication artisanale minutieuse réalisée à Abidjan à partir d'ingrédients de prestige.", icon: <FaAward className="text-amber-900" /> }
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors duration-500">
      
     {/* 1. HERO SECTION AVEC BACKGROUND GOURMAND INTÉGRÉ */}
<section className="relative py-28 bg-stone-950 text-white overflow-hidden">
  
  {/* IMAGE D'ARRIÈRE-PLAN : Optimisée, centrée et assombrie pour le contraste */}
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
    <img 
      src={profileImage} 
      alt="Haute Pâtisserie Cake Design M-DELICE" 
      className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.05]"
      loading="eager"
    />
    {/* Superposition de dégradé pour adoucir les bords et lier le fond à la charte graphique */}
    <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-transparent to-stone-950/40" />
  </div>

  {/* Forme géométrique décorative originale conservée */}
  <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/5 skew-x-12 transform translate-x-20 z-5"></div>
  
  {/* Contenu textuel et interactif (z-10 pour passer au-dessus de l'image de fond) */}
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="max-w-3xl">
      <span className="px-4 py-2 rounded-full bg-orange-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg"> 
        Atelier de Haute Création 
      </span> 
      
      <h1 className="text-5xl md:text-8xl font-black mt-8 mb-8 uppercase tracking-tight leading-none font-serif"> 
        CAKE <span className="text-amber-400 italic font-sans font-light">DESIGN</span> 
      </h1> 
      
      <p className="text-xl text-stone-200 leading-relaxed mb-10 max-w-xl italic border-l-4 border-amber-500 pl-6"> 
        "Sublimez vos mariages, anniversaires et événements prestigieux à Abidjan avec nos pièces uniques." 
      </p> 
      
      <button 
        onClick={() => { setSelectedProject("Création Cake Design Générale"); setModalOpen(true); }} 
        className="px-10 py-5 bg-amber-600 text-white rounded-2xl font-black hover:bg-amber-500 transition-all flex items-center gap-3 shadow-2xl shadow-amber-600/20" 
      > 
        Créer mon gâteau sur mesure <FaArrowRight /> 
      </button> 
    </motion.div> 
  </div>
</section>


      {/* 2. LES TROIS ATTRIBUTS DE NOTRE ATELIER */}
      <section className="py-20 px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {pointsForts.map((item, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -10 }} 
              className="p-10 bg-white dark:bg-stone-900 rounded-[40px] shadow-xl border border-stone-100 dark:border-stone-800"
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-black text-stone-950 dark:text-white font-serif mb-4">{item.title}</h3>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SECTION GALERIE ET CHOIX DES CRÉATIONS */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black text-stone-950 dark:text-white font-serif">
              Nos Créations <span className="text-orange-500 font-sans font-light italic">Signatures</span>
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mt-4 text-lg">
              Explorez nos designs artistiques réalisés sur mesure pour inspirer votre prochain événement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {creationsCakeDesign.map((project, idx) => (
              <motion.div 
                key={idx} 
                className="bg-stone-50 dark:bg-stone-900/40 rounded-[40px] overflow-hidden border border-stone-100 dark:border-stone-800 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-56 bg-stone-200">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {project.tag}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-stone-950 dark:text-white font-serif mb-1">{project.title}</h3>
                  <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-4">{project.subtitle}</p>
                  
                  <div className="grid grid-cols-3 gap-2 py-4 mb-6 border-y border-stone-200 dark:border-stone-800">
                    {project.details.map((det, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">{det.label}</p>
                        <p className="text-[10px] font-black text-amber-900 dark:text-amber-400 uppercase mt-0.5">{det.value}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-stone-600 dark:text-stone-300 text-sm mb-6 line-clamp-3 italic">"{project.description}"</p>
                  
                  <ul className="space-y-2 mb-8">
                    {project.points.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-200">
                        <FaCheckCircle className="text-orange-500 text-[11px]" /> {p}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleJoinProject(project.title)} 
                    className="mt-auto px-6 py-3 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-500 transition-all flex items-center gap-2 shadow-lg" 
                  >
                    Je veux ce modèle <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <QuoteModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        defaultService={selectedProject}
      />
    </div>
  );
}

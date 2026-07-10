import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
// 1. IMPORTATION DES IMAGES (À mettre tout en haut du fichier)
import image1 from '../assets/image1.png'; // Ajustez le chemin selon votre fichier exact (.png, .jpg ou .webp)
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import background1 from '../assets/background1.png';
import { 
  FaShieldAlt, FaHeartbeat, FaCar, FaGraduationCap, 
  FaPlane, FaCheckCircle, FaArrowRight, FaHospitalSymbol 
} from 'react-icons/fa';


export default function ServicesPage() {
  const navigate = useNavigate();

// 2. VOTRE TABLEAU DE DONNÉES MIS À JOUR
const formulas = [
  {
    id: 1,
    title: "Assurance Santé Famille (Tiers-Payant)",
    image: image1, // On utilise la variable importée directement ici
    icon: <FaHeartbeat className="text-[#CE1126] text-4xl" />,
    bgIcon: "bg-red-500/10",
    description: "Destinée à la diaspora pour couvrir les frais médicaux des parents et proches restés en RDC. Donne un accès direct à notre réseau de cliniques agréées.",
    guarantees: [
      "Consultations et urgences médicales 24h/7",
      "Hospitalisation et chirurgie prises en charge",
      "Pharmacie et médicaments couverts à 80%",
      "Zéro avance de fonds dans le réseau agréé"
    ],
    color: "border-l-4 border-[#CE1126]"
  },
  {
    id: 2,
    title: "Assurance Auto Obligatoire ARCA",
    image: image2, // Variable importée
    icon: <FaCar className="text-[#FDD100] text-4xl" />,
    bgIcon: "bg-[#FDD100]/10",
    description: "Garantie de Responsabilité Civile conforme au Code des Assurances de la RDC. Protégez les véhicules de votre famille contre les aléas de la route.",
    guarantees: [
      "Attestation officielle ARCA immédiate",
      "Responsabilité Civile (Dommages aux tiers)",
      "Défense et recours juridiques inclus",
      "Option bris de glace et vol disponible"
    ],
    color: "border-l-4 border-[#FDD100]"
  },
  {
    id: 3,
    title: "Protection Scolaire & Universitaire",
    image: image3, // Variable importée
    icon: <FaGraduationCap className="text-[#00A3E0] text-4xl" />,
    bgIcon: "bg-[#00A3E0]/10",
    description: "Sécurisez l'avenir éducatif de vos enfants, frères ou sœurs en RDC. Prise en charge des frais de scolarité en cas d'accident ou de coup dur de la vie.",
    guarantees: [
      "Garantie de paiement des frais de scolarité",
      "Couverture des accidents sur le trajet scolaire",
      "Frais de soins d'urgence en milieu scolaire",
      "Assistance administrative simplifiée"
    ],
    color: "border-l-4 border-[#00A3E0]"
  },
  {
    id: 4,
    title: "Assistance Voyage & Diaspora",
    image: image4, // Variable importée
    icon: <FaPlane className="text-purple-500 text-4xl" />,
    bgIcon: "bg-purple-500/10",
    description: "Une formule sur-mesure pour les membres de la diaspora lors de leurs séjours temporaires ou d'affaires en République Démocratique du Congo.",
    guarantees: [
      "Rapatriement sanitaire vers l'étranger",
      "Frais médicaux d'urgence sur place",
      "Assurance perte de bagages et retards",
      "Assistance juridique internationale"
    ],
    color: "border-l-4 border-purple-500"
  }
];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

{/* En-tête de la Vitrine des Formules unifié, premium et animé */}
<header className="relative bg-slate-100 dark:bg-slate-950 px-6 py-24 pt-32 text-center border-b-4 border-[#00A3E0] overflow-hidden font-sans select-none">
  
  {/* 1. L'IMAGE D'ARRIÈRE-PLAN LUMINEUSE ET TOTALEMENT VISIBLE (100% OPACITÉ) */}
  <div className="absolute inset-0 z-0">
    <img 
      src={background1} 
      alt="DRC Assurances Background" 
      className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-slate-100 dark:from-slate-950/10 dark:via-transparent dark:to-slate-950" />
  </div>

  {/* 2. LE MOTIF DE GRILLE EXISTANT */}
  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] dark:opacity-5 [background-size:24px_24px] pointer-events-none z-1" />

  {/* 3. LE CONTENU CENTRAL ANIMÉ AVEC FRAMER MOTION */}
  <motion.div 
    initial={{ opacity: 0, scale: 0.98, y: 15 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
    className="relative z-10 max-w-4xl mx-auto p-6 md:p-10 bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-800/40 shadow-2xl space-y-6 flex flex-col items-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
  >
    
    {/* Badge Officiel Animé */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, type: "spring" }}
    >
      <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-[#007cb0] dark:text-[#00A3E0] text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 inline-flex items-center gap-2 shadow-sm">
        <FaShieldAlt className="text-[#CE1126]" /> Catalogue Officiel des Garanties
      </span>
    </motion.div>

    {/* Titre avec gestion de la lisibilité */}
    <motion.h1 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-red-600 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
    >
      Nos Solutions de <br />
      <span className="text-[#E5B200] dark:text-[#FDD100] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">Protection</span> Intégrale
    </motion.h1>

    {/* Description */}
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="text-slate-700 dark:text-slate-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-bold"
    >
      Découvrez le détail technique de nos formules agréées. Des contrats transparents conçus pour apporter une sérénité totale à la diaspora et à leurs bénéficiaires locaux.
    </motion.p>

  </motion.div>
</header>


   {/* Section d'affichage des services / formules d'assurance */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {formulas.map((formula, idx) => (
            <motion.div
              key={formula.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800/50 hover:border-[#00A3E0]/30 group ${formula.color}`}
            >
              <div>
                {/* 1. ZONE IMAGE DE LA FORMULE (ASSETS) */}
                {formula.image && (
                  <div className="relative w-full h-48 md:h-56 overflow-hidden bg-slate-900">
                    <img 
                      src={formula.image} 
                      alt={formula.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Voile dégradé esthétique sur le bas de l'image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                  </div>
                )}

                {/* Conteneur pour le texte de la carte */}
                <div className="p-6 md:p-8 pb-0">
                  {/* Icône de la formule */}
                  <div className={`p-4 ${formula.bgIcon} rounded-xl inline-block mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    {formula.icon}
                  </div>

                  {/* Titre et description */}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-[#00A3E0] transition-colors duration-200">
                    {formula.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-medium">
                    {formula.description}
                  </p>

                  {/* Liste des garanties incluses */}
                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                      <FaHospitalSymbol className="text-[#00A3E0]" /> Garanties Clés Incluses :
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                      {formula.guarantees.map((guarantee, gIdx) => (
                        <div key={gIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 font-semibold">
                          <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={14} />
                          <span className="line-clamp-2">{guarantee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton d'action vers la boutique / tarification */}
              <div className="p-6 md:p-8 pt-4 border-t border-slate-50 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-900/30">
                <button
                  onClick={() => navigate('/packs-micro')}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl font-bold text-xs md:text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 group border border-transparent hover:border-[#00A3E0]/20 shadow-sm"
                >
                  Voir les tarifs & Tarifier <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </main>   
      <Footer />
    </div>
  );
}

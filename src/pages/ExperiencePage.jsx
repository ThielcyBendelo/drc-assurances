import React from 'react';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import background2 from '../assets/background2.png';
import background1 from '../assets/background1.png';
import { 
  FaBalanceScale, FaShieldAlt, FaCertificate, FaGavel, 
  FaCheckCircle, FaUserShield, FaBuilding, FaHandshake 
} from 'react-icons/fa';

export default function ExperiencePage() {
  
  const pillars = [
    {
      icon: <FaGavel className="text-[#00A3E0] text-3xl" />,
      title: "Légalisation & Code des Assurances",
      description: "Conformément à la Loi n° 15/005 portant Code des Assurances en RDC, le marché est totalement libéralisé. DRC Assurances opère en étroite collaboration avec des compagnies agréées pour garantir la validité juridique absolue de chaque contrat."
    },
    {
      icon: <FaCertificate className="text-[#FDD100] text-3xl" />,
      title: "Régulation par l'ARCA",
      description: "L'Autorité de Régulation et de Contrôle des Assurances (ARCA) veille à la protection des assurés et à la solidité financière des acteurs. Toutes les formules commercialisées sur notre écosystème numérique respectent les tarifs et obligations réglementaires."
    },
    {
      icon: <FaUserShield className="text-[#CE1126] text-3xl" />,
      title: "Garantie des Fonds & Tiers-Payant",
      description: "Vos primes sont sécurisées et cantonnées sur des comptes de dépôt réglementés. En cas de sinistre, le règlement des prestations s'effectue directement auprès des hôpitaux et garages partenaires sans aucune avance de frais pour vos bénéficiaires."
    }
  ];

  const obligations = [
    "Assurance Frontière Terrestre & Maritime",
    "Assurance Responsabilité Civile Automobile (Obligatoire ARCA)",
    "Assurance Risques de Construction & Incendie",
    "Assurance Faculté à l'Importation (Transport des marchandises)"
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

     {/* En-tête Institutionnel unifié, premium et animé aux couleurs de la RDC */}
<header className="relative bg-slate-100 dark:bg-slate-950 px-6 py-24 pt-32 text-center border-b-4 border-[#00A3E0] overflow-hidden font-sans select-none">
  
  {/* 1. L'IMAGE D'ARRIÈRE-PLAN LUMINEUSE ET TOTALEMENT VISIBLE (100% OPACITÉ) */}
  <div className="absolute inset-0 z-0">
    <img 
      src={background2} 
      alt="DRC Assurances Cadre Legal Background" 
      className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-700"
    />
    {/* Dégradé fluide de transition uniquement vers le bas de page */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-slate-100 dark:from-slate-950/10 dark:via-transparent dark:to-slate-950" />
  </div>

  {/* 2. LE MOTIF DE GRILLE AUX COULEURS DE LA RDC (Bleu Cyan #00A3E0) EXPANSION CONSERVÉE */}
  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00A3E0_1.5px,transparent_1.5px)] dark:opacity-10 [background-size:24px_24px] pointer-events-none z-1" />

  {/* 3. LE CONTENU CENTRAL EMBALLÉ DANS UN PANNEAU DE VERRE ET ANIMÉ AVEC FRAMER MOTION */}
  <motion.div 
    initial={{ opacity: 0, scale: 0.98, y: 15 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
    className="relative z-10 max-w-4xl mx-auto p-6 md:p-10 bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-800/40 shadow-2xl space-y-6 flex flex-col items-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
  >
    
    {/* Badge de Conformité Animé */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, type: "spring" }}
    >
      <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-[#007cb0] dark:text-[#00A3E0] text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 inline-flex items-center gap-2 shadow-sm">
        <FaBalanceScale className="text-[#CE1126]" /> Conformité Réglementaire & Transparence
      </span>
    </motion.div>

    {/* Titre Institutionnel avec gestion du contraste en mode clair (Rouge & Ambre) */}
    <motion.h1 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-red-600 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
    >
      Le Cadre Légal de l'Assurance en <br />
      <span className="text-[#E5B200] dark:text-[#FDD100] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">RD Congo</span>
    </motion.h1>

    {/* Description ajustée pour la lisibilité sur fond clair et sombre */}
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="text-slate-700 dark:text-slate-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-bold"
    >
      DRC Assurances apporte de la transparence, de la sécurité et de la traçabilité au marché congolais pour offrir à la diaspora un outil d'investissement et de protection fiable.
    </motion.p>

  </motion.div>
</header>


      {/* Les Piliers de la Conformité */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full space-y-16">
        
        {/* Section 1 : Grille des Piliers */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-start gap-4 hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </section>

       {/* Section 2 : Focus assurances obligatoires en RDC */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-md border border-slate-100 dark:border-slate-800/60 font-sans overflow-hidden transition-all duration-300 hover:shadow-xl">
  
  {/* Colonne de gauche : Textes explicatifs (Agrandis et aérés) */}
  <div className="flex flex-col justify-between space-y-8">
    <div className="space-y-5">
      <div>
        <span className="text-xs font-black uppercase text-[#00A3E0] tracking-widest bg-[#00A3E0]/10 px-4 py-2 rounded-full border border-[#00A3E0]/20 inline-block">
          Rappel de la Loi
        </span>
      </div>
      
      {/* Titre agrandi */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
        Les Assurances Strictement Obligatoires (Loi ARCA)
      </h2>
      
      {/* Description agrandie à text-base */}
      <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
        L'Autorité de Régulation (ARCA) rappelle de manière stricte aux résidents et aux entreprises l'obligation de souscrire leurs polices auprès de structures enregistrées localement en RDC sous peine de sanctions financières majeures.
      </p>
    </div>

    {/* Section basse : Avatars et texte d'accompagnement */}
    <div className="flex gap-4 items-center border-t border-slate-100 dark:border-slate-800 pt-6">
      <div className="flex -space-x-3">
        <div className="w-12 h-12 rounded-full bg-[#00A3E0] flex items-center justify-center text-white border-4 border-white dark:border-slate-900 shadow-sm transform hover:scale-110 transition-transform duration-200">
          <FaBuilding size={16} />
        </div>
        <div className="w-12 h-12 rounded-full bg-[#FDD100] flex items-center justify-center text-slate-900 border-4 border-white dark:border-slate-900 shadow-sm transform hover:scale-110 transition-transform duration-200">
          <FaHandshake size={16} />
        </div>
      </div>
      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-sm leading-snug">
        Une synergie technologique au service de la conformité et de l'inclusion financière.
      </p>
    </div>
  </div>

  {/* Colonne de droite : Liste de contrôle ARCA transformée en carte immersive avec image de fond */}
  <div className="relative rounded-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden p-8 md:p-10 flex flex-col justify-center min-h-[320px]">
    
    {/* 1. L'IMAGE EN ARRIÈRE-PLAN DE LA CARTE DE DROITE */}
    <div className="absolute inset-0 z-0">
      <img 
        src={background1} 
        alt="Loi ARCA RD Congo" 
        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      {/* Overlay ultra-sombre pour détacher parfaitement les éléments de la liste */}
      <div className="absolute inset-0 bg-slate-950/90 dark:bg-slate-950/95 backdrop-blur-[2px]" />
    </div>

    {/* 2. LE CONTENU DE LA CARTE (z-10 pour être au-dessus du fond) */}
    <div className="relative z-10 space-y-6">
      <h4 className="font-black text-white mb-2 text-sm uppercase tracking-widest flex items-center gap-2.5 border-b border-white/10 pb-4">
        <FaShieldAlt className="text-[#00A3E0] animate-pulse" /> Liste de Contrôle ARCA
      </h4>
      
      <ul className="space-y-4">
        {obligations.map((item, idx) => (
          <motion.li 
            key={idx} 
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className="flex items-start gap-4 text-base font-bold text-slate-100 hover:text-[#00A3E0] transition-colors duration-200 group/item cursor-default"
          >
            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
            <span className="leading-snug">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </div>
</section>
      </main>
      <Footer />
    </div>
  );
}

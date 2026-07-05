import React, { useState, useEffect } from 'react'; // 🟢 AJOUTÉ POUR CORRIGER L'ERREUR RUNTIME
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';
import { 
  FaShieldAlt, FaGlobeAfrica, FaCreditCard, FaUserCheck, 
  FaHandHoldingHeart, FaCheckCircle, FaArrowRight 
} from 'react-icons/fa';

// Importation native de vos deux arrière-plans professionnels depuis votre dossier assets
import background1 from '../assets/background1.png';
import background2 from '../assets/background2.png'; 


// Variantes d'animations fluides pour l'effet "Pro" haut de gamme
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};



export default function Home() {
  const navigate = useNavigate();
  // 2. Créez le tableau avec vos deux images importées
  const backgrounds = [background1, background2];
  const [bgIndex, setBgIndex] = useState(0);

  // 3. Effet pour changer d'image automatiquement
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000); // Alterne toutes les 6 secondes
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col antialiased font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* En-tête de navigation sécurisé */}
      <NavbarSecured />
            {/* ================= 1. SECTION HERO MODERNE ET PRO ================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 py-20 pt-28 overflow-hidden bg-slate-950 text-white">
        
        {/* 🟢 CORRIGÉ : Opacité augmentée à 55% et suppression des filtres pour rendre vos images locales nettes */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-55 transform scale-105 transition-all duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${backgrounds[bgIndex]})`,
            transitionProperty: 'background-image'
          }}
        />

        {/* 🟢 CORRIGÉ : Remplacement du voile bleu par un dégradé de lisibilité sombre ultra-professionnel */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950 z-10" />


                {/* 🟢 CORRIGÉ : Remplacement du voile bleu par un dégradé sombre professionnel qui libère vos images */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950 z-10" />

        {/* Contenu textuel animé de la bannière principale */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-5xl mx-auto text-center space-y-6 flex flex-col items-center"
        >
          {/* Badge officiel de confiance */}
          <motion.span 
            variants={fadeInUp}
            className="px-4 py-1.5 rounded-full bg-[#00A3E0]/20 text-[#00A3E0] text-xs font-black uppercase tracking-widest border border-[#00A3E0]/30 inline-flex items-center gap-2 backdrop-blur-md"
          >
            <FaGlobeAfrica /> Écosystème Numérique Agréé ARCA
          </motion.span>

          {/* Grand titre avec dégradé de texte moderne */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-7xl font-black tracking-tight leading-none"
          >
            Protégez votre famille en <br />
            <span className="bg-gradient-to-r from-white via-[#00A3E0] to-[#FDD100] text-transparent bg-clip-text">
              RD Congo depuis l'Étranger
            </span>
          </motion.h1>

          {/* Description claire pour la diaspora */}
          <motion.p 
            variants={fadeInUp}
            className="text-slate-300 max-w-3xl mx-auto text-sm md:text-xl font-light leading-relaxed px-4"
          >
            Bâtissez un pont de confiance durable. Plus besoin d'envoyer des fonds en urgence par agence de transfert : souscrivez une micro-assurance santé, auto ou scolaire pour vos proches restés au pays avec prise en charge directe et instantanée.
          </motion.p>

          {/* Séparateur aux couleurs du drapeau national */}
          <motion.div variants={fadeInUp} className="flex justify-center items-center gap-2 my-4">
            <div className="h-[2px] w-16 bg-[#00A3E0]"></div>
            <div className="h-2 w-2 rounded-full bg-[#CE1126]"></div>
            <div className="h-[2px] w-16 bg-[#FDD100]"></div>
          </motion.div>

          {/* Boutons d'accès transactionnels */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 pt-2"
          >
            <button 
              onClick={() => navigate('/packs-micro')} 
              className="w-full sm:w-auto px-8 py-4 bg-[#00A3E0] hover:bg-[#0082B3] text-white rounded-xl font-bold text-sm shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 border-b-4 border-[#006180]"
            >
              <FaShieldAlt /> Découvrir nos Packs
            </button>
            <button 
              onClick={() => navigate('/simulateur')} 
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/60 hover:bg-slate-800 text-white border border-slate-700 rounded-xl font-bold text-sm backdrop-blur-sm transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaCreditCard className="text-[#FDD100]" /> Simuler un Tarif
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= 2. SECTION COMMERCIALE ================= */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 space-y-4"
        >
          <span className="text-xs font-black uppercase text-[#00A3E0] tracking-wider bg-[#00A3E0]/10 px-3 py-1 rounded-md">
            Inclusion Financière
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Bien plus qu'un simple assureur : un écosystème traçable
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            DRC Assurances résout définitivement le défi de l'utilisation des transferts de fonds de la diaspora en garantissant que chaque dollar versé est directement converti en soins médicaux ou en garanties de scolarité pour vos bénéficiaires.
          </p>
        </motion.div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
            <div className="p-3 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl inline-block">
              <FaUserCheck size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Zéro avance de frais (Tiers-Payant)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Vos proches présentent simplement leur QR code reçu par WhatsApp dans nos cliniques, hôpitaux et pharmacies partenaires pour être pris en charge immédiatement sans rien débourser.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
            <div className="p-3 bg-green-500/10 text-green-500 rounded-xl inline-block">
              <FaHandHoldingHeart size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Transparence & Notification WhatsApp</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Dès que vous validez un paiement de prime sécurisé depuis l'étranger, une alerte automatisée et une carte virtuelle d'assuré ARCA sont envoyées instantanément sur le téléphone du bénéficiaire en RDC.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. SECTION RÉASSURANCE ================= */}
      <section className="bg-gradient-to-br from-[#0C1E36] via-[#11294A] to-[#0C1E36] text-white py-16 px-6 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-4xl font-black text-[#00A3E0] font-mono">98%</div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Sinistres validés et payés</p>
            <p className="text-[11px] text-slate-500 px-4">Règlement direct aux établissements de soins sous 7 jours</p>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-[#FDD100] font-mono">+50</div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Hôpitaux & Cliniques</p>
            <p className="text-[11px] text-slate-500 px-4">Un réseau médical d'excellence agréé à Kinshasa et Lubumbashi</p>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-emerald-400 font-mono">100%</div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Digitalisé & Instantané</p>
            <p className="text-[11px] text-slate-500 px-4">Cartes numériques d'assurés et alertes de solde en temps réel</p>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-red-500 font-mono">ARCA</div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Conformité Légale</p>
            <p className="text-[11px] text-slate-500 px-4">Contrats régulés par le Code des Assurances national de la RDC</p>
          </div>
        </div>
      </section>

      {/* ================= 4. SECTION FOIRE AUX QUESTIONS ================= */}
      <FAQSection />

      {/* ================= 5. BANNIÈRE CTA DE CONVERSION FINALE ================= */}
      <section className="max-w-7xl w-full mx-auto px-6 pb-20">
    <div className="bg-gradient-to-br from-[#0C1E36] to-[#11294A] text-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden border-b-4 border-[#00A3E0]">
      <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none">
        <FaShieldAlt size={200} />  
        </div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-black mb-2 relative z-10">Prêt à sécuriser vos proches en RDC ?</h3> 
          <p className="text-slate-300 mb-4 italic text-sm md:text-base relative z-10">Souscrivez une micro-assurance santé, auto ou scolaire depuis l'étranger et bénéficiez d'une prise en charge immédiate pour vos proches restés au pays.</p>    
            <button 
              onClick={() => navigate('/packs-micro')} 
              className="px-8 py-4 bg-[#00A3E0] hover:bg-[#0082B3] text-white rounded-xl font-bold text-sm shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 border-b-4 border-[#006180]"   
            >
              <FaShieldAlt /> Découvrir nos Packs
            </button>
        </div>
      </div>
    </div>
  </section>
  <Footer />
    </div>
  );
}
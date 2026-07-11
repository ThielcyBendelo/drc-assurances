import React, { useState, useEffect } from 'react'; // 🟢 AJOUTÉ POUR CORRIGER L'ERREUR RUNTIME
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import RippleGrid from '../components/ui/RippleGrid';
import { 
  FaShieldAlt, 
  FaGlobeAfrica, 
  FaCreditCard, 
  FaUserCheck, 
  FaHandHoldingHeart, 
  FaCheckCircle, 
  FaArrowRight, 
  FaImages, 
  FaCamera, 
  FaHeartbeat
} from 'react-icons/fa';

// Importation native de vos deux arrière-plans professionnels depuis votre dossier assets
import background1 from '../assets/background1.png';
import background2 from '../assets/background2.png'; 
// import imgTiersPayant from '../assets/tiers-payant.jpg'; 
// import imgWhatsapp from '../assets/whatsapp-notification.jpg';


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

     // Variantes pour l'apparition séquentielle du texte
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  // Variantes d'animation au survol pour les cartes
  const cardHoverVariants = {
    rest: { y: 0, scale: 1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)" },
    hover: { 
      y: -10, 
      scale: 1.02,
      boxShadow: "0px 25px 50px rgba(0, 163, 224, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  // Zoom fluide sur l'image lors du survol de la carte
  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.15, rotate: 5, transition: { duration: 0.2 } }
  };

    // 1. Configuration des variantes d'animation pour l'apparition au défilement
  const textContainerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.15, 
        delayChildren: 0.1 
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } 
    }
  };
  
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col antialiased font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* En-tête de navigation sécurisé */}
      <NavbarSecured />
{/* ================= 1. SECTION HERO FINTECH PREMIUM (POLICES CORRIGÉES) ================= */}
<section className="w-full bg-slate-50 dark:bg-slate-950 font-roboto text-slate-900 dark:text-white select-none">
  {/* La grille interactive s'affiche ici, en arrière-plan de la section Hero */}
        <RippleGrid />
 
  <div className="max-w-6xl mx-auto px-4 pt-28 pb-16 flex flex-col items-center gap-12">
    
    {/* --- BLOC SUPÉRIEUR : BANNIÈRE D'ARRIÈRE-PLAN CADRÉE & RÉDUITE --- */}
    <div className="relative w-full h-[320px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-200 dark:bg-slate-900">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-100 transition-all duration-1000 ease-in-out opacity-90"
        style={{ 
          backgroundImage: `url(${backgrounds[bgIndex]})`,
          transitionProperty: 'background-image'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
    </div>

    {/* --- BLOC INFÉRIEUR : CONTENU TYPOGRAPHIQUE HAUT DE GAMME --- */}
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl text-center flex flex-col items-center space-y-6 md:space-y-8"
    >
      {/* Badge officiel de confiance */}
      <motion.span 
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
        }}
        className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 text-[#007cb0] dark:text-[#00A3E0] text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-800 inline-flex items-center gap-2 shadow-sm font-roboto"
      >
        <FaGlobeAfrica className="animate-spin-slow text-[#FDD100]" /> 
        <span>Écosystème Numérique Agréé ARCA</span>
      </motion.span>

      {/* Titre principal - Style Impact & FinTech (Saira) */}
      <motion.h1 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
        }}
        className="font-saira text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white"
      >
        Protégez votre famille en <br />
        <span className="bg-gradient-to-r from-[#CE1126] via-[#00A3E0] to-[#E5B200] dark:to-[#FDD100] text-transparent bg-clip-text">
          RD Congo depuis l'Étranger
        </span>
      </motion.h1>

      {/* Séparateur subtil aux couleurs nationales */}
      <motion.div 
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.5, ease: "circOut" } }
        }} 
        className="flex justify-center items-center gap-2.5"
      >
        <div className="h-[3px] w-12 bg-[#00A3E0] rounded-full"></div>
        <div className="h-2 w-2 rounded-full bg-[#CE1126]"></div>
        <div className="h-[3px] w-12 bg-[#FDD100] rounded-full"></div>
      </motion.div>

      {/* Description claire - Style Institutionnel Fluide (Roboto) */}
      <motion.p 
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
        }}
        className="font-roboto text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base md:text-lg font-normal leading-relaxed tracking-wide antialiased"
      >
        Bâtissez un pont de confiance durable. Plus besoin d'envoyer des fonds en urgence par agence de transfert : souscrivez une micro-assurance santé, auto ou scolaire pour vos proches restés au pays avec prise en charge directe et instantanée.
      </motion.p>

      {/* Zone des Boutons d'Action */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } }
        }}
        className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center pt-4"
      >
        {/* CTA Principal */}
        <motion.button 
          whileHover={{ y: -3, scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 12 } }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate('/packs-micro')} 
          className="font-roboto w-full sm:w-64 h-14 bg-[#00A3E0] hover:bg-[#008cc2] text-white rounded-xl font-semibold text-base shadow-lg shadow-[#00A3E0]/20 hover:shadow-[#00A3E0]/30 transition-all duration-200 flex items-center justify-center gap-3 border-b-4 border-[#006a94] group cursor-pointer"
        >
          <FaShieldAlt className="group-hover:scale-110 transition-transform duration-200 text-[#FDD100]" /> 
          <span>Découvrir nos Packs</span>
          <FaArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </motion.button>

        {/* CTA Secondaire */}
        <motion.button 
          whileHover={{ y: -3, scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 12 } }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate('/simulateur')} 
          className="font-roboto w-full sm:w-64 h-14 bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-base shadow-sm hover:border-[#00A3E0] dark:hover:border-slate-700 transition-all duration-200 flex items-center justify-center gap-3 group cursor-pointer"
        >
          <FaCreditCard className="text-[#00A3E0]" /> 
          <span>Simuler un Tarif</span>
        </motion.button>
      </motion.div>

    </motion.div>

  </div>
</section>


   {/* ================= 2. SECTION COMMERCIALE ================= */}
<section className="py-24 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-center border-t border-b border-slate-200/60 font-sans overflow-hidden">
  
  {/* Colonne de gauche : Textes de présentation (Agrandis) */}
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
    }}
    className="lg:col-span-1 space-y-6"
  >
    <motion.span 
      variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
      className="inline-block text-xs font-black uppercase text-[#00A3E0] tracking-widest bg-[#00A3E0]/10 px-4 py-2 rounded-full border border-[#00A3E0]/20"
    >
      Inclusion Financière
    </motion.span>
    
    <motion.h2 
      variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
      className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
    >
      Bien plus qu'un simple assureur : un écosystème traçable
    </motion.h2>
    
    <motion.p 
      variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
      className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium"
    >
      DRC Assurances résout définitivement le défi de l'utilisation des transferts de fonds de la diaspora en garantissant que chaque dollar versé est directement converti en soins médicaux ou en garanties de scolarité pour vos bénéficiaires.
    </motion.p>
  </motion.div>

  {/* Colonne de droite : Cartes interactives avec chemins d'images directs */}
  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
    
    {/* Carte 1 : Tiers-Payant */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      variants={{
        rest: { y: 0, scale: 1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)" },
        hover: { y: -10, scale: 1.02, boxShadow: "0px 25px 50px rgba(0, 163, 224, 0.1)" }
      }}
      className="relative group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 cursor-pointer overflow-hidden transition-colors duration-300 hover:border-[#00A3E0]/30 dark:hover:border-[#00A3E0]/30"
    >
      <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
        <motion.img 
          variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src="/background1.png" 
          alt="Zéro avance de frais" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
      </div>

      <div className="p-8 space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A3E0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <motion.div 
          variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.15, rotate: 5 } }}
          className="p-3.5 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl inline-block shadow-inner relative z-10"
        >
          <FaUserCheck size={24} />
        </motion.div>
        
        <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight group-hover:text-[#00A3E0] transition-colors duration-300 relative z-10">
          Zéro avance de frais (Tiers-Payant)
        </h4>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium relative z-10">
          Vos proches présentent simplement leur QR code reçu par WhatsApp dans nos cliniques, hôpitaux et pharmacies partenaires pour être pris en charge immédiatement sans rien débourser.
        </p>
      </div>
    </motion.div>

    {/* Carte 2 : Transparence WhatsApp */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      variants={{
        rest: { y: 0, scale: 1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)" },
        hover: { y: -10, scale: 1.02, boxShadow: "0px 25px 50px rgba(0, 163, 224, 0.1)" }
      }}
      className="relative group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 cursor-pointer overflow-hidden transition-colors duration-300 hover:border-green-500/30 dark:hover:border-green-500/30"
    >
      <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
        <motion.img 
          variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src="/background2.png" 
          alt="Transparence & Notification WhatsApp" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
      </div>

      <div className="p-8 space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <motion.div 
          variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.15, rotate: 5 } }}
          className="p-3.5 bg-green-500/10 text-green-500 rounded-xl inline-block shadow-inner relative z-10"
        >
          <FaHandHoldingHeart size={24} />
        </motion.div>
        
        <h4 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight group-hover:text-green-500 transition-colors duration-300 relative z-10">
          Transparence & Notification WhatsApp
        </h4>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium relative z-10">
          Dès que vous validez un paiement de prime sécurisé depuis l'étranger, une alerte automatisée et une carte virtuelle d'assuré ARCA sont envoyées instantanément sur le téléphone du bénéficiaire en RDC.
        </p>
      </div>
    </motion.div>

  </div>
</section>

        {/* ================= 3. SECTION NOUVEL ALBUM & TERRAIN (PRO OPTIMISÉE) ================= */}
    <section className="py-24 bg-slate-100 dark:bg-slate-900/40 border-t border-b border-slate-200/60 dark:border-slate-800/50 font-sans overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Colonne de gauche : Textes de présentation animés (5 colonnes sur 12) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textContainerVariants}
          className="lg:col-span-5 space-y-6"
        >
          {/* Badge de sur-titre */}
          <motion.div variants={textItemVariants}>
            <span className="inline-block text-xs font-black uppercase text-[#007cb0] dark:text-[#00A3E0] tracking-widest bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              DRC Assurances sur le terrain
            </span>
          </motion.div>
          
          {/* Titre principal de la section adapté en rouge au mode clair */}
          <motion.h2 
            variants={textItemVariants}
            className="text-3xl md:text-4xl font-black text-red-600 dark:text-white leading-tight"
          >
            Notre impact en images : transparence & proximité
          </motion.h2>
          
          {/* Paragraphe descriptif */}
          <motion.p 
            variants={textItemVariants}
            className="text-base text-slate-700 dark:text-slate-400 leading-relaxed font-bold"
          >
            Parce que la confiance se construit par des preuves concrètes, nous documentons nos déploiements en République Démocratique du Congo. Découvrez nos infrastructures médicales partenaires, nos équipes locales et nos actions d'inclusion financière au cœur des communautés.
          </motion.p>
          
          {/* Liste de puces thématiques (Points clés) */}
          <motion.div variants={textItemVariants} className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm font-black text-slate-800 dark:text-slate-300">
              <div className="p-1.5 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl">
                <FaHeartbeat size={14} className="text-[#CE1126]" />
              </div>
              <span>Centres de santé et cliniques agréées ARCA</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm font-black text-slate-800 dark:text-slate-300">
              <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
                <FaCamera size={14} />
              </div>
              <span>Reportages lors des remises de cartes virtuelles</span>
            </div>
          </motion.div>

          {/* Bouton d'action interactif redirigeant vers la galerie */}
          <motion.div variants={textItemVariants} className="pt-4">
            <Link 
              to="/galerie" 
              className="inline-flex items-center gap-3 bg-[#00A3E0] hover:bg-[#008cc2] text-white font-black text-sm px-7 py-4 rounded-xl shadow-lg shadow-[#00A3E0]/20 hover:shadow-[#00A3E0]/40 transition-all duration-200 border-b-4 border-[#006a94] group cursor-pointer"
            >
              <FaImages size={16} className="group-hover:rotate-6 text-[#FDD100] transition-transform duration-200" />
              <span>Voir l'album photo</span>
              <FaArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Colonne de droite : Carte d'aperçu d'image connectée directement aux assets (7 colonnes sur 12) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageContainerVariants}
          className="lg:col-span-7 relative"
        >
          {/* Éléments décoratifs en arrière-plan */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FDD100]/10 rounded-3xl -z-10 blur-sm" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00A3E0]/5 rounded-full -z-10 blur-md" />

          {/* Bloc image principal avec intégration de votre asset local */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl group cursor-pointer">
            <div className="h-[380px] w-full bg-slate-100 dark:bg-slate-800">
              <img 
                src={background2} 
                alt="Aperçu de la galerie DRC Assurances" 
                className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-700 ease-out" 
              />
            </div>
            
            {/* Calque de dégradé avec effet Glassmorphism localisé au texte pour une lisibilité totale sans masquer le haut du background */}
            <div className="absolute left-6 right-6 bottom-6 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md p-6 rounded-2xl border border-white/40 dark:border-slate-800/40 shadow-xl">
              <span className="text-[#E5B200] dark:text-[#FDD100] text-xs font-black uppercase tracking-wider mb-1 block">
                Galerie Média
              </span>
              <h4 className="text-slate-900 dark:text-white text-lg font-black tracking-tight">
                Immersion au cœur de nos projets en RDC
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-xs mt-1.5 font-bold leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-200">
                Découvrez en toute transparence la réalité de nos prestations de terrain et notre réseau interconnecté agréé ARCA.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>


      {/* ================= 4. SECTION FOIRE AUX QUESTIONS ================= */}
      <FAQSection />

       {/* ================= 5. BANNIÈRE CTA DE CONVERSION FINALE (PRO OPTIMISÉE) ================= */}
  <section className="max-w-7xl w-full mx-auto px-6 pb-20 select-none font-sans">
    <div className="bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 dark:border-slate-800/40 shadow-2xl relative overflow-hidden flex flex-col items-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      
      {/* Élément de décoration d'arrière-plan discret */}
      <div className="absolute -right-10 -bottom-10 opacity-5 text-slate-400 dark:text-white pointer-events-none">
        <FaShieldAlt size={220} />  
      </div>
      
      {/* Contenu de la bannière réorganisé en structure flex adaptative */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
        
        {/* Zone textuelle hautement lisible et contrastée */}
        <div className="space-y-3 text-center lg:text-left max-w-3xl">
          <h3 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Prêt à sécuriser vos proches en RDC ?
          </h3> 
          <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base font-bold leading-relaxed">
            Souscrivez une micro-assurance santé, auto ou scolaire depuis l'étranger et bénéficiez d'une prise en charge immédiate pour vos proches restés au pays.
          </p>    
        </div>

        {/* Zone du bouton d'action principal avec micro-interaction Spring synchrone */}
        <div className="shrink-0 w-full lg:w-auto flex justify-center">
          <motion.button 
            whileHover={{ y: -4, scale: 1.015, transition: { type: "spring", stiffness: 400, damping: 10 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/packs-micro')} 
            className="w-full sm:w-72 lg:w-auto px-8 h-14 bg-[#00A3E0] dark:bg-[#FDD100] text-white dark:text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#00A3E0]/15 dark:shadow-[#FDD100]/5 flex items-center justify-center gap-3 border-b-4 border-[#006a94] dark:border-[#cda900] cursor-pointer"   
          >
            <FaShieldAlt className="text-[#FDD100] dark:text-slate-950 text-sm" /> 
            <span>Découvrir nos Packs</span>
          </motion.button>
        </div>

      </div>
    </div>
  </section>

  <Footer />
    </div>
  );
}
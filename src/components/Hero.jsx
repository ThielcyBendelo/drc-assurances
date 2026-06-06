import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Hooks & Services
import useParallax from '../hooks/useParallax';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

// Composants & Assets
import LazyImage from './LazyImage';
import AnimatedSection from './AnimatedSection';
import { profileImage } from '../assets/assets.js';

// Icônes
import { FaUtensils, FaBirthdayCake, FaTruck, FaAward, FaHeart, FaStar, FaQuoteLeft, FaShoppingBag, FaGraduationCap } from 'react-icons/fa';

export default function Hero() {
  const scrollY = useParallax();
  const [elementRef] = useIntersectionObserver();
  const navigate = useNavigate();

  const backgrounds = [
    '/background1.png',
    '/background2.png',
    '/background3.png',
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  return (
    <div className="bg-stone-50">
      {/* ================= SECTION HERO ================= */}
      <section ref={elementRef} id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center px-10 pt-24 overflow-hidden" >
        
        {/* Background Slider */}
        <div className="absolute inset-0 w-full h-full transition-all duration-1000" style={{ backgroundImage: `url(${backgrounds[bgIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35)', transform: `translateY(${scrollY * 0.5}px)`, }} />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/40 via-transparent to-stone-50 z-10" />

        {/* Éclats Animés */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div 
              key={i} 
              className={`absolute w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-amber-400' : 'bg-orange-400'}`} 
              animate={{ y: [0, -120], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0] }} 
              transition={{ duration: Math.random() * 6 + 4, repeat: Infinity, delay: Math.random() * 2 }} 
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} 
            />
          ))}
        </div>

        <div className="relative z-20 max-w-5xl">
          {/* Logo Signature */}
          <AnimatedSection variant="scaleIn" delay={0.2}>
            <div className="mb-6 flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <LazyImage 
                  src={profileImage} 
                  alt="M-DELICE Maison de Pâtisserie" 
                  className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border-4 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)] relative z-10" 
                />
                <motion.div 
                  className="absolute inset-[-10px] rounded-full border-2 border-orange-400/40 border-t-transparent" 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} 
                />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Titres & Slogan */}
          <AnimatedSection variant="slideUp" delay={0.4}>
            <div className="mb-10 text-center px-2">
              <div className="flex justify-center mb-6">
                <span className="px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs md:text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                  Haute Pâtisserie • Cake Design • Abidjan
                </span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-white via-amber-100 to-orange-400 text-transparent bg-clip-text font-serif">
                  M-DELICE
                </span>
              </h1>

              <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-xl md:text-3xl text-stone-50 font-light italic leading-tight">
                  "L'art de la haute gourmandise et des créations <span className="text-amber-400 font-semibold not-italic">sur mesure</span> pour sublimer vos moments."
                </p>
                
                <div className="flex justify-center items-center gap-4 my-6">
                  <div className="h-[1px] w-12 bg-amber-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <div className="h-[1px] w-12 bg-amber-500/50"></div>
                </div>
                
                <p className="text-sm md:text-base text-amber-500/50 uppercase tracking-widest font-medium">
                  Atelier d'Exception : <span className="text-white">Côte d'Ivoire</span>
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Boutons */}
          <AnimatedSection variant="slideUp" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button 
                onClick={() => navigate('/services')} 
                className="px-6 py-4 pt-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaShoppingBag /> Découvrir la carte
              </button>
              <button 
                onClick={() => navigate('/work')} 
                className="px-6 py-2 pt-4 bg-transparent text-amber-500  border-2 border-amber-400/80 rounded-full font-bold shadow-lg hover:bg-white/10 transition-all transform hover:scale-105"
              >
                Commander un gâteau
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

     {/* ================= SECTION CHIFFRES CLÉS ET STATISTIQUES AVANCÉES ================= */}
<section className="py-20 bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 text-stone-100 relative overflow-hidden">
  
  {/* Effets de lumière en arrière-plan (Glow statistique) */}
  <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
  <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* GRAPHIC 1 : Jauge semi-circulaire d'atteinte d'objectifs (Événements) */}
      <div className="bg-stone-900/40 backdrop-blur-md border border-amber-500/10 rounded-[32px] p-6 flex flex-col items-center justify-between shadow-xl transition-all duration-300 hover:border-amber-500/30 group">
        <div className="relative flex items-center justify-center w-28 h-28 mb-4">
          {/* Cercle SVG de progression de données */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#292524" strokeWidth="8" fill="transparent" />
            <motion.circle 
              cx="50" cy="50" r="40" stroke="#f59e0b" strokeWidth="8" fill="transparent" 
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              whileInView={{ strokeDashoffset: 251.2 - (251.2 * 0.85) }} // Simule 85% de progression visuelle
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute text-amber-400 group-hover:scale-110 transition-transform duration-300">
            <FaAward size={28} />
          </div>
        </div>
        <div className="text-center w-full">
          <span className="text-3xl md:text-4xl font-white block tracking-tight text-white mb-1">+500</span>
          <span className="text-[11px] uppercase tracking-widest text-amber-400/80 font-bold block mb-3">Événements Réussis</span>
          <div className="bg-stone-800/80 rounded-full px-3 py-1 text-[10px] text-stone-400 font-semibold inline-block">
            Objectif annuel : 85% atteint
          </div>
        </div>
      </div>

      {/* GRAPHIC 2 : Graphique à Barres de distribution volumétrique (Cake Designs) */}
      <div className="bg-stone-900/40 backdrop-blur-md border border-amber-500/10 rounded-[32px] p-6 flex flex-col items-center justify-between shadow-xl transition-all duration-300 hover:border-amber-500/30 group">
        <div className="flex items-end justify-center gap-2 w-28 h-28 mb-4 px-2">
          {/* Barres d'analyses professionnelles simulées */}
          <motion.div initial={{ height: 0 }} whileInView={{ height: "40%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }} className="w-3 bg-stone-800 rounded-t-sm" />
          <motion.div initial={{ height: 0 }} whileInView={{ height: "70%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="w-3 bg-amber-600/50 rounded-t-sm" />
          <motion.div initial={{ height: 0 }} whileInView={{ height: "95%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="w-3 bg-orange-500 rounded-t-sm" />
          <div className="absolute text-amber-400 group-hover:scale-110 transition-transform duration-300 -translate-y-4">
            <FaBirthdayCake size={26} />
          </div>
        </div>
        <div className="text-center w-full">
          <span className="text-3xl md:text-4xl font-white block tracking-tight text-white mb-1">+150</span>
          <span className="text-[11px] uppercase tracking-widest text-amber-400/80 font-bold block mb-3">Cake Designs Uniques</span>
          <div className="bg-stone-800/80 rounded-full px-3 py-1 text-[10px] text-stone-400 font-semibold inline-block">
            Croissance mensuelle : +12%
          </div>
        </div>
      </div>

      {/* GRAPHIC 3 : Anneau de charge pleine à 100% (Fait maison) */}
      <div className="bg-stone-900/40 backdrop-blur-md border border-amber-500/10 rounded-[32px] p-6 flex flex-col items-center justify-between shadow-xl transition-all duration-300 hover:border-amber-500/30 group">
        <div className="relative flex items-center justify-center w-28 h-28 mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#292524" strokeWidth="8" fill="transparent" />
            <motion.circle 
              cx="50" cy="50" r="40" stroke="#ea580c" strokeWidth="8" fill="transparent" 
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              whileInView={{ strokeDashoffset: 0 }} // 0 indique que l'anneau est complété à 100%
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute text-orange-500 group-hover:scale-110 transition-transform duration-300">
            <FaHeart size={26} />
          </div>
        </div>
        <div className="text-center w-full">
          <span className="text-3xl md:text-4xl font-white block tracking-tight text-white mb-1">100%</span>
          <span className="text-[11px] uppercase tracking-widest text-amber-400/70 font-bold block mb-3">Fait Maison & Amour</span>
          <div className="bg-stone-800/80 rounded-full px-3 py-1 text-[10px] text-stone-400 font-semibold inline-block">
            Contrôle qualité certifié
          </div>
        </div>
      </div>

      {/* GRAPHIC 4 : Indicateur linéaire de taux de satisfaction (Avis) */}
      <div className="bg-stone-900/40 backdrop-blur-md border border-amber-500/10 rounded-[32px] p-6 flex flex-col items-center justify-between shadow-xl transition-all duration-300 hover:border-amber-500/30 group">
        <div className="relative flex flex-col items-center justify-center w-full h-28 mb-4 px-4">
          <div className="text-amber-400 mb-3 group-hover:rotate-12 transition-transform duration-300">
            <FaStar size={32} />
          </div>
          {/* Jauge de progression horizontale pro */}
          <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }} 
              whileInView={{ width: "98%" }} // Taux proportionnel à la note de 4.9/5
              viewport={{ once: true }} 
              transition={{ duration: 1.5, ease: "easeOut" }} 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            />
          </div>
        </div>
        <div className="text-center w-full">
          <span className="text-3xl md:text-4xl font-white block tracking-tight text-white mb-1">4.9/5</span>
          <span className="text-[11px] uppercase tracking-widest text-amber-400/80 font-bold block mb-3">Avis Gourmands</span>
          <div className="bg-stone-800/80 rounded-full px-3 py-1 text-[10px] text-stone-400 font-semibold inline-block">
            Basé sur +1 200 avis vérifiés
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* ================= SECTION UNIVERS / SAVOIR-FAIRE ENRICHI ================= */}
<section className="py-24 bg-white dark:bg-stone-950 transition-colors duration-500">
  <div className="max-w-7xl mx-auto px-6 text-center">
    
    <AnimatedSection variant="slideUp">
      <span className="text-orange-500 font-black uppercase tracking-[0.25em] text-xs block mb-3">
        L'excellence au cœur d'Abidjan
      </span>
      <h2 className="text-4xl md:text-5xl font-black text-amber-950 font-serif mb-4">
        Notre Savoir-Faire
      </h2>
      <p className="text-stone-500 mb-16 max-w-2xl mx-auto">
        Chaque création est une œuvre d'art unique pensée pour émerveiller vos papilles et vos yeux.
      </p> 
    </AnimatedSection>

    {/* Grille adaptative mise à jour de 3 à 4 colonnes professionnelles */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* PÔLE 1 : Pâtisserie fine */}
      <div className="group p-8 rounded-[40px] bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-xl hover:shadow-amber-500/5 transition-all duration-500 hover:-translate-y-3 relative overflow-hidden flex flex-col justify-between text-left">
        <div className="absolute top-0 right-0 p-6 text-amber-900/5 group-hover:text-amber-900/10 pointer-events-none"><FaUtensils size={120} /></div>
        <div className="relative z-10">
          <div className="w-14 h-14 bg-amber-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-600/20">
            <FaUtensils size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-amber-950 font-serif">Pâtisserie Fine</h3>
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
            Entremets modernes, tartes destructurées et macarons craquants confectionnés avec des matières premières nobles.
          </p>
        </div>
        <div className="border-t border-stone-200/60 dark:border-stone-800/80 pt-4 mt-4 relative z-10 text-[11px] font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider">
          Matières premières AOP • Fraîcheur
        </div>
      </div>

      {/* PÔLE 2 : Cake Design */}
      <div className="group p-8 rounded-[40px] bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-xl hover:shadow-orange-500/5 transition-all duration-500 hover:-translate-y-3 relative overflow-hidden flex flex-col justify-between text-left">
        <div className="absolute top-0 right-0 p-6 text-orange-900/5 group-hover:text-orange-900/10 pointer-events-none"><FaBirthdayCake size={120} /></div>
        <div className="relative z-10">
          <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
            <FaBirthdayCake size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-amber-950 font-serif">Cake Design</h3>
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
            Gâteaux sculptés et personnalisés pour tous vos événements, réalisés avec une précision artistique et un goût exquis.
          </p>
        </div>
        <div className="border-t border-stone-200/60 dark:border-stone-800/80 pt-4 mt-4 relative z-10 text-[11px] font-black text-orange-500 uppercase tracking-wider">
          Sur Devis • Pièces Personnalisées
        </div>
      </div>

      {/* PÔLE 3 : NOUVEAUTÉ - Traiteur Sucré Corporate (Utile pour le B2B à Abidjan) */}
      <div className="group p-8 rounded-[40px] bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-xl hover:shadow-amber-950/5 transition-all duration-500 hover:-translate-y-3 relative overflow-hidden flex flex-col justify-between text-left">
        <div className="absolute top-0 right-0 p-6 text-stone-900/5 group-hover:text-amber-900/10 pointer-events-none"><FaTruck size={120} /></div>
        <div className="relative z-10">
          <div className="w-14 h-14 bg-amber-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-900/20">
            <FaTruck size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-amber-950 font-serif">Buffets & Cocktails</h3>
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
            Mignardises de prestige et box de mini-viennoiseries adaptées pour vos lancements, réunions et réceptions d'affaires.
          </p>
        </div>
        <div className="border-t border-stone-200/60 dark:border-stone-800/80 pt-4 mt-4 relative z-10 text-[11px] font-black text-amber-900 dark:text-amber-500 uppercase tracking-wider">
          Formules Entreprises • Logistique
        </div>
      </div>

      {/* PÔLE 4 : NOUVEAUTÉ - Ateliers & Masterclass (En lien avec la M-DELICE Academy) */}
      <div className="group p-8 rounded-[40px] bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-xl hover:shadow-stone-700/5 transition-all duration-500 hover:-translate-y-3 relative overflow-hidden flex flex-col justify-between text-left">
        <div className="absolute top-0 right-0 p-6 text-stone-900/5 group-hover:text-stone-700/10 pointer-events-none"><FaGraduationCap size={120} /></div>
        <div className="relative z-10">
          <div className="w-14 h-14 bg-stone-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-stone-800/20">
            <FaGraduationCap size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-amber-950 font-serif">Masterclass & Ateliers</h3>
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
            Découvrez l'art du pochage, du montage et des glaçages miroir lors de sessions de formation exclusives collectives ou privées.
          </p>
        </div>
        <div className="border-t border-stone-200/60 dark:border-stone-800/80 pt-4 mt-4 relative z-10 text-[11px] font-black text-stone-600 dark:text-stone-400 uppercase tracking-wider">
          M-DELICE Academy • Certificat
        </div>
      </div>

    </div>
  </div>
</section>
    </div>
  );
}
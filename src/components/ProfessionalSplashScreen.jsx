import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logoImages } from '../assets/assets.js';
import { FaShieldAlt } from 'react-icons/fa';

export default function ProfessionalSplashScreen({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minute de maintien fixe de l'écran d'accueil avant la clôture fluide (3.4 secondes au total)
    const splashTimeout = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 850);
    }, 2550);

    return () => clearTimeout(splashTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          key="splash" 
          initial={{ opacity: 1 }} 
          exit={{ opacity: 0, scale: 1.015 }} 
          transition={{ duration: 0.7, ease: "easeInOut" }} 
          className="fixed inset-0 z-[9999] flex flex-col justify-center bg-slate-950 overflow-hidden py-16 px-10 select-none font-sans"
        >
          {/* Background décoratif : Filigrane de bouclier de sécurité discret et fixe */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none flex items-center justify-center">
            <FaShieldAlt className="text-[550px] text-white rotate-[-12deg]" />
          </div>

          {/* ZONE CENTRALE : LOGO TOTALEMENT FIXED ET VISIBLE À 100% (SEUL ÉLÉMENT VISUEL) */}
          <div className="flex flex-col items-center justify-center">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.5, ease: "easeOut" }} 
              className="relative w-36 h-36 md:w-40 md:h-40 bg-white/5 rounded-full border border-white/10 shadow-2xl backdrop-blur-xs flex items-center justify-center"
            >
              {/* Onde de détection radar discrète */}
              <div className="absolute inset-0 rounded-full bg-[#00A3E0]/5 animate-ping opacity-60"></div>
              
              <img 
                src={logoImages} 
                alt="DRC Assurances Écosystème Numérique" 
                className="w-full h-full object-contain p-2 rounded-full relative z-10" 
              />
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

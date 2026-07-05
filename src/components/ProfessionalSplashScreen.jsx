import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logoImages } from '../assets/assets.js';
import { FaShieldAlt } from 'react-icons/fa';

export default function ProfessionalSplashScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Étapes d'initialisation thématisées pour l'infrastructure d'assurance
  const loadingSteps = useMemo(
    () => [
      { label: 'Initialisation des protocoles de cryptage CSP...', duration: 700 },
      { label: 'Établissement du pont sécurisé Diaspora-RDC...', duration: 900 },
      { label: 'Synchronisation avec le registre réglementaire ARCA...', duration: 600 },
      { label: 'Interconnexion des passerelles Stripe & CinetPay...', duration: 700 },
      { label: 'Chargement des serveurs de bases de données SQL...', duration: 500 },
    ],
    []
  );

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];
      
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const stepTarget = (currentStep + 1) * (100 / loadingSteps.length);
          const nextVal = prev + 1;
          return nextVal > stepTarget ? stepTarget : nextVal;
        });
      }, step.duration / 20);

      stepTimeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, step.duration);
    } else {
      // Clôture propre et fluide de l'écran d'accueil
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => onComplete && onComplete(), 850);
      }, 450);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, onComplete, loadingSteps]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          key="splash" 
          initial={{ opacity: 1 }} 
          exit={{ opacity: 0, scale: 1.02 }} 
          transition={{ duration: 0.7, ease: "easeInOut" }} 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 overflow-hidden"
        >
          {/* Background décoratif : Filigrane de bouclier de sécurité discret */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
            <FaShieldAlt className="text-[550px] text-white rotate-[-12deg]" />
          </div>

          <div className="relative z-10 w-full max-w-md px-10 text-center">
            
            {/* Logo d'Assurance Animé */}
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.6 }} 
              className="mb-12"
            >
              <div className="relative inline-block">
                {/* Cercle rotatif Bleu Ciel national */}
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                  className="absolute -inset-4 border border-[#00A3E0]/20 rounded-full" 
                />
                <img 
                  src={logoImages} 
                  alt="DRC Assurances Écosystème Numérique" 
                  className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-[#00A3E0] shadow-2xl relative z-10" 
                />
              </div>
              
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00A3E0] to-[#FDD100] font-serif font-black text-3xl mt-6 tracking-wide uppercase">
                DRC Assurances
              </h2>
              {/* Ligne rouge du drapeau */}
              <div className="h-0.5 w-16 bg-[#CE1126] mx-auto mt-2 rounded-full" />
            </motion.div>

            {/* Barre de progression et indications de chargement */}
            <div className="space-y-4">
              <div className="h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  {currentStep < loadingSteps.length && (
                    <motion.p 
                      key={currentStep} 
                      initial={{ y: 12, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      exit={{ y: -12, opacity: 0 }} 
                      className="text-[#00A3E0] dark:text-[#FDD100] text-xs font-bold uppercase tracking-widest font-sans"
                    >
                      {loadingSteps[currentStep].label}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Jauge linéaire fluide aux couleurs nationales */}
              <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/[0.02]">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00A3E0] to-[#FDD100] rounded-full" 
                  animate={{ width: `${progress}%` }} 
                  transition={{ duration: 0.25, ease: "linear" }} 
                />
              </div>
              
              <span className="text-[#FDD100] font-sans text-sm font-black tracking-wider block mt-1">
                {Math.round(progress)}%
              </span>
            </div>

          </div>

          {/* Éclats d'étoiles dorées flottantes */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i} 
                className="absolute w-1 h-1 bg-[#FDD100]/40 rounded-full" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%` 
                }} 
                animate={{ 
                  y: [0, -80], 
                  opacity: [0, 0.6, 0],
                  scale: [0.6, 1.2, 0.4]
                }} 
                transition={{ 
                  duration: 4 + Math.random() * 3, 
                  repeat: Infinity, 
                  delay: Math.random() * 4 
                }} 
              />
            ))}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

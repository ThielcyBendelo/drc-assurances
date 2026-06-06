import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logoImages } from '../assets/assets.js';
import { FaUtensils, FaCookieBite } from 'react-icons/fa';

export default function ProfessionalSplashScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Étapes d'initialisation thématisées pour la haute pâtisserie
  const loadingSteps = useMemo(
    () => [
      { label: 'Préchauffage des fours de l’atelier...', duration: 700 },
      { label: 'Sélection des crus de chocolat d’exception...', duration: 900 },
      { label: 'Émulsion des crèmes et des mousses...', duration: 600 },
      { label: 'Nappage des glaçages miroirs...', duration: 700 },
      { label: 'Dressage final de votre vitrine...', duration: 500 },
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-950 overflow-hidden"
        >
          {/* Background décoratif : Filigrane pâtisserie discret */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <FaCookieBite className="text-[550px] text-white rotate-[-12deg]" />
          </div>

          <div className="relative z-10 w-full max-w-md px-10 text-center">
            
            {/* Logo Animé */}
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.6 }} 
              className="mb-12"
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                  className="absolute -inset-4 border border-amber-400/20 rounded-full" 
                />
                <img 
                  src={logoImages} 
                  alt="M-DELICE Maison de Pâtisserie" 
                  className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-amber-600 shadow-2xl relative z-10" 
                />
              </div>
              
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-serif font-black text-3xl mt-6 tracking-wide">
                M-DELICE
              </h2>
              <div className="h-0.5 w-16 bg-orange-500 mx-auto mt-2 rounded-full" />
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
                      className="text-amber-400 text-xs font-bold uppercase tracking-widest font-sans"
                    >
                      {loadingSteps[currentStep].label}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Jauge linéaire fluide */}
              <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/[0.02]">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 to-orange-400 rounded-full" 
                  animate={{ width: `${progress}%` }} 
                  transition={{ duration: 0.25, ease: "linear" }} 
                />
              </div>
              
              <span className="text-orange-400 font-sans text-sm font-black tracking-wider block mt-1">
                {Math.round(progress)}%
              </span>
            </div>

          </div>

          {/* Éclats de poussière d'or flottants */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i} 
                className="absolute w-1 h-1 bg-amber-400/40 rounded-full" 
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

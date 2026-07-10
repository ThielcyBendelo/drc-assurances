import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import notificationService from '../services/notificationService';
import background2 from '../assets/background2.png';
import { 
  FaCalculator, FaShieldAlt, FaHeartbeat, FaCar, 
  FaGraduationCap, FaUsers, FaArrowRight, FaInfoCircle, FaCheckCircle 
} from 'react-icons/fa';

export default function WorkPage() {
  const navigate = useNavigate();

  // États du simulateur
  const [insuranceType, setInsuranceType] = useState('health'); // 'health', 'auto', 'student'
  const [beneficiariesCount, setBeneficiariesCount] = useState(1);
  const [coverageLevel, setCoverageLevel] = useState('confort'); // 'essentiel', 'confort', 'premium'
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Prix de base et coefficients de calcul (Logique Fintech)
  useEffect(() => {
    let basePrice = 0;
    let multiplier = 1;

    // 1. Prix de base par type d'assurance
    if (insuranceType === 'health') basePrice = 30;
    if (insuranceType === 'auto') basePrice = 20;
    if (insuranceType === 'student') basePrice = 12;

    // 2. Ajustement selon le niveau de couverture
    if (coverageLevel === 'essentiel') multiplier = 0.8;
    if (coverageLevel === 'confort') multiplier = 1.0;
    if (coverageLevel === 'premium') multiplier = 1.4;

    // 3. Calcul final basé sur le nombre de personnes (avec dégressivité de 10% à partir du 2e bénéficiaire)
    let total = 0;
    for (let i = 1; i <= beneficiariesCount; i++) {
      if (i === 1) {
        total += basePrice * multiplier;
      } else {
        total += (basePrice * multiplier) * 0.9; // Remise famille
      }
    }

    setEstimatedPrice(Math.round(total));
  }, [insuranceType, beneficiariesCount, coverageLevel]);

  const handleProceedToPurchase = () => {
    if (notificationService?.success) {
      notificationService.success("Simulation enregistrée !");
    }

    const simulatedPack = {
      id: insuranceType === 'health' ? 1 : insuranceType === 'auto' ? 2 : 3,
      name: `Pack ${insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1)} - ${coverageLevel.toUpperCase()}`,
      price: estimatedPrice,
      coverageLimit: coverageLevel === 'premium' ? "Plafond annuel : 7 500 USD" : "Plafond annuel : 3 500 USD"
    };

    navigate('/inscription-beneficiaire', { state: { selectedPack: simulatedPack } });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

    {/* En-tête de la page Simulateur unifié, premium et animé */}
<header className="relative bg-slate-100 dark:bg-slate-950 px-6 py-24 pt-32 text-center border-b-4 border-[#00A3E0] overflow-hidden font-sans select-none">
  
  {/* 1. L'IMAGE D'ARRIÈRE-PLAN LUMINEUSE ET TOTALEMENT VISIBLE (100% OPACITÉ) */}
  <div className="absolute inset-0 z-0">
    <img 
      src={background2} 
      alt="DRC Assurances Simulateur Background" 
      className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-700"
    />
    {/* ✅ LES OVERLAYS SOMBRES ONT ÉTÉ ENLEVÉS : Dégradé fluide de transition uniquement vers le bas de page */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-slate-100 dark:from-slate-950/10 dark:via-transparent dark:to-slate-950" />
  </div>

  {/* 2. LE MOTIF DE GRILLE EXISTANT (Superposé discrètement) */}
  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] dark:opacity-5 [background-size:24px_24px] pointer-events-none z-1" />

  {/* 3. LE CONTENU CENTRAL EMBALLÉ DANS UN PANNEAU DE VERRE ET ANIMÉ AVEC FRAMER MOTION */}
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
        <FaCalculator className="text-[#CE1126]" /> Outil d'Aide à la Décision
      </span>
    </motion.div>

    {/* Titre avec gestion de la lisibilité et de la couleur en mode clair */}
    <motion.h1 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-red-600 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
    >
      Simulateur de Tarif <br />
      <span className="text-[#E5B200] dark:text-[#FDD100] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">En Ligne</span>
    </motion.h1>

    {/* Description ajustée pour la lisibilité sur fond clair et sombre */}
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="text-slate-700 dark:text-slate-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-bold"
    >
      Calculez instantanément le montant de la prime d'assurance pour votre famille en RDC. Ajustez vos options et obtenez un devis transparent conforme aux grilles de l'ARCA.
    </motion.p>

  </motion.div>
</header>


      {/* Interface de Simulation */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CONTROLES */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6"
          >
            {/* 1. Choix du type de contrat */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-3">1. Choisissez le type de contrat</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setInsuranceType('health')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 font-bold text-xs md:text-sm transition-all ${
                    insuranceType === 'health' ? 'border-[#00A3E0] bg-[#00A3E0]/5 text-[#00A3E0]' : 'border-slate-100 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  <FaHeartbeat size={18} className={insuranceType === 'health' ? 'text-[#CE1126]' : ''} />
                  <span>Santé / Médical</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInsuranceType('auto')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 font-bold text-xs md:text-sm transition-all ${
                    insuranceType === 'auto' ? 'border-[#00A3E0] bg-[#00A3E0]/5 text-[#00A3E0]' : 'border-slate-100 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  <FaCar size={18} className={insuranceType === 'auto' ? 'text-[#FDD100]' : ''} />
                  <span>Auto Obligatoire</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInsuranceType('student')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 font-bold text-xs md:text-sm transition-all ${
                    insuranceType === 'student' ? 'border-[#00A3E0] bg-[#00A3E0]/5 text-[#00A3E0]' : 'border-slate-100 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  <FaGraduationCap size={18} />
                  <span>Scolarité</span>
                </button>
              </div>
            </div>

            {/* 2. Nombre de bénéficiaires */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center justify-between">
                <span>2. Nombre de bénéficiaires en RDC</span>
                <span className="text-[#00A3E0] font-mono text-sm font-bold bg-[#00A3E0]/10 px-2.5 py-0.5 rounded-full">{beneficiariesCount} {beneficiariesCount > 1 ? 'personnes' : 'personne'}</span>
              </label>
              <div className="flex items-center gap-3">
                <FaUsers className="text-slate-400" size={18} />
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={beneficiariesCount}
                  onChange={(e) => setBeneficiariesCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00A3E0]"
                />
              </div>
              {beneficiariesCount > 1 && (
                <p className="text-[10px] text-emerald-500 font-bold mt-1.5">✓ Remise de 10% appliquée automatiquement sur les membres additionnels !</p>
              )}
            </div>

            {/* 3. Niveau de garanties */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-3">3. Niveau de garanties & Plafonds</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['essentiel', 'confort', 'premium'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setCoverageLevel(lvl)}
                    className={`p-3 rounded-xl border text-xs font-bold uppercase tracking-wider text-center transition-all ${
                      coverageLevel === lvl
                        ? 'border-[#00A3E0] bg-[#00A3E0]/10 text-[#00A3E0]'
                        : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* AFFICHAGE DU TARIF */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#0C1E36] to-[#11294A] text-white p-6 rounded-2xl shadow-md border-b-4 border-[#00A3E0] text-center sticky top-24 space-y-6">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#00A3E0] mb-1">Estimation de votre Prime</h3>
              <p className="text-[10px] text-slate-400 italic">Calcul transparent en temps réel</p>
            </div>

            <div className="py-4 bg-slate-900/40 rounded-2xl border border-white/5">
              <span className="text-5xl font-black text-[#FDD100] font-mono">{estimatedPrice} USD</span>
              <span className="block text-xs text-slate-400 mt-1">payable mensuellement</span>
            </div>

            <div className="text-left space-y-2.5 text-xs text-slate-300 border-t border-white/10 pt-4">
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-400" size={12} /> 
                Branche active : <span className="font-bold text-white capitalize">{insuranceType === 'health' ? 'Santé' : insuranceType}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-400" size={12} /> 
                Nombre de bénéficiaires : <span className="font-bold text-white">{beneficiariesCount}</span>
              </p>
              <p className="flex items-center gap-2">   
                <FaCheckCircle className="text-emerald-400" size={12} />
                Niveau de garanties : <span className="font-bold text-white">{coverageLevel}</span>
              </p>
            </div>

          </div>
            <button
              type="button"
              className="w-full py-3 bg-[#00A3E0] hover:bg-[#0088C0] text-white font-bold rounded-xl shadow-md transition-all transform active:scale-95 border-b-2 border-[#00A3E0] mt-4"
            >
              Procéder au Paiement
            </button>
                <button
              type="button"
              onClick={handleProceedToPurchase} 
                className="w-full py-3 bg-[#FDD100] hover:bg-[#E6C200] text-slate-900 font-bold rounded-xl shadow-md transition-all transform active:scale-95 border-b-2 border-[#D4B000] mt-2"     
         >      
        Enregistrer la Simulation
        </button>
        </div>
      </main>   
        <Footer />
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import notificationService from '../services/notificationService';
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

      {/* En-tête de la page */}
      <header className="bg-gradient-to-br from-[#0C1E36] to-[#11294A] text-white px-6 py-20 pt-28 text-center border-b-4 border-[#00A3E0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-[#00A3E0]/20 text-[#00A3E0] text-xs font-bold uppercase tracking-widest border border-[#00A3E0]/30 inline-flex items-center gap-2 mb-4">
            <FaCalculator /> Outil d'Aide à la Décision
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Simulateur de Tarif <span className="text-[#FDD100]">En Ligne</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Calculez instantanément le montant de la prime d'assurance pour votre famille en RDC. Ajustez vos options et obtenez un devis transparent conforme aux grilles de l'ARCA.
          </p>
        </div>
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
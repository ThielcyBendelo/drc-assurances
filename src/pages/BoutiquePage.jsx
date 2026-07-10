// AJOUT EXPLICITE DE useEffect DANS LES IMPORTS DE BASE
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import background2 from '../assets/background2.png';
import { 
  FaShieldAlt, FaHeartbeat, FaCar, FaGraduationCap, 
  FaPlane, FaCheckCircle, FaShoppingCart, FaInfoCircle,
  FaTimes, FaLock, FaWhatsapp, FaDownload 
} from 'react-icons/fa';

// Simulation de données des packs d'assurance disponibles
const insurancePacks = [
  {
    id: 1,
    category: "Santé",
    icon: <FaHeartbeat className="text-[#CE1126] text-2xl" />,
    name: "Pack Santé Maman",
    tagline: "Protégez votre mère restée à Kinshasa",
    price: 45,
    period: "par mois",
    coverageLimit: "Plafond annuel : 3 500 USD",
    features: [
      "Consultations gratuites (Hôpitaux agréés)",
      "Prise en charge des médicaments à 80%",
      "Urgences et hospitalisations incluses",
      "Notification WhatsApp instantanée"
    ],
    isPopular: true
  },
  {
    id: 2,
    category: "Automobile",
    icon: <FaCar className="text-[#FDD100] text-2xl" />,
    name: "Auto Confort Tiers-Payant",
    tagline: "Assurance obligatoire ARCA + Réparations",
    price: 29,
    period: "par mois",
    coverageLimit: "Responsabilité Civile illimitée",
    features: [
      "Attestation officielle ARCA en 5 minutes",
      "Zéro avance de frais chez nos garages partenaires",
      "Assistance dépannage 24h/7 à Kinshasa",
      "Protection du conducteur incluse"
    ],
    isPopular: false
  },
  {
    id: 3,
    category: "Scolaire",
    icon: <FaGraduationCap className="text-[#00A3E0] text-2xl" />,
    name: "Student Protect RDC",
    tagline: "Garantissez la scolarité de vos frères et enfants",
    price: 15,
    period: "par mois",
    coverageLimit: "Frais scolaires couverts en cas d'aléa",
    features: [
      "Prise en charge des accidents scolaires",
      "Remboursement des frais de scolarité bloqués",
      "Frais médicaux d'urgence couverts",
      "Valable pour écoles et universités"
    ],
    isPopular: false
  },
  {
    id: 4,
    category: "Voyage",
    icon: <FaPlane className="text-purple-500 text-2xl" />,
    name: "Pack Diaspora Congo",
    tagline: "Pour vos séjours temporaires au pays",
    price: 55,
    period: "par séjour (30j)",
    coverageLimit: "Assistance internationale complète",
    features: [
      "Rapatriement sanitaire vers l'Europe/Canada",
      "Frais hospitaliers sur place pris en charge",
      "Assurance bagages et retards de vol",
      "Assistance juridique incluse"
    ],
    isPopular: false
  }
];

export default function BoutiquePage() {
    // À mettre juste après la déclaration de vos states dans BoutiquePage()
useEffect(() => {
  const state = location.state;
  if (state?.triggerPayment && state?.pack) {
    setSelectedPack(state.pack);
    setIsPayModalOpen(true);
    // Nettoyer l'état de l'historique de navigation pour éviter les réouvertures en boucle
    window.history.replaceState({}, document.title);
  }
}, [location]);

  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Tous");

  // CONFIGURATION DES ÉTATS DE PILOTAGE POUR LA MODALE
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);

  const categories = ["Tous", "Santé", "Automobile", "Scolaire", "Voyage"];

  // Filtrer les produits
  const filteredPacks = activeFilter === "Tous" 
    ? insurancePacks 
    : insurancePacks.filter(pack => pack.category === activeFilter);

  // GESTION DU CLIC SOURIS LIÉ À LA MODALE DE SÉCURISATION FINANCIAL RDC
  const handleSubscription = (pack) => {
    setSelectedPack(pack);
    setIsPayModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

            {/* En-tête du catalogue unifié, premium, animé et connecté aux assets */}
      <header className="relative bg-slate-100 dark:bg-slate-950 px-6 py-24 pt-32 text-center border-b-4 border-[#00A3E0] overflow-hidden font-sans select-none">
        
        {/* 1. L'IMAGE D'ARRIÈRE-PLAN LUMINEUSE ET TOTALEMENT VISIBLE DESPUIS LES ASSETS */}
        <div className="absolute inset-0 z-0">
          <img 
            src={background2} 
            alt="DRC Assurances Catalogue Background" 
            className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-700"
          />
          {/* Dégradé fluide de transition uniquement vers le bas de page */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-slate-100 dark:from-slate-950/10 dark:via-transparent dark:to-slate-950" />
        </div>

        {/* 2. LE MOTIF DE GRILLE DISCRET */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] dark:opacity-5 [background-size:20px_20px] pointer-events-none z-1" />

        {/* 3. LE CONTENU CENTRAL EMBALLÉ DANS UN PANNEAU DE VERRE ET ANIMÉ AVEC FRAMER MOTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative z-10 max-w-4xl mx-auto p-6 md:p-10 bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-800/40 shadow-2xl space-y-6 flex flex-col items-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
        >
          
          {/* Badge de transaction Animé */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring" }}
          >
            <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-[#007cb0] dark:text-[#00A3E0] text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 inline-flex items-center gap-2 shadow-sm">
              <FaShoppingCart className="text-[#CE1126]" /> Souscription Immédiate
            </span>
          </motion.div>

          {/* Titre avec gestion de la lisibilité et de la couleur en mode clair */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-red-600 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
          >
            Catalogue des Packs <br />
            <span className="text-[#E5B200] dark:text-[#FDD100] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">Micro-Assurance</span>
          </motion.h1>

          {/* Description ajustée pour la lisibilité sur fond clair et sombre */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-slate-700 dark:text-slate-200 max-w-2xl mx-auto text-base md:text-sm font-bold leading-relaxed"
          >
            Sélectionnez une formule claire, ajustée aux réalités locales de la RD Congo. Pas de frais cachés, résiliation libre à tout moment.
          </motion.p>

          {/* ================= BOUTONS DE FILTRAGE DYNAMIQUES MODERNISÉS ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="mt-4 flex flex-wrap justify-center gap-2 w-full max-w-2xl"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[#00A3E0] text-white border-transparent shadow-lg shadow-[#00A3E0]/20 scale-102"
                    : "bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-[#00A3E0]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

        </motion.div>
      </header>

      {/* Grille des offres */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPacks.map((pack, idx) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`bg-white dark:bg-slate-900 rounded-2xl border flex flex-col justify-between relative transition-all duration-300 hover:shadow-lg ${
                pack.isPopular 
                  ? "border-2 border-[#00A3E0] shadow-md" 
                  : "border-slate-100 dark:border-slate-800"
              }`}
            >
              {/* Badge "Plus Populaire" */}
              {pack.isPopular && (
                <span className="absolute -top-3 right-6 bg-[#00A3E0] text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Le plus choisi
                </span>
              )}

              {/* En-tête de la carte */}
              <div className="p-6 border-b border-slate-50 dark:border-slate-800/60">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    {pack.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-100 dark:bg-slate-800/40 px-2.5 py-1 rounded-md">
                    {pack.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                  {pack.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 italic">
                  {pack.tagline}
                </p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{pack.price} USD</span>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">{pack.period}</span>
                </div>
              </div>

              {/* Détails de couverture et garanties */}
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A3E0] bg-[#00A3E0]/10 px-3 py-2 rounded-xl mb-6">
                  <FaInfoCircle />
                  {pack.coverageLimit}
                </div>
                <ul className="space-y-3.5">
                  {pack.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bouton d'action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleSubscription(pack)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                    pack.isPopular
                      ? "bg-[#00A3E0] hover:bg-[#0082B3] text-white shadow-md border-b-4 border-[#006180]"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white"
                  }`}
                >
                  <FaShieldAlt /> Souscrire pour ma famille
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />

       {/* COMPOSANT FLOTTANT DE LA PASSERELLE MOBILE MONEY */}
      <MobileMoneyModal 
        isOpen={isPayModalOpen} 
        onClose={() => setIsPayModalOpen(false)} 
        pack={selectedPack} 
      />
    </div>
  );
}

// ================= PASSERELLE LOGIQUE MULTI-OPÉRATEURS DE LA RDC =================
function MobileMoneyModal({ isOpen, onClose, pack }) {
  const [etape, setEtape] = useState('selection'); 
  const [operateur, setOperateur] = useState(null);
  const [telephone, setTelephone] = useState('');
  const [numeroAttestation, setNumeroAttestation] = useState('');

   useEffect(() => {
    if (isOpen) {
      setEtape('selection');
      setOperateur(null);
      setTelephone('');
    }
  }, [isOpen]);

  if (!pack) return null;

  const ExecuterPaiement = (e) => {
    e.preventDefault();
    if (!operateur || telephone.length < 9) return;
    setEtape('attente');
    setTimeout(() => {
      const randNum = Math.floor(100000 + Math.random() * 900000);
      setNumeroAttestation(`DRC-ARCA-${randNum}`);
      setEtape('succes');
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative"
          >
            {/* BOUTON FERMER FERMÉ PROPREMENT */}
            {etape !== 'attente' && (
              <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl transition-colors">
                <FaTimes size={16} />
              </button>
            )}

            {/* ÉTAPE SELECTION AVEC FORMULAIRE INCLUS */}
            {etape === 'selection' && (
              <div className="p-6 space-y-6">
                <div className="text-center space-y-1 pr-6">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{pack.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{pack.tagline}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-900 flex justify-between items-center">
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total de la prime</span>
                    <p className="text-2xl font-black text-[#00A3E0]">{pack.price} USD <span className="text-xs text-slate-400 font-medium">/{pack.period}</span></p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-black px-2.5 py-1 rounded-md border border-emerald-500/20 uppercase tracking-wide">
                    Taxes ARCA Incluses
                  </span>
                </div>

                <form onSubmit={ExecuterPaiement} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">1. Réseau Mobile Money RDC :</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'mpesa', nom: 'M-Pesa', class: 'border-red-600 bg-red-600/5 text-red-500' },
                        { id: 'orange', nom: 'Orange', class: 'border-orange-500 bg-orange-500/5 text-orange-500' },
                        { id: 'airtel', nom: 'Airtel', class: 'border-rose-600 bg-rose-600/5 text-rose-500' }
                      ].map((op) => (
                        <button
                          key={op.id} type="button" onClick={() => setOperateur(op.id)}
                          className={`p-3 text-xs font-black rounded-xl border transition-all text-center ${
                            operateur === op.id ? `${op.class} ring-2 ring-[#00A3E0]` : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {op.nom}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">2. Numéro de téléphone (9 chiffres) :</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-sm font-bold text-slate-400 pointer-events-none">+243</span>
                      <input 
                        type="tel" required placeholder="Ex: 812345678" minLength={9} maxLength={9}
                        value={telephone} onChange={(e) => setTelephone(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-16 pr-4 py-3 text-sm font-black bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={!operateur || telephone.length !== 9} className="w-full py-4 bg-[#00A3E0] hover:bg-[#0082B3] disabled:opacity-40 text-white text-xs font-black rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center gap-2">
                    <FaLock size={12} /> Confirmer et Payer la prime
                  </button>
                </form>
              </div>
            )}

            {/* ÉTAPE ATTENTE RECONSTRUITE EN STRUCTURE VALIDE */}
            {etape === 'attente' && (
              <div className="p-8 text-center space-y-5">
                <div className="w-12 h-12 border-4 border-[#00A3E0] border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Approbation requise...</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Saisissez votre <span className="font-bold text-slate-900 dark:text-white">code PIN secret M-Pesa/Orange/Airtel</span> directement sur l'écran de votre téléphone pour valider le débit de la transaction.
                  </p>
                </div>
              </div>
            )}

            {/* ÉTAPE SUCCÈS RECONSTRUITE EN STRUCTURE VALIDE */}
            {etape === 'succes' && (
              <div className="p-6 text-center space-y-6">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center text-2xl mx-auto border border-emerald-500/20">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-emerald-500">Souscription Réussie !</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Votre attestation a été validée et enregistrée par l'ARCA.</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-left font-mono space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-slate-400">Contrat ARCA :</span> <span className="font-bold text-[#00A3E0]">{numeroAttestation}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Garantie :</span> <span className="text-slate-900 dark:text-white font-bold">{pack.coverageLimit}</span></div>
                  <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-2"><span className="text-slate-400">Canal :</span> <span className="text-[#25D366] font-bold flex items-center gap-1"><FaWhatsapp /> WhatsApp Actif</span></div>
                </div>

                <div className="space-y-2">
                  <button onClick={onClose} className="w-full py-3.5 bg-[#00A3E0] text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-md flex items-center justify-center gap-2">
                    <FaDownload /> Télécharger l'Attestation (PDF)
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

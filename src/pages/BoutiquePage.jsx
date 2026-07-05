// AJOUT EXPLICITE DE useEffect DANS LES IMPORTS DE BASE
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
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

      {/* En-tête du catalogue */}
      <header className="bg-gradient-to-br from-[#0C1E36] to-[#11294A] text-white px-6 py-20 pt-28 text-center border-b-4 border-[#00A3E0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-[#FDD100]/10 text-[#FDD100] text-xs font-bold uppercase tracking-widest border border-[#FDD100]/20 inline-flex items-center gap-2 mb-4">
            <FaShoppingCart /> Souscription Immédiate
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Catalogue des Packs <span className="text-[#00A3E0]">Micro-Assurance</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Sélectionnez une formule claire, ajustée aux réalités locales de la RD Congo. Pas de frais cachés, résiliation libre à tout moment.
          </p>

          {/* Boutons de filtrage dynamiques */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                  activeFilter === cat
                    ? "bg-[#00A3E0] text-white shadow-md transform scale-105"
                    : "bg-slate-900/40 text-slate-300 border border-slate-700 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
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

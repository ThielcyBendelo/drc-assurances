import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import notificationService from '../services/notificationService';
import { 
  FaUser, FaPhone, FaMapMarkerAlt, FaIdCard, 
  FaShieldAlt, FaArrowRight, FaArrowLeft, FaInfoCircle 
} from 'react-icons/fa';

export default function ClientRegistrationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupération sécurisée du pack d'assurance sélectionné à l'étape précédente
  const selectedPack = location.state?.selectedPack || {
    id: 1,
    name: "Pack Santé Maman",
    price: 45,
    coverageLimit: "Plafond annuel : 3 500 USD"
  };

  // État initial du formulaire (Dualité Acheteur Diaspora / Bénéficiaire Local)
  const [formData, setFormData] = useState({
    beneficiaryLastName: '',
    beneficiaryFirstName: '',
    beneficiaryPhone: '+243', // Pré-remplissage avec l'indicatif de la RDC
    beneficiaryCity: 'Kinshasa',
    beneficiaryAddress: '',
    nationalID: '',
    buyerRelation: 'Parent' // Lien de parenté
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const citiesInRdc = [
    "Kinshasa", "Lubumbashi", "Goma", "Bukavu", 
    "Kisangani", "Kananga", "Mbuji-Mayi", "Matadi"
  ];

  const relations = ["Parent", "Conjoint(e)", "Enfant", "Frère / Sœur", "Employé(e)", "Autre"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation stricte du numéro de téléphone RDC
    if (!formData.beneficiaryPhone.startsWith('+243') || formData.beneficiaryPhone.length < 12) {
      notificationService.error("Le numéro WhatsApp doit être au format international RDC (ex: +243810000000)");
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (notificationService?.info) {
        notificationService.info("Validation des données du bénéficiaire...");
      }

      // Simulation d'une latence réseau
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Redirection vers la page de paiement sécurisée en transmettant les informations
      navigate('/passerelle-paiement', {
        state: {
          selectedPack,
          beneficiaryData: formData
        }
      });
    } catch (error) {
      notificationService.error("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-20 pt-28 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLONNE GAUCHE : Récapitulatif du Pack d'Assurance choisi */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#0C1E36] to-[#11294A] text-white p-6 rounded-2xl shadow-md border-b-4 border-[#00A3E0] sticky top-24">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#00A3E0] mb-2">Formule Sélectionnée</h3>
            <h2 className="text-2xl font-black mb-1">{selectedPack.name}</h2>
            <div className="text-2xl font-black text-[#FDD100] mb-4">
              {selectedPack.price} USD <span className="text-xs text-white/60 font-normal">/ mois</span>
            </div>
            
            <div className="border-t border-white/10 pt-4 space-y-3">
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <FaInfoCircle className="text-[#00A3E0]" /> {selectedPack.coverageLimit}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                En remplissant ce formulaire, vous initiez la création d'une carte d'assuré numérique ARCA rattachée à votre compte de la Diaspora.
              </p>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : Formulaire d'identification du bénéficiaire local */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl">
                <FaShieldAlt size={20} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">Identité du Bénéficiaire</h1>
                <p className="text-xs text-slate-500">Renseignez la personne physique qui utilisera les prestations en RDC.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Ligne : Nom & Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Nom de famille</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><FaUser size={14} /></span>
                    <input
                      type="text"
                      name="beneficiaryLastName"
                      required
                      value={formData.beneficiaryLastName}
                      onChange={handleChange}
                      placeholder="Ex: Mbuyi"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Prénom</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><FaUser size={14} /></span>
                    <input
                      type="text"
                      name="beneficiaryFirstName"
                      required
                      value={formData.beneficiaryFirstName}
                      onChange={handleChange}
                      placeholder="Ex: Thérèse"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                    />
                  </div>
                </div>
              </div>

              {/* Ligne : WhatsApp & Lien de Parenté */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">N° WhatsApp (Notification PWA)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><FaPhone size={14} /></span>
                    <input
                      type="tel"
                      name="beneficiaryPhone"
                      required
                      value={formData.beneficiaryPhone}
                      onChange={handleChange}
                      placeholder="+243810000000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0] font-mono text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Lien avec vous (Acheteur)</label>
                  <select
                    name="buyerRelation"
                    value={formData.buyerRelation}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                  >
                    {relations.map((rel) => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ligne : Ville RDC & Pièce d'identité */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Ville en RD Congo</label>
                  <select
                    name="beneficiaryCity"
                    value={formData.beneficiaryCity}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                  >
                    {citiesInRdc.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">N° National ID / Carte Électeur (Optionnel)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><FaIdCard size={14} /></span>   
                    <input
                      type="text"
                      name="nationalID" 
                        value={formData.nationalID}
                        onChange={handleChange}
                        placeholder="Ex: 123456789012"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                    />
                  </div>
                </div>
              </div>
                {/* Ligne : Adresse RDC */} 
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Adresse complète en RD Congo</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400"><FaMapMarkerAlt size={14} /></span>
                        <input
                            type="text"
                            name="beneficiaryAddress"
                            required
                            value={formData.beneficiaryAddress}
                            onChange={handleChange}
                            placeholder="Ex: 123 Avenue de la Paix, Quartier XYZ"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                        />
                    </div>
                </div>
                {/* Boutons de navigation */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                    >   
                    <FaArrowLeft /> Retour
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A3E0] text-sm font-bold text-white hover:bg-[#0088c4] transition-all duration-300"
                    >
                        Suivant <FaArrowRight />
                    </button>
                </div>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
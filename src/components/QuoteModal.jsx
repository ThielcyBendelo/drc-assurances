import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailService from '../services/emailService';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaCalendarAlt, FaPaperPlane, FaTimes, FaQuoteLeft, FaMoneyBillWave, FaUtensils, FaUsers } from 'react-icons/fa';

// Typologie des demandes événementielles M-DELICE
const SERVICES = [
  { value: 'Cake Design Mariage', label: 'Pièce Montée & Mariage' },
  { value: 'Cake Design Anniversaire', label: 'Gâteau d\'Anniversaire Personnalisé' },
  { value: 'Buffet Entreprise', label: 'Cocktail & Buffet Sucré Corporate' },
  { value: 'Événement Privé', label: 'Baptême, Communion & Fêtes' },
  { value: 'Assortiment Pâtisseries', label: 'Commande Spéciale de Mini-Douceurs' },
];

const TIMELINES = [
  { value: 'urgent', label: "Urgent (Moins de 48h)" },
  { value: 'semaine', label: 'Dans la semaine (3 à 5 jours)' },
  { value: 'standard', label: 'Événement futur (+ de 2 semaines)' },
];

const initialState = {
  name: '',
  email: '',
  phone: '',
  guests: '',       // Remplacé 'company' (Société) par Nombre de convives/parts
  eventDate: '',    // Remplacé 'sector' (Secteur) par Date exacte de l'événement
  projectType: '',
  budget: '',       
  timeline: '',
  message: '',
};

// EXPORTATION PAR DÉFAUT DIRECTE ICI POUR RÉSOUDRE L'ERREUR VITE
export default function QuoteModal({ isOpen, onClose, defaultService }) {
  const [formData, setFormData] = useState({ ...initialState, projectType: defaultService || '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...initialState, projectType: defaultService || '' });
      setResult(null);
    }
  }, [isOpen, defaultService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nom requis';
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Email valide requis';
    if (!formData.projectType) newErrors.projectType = 'Sélection requise';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await emailService.sendQuoteRequest(formData, []);
      setResult(res);
      if (res.success) {
        setTimeout(() => onClose(), 2500);
      }
    } catch {
      setResult({ success: false, message: "Erreur lors de l'envoi de votre demande de devis." });
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[150] flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div 
            className="bg-white dark:bg-stone-900 rounded-[40px] shadow-2xl p-6 md:p-10 w-full max-w-2xl relative overflow-y-auto max-h-[90vh] border border-stone-100 dark:border-stone-800"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
          >
            <button 
              className="absolute top-6 right-6 text-stone-400 hover:text-orange-500 transition-all" 
              onClick={onClose}
            >
              <FaTimes size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-amber-100 dark:bg-amber-500/20 rounded-2xl text-amber-800 dark:text-amber-400 mb-4">
                <FaQuoteLeft size={20} />
              </div>
              <h2 className="text-3xl font-black text-stone-950 dark:text-white font-serif uppercase tracking-tight">
                Demande de Devis Pâtisserie
              </h2>
              <p className="text-stone-500 dark:text-stone-400 mt-1">
                Précisez votre projet gourmand pour recevoir une proposition tarifaire sur mesure.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* LIGNE 1 : NOM & EMAIL */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-orange-400" />
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-all" placeholder="Nom complet *" />
                  {errors.name && <span className="text-xs text-red-500 pl-2">{errors.name}</span>}
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-orange-400" />
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-all" placeholder="Adresse Email *" />
                  {errors.email && <span className="text-xs text-red-500 pl-2">{errors.email}</span>}
                </div>
              </div>

              {/* LIGNE 2 : TELEPHONE & COMPTE DE PARTS */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <FaPhone className="absolute left-4 top-4 text-orange-400" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-all" placeholder="Téléphone (WhatsApp)" />
                </div>
                <div className="relative">
                  <FaUsers className="absolute left-4 top-4 text-orange-400" />
                  <input type="number" name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-all" placeholder="Nombre de parts / convives" min="1" />
                </div>
              </div>

              {/* LIGNE 3 : TYPE DE CREATION & BUDGET PROJET */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <FaBirthdayCake className="absolute left-4 top-4 text-orange-400" />
                  <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 outline-none appearance-none focus:ring-2 focus:ring-amber-500 dark:text-white">
                    <option value="">Type de création *</option>
                    {SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  {errors.projectType && <span className="text-xs text-red-500 pl-2">{errors.projectType}</span>}
                </div>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-4 top-4 text-orange-400" />
                  <input type="text" name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-all" placeholder="Budget approximatif (FCFA)" />
                </div>
              </div>

              {/* LIGNE 4 : DELAI SOUHAITE & DATE EVENEMENT */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <FaUtensils className="absolute left-4 top-4 text-orange-400" />
                  <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 outline-none appearance-none focus:ring-2 focus:ring-amber-500 dark:text-white">
                    <option value="">Délai de fabrication</option>
                    {TIMELINES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-4 text-orange-400" />
                  <input type="text" name="eventDate" value={formData.eventDate} onChange={handleChange} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-all" placeholder="Date de l'événement" />
                </div>
              </div>

              {/* MESSAGE COMPLEMENTAIRE / INFORMATIONS LIVRAISON */}
              <div className="relative">
                <FaPaperPlane className="absolute left-4 top-4 text-orange-400" />
                <textarea name="message" value={formData.message} onChange={handleChange} className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-all resize-none h-24" placeholder="Message complémentaire (informations livraison, demandes spécifiques, etc.)"></textarea>
              </div>
              <AnimatePresence>
                <motion.button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-amber-700 hover:bg-orange-500 text-white rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                  initial={{ opacity: 0 }}  
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}
                </motion.button>
              </AnimatePresence>
            </form>
            {result && (
              <motion.div 
                className={`mt-6 p-4 rounded-lg text-center ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {result.message}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
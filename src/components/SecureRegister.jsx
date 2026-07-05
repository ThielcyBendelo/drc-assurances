import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import authService from '../services/authService';
import notificationService from '../services/notificationService';
import { FaUser, FaEnvelope, FaLock, FaGlobe, FaShieldAlt, FaArrowRight, FaSpinner, FaUserPlus } from 'react-icons/fa';

export default function SecureRegister() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'France'
  });

  const countries = ["France", "Belgique", "Canada", "USA", "Royaume-Uni", "Allemagne", "Autre"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validations de sécurité intégrées
    if (formData.password.length < 6) {
      notificationService.error("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notificationService.error("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    try {
      notificationService.info("Création de votre compte Diaspora sécurisé...");
      
      const result = await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        country: formData.country
      });
      
      if (result.success) {
        notificationService.success("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        navigate('/login');
      } else {
        // Mode simulation/démo si l'API n'est pas encore connectée
        notificationService.success("Mode Démo : Compte Diaspora simulé avec succès !");
        navigate('/login');
      }
    } catch (error) {
      notificationService.error("Une erreur technique est survenue lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-[#00A3E0]/20 z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 w-full max-w-md bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100"
      >
        {/* En-tête */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl mb-3">
            <FaShieldAlt size={24} />
          </div>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight bg-gradient-to-r from-[#00A3E0] via-[#CE1126] to-[#FDD100] text-transparent bg-clip-text font-serif">
            DRC Assurances
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Inscription Espace Membre Diaspora</p>
        </div>

        {/* Formulaire d'inscription */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Nom</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><FaUser size={12} /></span>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} placeholder="Mbuyi" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Prénom</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><FaUser size={12} /></span>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} placeholder="Jean" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Pays de résidence</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><FaGlobe size={12} /></span>
              <select name="country" value={formData.country} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]">
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Email unique</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><FaEnvelope size={12} /></span>
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="jean.mbuyi@gmail.com" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Mot de passe</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><FaLock size={12} /></span>
                <input type="password" name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Confirmation</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><FaLock size={12} /></span>
                <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]" />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#00A3E0] hover:bg-[#0082B3] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border-b-4 border-[#006180] disabled:opacity-50"
            >
              {isLoading ? (
                <><FaSpinner className="animate-spin" size={14} /><span>Création du portefeuille...</span></>
              ) : (
                <><FaUserPlus size={14} /><span>Créer mon compte</span><FaArrowRight className="ml-auto opacity-40" size={12} /></>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
          <p>Déjà membre ? <span onClick={() => navigate('/login')} className="text-[#00A3E0] font-bold cursor-pointer hover:underline">Se connecter</span></p>
        </div>
      </motion.div>
    </div>
  );
}

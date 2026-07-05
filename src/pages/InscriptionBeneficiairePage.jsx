import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import { FaUserPlus, FaArrowLeft, FaShieldAlt, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function InscriptionBeneficiairePage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupération sécurisée du pack choisi sur la page boutique
  const selectedPack = location.state?.selectedPack || null;

  // États du formulaire conformes aux exigences ARCA
  const [formData, setFormData] = useState({
    nomBeneficiaire: '',
    prenomBeneficiaire: '',
    telephoneCongo: '',
    provinceCongo: 'Kinshasa',
    communeCongo: '',
    lienParente: 'Parent'
  });

  // Liste des provinces majeures pour le ciblage des réseaux de soins
  const provincesRDC = [
    "Kinshasa", "Kongo Central", "Kwango", "Kwilu", "Mai-Ndombe", 
    "Equateur", "Nord-Ubangi", "Sud-Ubangi", "Mongala", "Tshuapa", 
    "Tshopo", "Bas-Uele", "Haut-Uele", "Ituri", "Nord-Kivu", 
    "Sud-Kivu", "Maniema", "Katanga / Haut-Katanga", "Lualaba", 
    "Haut-Lomami", "Tanganyika", "Kasai", "Kasai Central", 
    "Kasai Oriental", "Lomami", "Sankuru"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPack) return;

    // Redirige vers la boutique en ouvrant directement la modale Mobile Money 
    // et en transmettant les données du bénéficiaire validées
    navigate('/boutique', { 
      state: { 
        triggerPayment: true, 
        pack: selectedPack,
        beneficiaire: formData
      } 
    });
  };

  // Sécurité si l'utilisateur accède à la page sans avoir choisi de formule
  if (!selectedPack) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-6">
        <div className="text-center space-y-4 max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-bold text-slate-500">Aucun pack d'assurance n'a été sélectionné.</p>
          <button 
            onClick={() => navigate('/boutique')} 
            className="px-6 py-3 bg-[#00A3E0] text-white font-bold rounded-xl text-xs uppercase"
          >
            Retourner à la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-16 pt-28 w-full space-y-8">
        {/* BOUTON RETOUR */}
        <button 
          onClick={() => navigate('/boutique')}
          className="flex items-center gap-2 text-xs font-black uppercase text-[#00A3E0] hover:underline"
        >
          <FaArrowLeft /> Retour au catalogue
        </button>

        {/* RÉCAPITULATIF DU PACK CHOISI */}
        <div className="bg-gradient-to-r from-[#0C1E36] to-[#11294A] text-white p-6 rounded-2xl border-l-4 border-[#00A3E0] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FDD100] bg-[#FDD100]/10 px-2 py-0.5 rounded border border-[#FDD100]/20">Formule Sélectionnée</span>
            <h2 className="text-xl font-black">{selectedPack.name}</h2>
            <p className="text-xs text-slate-300 font-medium">{selectedPack.tagline}</p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="text-2xl font-black text-[#00A3E0]">{selectedPack.price} USD</p>
            <p className="text-[10px] text-slate-400 font-semibold">{selectedPack.period}</p>
          </div>
        </div>

        {/* FORMULAIRE D'INSCRIPTION */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-800/60 pb-4">
            <div className="p-3 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl">
              <FaUserPlus size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Bénéficiaire en RD Congo</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Renseignez la personne qui utilisera les garanties sur place.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-wider text-slate-400">Nom de famille :</label>
                <input 
                  type="text" name="nomBeneficiaire" required placeholder="Ex: MBIKAYI"
                  value={formData.nomBeneficiaire} onChange={handleInputChange}
                  className="w-full p-3 text-sm font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 dark:text-white uppercase"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-wider text-slate-400">Prénom :</label>
                <input 
                  type="text" name="prenomBeneficiaire" required placeholder="Ex: Dieudonné"
                  value={formData.prenomBeneficiaire} onChange={handleInputChange}
                  className="w-full p-3 text-sm font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1"><FaPhoneAlt size={10} /> Numéro WhatsApp / Contact RDC :</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-sm font-bold text-slate-400 pointer-events-none">+243</span>
                  <input 
                    type="tel" name="telephoneCongo" required placeholder="Ex: 812345678" minLength={9} maxLength={9}
                    value={formData.telephoneCongo} onChange={(e) => setFormData(prev => ({ ...prev, telephoneCongo: e.target.value.replace(/\D/g, '') }))}
                    className="w-full pl-16 pr-4 py-3 text-sm font-black bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-wider text-slate-400">Lien de parenté :</label>
                <select 
                  name="lienParente" value={formData.lienParente} onChange={handleInputChange}
                  className="w-full p-3 text-sm font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 dark:text-white"
                >
                  <option value="Parent">Père / Mère</option>
                  <option value="Enfant">Enfant / Mineur</option>
                  <option value="FrereSoeur">Frère / Sœur</option>
                  <option value="Conjoint">Époux / Épouse</option>
                  <option value="Autre">Autre membre familial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-dashed border-slate-100 dark:border-slate-800">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1"><FaMapMarkerAlt size={10} /> Province de résidence :</label>
                <select 
                  name="provinceCongo" value={formData.provinceCongo} onChange={handleInputChange}
                  className="w-full p-3 text-sm font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 dark:text-white"
                >
                  {provincesRDC.map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-wider text-slate-400">Commune / Quartier :</label>
                <input 
                  type="text" name="communeCongo" required placeholder="Ex: Gombe / Limete"
                  value={formData.communeCongo} onChange={handleInputChange}
                  className="w-full p-3 text-sm font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full mt-4 py-4 bg-[#00A3E0] hover:bg-[#0082B3] text-white text-xs font-black rounded-xl shadow-md uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <FaShieldAlt /> Enregistrer et passer au paiement
            </button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import notificationService from '../services/notificationService';
import { 
  FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, 
  FaShieldAlt, FaClock, FaPaperPlane, FaHospitalSymbol 
} from 'react-icons/fa';

export default function ContactPage() {
  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    subject: 'Général',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      if (notificationService?.info) {
        notificationService.info("Envoi de votre demande au support technique...");
      }

      // Simulation d'envoi vers l'API d'assistance
      await new Promise(resolve => setTimeout(resolve, 1500));

      notificationService.success("Votre message a été transmis. Un conseiller vous répondra sous 24h.");
      setEmailData({ name: '', email: '', subject: 'Général', message: '' });
    } catch (error) {
      notificationService.error("Échec de l'envoi. Veuillez réessayer ou utiliser WhatsApp.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

      {/* En-tête Institutionnel */}
      <header className="bg-gradient-to-br from-[#0C1E36] to-[#11294A] text-white px-6 py-20 pt-28 text-center border-b-4 border-[#00A3E0] relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-[#CE1126]/20 text-red-400 text-xs font-bold uppercase tracking-widest border border-[#CE1126]/30 inline-flex items-center gap-2 mb-4 animate-pulse">
            <FaClock /> Assistance & Sinistres 24h/7
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Contactez le Centre de Relation <span className="text-[#00A3E0]">DRC Assurances</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Une question sur un contrat, une urgence médicale ou un besoin d'assistance immédiate à Kinshasa ? Nos équipes sont là pour vous.
          </p>
        </div>
      </header>

      {/* Grille d'Assistance */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* BLOC ACCÈS RAPIDES & URGENCES RDC */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Ligne d'urgence médicale */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-l-4 border-[#CE1126] shadow-sm">
            <div className="flex items-center gap-3 text-[#CE1126] mb-3">
              <FaHospitalSymbol size={22} />
              <h3 className="font-black text-sm uppercase tracking-wider">Urgence Médicale RDC</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Pour une prise en charge immédiate dans nos cliniques partenaires (sans avance de frais).
            </p>
            <a 
              href="tel:+243829054350" 
              className="w-full py-3 bg-[#CE1126] hover:bg-red-700 text-white rounded-xl font-bold text-center block transition-all shadow-md active:scale-95 text-sm"
            >
              📞 Appeler le +243 829 054 350
            </a>
          </div>

          {/* Ligne Canal Diaspora WhatsApp */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-l-4 border-green-500 shadow-sm">
            <div className="flex items-center gap-3 text-green-500 mb-3">
              <FaWhatsapp size={22} />
              <h3 className="font-black text-sm uppercase tracking-wider">Ligne Client Diaspora</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Discutez directement avec un conseiller technique pour la gestion de vos prélèvements et activations de cartes.
            </p>
            <a 
              href="https://wa.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-sm"
            >
              <FaWhatsapp size={16} /> Ouvrir WhatsApp Support
            </a>
          </div>

          {/* Coordonnées Institutionnelles */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 text-sm uppercase tracking-wider">Nos Bureaux</h4>
            
            <div className="flex gap-3 text-xs text-slate-600 dark:text-slate-400">
              <FaMapMarkerAlt className="text-[#00A3E0] mt-0.5 flex-shrink-0" size={14} />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Siège Social Kinshasa</p>
                <p>Avenue de la Justice, Gombe, RD Congo</p>
              </div>
            </div>

            <div className="flex gap-3 text-xs text-slate-600 dark:text-slate-400">
              <FaEnvelope className="text-[#00A3E0] mt-0.5 flex-shrink-0" size={14} />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Support Mail</p>
                <p className="break-all">assistance@drcassurances.com</p>
              </div>
            </div>

            <div className="flex gap-3 text-xs text-slate-600 dark:text-slate-400">
              <FaShieldAlt className="text-[#FDD100] mt-0.5 flex-shrink-0" size={14} />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Numéro de Courtier ARCA</p>
                <p className="font-mono">N° ARCA/RDC/2026-XXXX</p>
              </div>
            </div>
          </div>

        </div>

        {/* FORMULAIRE DE MESSAGERIE ADMINISTRATIVE */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-full flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2">Envoyer une demande écrite</h2>
              <p className="text-xs text-slate-500 mb-6">Pour toute réclamation, demande de devis sur-mesure ou envoi de documents administratifs.</p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Votre Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={emailData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Jean Mbuyi"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Adresse Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={emailData.email}
                      onChange={handleInputChange}
                      placeholder="Ex: jean.mbuyi@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Nature de la demande</label>
                  <select
                    name="subject"
                    value={emailData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                  >
                    <option value="Général">Question générale sur nos offres</option>
                    <option value="Sinistre">Suivi de dossier de sinistre / Remboursement</option>
                    <option value="Partenariat">Demande d'agrément (Cliniques / Garages)</option>
                    <option value="Entreprise">Assurance Collective (Flotte & Salariés B2B)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Détail de votre message</label>
                  <textarea
                    name="message"
                    required
                    value={emailData.message}
                    onChange={handleInputChange}
                    placeholder="Ex: Bonjour, je souhaite obtenir un devis pour une assurance santé collective..."
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A3E0] text-sm font-bold text-white hover:bg-[#0088c4] transition-all duration-300"
                >
                  Envoyer <FaPaperPlane />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
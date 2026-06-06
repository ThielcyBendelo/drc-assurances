import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { init, send } from '@emailjs/browser';
import { 
  FaEnvelope, FaLinkedin, FaInstagram, FaFacebook, 
  FaWhatsapp, FaUser, FaPaperPlane, FaMapMarkerAlt, FaPhone 
} from 'react-icons/fa';

import useIntersectionObserver from '../hooks/useIntersectionObserver';
import notificationService from '../services/notificationService';
import analyticsService from '../services/analyticsService';
import messagingService from '../dashboard/services/messagingService';

export default function Contact() {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) init(EMAILJS_PUBLIC_KEY);
  }, [EMAILJS_PUBLIC_KEY]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Envoi...' });
    const loadingToast = notificationService.loading('Envoi de votre message...');

    // Fallback Mailto si EmailJS non configuré
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      const mailtoLink = `mailto:ingebadelice@://gmail.com de ${formData.name}&body=${formData.message}`;
      window.location.href = mailtoLink;
      notificationService.dismiss(loadingToast);
      notificationService.success('Client email ouvert !');
      return;
    }

    try {
      await send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        to_reply: formData.email,
        message: formData.message,
        to_email: 'beverlymalu04@gmail.com',
      });

      // Sauvegarde Dashboard
      messagingService.addMessage({
        senderName: formData.name,
        senderEmail: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
      });

      notificationService.dismiss(loadingToast);
      notificationService.formSuccess('Message envoyé !', 'Je vous répondrai très bientôt.');
      setFormData({ name: '', email: '', message: '' });
      setStatus({ type: 'success', message: 'Envoyé !' });
    } catch (err) {
      notificationService.dismiss(loadingToast);
      notificationService.error("Erreur lors de l'envoi.");
    }
  };

  return (
    <section ref={elementRef} id="contact" className="py-20 px-6 bg-white dark:bg-green-950 transition-colors duration-500">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-green-900 dark:text-lime-400 uppercase tracking-tighter">Entrons en Contact</h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* INFOS DE CONTACT (2 colonnes) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-green-50 dark:bg-green-900/40 p-8 rounded-[40px] border border-green-100 dark:border-green-800">
              <h3 className="text-2xl font-bold text-green-900 dark:text-white mb-6">Mes Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white dark:bg-green-800 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm group-hover:scale-110 transition-transform">
                    <FaEnvelope />
                  </div>
                  <p className="text-gray-600 dark:text-green-100">beverlymalu04@gmail.com</p>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white dark:bg-green-800 rounded-2xl flex items-center justify-center text-lime-500 shadow-sm group-hover:scale-110 transition-transform">
                    <FaWhatsapp />
                  </div>
                  <p className="text-gray-600 dark:text-green-100">+243 977 644 971</p>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white dark:bg-green-800 rounded-2xl flex items-center justify-center text-green-700 dark:text-lime-400 shadow-sm group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt />
                  </div>
                  <p className="text-gray-600 dark:text-green-100">Kinshasa, RD Congo</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-green-100 dark:border-green-800">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Suivez mon impact</p>
                <div className="flex gap-4">
                  {[FaFacebook, FaInstagram, FaLinkedin].map((Icon, i) => (
                    <button key={i} className="w-10 h-10 rounded-full bg-white dark:bg-green-800 flex items-center justify-center text-green-900 dark:text-white hover:bg-orange-500 hover:text-white transition-all shadow-sm">
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FORMULAIRE (3 colonnes) */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-green-900 shadow-2xl rounded-[40px] p-8 md:p-12 border border-gray-100 dark:border-green-800">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-2">Votre Nom</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-4 text-orange-500" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-green-800/50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 dark:text-white"
                      placeholder="delice Ingeba" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-2">Votre Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-4 text-orange-500" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-green-800/50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 dark:text-white"
                      placeholder="votre@email.com" />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-2">Votre Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required
                  className="w-full p-6 bg-gray-50 dark:bg-green-800/50 border-none rounded-3xl h-40 focus:ring-2 focus:ring-orange-500 dark:text-white"
                  placeholder="Comment puis-je vous accompagner ?" />
              </div>

              <button type="submit" 
                className="w-full py-5 bg-green-900 dark:bg-lime-500 text-white dark:text-green-950 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-xl shadow-green-900/20"
              >
                <FaPaperPlane /> Envoyer le message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

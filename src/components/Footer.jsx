import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp, FaShieldAlt } from 'react-icons/fa';


// À AJOUTER ✅ (Réseaux officiels de DRC Assurances)
const contact = [
  { label: 'Email', link: 'mailto:contact@drcassurances.com' },
  { label: 'WhatsApp', link: 'https://wa.me' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Facebook', link: 'https://facebook.com' }
];


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    Email: FaEnvelope,
    LinkedIn: FaLinkedin,
    Instagram: FaInstagram,
    Facebook: FaFacebook,
    WhatsApp: FaWhatsapp,
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 py-16 mt-auto border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Bloc 1: Identité & Slogan Assurances */}
          <div className="col-span-1">
            <h3 className="text-2xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#00A3E0] via-[#CE1126] to-[#FDD100] text-transparent bg-clip-text font-serif tracking-wide uppercase">
                DRC Assurances
              </span>
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
              "Votre partenaire de confiance pour la protection de votre famille et de vos biens en RDC, connectant la diaspora au réseau local."
            </p>
            {/* Ligne aux couleurs nationales */}
            <div className="mt-6 flex gap-1">
              <div className="h-1 w-6 bg-[#00A3E0] rounded-full"></div>
              <div className="h-1 w-4 bg-[#CE1126] rounded-full"></div>
              <div className="h-1 w-2 bg-[#FDD100] rounded-full"></div>
            </div>
          </div>

          {/* Bloc 2: Navigation Révisée Écosystème */}
          <div className="text-left">
            <h4 className="text-slate-900 dark:text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Plateforme</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Accueil</Link></li>
              <li><Link to="/services" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Nos Formules</Link></li>
              <li><Link to="/checkout" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Espace Diaspora</Link></li>
              <li><Link to="/urgences-contact" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Contact rapide</Link></li>
              <li><Link to="/partenaire" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Portail Professionnel</Link></li>
            </ul>
          </div>

          {/* Bloc 3: Contact & Régulation RDC */}
          <div className="text-left">
            <h4 className="text-slate-900 dark:text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Siège Social</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center gap-3">
                <div className="text-[#00A3E0]"><FaEnvelope /></div>
                <span className="text-slate-600 dark:text-slate-300 break-all">contact@drcassurances.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="text-green-500"><FaWhatsapp /></div>
                <span className="text-slate-600 dark:text-slate-300">Kinshasa, RD Congo</span>
              </li>
              <li className="mt-4 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  <FaShieldAlt className="text-[#FDD100]" /> Régulation ARCA
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Opérations conformes au Code des Assurances en RDC.
                </span>
              </li>
            </ul>
          </div>

          {/* Bloc 4: Réseaux Sociaux & Impact */}
          <div className="text-left md:text-right">
            <h4 className="text-slate-900 dark:text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Suivre notre actualité</h4>
            <div className="flex justify-start md:justify-end gap-3">
              {contact && contact.map((item) => {
                const Icon = socialIcons[item.label];
                if (!Icon) return null;
                return (
                  <a 
                    key={item.label} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-white shadow-sm hover:bg-[#00A3E0] hover:text-white dark:hover:bg-[#FDD100] dark:hover:text-slate-950 transition-all duration-300" 
                    title={item.label} 
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <p className="mt-6 text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">
              Écosystème d'inclusion financière panafricain.
            </p>
          </div>
        </div>

        {/* Barre de Copyright Finale */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-[0.2em] uppercase text-center md:text-left leading-relaxed">
            © {currentYear} DRC Assurances <span className="mx-2 hidden md:inline">|</span> <br className="md:hidden" /> Solutions Numériques et Micro-Assurances en RDC
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-600">
            <button className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Mentions Légales</button>
            <button className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Confidentialité</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

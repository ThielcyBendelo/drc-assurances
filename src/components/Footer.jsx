import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { contact } from '../assets/assets.js';

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
    <footer className="bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-300 py-16 mt-auto border-t border-stone-200 dark:border-stone-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Bloc 1: Identité & Slogan */}
          <div className="col-span-1">
            <h3 className="text-2xl font-black mb-4">
              <span className="bg-gradient-to-r from-amber-800 to-orange-500 dark:from-amber-400 dark:to-orange-400 text-transparent bg-clip-text font-serif tracking-wide uppercase">
                M-DELICE
              </span>
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed italic">
              "L'art de la haute gourmandise et des créations d'exception pour sublimer vos plus beaux événements."
            </p>
            <div className="mt-6 flex gap-3">
              <div className="h-1 w-8 bg-orange-500 rounded-full"></div>
              <div className="h-1 w-2 bg-amber-500 rounded-full"></div>
            </div>
          </div>

          {/* Bloc 2: Navigation Restaurant & Back-office */}
          <div className="text-left">
            <h4 className="text-amber-950 dark:text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Navigation</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/" className="hover:text-orange-500 dark:hover:text-amber-400 transition-colors">Accueil</Link></li>
              <li><Link to="/vitrine" className="hover:text-orange-500 dark:hover:text-amber-400 transition-colors">Notre Vitrine</Link></li>
              <li><Link to="/sur-mesure" className="hover:text-orange-500 dark:hover:text-amber-400 transition-colors">Cake Design</Link></li>
              <li><Link to="/stock" className="hover:text-orange-500 dark:hover:text-amber-400 transition-colors">Gestion Stock</Link></li>
              <li><Link to="/finances" className="hover:text-orange-500 dark:hover:text-amber-400 transition-colors">Finances</Link></li>
            </ul>
          </div>

          {/* Bloc 3: Contact & Atelier */}
          <div className="text-left">
            <h4 className="text-amber-950 dark:text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Atelier</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center gap-3">
                <div className="text-orange-500"><FaEnvelope /></div>
                <span className="text-stone-600 dark:text-stone-300 break-all">contact@m-delice.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="text-amber-600"><FaWhatsapp /></div>
                <span className="text-stone-600 dark:text-stone-300">Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="mt-4">
                <Link to="/sur-mesure" className="inline-block px-4 py-2 bg-amber-800 dark:bg-orange-500 text-white rounded-xl font-bold text-xs hover:scale-105 transition-transform shadow-md">
                  Commander un gâteau →
                </Link>
              </li>
            </ul>
          </div>

          {/* Bloc 4: Réseaux Sociaux & Réputation */}
          <div className="text-left md:text-right">
            <h4 className="text-amber-950 dark:text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Suivre nos créations</h4>
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
                    className="w-10 h-10 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-800 dark:text-white shadow-sm hover:bg-orange-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-stone-950 transition-all duration-300" 
                    title={item.label} 
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <p className="mt-6 text-[10px] text-stone-400 dark:text-stone-500 uppercase font-bold tracking-widest">
              Plus de 500 événements sublimés à Abidjan.
            </p>
          </div>
        </div>

        {/* Barre de Copyright Finale */}
        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold tracking-[0.2em] uppercase text-center md:text-left leading-relaxed">
            © {currentYear} M-DELICE <span className="mx-2 hidden md:inline">|</span> <br className="md:hidden" /> Haute Pâtisserie & Cake Design Sur Mesure
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest font-black text-stone-400 dark:text-stone-600">
            <button className="hover:text-orange-500 dark:hover:text-amber-400 transition-colors">Mentions Légales</button>
            <button className="hover:text-orange-500 dark:hover:text-amber-400 transition-colors">Confidentialité</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

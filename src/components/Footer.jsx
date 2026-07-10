import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLinkedin, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp, 
  FaShieldAlt, FaMapMarkerAlt, FaRoute, FaPhoneAlt, FaClock 
} from 'react-icons/fa';

// Réseaux officiels de DRC Assurances alignés sur les clés socialIcons
const contact = [
  { label: 'Email', link: 'mailto:contact@drcassurances.com' },
  { label: 'WhatsApp', link: 'https://wa.me' }, // Remplacez par votre numéro officiel
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

  // Coordonnées de Kinshasa (Gombe) ou de votre agence réelle pour l'action itinéraire
  const googleMapsUrl = "https://google.com";

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 py-16 mt-auto border-t border-slate-200 dark:border-slate-800 transition-colors duration-500 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* ================= SECTION LOCALISATION GÉOMÉTRIQUE ET GOOGLE MAPS PRO ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/60 dark:bg-slate-950/40 backdrop-blur-md p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl">
          
          {/* Métadonnées de l'agence physique (5 colonnes sur 12) */}
          <div className="lg:col-span-5 space-y-4 px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#00A3E0]/10 text-[#007cb0] dark:text-[#00A3E0] text-xs font-black uppercase tracking-wider border border-[#00A3E0]/20">
              <FaMapMarkerAlt className="text-[#CE1126]" /> Siège Social Central
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Venez nous rencontrer à Kinshasa
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              Nos conseillers vous accueillent au cœur du centre d'affaires pour finaliser vos dossiers de courtage ou gérer vos déclarations d'accidents de flottes.
            </p>
            
            {/* Liste technique de contact localisé */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <FaClock className="text-[#FDD100]" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black">Lun - Ven</p>
                  <p>08:00 — 16:30 (GMT+1)</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <FaPhoneAlt className="text-[#00A3E0]" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black">Support Client</p>
                  <p>+243 (0) 81 000 0000</p>
                </div>
              </div>
            </div>

            {/* Bouton Itinéraire Google Maps */}
            <div className="pt-2">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00A3E0] hover:bg-[#008cc2] text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-b-4 border-[#006a94] cursor-pointer group"
              >
                <FaRoute className="group-hover:scale-110 transition-transform" />
                <span>Obtenir l'itinéraire</span>
              </a>
            </div>
          </div>

               {/* Intégration géométrique de la carte Google Maps (7 colonnes sur 12) */}
          <div className="lg:col-span-7 h-64 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner group relative">
            {/* Filtre de teinte subtil pour harmoniser la carte avec le mode sombre */}
            <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-[#00A3E0]/40 rounded-2xl transition-all duration-300 z-10" />
            <iframe 
              title="DRC Assurances Headquarters"
              /* ✅ CORRIGÉ : Lien d'intégration officiel non bloqué par les serveurs Google */
              src="https://google.com"
              className="w-full h-full border-0 opacity-90 dark:opacity-75 dark:invert dark:contrast-125 dark:hue-rotate-180 transition-opacity"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          </div>


        {/* ================= CONTENU CLASSIQUE DU FOOTER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-4">
          
          {/* Bloc 1: Identité & Slogan Assurances */}
          <div className="col-span-1">
            <h3 className="text-2xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#00A3E0] via-[#CE1126] to-[#E5B200] dark:to-[#FDD100] text-transparent bg-clip-text tracking-wide uppercase font-black">
                DRC Assurances
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-bold italic">
              "Votre partenaire de confiance pour la protection de votre famille et de vos biens en RDC, connectant la diaspora au réseau local."
            </p>
            {/* Ligne aux couleurs nationales */}
            <div className="mt-6 flex gap-1">
              <div className="h-1 w-7 bg-[#00A3E0] rounded-full"></div>
              <div className="h-1 w-4 bg-[#CE1126] rounded-full"></div>
              <div className="h-1 w-2 bg-[#FDD100] rounded-full"></div>
            </div>
          </div>

          {/* Bloc 2: Navigation Révisée Écosystème */}
          <div className="text-left">
            <h4 className="text-slate-900 dark:text-white font-black mb-6 uppercase text-[10px] tracking-[0.2em] text-[#007cb0] dark:text-[#00A3E0]">Plateforme</h4>
            <ul className="space-y-3 text-xs font-black uppercase tracking-wider">
              <li><Link to="/" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Accueil</Link></li>
              <li><Link to="/services" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Nos Formules</Link></li>
              <li><Link to="/checkout" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Espace Diaspora</Link></li>
              <li><Link to="/urgences-contact" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Contact rapide</Link></li>
              <li><Link to="/partenaire" className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">Portail Professionnel</Link></li>
            </ul>
          </div>

          {/* Bloc 3: Contact & Régulation RDC */}
          <div className="text-left">
            <h4 className="text-slate-900 dark:text-white font-black mb-6 uppercase text-[10px] tracking-[0.2em] text-[#007cb0] dark:text-[#00A3E0]">Siège Social</h4>
            <ul className="space-y-3 text-xs font-bold">
              <li className="flex items-center gap-3">
                <div className="text-[#00A3E0]"><FaEnvelope size={14} /></div>
                <span className="text-slate-700 dark:text-slate-300 break-all font-black">contact@drcassurances.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="text-emerald-500"><FaWhatsapp size={14} /></div>
                <span className="text-slate-700 dark:text-slate-300 font-black">Gombe, Kinshasa, RD Congo</span>
              </li>
              <li className="mt-5 flex flex-col gap-1.5">
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1.5">
                  <FaShieldAlt className="text-[#E5B200] dark:text-[#FDD100]" /> Régulation ARCA
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Opérations technologiques conformes au Code des Assurances en vigueur en RDC.
                </span>
              </li>
            </ul>
          </div>

          {/* Bloc 4: Réseaux Sociaux & Impact */}
          <div className="text-left md:text-right">
            <h4 className="text-slate-900 dark:text-white font-black mb-6 uppercase text-[10px] tracking-[0.2em] text-[#007cb0] dark:text-[#00A3E0]">Suivre notre actualité</h4>
            <div className="flex justify-start md:justify-end gap-2.5">
              {contact && contact.map((item) => {
                const Icon = socialIcons[item.label];
                if (!Icon) return null;
                return (
                  <a 
                    key={item.label} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title={item.label} 
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <p className="mt-6 text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest leading-relaxed">
              Écosystème d'inclusion financière <br />et de traçabilité panafricain.
            </p>
          </div>
        </div>

        {/* ================= BARRE DE COPYRIGHT FINALE ================= */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black tracking-[0.18em] uppercase text-center md:text-left leading-relaxed">
            © {currentYear} DRC Assurances <span className="mx-2 hidden md:inline text-slate-300 dark:text-slate-700">|</span> <br className="md:hidden" /> Solutions Numériques et Micro-Assurances en RDC
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-600">
            <button className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors cursor-pointer">Mentions Légales</button>
            <button className="hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors cursor-pointer">Confidentialité</button>
          </div>
        </div>

      </div>
    </footer>
  );
}

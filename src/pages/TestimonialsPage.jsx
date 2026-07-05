import React from 'react';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import { FaQuoteLeft, FaStar, FaUserCircle } from 'react-icons/fa';

export default function TestimonialsPage() {
  const reviews = [
    { 
      name: "Christian M.", 
      role: "Diaspora (Bruxelles)", 
      text: "Grâce au pack Santé Maman, ma maman est prise en charge à Kinshasa sans que je n'aie à envoyer d'argent en urgence par agence de transfert. Service irréprochable et instantané." 
    },
    { 
      name: "Sarah K.", 
      role: "Assurée locale (Lubumbashi)", 
      text: "J'ai présenté mon QR code WhatsApp à la clinique après mon accident de voiture. DRC Assurances a validé mon dossier et pris en charge mes frais en moins de 10 minutes." 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Barre de navigation sécurisée */}
      <NavbarSecured />
      
      <main className="flex-grow max-w-5xl mx-auto px-6 py-20 pt-28 text-center">
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tight text-slate-900 dark:text-white">
          Témoignages de nos Assurés
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-12 text-sm md:text-base">
          Découvrez les retours de la diaspora et de nos bénéficiaires en RD Congo.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-left relative">
              <FaQuoteLeft className="text-[#00A3E0]/20 text-4xl absolute top-4 right-4" />
              <div className="flex gap-1 text-[#FDD100] mb-3">
                {[...Array(5)].map((_, idx) => <FaStar key={idx} size={14} />)}
              </div>
              <p className="text-slate-700 dark:text-slate-300 italic mb-4 text-sm leading-relaxed">
                "{rev.text}"
              </p>
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-[#00A3E0]" size={32} />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Pied de page institutionnel */}
      <Footer />
    </div>
  );
}

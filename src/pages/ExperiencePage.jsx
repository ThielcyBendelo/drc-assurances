import React from 'react';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import { 
  FaBalanceScale, FaShieldAlt, FaCertificate, FaGavel, 
  FaCheckCircle, FaUserShield, FaBuilding, FaHandshake 
} from 'react-icons/fa';

export default function ExperiencePage() {
  
  const pillars = [
    {
      icon: <FaGavel className="text-[#00A3E0] text-3xl" />,
      title: "Légalisation & Code des Assurances",
      description: "Conformément à la Loi n° 15/005 portant Code des Assurances en RDC, le marché est totalement libéralisé. DRC Assurances opère en étroite collaboration avec des compagnies agréées pour garantir la validité juridique absolue de chaque contrat."
    },
    {
      icon: <FaCertificate className="text-[#FDD100] text-3xl" />,
      title: "Régulation par l'ARCA",
      description: "L'Autorité de Régulation et de Contrôle des Assurances (ARCA) veille à la protection des assurés et à la solidité financière des acteurs. Toutes les formules commercialisées sur notre écosystème numérique respectent les tarifs et obligations réglementaires."
    },
    {
      icon: <FaUserShield className="text-[#CE1126] text-3xl" />,
      title: "Garantie des Fonds & Tiers-Payant",
      description: "Vos primes sont sécurisées et cantonnées sur des comptes de dépôt réglementés. En cas de sinistre, le règlement des prestations s'effectue directement auprès des hôpitaux et garages partenaires sans aucune avance de frais pour vos bénéficiaires."
    }
  ];

  const obligations = [
    "Assurance Frontière Terrestre & Maritime",
    "Assurance Responsabilité Civile Automobile (Obligatoire ARCA)",
    "Assurance Risques de Construction & Incendie",
    "Assurance Faculté à l'Importation (Transport des marchandises)"
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

      {/* En-tête Institutionnel aux couleurs de la RDC */}
      <header className="bg-gradient-to-br from-[#0C1E36] to-[#11294A] text-white px-6 py-20 pt-28 text-center border-b-4 border-[#00A3E0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00A3E0_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-[#00A3E0]/20 text-[#00A3E0] text-xs font-bold uppercase tracking-widest border border-[#00A3E0]/30 inline-flex items-center gap-2 mb-4">
            <FaBalanceScale /> Conformité Réglementaire & Transparence
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Le Cadre Légal de l'Assurance en <span className="text-[#FDD100]">RD Congo</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            DRC Assurances apporte de la transparence, de la sécurité et de la traçabilité au marché congolais pour offrir à la diaspora un outil d'investissement et de protection fiable.
          </p>
        </div>
      </header>

      {/* Les Piliers de la Conformité */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full space-y-16">
        
        {/* Section 1 : Grille des Piliers */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-start gap-4 hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Section 2 : Focus assurances obligatoires en RDC */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-black uppercase text-[#00A3E0] tracking-wider bg-[#00A3E0]/10 px-3 py-1 rounded-md mb-3 inline-block">
              Rappel de la Loi
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
              Les Assurances Strictement Obligatoires (Loi ARCA)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              L'Autorité de Régulation (ARCA) rappelle de manière stricte aux résidents et aux entreprises l'obligation de souscrire leurs polices auprès de structures enregistrées localement en RDC sous peine de sanctions financières majeures.
            </p>
            <div className="flex gap-4 items-center border-t border-slate-100 dark:border-slate-800 pt-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-[#00A3E0] flex items-center justify-center text-white border-2 border-white dark:border-slate-900"><FaBuilding size={14} /></div>
                <div className="w-10 h-10 rounded-full bg-[#FDD100] flex items-center justify-center text-slate-900 border-2 border-white dark:border-slate-900"><FaHandshake size={14} /></div>
              </div>
              <p className="text-xs font-bold text-slate-500 max-w-xs">
                Une synergie technologique au service de la conformité et de l'inclusion financière.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 p-6 md:p-8 rounded-xl border border-slate-100 dark:border-slate-800/80">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              <FaShieldAlt className="text-[#00A3E0]" /> Liste de Contrôle ARCA
            </h4>
            <ul className="space-y-4">
              {obligations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

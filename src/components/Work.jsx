import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaMoneyBillWave, FaPercentage, FaWallet, FaArrowRight, FaDownload, FaPlusCircle } from 'react-icons/fa';

// Indicateurs clés de rentabilité M-DELICE Abidjan
const indicateursFinanciers = [
  {
    nom: "Chiffre d'Affaires Brut",
    description: "Total des ventes enregistrées sur la vitrine et les commandes spéciales (Cake Design).",
    valeur: "4 250 000 FCFA",
    icon: <FaChartLine />,
    couleur: "text-amber-700 dark:text-amber-400"
  },
  {
    nom: "Coûts Matières (Food Cost)",
    description: "Dépenses cumulées pour l'achat des ingrédients de laboratoire (Beurre AOP, Chocolat, Fruits).",
    valeur: "1 450 000 FCFA",
    icon: <FaMoneyBillWave />,
    couleur: "text-orange-500"
  },
  {
    nom: "Marge Bénéficiaire Nette",
    description: "Taux de rentabilité réel de l'atelier après déduction des charges et matières premières.",
    valeur: "65.8 %",
    icon: <FaPercentage />,
    couleur: "text-emerald-600 dark:text-emerald-400"
  },
  {
    nom: "Trésorerie Disponible",
    description: "Fonds liquides sécurisés disponibles pour les prochains réapprovisionnements.",
    valeur: "2 800 000 FCFA",
    icon: <FaWallet />,
    couleur: "text-amber-900 dark:text-amber-500"
  }
];

// Flux de caisse récent de l'atelier
const transactionsRecentes = [
  { id: 1, detail: "Acompte Pièce Montée Mariage (Riviera)", type: "credit", montant: "+250 000 F", date: "06/06/2026" },
  { id: 2, detail: "Achat Beurre & Crème (Distri-Ivoire)", type: "debit", montant: "-180 000 F", date: "05/06/2026" },
  { id: 3, detail: "Ventes du jour Comptoir (Viennoiseries)", type: "credit", montant: "+95 000 F", date: "04/06/2026" },
  { id: 4, detail: "Commande Emballages & Boîtes Gâteaux", type: "debit", montant: "-60 000 F", date: "03/06/2026" },
];

export default function Finances() {
  const navigate = useNavigate();
  const [journalCaisse, setJournalCaisse] = useState(transactionsRecentes);

  const handleExportData = () => {
    // Logique d'exportation Excel / PDF comptable
    alert("Génération et téléchargement du grand livre comptable (Format CSV)...");
  };

  return (
    <section id="finances" className="py-28 px-6 bg-stone-50 dark:bg-stone-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. EN-TÊTE DU DASHBOARD FINANCIER */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs"
          >
            Suivi comptable & Rentabilité
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-6xl font-black text-stone-950 dark:text-white font-serif mt-4 tracking-tight"
          >
            Gestion <span className="text-amber-700 dark:text-amber-400">Financière</span>
          </motion.h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full mt-6"></div>
          <p className="text-xl text-stone-600 dark:text-stone-300 mt-8 max-w-3xl mx-auto leading-relaxed">
            Analysez la santé commerciale de la pâtisserie M-DELICE. Maîtrisez vos coûts d'exploitation et optimisez vos marges sur chaque entremet produit.
          </p>
        </div>

        {/* 2. GRILLE DES MESURES ANALYTIQUES */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {indicateursFinanciers.map((indicator, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-stone-900 rounded-[30px] border border-stone-100 dark:border-stone-800 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase text-stone-400 font-bold tracking-wider">
                    {indicator.nom}
                  </span>
                  <div className={`text-2xl ${indicator.couleur}`}>
                    {indicator.icon}
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-black text-stone-950 dark:text-white font-sans">
                  {indicator.valeur}
                </p>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-4 leading-relaxed border-t border-stone-50 dark:border-stone-800 pt-3">
                {indicator.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 3. HISTORIQUE DES ENTRÉES/SORTIES (JOURNAL DE CAISSE) */}
        <div className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-[40px] p-6 md:p-10 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-stone-950 dark:text-white font-serif">Flux de Trésorerie Récent</h3>
              <p className="text-xs text-stone-400 uppercase tracking-wider mt-1">Derniers encaissements et décaissements de l'atelier</p>
            </div>
            <button 
              onClick={handleExportData}
              className="px-5 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-amber-800 hover:text-white text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
            >
              <FaDownload /> Exporter le rapport
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100 dark:border-stone-800 text-[10px] uppercase text-stone-400 font-bold tracking-widest">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Libellé Transaction</th>
                  <th className="pb-4 text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50 dark:divide-stone-800 text-sm font-medium">
                {journalCaisse.map((transac) => (
                  <tr key={transac.id} className="text-stone-700 dark:text-stone-300 hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                    <td className="py-4 text-xs font-mono text-stone-400">{transac.date}</td>
                    <td className="py-4 font-serif text-base text-stone-900 dark:text-stone-100">{transac.detail}</td>
                    <td className={`py-4 text-right font-black ${
                      transac.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                    }`}>
                      {transac.montant}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. LIEN INTERNE COMPLEMENTAIRE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          className="mt-16 text-center"
        >
          <button 
            onClick={() => navigate('/skills')} 
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-500 transition-all duration-300 shadow-xl"
          >
            <FaPlusCircle /> Ajuster les coûts depuis le stock
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
          <p className="mt-4 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
            Vérifiez l'impact des variations du prix des ingrédients sur vos bénéfices
          </p>
        </motion.div>

      </div>
    </section>
  );
}

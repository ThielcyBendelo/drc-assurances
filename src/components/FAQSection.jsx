import React from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion"; // ✅ AJOUTÉ : Import indispensable pour faire fonctionner <motion.button>
import { FaChevronDown, FaQuestionCircle, FaShieldAlt } from "react-icons/fa";

const faqs = [
  {
    question: "Comment fonctionne l'achat d'assurance pour un proche en RDC depuis l'étranger ?",
    answer: "C'est très simple. Depuis notre plateforme (Espace Diaspora), vous sélectionnez la formule adaptée (Santé, Auto, Scolaire), vous renseignez les coordonnées de votre bénéficiaire en RDC et vous payez par carte bancaire. Votre proche reçoit instantanément sa carte virtuelle par WhatsApp/SMS.",
  },
  {
    question: "DRC Assurances est-elle agréée par les autorités de régulation ?",
    answer: "Absolument. Chez DRC Assurances, toutes nos offres et nos partenaires assureurs opèrent en stricte conformité avec la législation locale et bénéficient des agréments officiels de l'ARCA (Autorité de Régulation et de Contrôle des Assurances en RDC).",
  },
  {
    question: "Quels sont les moyens de paiement acceptés pour la Diaspora et en RDC ?",
    answer: "Pour la diaspora (Europe, Amérique, Asie), nous acceptons les paiements sécurisés par Carte Bancaire, Stripe et PayPal. Pour les usagers locaux ou les renouvellements en RDC, la plateforme intègre les principaux réseaux de Mobile Money (M-Pesa, Orange Money, Airtel Money).",
  },
  {
    question: "Comment le bénéficiaire à Kinshasa peut-il se faire soigner ou utiliser son assurance ?",
    answer: "Lorsqu'il se rend dans l'un de nos hôpitaux ou centres médicaux partenaires, le bénéficiaire présente simplement son numéro de police ou le QR Code reçu sur son téléphone. L'établissement vérifie ses droits en temps réel sur son portail et prend le patient en charge sans frais avancés, dans la limite de son plafond.",
  },
  {
    question: "Quel est le délai de traitement en cas de sinistre ou d'accident ?",
    answer: "Les télé-déclarations de sinistres s'effectuent directement depuis l'application en téléchargeant les justificatifs (photos, ordonnances). Notre équipe analyse le dossier sous 24 à 48 heures, et les indemnisations ou règlements aux prestataires s'exécutent en moins de 7 jours ouvrés.",
  },
];

function FAQSection() {
  const navigate = useNavigate(); 

  return (
    // ✅ CORRIGÉ : Le commentaire a été retiré de cette zone sensible pour éliminer l'erreur "Unexpected token" de Vite
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-950 font-sans select-none" id="faq">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* En-tête de la section adapté au style premium */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/90 dark:bg-slate-900/90 text-[#007cb0] dark:text-[#00A3E0] rounded-xl border border-slate-200 dark:border-slate-800 mb-4 shadow-sm">
            <FaQuestionCircle size={22} className="text-[#CE1126]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-red-600 dark:text-white mb-4 tracking-tight">
            Foire Aux Questions
          </h2>
          <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-bold">
            Des questions sur nos couvertures, le tunnel de paiement de la diaspora ou le réseau d'hôpitaux partenaires en RDC ? Retrouvez toutes nos réponses.
          </p>
        </div>

        {/* Liste des FAQs avec effets visuels fluides */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details 
              key={idx} 
              className="group bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/60 dark:border-slate-800/80 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <summary className="flex items-center justify-between font-black text-slate-800 dark:text-slate-100 cursor-pointer p-6 list-none select-none">
                <span className="text-sm md:text-base pr-4 leading-snug">{faq.question}</span>
                <div className="text-[#00A3E0] dark:text-[#FDD100] transition-transform duration-300 group-open:rotate-180 shrink-0">
                  <FaChevronDown size={14} />
                </div>
              </summary>
              <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/40 pt-4 font-semibold">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* CTA d'aide institutionnelle en verre poli (Glassmorphism) */}
        <div className="mt-8 text-center p-6 md:p-10 bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-800/40 shadow-2xl relative overflow-hidden flex flex-col items-center space-y-4">
          
          <div className="absolute -right-10 -bottom-10 opacity-5 text-slate-400 dark:text-white pointer-events-none">
            <FaShieldAlt size={180} />
          </div>
          
          <h3 className="text-lg md:text-xl font-black tracking-tight text-slate-900 dark:text-white relative z-10">
            Besoin d'une formule sur-mesure pour votre entreprise ?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 italic text-xs md:text-sm font-bold relative z-10 max-w-xl">
            Nos conseillers techniques ARCA sont disponibles pour concevoir vos contrats Flotte ou Santé Collective.
          </p>
          
          {/* Bouton transactionnel avec adaptation colorimétrique stricte du texte */}
          <motion.button 
            whileHover={{ y: -3, scale: 1.015, transition: { type: "spring", stiffness: 400, damping: 10 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/urgences-contact')} 
            className="px-8 py-3.5 bg-[#00A3E0] dark:bg-[#FDD100] text-white dark:text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg border-b-4 border-[#006a94] dark:border-[#cda900] relative z-10 cursor-pointer"
          >
            Contacter un conseiller RDC
          </motion.button>
        </div>

      </div>
    </section>
  );
}

export default FAQSection;

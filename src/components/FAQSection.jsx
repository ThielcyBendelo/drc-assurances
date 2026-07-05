import React from "react";
import { useNavigate } from "react-router-dom"; // ⚡ FIX : Import du système de navigation
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
  const navigate = useNavigate(); // ⚡ FIX : Initialisation du hook de navigation

  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-950" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête de la section aux couleurs de la RDC */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-[#00A3E0]/10 text-[#00A3E0] rounded-full mb-4">
            <FaQuestionCircle size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-serif mb-4 uppercase tracking-tight">
            Foire Aux Questions
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Des questions sur nos couvertures, le tunnel de paiement de la diaspora ou le réseau d'hôpitaux partenaires en RDC ? Retrouvez toutes nos réponses.
          </p>
        </div>

        {/* Liste des FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details 
              key={idx} 
              className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <summary className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-100 cursor-pointer p-6 list-none select-none">
                <span className="text-base md:text-lg pr-4">{faq.question}</span>
                <div className="text-[#00A3E0] dark:text-[#FDD100] transition-transform duration-300 group-open:rotate-180">
                  <FaChevronDown />
                </div>
              </summary>
              <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed border-t border-slate-50 dark:border-slate-800/50 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* CTA d'aide institutionnelle */}
        <div className="mt-12 text-center p-8 bg-gradient-to-br from-[#0C1E36] to-[#11294A] rounded-2xl text-white shadow-xl relative overflow-hidden border-b-4 border-[#00A3E0]">
          <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none">
            <FaShieldAlt size={200} />
          </div>
          <h3 className="text-xl font-bold mb-2 relative z-10">Besoin d'une formule sur-mesure pour votre entreprise ?</h3>
          <p className="text-slate-300 mb-6 italic text-sm md:text-base relative z-10">Nos conseillers techniques ARCA sont disponibles pour concevoir vos contrats Flotte ou Santé Collective.</p>
          
          {/* ⚡ FIX : onClick modifié pour rediriger vers la route configurée dans App.jsx */}
          <button 
            onClick={() => navigate('/urgences-contact')} 
            className="px-8 py-3 bg-[#00A3E0] hover:bg-[#0082B3] text-white rounded-xl font-bold transition-all shadow-md transform hover:scale-105 relative z-10"
          >
            Contacter un conseiller RDC
          </button>
        </div>

      </div>
    </section>
  );
}

export default FAQSection;

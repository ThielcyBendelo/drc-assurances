import React from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "Quel est le délai pour commander un gâteau sur mesure (Cake Design) ?",
    answer: "Pour les gâteaux d'anniversaire personnalisés et le Cake Design, nous recommandons de passer commande au moins 3 à 5 jours à l'avance. Pour les pièces montées de mariage et grands événements à Abidjan, un délai de 2 semaines est idéal pour garantir une création parfaite.",
  },
  {
    question: "Livrez-vous dans toutes les communes d'Abidjan ?",
    answer: "Oui, nous livrons vos douceurs dans toutes les communes d'Abidjan (Cocody, Marcory, Zone 4, Riviera, Yopougon, Plateau, etc.). Nos livraisons sont effectuées en véhicule climatisé pour garantir la fraîcheur et l'état impeccable de vos gâteaux jusqu'à votre table.",
  },
  {
    question: "Proposez-vous des options sans gluten ou allégées en sucre ?",
    answer: "Absolument. Chez M-DELICE, nous tenons à ce que tout le monde puisse se faire plaisir. Nous concevons sur demande des entremets et gâteaux d'anniversaire adaptés à vos exigences alimentaires (sans gluten, sans lactose ou avec index glycémique réduit).",
  },
  {
    question: "Gérez-vous le service traiteur sucré pour les événements d'entreprise ?",
    answer: "Oui, nous proposons des formules sur mesure pour les professionnels à Abidjan : buffets de mignardises, pauses-café avec mini-viennoiseries de prestige, et gâteaux corporate logotés pour vos lancements de produits ou anniversaires d'entreprise.",
  },
  {
    question: "Comment puis-je valider ma commande et payer ?",
    answer: "Vous pouvez commander directement via la vitrine de ce site web. Pour les gâteaux sur mesure, un échange via WhatsApp ou un dépôt à notre atelier valide la commande. Nous acceptons les paiements par Mobile Money (Orange, Wave, MTN), cartes bancaires et espèces.",
  },
];

function FAQSection() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-stone-950" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête de la section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 text-amber-700 rounded-full mb-4">
            <FaQuestionCircle size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-amber-950 font-serif mb-4 uppercase tracking-tight">
            Foire Aux Questions
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Des questions sur nos créations gourmandes, nos livraisons à Abidjan ou vos commandes personnalisées ? Retrouvez toutes nos réponses.
          </p>
        </div>

        {/* Liste des FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details 
              key={idx} 
              className="group bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <summary className="flex items-center justify-between font-bold text-amber-950 font-serif cursor-pointer p-6 list-none select-none">
                <span className="text-lg md:text-xl pr-4">{faq.question}</span>
                <div className="text-orange-500 transition-transform duration-300 group-open:rotate-180">
                  <FaChevronDown />
                </div>
              </summary>
              <div className="px-6 pb-6 text-stone-600 text-lg leading-relaxed border-t border-stone-50 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* CTA d'aide supplémentaire */}
        <div className="mt-12 text-center p-8 bg-amber-950 rounded-[40px] text-white shadow-2xl">
          <h3 className="text-xl font-bold mb-2">Une demande spécifique pour un événement ?</h3>
          <p className="text-amber-200 mb-6 italic">Notre équipe d'artisans pâtissiers est à votre entière disposition.</p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
            className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-full font-bold transition-colors shadow-md hover:shadow-orange-500/20"
          >
            Contactez notre atelier
          </button>
        </div>

      </div>
    </section>
  );
}

export default FAQSection;

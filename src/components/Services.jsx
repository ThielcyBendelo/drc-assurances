import React, { useState } from "react";
import QuoteModal from "./QuoteModal"; // Conservé si vous l'utilisez pour un formulaire de devis sur-mesure
import { FaUtensils, FaBirthdayCake, FaCookie, FaCoffee, FaWhatsapp, FaCheckCircle, FaExclamationTriangle, FaFileInvoice } from "react-icons/fa";
import { vitrine1, vitrine2, vitrine3, vitrine4 } from "../assets/assets";

// Catalogue des créations M-DELICE avec l'ajout des images
const itemsCatalogue = [
  {
    title: "Le Royal Chocolat",
    category: "entremets",
    icon: <FaUtensils />,
    image: vitrine1, // Exemple d'image chocolat fin
    description: "Biscuit croustillant praliné, mousse légère au chocolat noir 64% et son glaçage miroir brillant.",
    details: "Disponible en formats 4, 6 ou 8 parts. Idéal pour les repas de fête et les amateurs de cacao intense.",
    tags: ["Chocolat Fin", "Croustillant", "Best-Seller", "Fait Maison"],
    price: "18 000 FCFA",
    inStock: true,
  },
  {
    title: "Cake Design Anniversaire Prestige",
    category: "cake-design",
    icon: <FaBirthdayCake />,
    image: vitrine2, // Exemple d'image gâteau design coloré
    description: "Gâteau d'exception entièrement personnalisé, saveurs au choix (Vanille/Fraise, Chocolat/Caramel).",
    details: "Décorations faites à la main en pâte à sucre. Nécessite une commande préalable de 3 jours minimum.",
    tags: ["Sur Mesure", "Événement", "Personnalisé", "Artisanal"],
    price: "Sur Devis",
    inStock: false, // Uniquement sur commande
  },
  {
    title: "Croissant Pur Beurre AOP",
    category: "viennoiseries",
    icon: <FaCookie />,
    image: vitrine3, // Exemple d'image viennoiserie feuilletée
    description: "Feuilletage traditionnel inversé au beurre de baratte, croustillant à l'extérieur et fondant à l'intérieur.",
    details: "Cuit sur place chaque matin dans notre atelier à Abidjan pour vos petits-déjeuners gourmands.",
    tags: ["Pur Beurre", "Frais du Jour", "Tradition"],
    price: "1 500 FCFA",
    inStock: true,
  },
  {
    title: "Café Latte Gourmand & Caramel",
    category: "boissons",
    icon: <FaCoffee />,
    image: vitrine4, // Exemple d'image boisson café gourmand
    description: "Espresso de spécialité locale, lait velouté et coulis de caramel beurre salé maison.",
    details: "Servi chaud ou frappé selon vos envies pour accompagner votre pause douceur à la boutique.",
    tags: ["Café Local", "Caramel Maison", "Fraîcheur"],
    price: "2 500 FCFA",
    inStock: true,
  },
];

// Catégories disponibles pour les filtres
const categories = [
  { id: "tous", label: "Tout Voir" },
  { id: "entremets", label: "Entremets & Tartes" },
  { id: "cake-design", label: "Cake Design" },
  { id: "viennoiseries", label: "Viennoiseries" },
  { id: "boissons", label: "Cafétéria" },
];

export default function Vitrine() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [activeFilter, setActiveFilter] = useState("tous");

  // Filtrer les produits en fonction de l'onglet actif
  const filteredItems = activeFilter === "tous" 
    ? itemsCatalogue 
    : itemsCatalogue.filter(item => item.category === activeFilter);

  // Générateur de lien WhatsApp automatique
  const handleWhatsAppOrder = (productName) => {
    const phoneNumber = "22500000000"; // Remplacez par le vrai numéro WhatsApp de M-DELICE
    const message = encodeURIComponent(`Bonjour M-DELICE, je souhaite commander ou avoir des informations sur le produit : ${productName}`);
    window.open(`https://wa.me{phoneNumber}?text=${message}`, "_blank");
  };

  const handleQuoteClick = (productName) => {
    setSelectedService(productName);
    setModalOpen(true);
  };

  return (
    <section id="vitrine" className="py-24 px-10 bg-stone-50 dark:bg-stone-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de section rafraîchi */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-amber-950 dark:text-amber-400 font-serif uppercase tracking-tight">
            Notre Vitrine Gourmande
          </h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full mt-4"></div>
          <p className="text-xl text-stone-600 dark:text-stone-300 font-medium max-w-3xl mx-auto mt-6 italic">
            "Succombez à nos pâtisseries d'exception et créations artisanales élaborées chaque jour au cœur d'Abidjan."
          </p>
        </div>

        {/* Barre de Filtrage par Catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase transition-all shadow-sm ${
                activeFilter === cat.id
                  ? "bg-amber-800 text-white shadow-amber-800/20"
                  : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille du catalogue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-stone-900 rounded-[40px] shadow-sm flex flex-col border border-stone-100 dark:border-stone-850 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden"
            >
              
              {/* ZONE IMAGE AJOUTÉE : Hauteur fixe, zoom au survol et gestion adaptative */}
              <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent pointer-events-none" />
              </div>

              {/* Corps de la carte (Contenu original conservé intact) */}
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-5xl text-orange-500 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  {/* Badge d'état de stock ou prix */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-4 py-1.5 bg-stone-50 dark:bg-stone-800 rounded-full text-amber-800 dark:text-amber-400 text-sm font-black shadow-sm border border-stone-100 dark:border-stone-700">
                      {item.price}
                    </span>
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.inStock ? "bg-green-100 text-green-800" : "bg-amber-150 text-amber-800"
                    }`}>
                      {item.inStock ? <FaCheckCircle /> : <FaExclamationTriangle />}
                      {item.inStock ? "En stock" : "Sur commande"}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-4 text-stone-900 dark:text-white font-serif leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-stone-600 dark:text-stone-300 mb-6 text-lg leading-relaxed">
                  {item.description}
                </p>

                {/* Bloc Détails / Recettes / Composition */}
                <div className="mb-6 p-5 bg-stone-50 dark:bg-stone-850 rounded-3xl text-sm text-stone-700 dark:text-stone-300 border border-stone-100 dark:border-stone-800">
                  <span className="block text-stone-400 dark:text-stone-500 mb-2 uppercase tracking-widest text-[10px] font-bold">
                    Détails & Conseils de dégustation :
                  </span>
                  {item.details}
                </div>

                {/* Mots-clés / Caractéristiques */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="flex items-center gap-1 bg-amber-950 dark:bg-amber-500 text-white dark:text-stone-950 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wider"
                    >
                      <FaCheckCircle className="text-[10px]" /> {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto space-y-3">
                  {/* Bouton Principal : Commande immédiate via WhatsApp */}
                  <button 
                    onClick={() => handleWhatsAppOrder(item.title)} 
                    className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-amber-800 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp size={22} /> Commander via WhatsApp
                  </button>

                  {/* Bouton Secondaire : Formulaire ou demande de devis sur mesure */}
                 {item.price === "Sur Devis" && (
  <button 
    onClick={() => handleQuoteClick(item.title)} // ✅ Corrigé : On appelle la bonne fonction déclarée plus haut
    className="w-full py-3 border-2 border-amber-900 dark:border-amber-500 text-amber-900 dark:text-amber-500 rounded-2xl font-bold hover:bg-amber-50 dark:hover:bg-stone-800 transition-all duration-300"
  >
    Demander un devis personnalisé
  </button>
)}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

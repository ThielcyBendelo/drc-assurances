import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import background1 from '../assets/background1.png';
// Icônes unifiées pour la grille des prestataires, la notation et les liens sociaux/web
import { 
  FaHospital, FaWrench, FaMapMarkerAlt, FaPhoneAlt, 
  FaCheckCircle, FaSearch, FaBriefcaseMedical, FaStar,
  FaGlobe, FaWhatsapp, FaRoute 
} from 'react-icons/fa';


// Simulation des données du réseau de soins agréé ARCA en RDC
const partnersNetwork = [
  {
    id: 1,
    name: "Centre Médical de Kinshasa (CMK)",
    city: "Kinshasa",
    district: "Gombe",
    type: "Santé",
    specialty: "Hôpital Général & Urgences",
    phone: "+243 817 000 000",
    address: "Avenue de la Justice, Gombe",
    rating: 4.8,
    features: ["Tiers-Payant Activé", "Urgences 24h/7", "Pharmacie Agréée"]
  },
  {
    id: 2,
    name: "Cliniques Universitaires de Lubumbashi",
    city: "Lubumbashi",
    district: "Mutoshi",
    type: "Santé",
    specialty: "Spécialités Médicales & Chirurgie",
    phone: "+243 997 000 000",
    address: "Route Kasapa, Lubumbashi",
    rating: 4.5,
    features: ["Tiers-Payant Activé", "Pédiatrie", "Maternité Prise en Charge"]
  },
  {
    id: 3,
    name: "Hôpital HEAL Africa",
    city: "Goma",
    district: "Les Volcans",
    type: "Santé",
    specialty: "Urgences & Soins Intensifs",
    phone: "+243 857 000 000",
    address: "Avenue du Rond-Point, Goma",
    rating: 4.6,
    features: ["Tiers-Payant Activé", "Traumatologie", "Scanner 3D"]
  },
  {
    id: 4,
    name: "Garage CFAO Motors Kinshasa",
    city: "Kinshasa",
    district: "Limete",
    type: "Automobile",
    specialty: "Réparation & Maintenance Flotte",
    phone: "+243 815 000 000",
    address: "Boulevard Lumumba, Limete",
    typeLabel: "Garage Agréé ARCA",
    rating: 4.7,
    features: ["Prise en charge Directe", "Pièces d'Origine", "Expertise Sinistre"]
  }
];

export default function ProjectsPage() {
  const [selectedCity, setSelectedCity] = useState("Tous");
  const [selectedType, setSelectedType] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const cities = ["Tous", "Kinshasa", "Lubumbashi", "Goma"];
  const types = ["Tous", "Santé", "Automobile"];

  // Filtrage combiné (Ville + Type + Recherche par nom)
  const filteredPartners = partnersNetwork.filter(partner => {
    const matchCity = selectedCity === "Tous" || partner.city === selectedCity;
    const matchType = selectedType === "Tous" || partner.type === selectedType;
    const matchSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        partner.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

{/* En-tête de la cartographie des prestataires unifié et premium */}
<header className="relative bg-slate-100 dark:bg-slate-950 px-6 py-24 pt-32 text-center border-b-4 border-[#00A3E0] overflow-hidden font-sans select-none">
  
  {/* 1. L'IMAGE D'ARRIÈRE-PLAN LUMINEUSE ET TOTALEMENT VISIBLE (100% OPACITÉ) */}
  <div className="absolute  inset-0 z-0 ">
    <img 
      src={background1} 
      alt="DRC Assurances Network Background" 
      className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-700"
    />
    {/* ✅ LES OVERLAYS SOMBRES ONT ÉTÉ ENLEVÉS : Dégradé fluide de transition uniquement vers le bas de page */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-slate-100 dark:from-slate-950/10 dark:via-transparent dark:to-slate-950" />
  </div>

  {/* 2. LE MOTIF DE GRILLE EXISTANT (Superposé discrètement) */}
  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] dark:opacity-5 [background-size:24px_24px] pointer-events-none z-1" />

  {/* 3. LE CONTENU CENTRAL EMBALLÉ DANS UN COMPOSANT DE VERRE PREMIUM */}
  <div className="relative z-10 max-w-5xl mx-auto p-6 md:p-10 bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-800/40 shadow-2xl space-y-6 flex flex-col items-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
    
    <div>
      <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-[#007cb0] dark:text-[#00A3E0] text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-800 inline-flex items-center gap-2 shadow-sm">
        <FaBriefcaseMedical className="text-[#CE1126]" /> Tiers-Payant National
      </span>
    </div>

    {/* Titre avec gestion du jaune ambré haute lisibilité en mode clair */}
    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-red-600 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
      Notre Réseau de Partenaires <br />
      <span className="text-[#E5B200] dark:text-[#FDD100] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">Agréés ARCA</span>
    </h1>

    {/* Description ajustée pour la lisibilité sur fond clair et sombre */}
    <p className="text-slate-700 dark:text-slate-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-bold">
      Pas d'avance de frais. Présentez simplement votre carte virtuelle ou votre code QR dans nos établissements partenaires en RD Congo pour être pris en charge immédiatement.
    </p>

    {/* Section Filtres Réseau avec Effet Glassmorphism Intégré */}
    <div className="mt-6 w-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-5 text-slate-800">
      
      {/* Recherche textuelle modernisée */}
      <div className="relative flex items-center group">
        <span className="absolute left-4 text-slate-400 group-focus-within:text-[#00A3E0] transition-colors duration-200 z-10">
          <FaSearch size={14} />
        </span>
        <input
          type="text"
          placeholder="Rechercher un hôpital, quartier..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black focus:outline-none focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all duration-200 shadow-inner"
        />
      </div>

      {/* Sélecteur Ville modernisé */}
      <div className="relative flex items-center">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black focus:outline-none focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer shadow-inner"
        >
          {cities.map(city => (
            <option key={city} value={city} className="dark:bg-slate-900 font-bold">
              {city === "Tous" ? "Toutes les villes" : city}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
      </div>

      {/* Sélecteur Spécialité modernisé */}
      <div className="relative flex items-center">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black focus:outline-none focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer shadow-inner"
        >
          {types.map(t => (
            <option key={t} value={t} className="dark:bg-slate-900 font-bold">
              {t === "Tous" ? "Tous les types" : t === "Santé" ? "Structures Médicales" : "Garages & Réparations"}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
      </div>

    </div>
  </div>
</header>

            {/* ================= AFFICHAGE DE LA GRILLE DES ÉTABLISSEMENTS PARTENAIRES PREMIUM ================= */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full font-sans select-none">
        {filteredPartners.length === 0 ? (
          <div className="text-center py-20 bg-white/60 dark:bg-slate-950/40 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-8">
            <div className="inline-flex p-4 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-400 mb-3 animate-pulse">
              <FaHospital size={24} />
            </div>
            <p className="text-sm font-black text-slate-700 dark:text-slate-300">
              Aucun établissement partenaire ne correspond à vos critères de recherche dans cette zone.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPartners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 400, damping: 15 } 
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.05 }}
                className="group bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/50 dark:border-slate-800/40 shadow-xl hover:shadow-2xl hover:border-[#00A3E0]/30 dark:hover:border-slate-700/60 flex flex-col justify-between h-full transition-colors duration-300 cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
              >
                <div>
                  {/* Badge d'en-tête de carte : Type d'établissement & Note */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-xl border transition-all duration-300 shadow-xs ${
                      partner.type === 'Santé' 
                        ? 'bg-red-500/10 text-[#CE1126] border-red-500/20 group-hover:bg-[#CE1126] group-hover:text-white' 
                        : 'bg-[#FDD100]/10 text-amber-600 border-[#FDD100]/20 group-hover:bg-[#FDD100] group-hover:text-slate-950'
                    }`}>
                      {partner.type === 'Santé' ? <FaHospital size={18} /> : <FaWrench size={18} />}
                    </div>
                    
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs text-xs font-black text-[#E5B200] dark:text-[#FDD100]">
                      <FaStar className="animate-pulse" /> <span>{partner.rating || "4.8"}</span>
                    </div>
                  </div>

                  {/* Identification de l'établissement */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-[#00A3E0] transition-colors duration-200">
                      {partner.name}
                    </h3>
                    <p className="text-[10px] font-black text-[#007cb0] dark:text-[#00A3E0] uppercase tracking-wider">
                      {partner.specialty}
                    </p>
                  </div>

                  {/* Coordonnées physiques, géographiques et téléphoniques */}
                  <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 border-t border-b border-slate-100 dark:border-slate-800/40 py-4 my-5 font-bold">
                    <p className="flex items-start gap-2.5">
                      <FaMapMarkerAlt size={14} className="text-[#CE1126] shrink-0 mt-0.5" /> 
                      <span className="leading-relaxed">
                        <span className="text-slate-900 dark:text-white font-black">{partner.city}</span> ({partner.district}) — {partner.address}
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5 font-mono text-slate-800 dark:text-slate-200">
                      <FaPhoneAlt size={12} className="text-emerald-500 shrink-0" /> 
                      <span>{partner.phone}</span>
                    </p>
                  </div>
                </div>

                {/* Prestations prises en charge en Tiers-Payant & Réseaux Web / Sociaux */}
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {partner.features.map((feat, index) => (
                      <span 
                        key={index} 
                        className="text-[10px] font-black uppercase tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20 flex items-center gap-1.5 shadow-xs"
                      >
                        <FaCheckCircle size={10} className="text-emerald-500" /> {feat}
                      </span>
                    ))}
                  </div>

                  {/* ================= LIENS SOCIAUX & WEB PROFESSIONNELS POUR CHAQUE PARTENAIRE ================= */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/40 flex flex-wrap items-center justify-between gap-3 w-full">
                    
                    {/* Badge d'accord technique en Tiers-Payant */}
                    <div className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-widest text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Prise en charge 100%</span>
                    </div>

                    {/* Bloc d'actions et liens de contact vers l'établissement */}
                    <div className="flex items-center gap-1.5 ml-auto">
                      {/* 1. Lien vers le site web du partenaire */}
                      <a 
                        href={partner.website || "https://drcassurances.com"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2.5 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-xl hover:text-[#00A3E0] dark:hover:text-[#FDD100] hover:border-[#00A3E0]/30 transition-all shadow-xs cursor-pointer"
                        title="Visiter le site web officiel"
                      >
                        <FaGlobe size={14} />
                      </a>

                      {/* 2. Lien direct pour envoyer un WhatsApp à l'admission */}
                      <a 
                        href={`https://wa.me{partner.phone?.replace(/[^0-9]/g, '') || '24300000000'}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2.5 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-xl hover:text-emerald-500 hover:border-emerald-500/30 transition-all shadow-xs cursor-pointer"
                        title="Contacter le bureau des entrées sur WhatsApp"
                      >
                        <FaWhatsapp size={14} />
                      </a>

                      {/* 3. Bouton principal : Itinéraire Google Maps */}
                      <a 
                        href={`https://google.com{encodeURIComponent(partner.name + ' ' + partner.city)}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-[10px] uppercase font-black tracking-wider px-3.5 py-2.5 border-b-2 border-slate-700 dark:border-slate-900 hover:bg-[#00A3E0] hover:border-[#006a94] transition-all cursor-pointer shadow-sm group/btn"
                      >
                        <FaRoute size={12} className="text-[#FDD100] group-hover/btn:text-white transition-colors" />
                        <span>Itinéraire</span>
                      </a>
                    </div>

                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}
      </main>


      <Footer />
    </div>
  );
}

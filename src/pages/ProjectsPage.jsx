import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import { 
  FaHospital, FaWrench, FaMapMarkerAlt, FaPhoneAlt, 
  FaCheckCircle, FaSearch, FaBriefcaseMedical, FaStar 
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

      {/* En-tête de la cartographie des prestataires */}
      <header className="bg-gradient-to-br from-[#0C1E36] to-[#11294A] text-white px-6 py-20 pt-28 text-center border-b-4 border-[#00A3E0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-[#00A3E0]/20 text-[#00A3E0] text-xs font-bold uppercase tracking-widest border border-[#00A3E0]/30 inline-flex items-center gap-2 mb-4">
            <FaBriefcaseMedical /> Tiers-Payant National
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Notre Réseau de Partenaires <span className="text-[#FDD100]">Agréés ARCA</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Pas d'avance de frais. Présentez simplement votre carte virtuelle ou votre code QR dans nos établissements partenaires en RD Congo pour être pris en charge immédiatement.
          </p>

          {/* Section Filtres Réseau */}
          <div className="mt-8 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-md max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-800">
            {/* Recherche textuelle */}
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400"><FaSearch size={14} /></span>
              <input
                type="text"
                placeholder="Rechercher un hôpital, quartier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
              />
            </div>

            {/* Sélecteur Ville */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
            >
              {cities.map(city => <option key={city} value={city}>{city === "Tous" ? "Toutes les villes" : city}</option>)}
            </select>

            {/* Sélecteur Spécialité */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
            >
              {types.map(t => <option key={t} value={t}>{t === "Tous" ? "Tous les types" : t === "Santé" ? "Structures Médicales" : "Garages & Réparations"}</option>)}
            </select>
          </div>
        </div>
      </header>

      {/* Affichage de la grille des établissements */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        {filteredPartners.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            Aucun établissement partenaire ne correspond à vos critères de recherche dans cette zone.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPartners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 group"
              >
                <div>
                  {/* Badge d'en-tête de carte */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${partner.type === 'Santé' ? 'bg-red-500/10 text-[#CE1126]' : 'bg-[#FDD100]/10 text-amber-600'}`}>
                      {partner.type === 'Santé' ? <FaHospital size={20} /> : <FaWrench size={20} />}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#FDD100]">
                      <FaStar /> <span>{partner.rating}</span>
                    </div>
                  </div>

                  {/* Identification */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-[#00A3E0] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs font-bold text-[#00A3E0] mb-4 uppercase tracking-wider">
                    {partner.specialty}
                  </p>

                  {/* Coordonnées physiques et téléphoniques */}
                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 border-t border-b border-slate-50 dark:border-slate-800/60 py-4 mb-4">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-slate-400" /> 
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{partner.city}</span> ({partner.district}) — {partner.address}
                    </p>
                    <p className="flex items-center gap-2 font-mono">
                      <FaPhoneAlt className="text-green-500" /> {partner.phone}
                    </p>
                  </div>
                </div>

                {/* Liste des prestations prises en charge en Tiers-Payant */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {partner.features.map((feat, index) => (
                      <span 
                        key={index} 
                        className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md flex items-center gap-1"
                      >
                        <FaCheckCircle size={10} /> {feat}
                      </span>
                    ))}
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

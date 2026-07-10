import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// Image de fond depuis vos assets
import background2 from '../assets/background2.png';
// Importation des images depuis le dossier src/assets/gallery/
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
// import image5 from '../assets/image5.png';
// import image6 from '../assets/image6.png';
// import image7 from '../assets/image7.png';
// import image8 from '../assets/image8.png';
// import image9 from '../assets/image9.png';
// import image10 from '../assets/image10.png';
// import image11 from '../assets/image11.png';


// Composants de structure
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';

// Icônes unifiées pour la galerie et les graphiques de l'écosystème d'assurance
import { 
  FaArrowLeft, FaImages, FaCamera, FaTimes, 
  FaChevronLeft, FaChevronRight, FaDownload, FaEye, FaMapMarkerAlt, 
  FaHospital, FaMap, FaCheckCircle, FaClock 
} from 'react-icons/fa';


// Banque d'images enrichie et thématisée liée aux assets de l'application
const galleryData = [
  { id: 1, category: 'Cliniques', title: 'Centre Médical de Kinshasa (CMK)', src: image1, desc: 'Validation technique et déploiement du système automatisé de Tiers-Payant.' },
  { id: 2, category: 'Cliniques', title: 'Hôpital de Référence de Lubumbashi', src: image2, desc: 'Installation des terminaux de lecture de codes QR pour cartes assurés.' },
  { id: 3, category: 'Cliniques', title: 'Clinique Ngaliema - Kinshasa', src: image3, desc: 'Formation du personnel soignant aux outils d\'authentification numérique.' },
  { id: 4, category: 'Cliniques', title: 'Centre de Soins de Goma', src: image4, desc: 'Audit de connectivité et synchronisation hors-ligne de la base de données.' },
//   { id: 5, category: 'Partenariats', title: 'Signature Institutionnelle ARCA', src: image5, desc: 'Validation de la conformité réglementaire de notre écosystème numérique.' },
//   { id: 6, category: 'Partenariats', title: 'Intégration Mobile Money Airtel & Orange', src: image6, desc: 'Signature de l\'accord technique pour le prélèvement instantané des primes.' },
//   { id: 7, category: 'Partenariats', title: 'Lancement avec l\'Association des Courtiers', src: image7, desc: 'Présentation officielle du portail courtage agréé ARCA à Kinshasa.' },
//   { id: 8, category: 'Terrain', title: 'Distribution des Cartes à Goma', src: image8, desc: 'Remise officielle des attestations d\'assurance aux flottes d\'entreprises.' },
//   { id: 9, category: 'Terrain', title: 'Équipe Logistique Matadi', src: image9, desc: 'Enrôlement biométrique des conducteurs routiers pour l\'assurance frontière.' },
//   { id: 10, category: 'Terrain', title: 'Support Mobile Kinshasa', src: image10, desc: 'Assistance permanente 24h/7 déployée dans les grandes artères de la capitale.' },
//   { id: 11, category: 'Terrain', title: 'Brigade d\'Évaluation des Sinistres', src: image11, desc: 'Constats d\'accidents géolocalisés en temps réel via l\'application d\'entreprise.' }
];

export default function Galerie() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
  const categories = ['Tous', 'Cliniques', 'Partenariats', 'Terrain'];

  const filteredItems = activeFilter === 'Tous' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeFilter);

const handleNextImage = (e) => {
  if (e && e.stopPropagation) e.stopPropagation(); // ✅ Sécurisé si absent
  setSelectedImageIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
};

const handlePrevImage = (e) => {
  if (e && e.stopPropagation) e.stopPropagation(); // ✅ Sécurisé si absent
  setSelectedImageIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
};


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col antialiased font-sans text-slate-900 dark:text-slate-100">
      <NavbarSecured />

             {/* ================= HERO HEADER ================= */}
      <header className="relative bg-white dark:bg-slate-900 text-white px-6 py-24 pt-32 text-center border-b-4 border-[#00A3E0] overflow-hidden">
        {/* Zone de Background Image Claire et Totalement Visible */}
        <div className="absolute inset-0 z-0">
          <img 
            src={background2} 
            alt="DRC Assurances Réseau" 
            className="w-full h-full object-cover object-center opacity-100" 
          />
          {/* ✅ LES FILTRES BLEUS ET SOMBRES ONT ÉTÉ ENLEVÉS ICI */}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
<Link 
  to="/" 
  className="inline-flex items-center gap-2 text-xs font-black text-[#0082B6] dark:text-[#00A3E0] bg-white/90 dark:bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-slate-300/80 dark:border-white/20 shadow-md hover:bg-[#00A3E0] hover:text-white hover:border-transparent dark:hover:bg-[#00A3E0]/20 dark:hover:text-[#00A3E0] transition-all mb-4 group cursor-pointer"
>
  <FaArrowLeft size={10} className="transform group-hover:-translate-x-0.5 transition-transform" /> 
  <span>Retour à la plateforme</span>
</Link>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight flex flex-wrap items-center justify-center gap-3 text-red-600 dark:text-white bg-white/70 dark:bg-slate-950/70 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/40 dark:border-slate-800/40 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
  <FaCamera className="text-[#00A3E0] text-3xl md:text-5xl drop-shadow-none" /> 
  <span>Médiathèque &</span> 
  <span className="text-[#E5B200] dark:text-[#FDD100] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
    Déploiements
  </span>
</h1>

          {/* Correction de la couleur du texte du paragraphe pour qu'il reste lisible sur l'image blanche */}
          <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto text-sm md:text-base font-bold leading-relaxed bg-white/60 dark:bg-slate-950/60 backdrop-blur-xs p-3 rounded-xl inline-block">
            Suivez en toute transparence nos intégrations avec le réseau médical, nos accords de conformité ARCA et l'activité de nos brigades d'assistance en RDC.
          </p>
        </div>
      </header>


                {/* ================= SECTION STATISTIQUES GRAPHICS PRO SUR MESURE ================= */}
      <section className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60 py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* En-tête de la zone Data */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Indicateurs de Performance en Temps Réel</h2>
              <p className="text-xs font-semibold text-slate-400">Écosystème numérique synchronisé sur les normes ARCA</p>
            </div>
            <div className="flex items-center gap-2 self-start bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20 text-xs font-bold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Data feed
            </div>
          </div>

          {/* Grille des Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. GRAPHIQUE CLINIQUES (Sparkline Courbe Pro) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">Cliniques Connectées</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">124</p>
                </div>
                <div className="p-2 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl"><FaHospital size={16} /></div>
              </div>
              
              {/* Graphique SVG Line */}
              <div className="h-16 w-full mt-4 flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00A3E0" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00A3E0" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 25 Q 25 20, 50 12 T 100 2" fill="none" stroke="#00A3E0" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 0 25 Q 25 20, 50 12 T 100 2 L 100 30 L 0 30 Z" fill="url(#gradientBlue)" />
                  <circle cx="100" cy="2" r="3" fill="#00A3E0" />
                </svg>
              </div>
              <p className="text-[10px] font-bold text-emerald-500 mt-2">↑ +24% ce trimestre</p>
            </div>

            {/* 2. GRAPHIQUE PROVINCES (Histogramme Bars) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">Provinces Couvertes</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">26<span className="text-xs text-slate-400">/26</span></p>
                </div>
                <div className="p-2 bg-[#FDD100]/10 text-[#FDD100] rounded-xl"><FaMap size={16} /></div>
              </div>
              
              {/* Graphique SVG Bars */}
              <div className="h-16 w-full mt-4 flex items-end justify-between gap-1.5 px-1">
                <div className="bg-slate-200 dark:bg-slate-800 w-full h-[35%] rounded-t-sm transition-all group-hover:h-[40%]"></div>
                <div className="bg-slate-200 dark:bg-slate-800 w-full h-[55%] rounded-t-sm"></div>
                <div className="bg-slate-200 dark:bg-slate-800 w-full h-[45%] rounded-t-sm"></div>
                <div className="bg-[#FDD100] w-full h-[75%] rounded-t-sm"></div>
                <div className="bg-[#FDD100] w-full h-[65%] rounded-t-sm"></div>
                <div className="bg-[#FDD100] w-full h-[100%] rounded-t-sm"></div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-2">Déploiement RDC intégral</p>
            </div>

            {/* 3. GRAPHIQUE ARCA (Donut Circulaire) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">Normes ARCA</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">100%</p>
                </div>
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl"><FaCheckCircle size={16} /></div>
              </div>
              
              {/* Graphique SVG Donut */}
              <div className="flex items-center gap-4 mt-4 h-16">
                <div className="w-14 h-14 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E2E8F0" strokeWidth="3" className="dark:stroke-slate-800" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="3.5" strokeDasharray="100 0" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-[10px] font-semibold text-slate-400 leading-tight">
                  Systèmes audités et certifiés conformes.
                </div>
              </div>
              <p className="text-[10px] font-bold text-emerald-500 mt-2">Certificat valide 2026</p>
            </div>

            {/* 4. GRAPHIQUE CONSTANTS (Sinusoïdale Fluide) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">Constats & Sinistres</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">24h/7</p>
                </div>
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl"><FaClock size={16} /></div>
              </div>
              
              {/* Graphique SVG Line Violet */}
              <div className="h-16 w-full mt-4 flex items-end">
                <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="gradientPurple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 10 Q 20 28, 40 15 T 80 5 T 100 18" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 0 10 Q 20 28, 40 15 T 80 5 T 100 18 L 100 30 L 0 30 Z" fill="url(#gradientPurple)" />
                  <circle cx="100" cy="18" r="3" fill="#A855F7" />
                </svg>
              </div>
              <p className="text-[10px] font-bold text-purple-500 mt-2">Traitement en &lt; 15 minutes</p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= SECTION FILTRES ================= */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12 space-y-10">
        <div className="flex flex-wrap justify-center items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                activeFilter === cat 
                  ? 'bg-[#00A3E0] text-white border-transparent shadow-lg shadow-[#00A3E0]/20 scale-102' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/80 hover:border-[#00A3E0]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= GRILLE DE PHOTOS ================= */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="h-56 w-full overflow-hidden relative bg-slate-100 dark:bg-slate-950">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500 ease-out"
                    onError={(e) => { e.target.src = "https://unsplash.com"; }} 
                  />
                  <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-wider text-white bg-[#00A3E0] px-3 py-1 rounded-md shadow-sm">
                    {item.category}
                  </span>
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/90 dark:bg-slate-900/90 text-[#00A3E0] rounded-xl shadow-md scale-90 group-hover:scale-100 transition-transform duration-300">
                      <FaEye size={16} />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight group-hover:text-[#00A3E0] transition-colors duration-200 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-50 dark:border-slate-800/40">
                    <FaMapMarkerAlt size={10} className="text-[#FDD100]" />
                    <span>République Démocratique du Congo</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div> {/* ✅ CORRIGÉ : Cette balise ferme le <motion.div layout className="grid..."> */}
      </main>

      {/* ================= MODALE LIGHTBOX PLEIN ÉCRAN ================= */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 font-sans select-none"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Boutons d'Action Supérieurs */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
              <a 
                href={filteredItems[selectedImageIndex].src} 
                download 
                onClick={(e) => e.stopPropagation()}
                className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
                title="Télécharger l'image"
              >
                <FaDownload size={14} />
              </a>
              <button 
                onClick={() => setSelectedImageIndex(null)}
                className="p-3 bg-white/10 text-white hover:bg-red-500 rounded-xl transition-colors cursor-pointer"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Conteneur Central de l'Image */}
            <div className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center">
              {/* Flèche Gauche */}
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="absolute left-0 md:-left-16 p-4 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all cursor-pointer z-50"
              >
                <FaChevronLeft size={18} />
              </button>

              {/* L'Image Affichée */}
              <motion.img 
                key={selectedImageIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={filteredItems[selectedImageIndex].src} 
                alt={filteredItems[selectedImageIndex].title} 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => { e.target.src = "https://unsplash.com"; }}
              />

              {/* Flèche Droite */}
              {/* Flèche Gauche */}
<button 
  onClick={(e) => handlePrevImage(e)} // ✅ "e" est maintenant transmis
  className="absolute left-0 md:-left-16 p-4 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all cursor-pointer z-50"
>
  <FaChevronLeft size={18} />
</button>

{/* L'Image Affichée... */}

{/* Flèche Droite */}
<button 
  onClick={(e) => handleNextImage(e)} // ✅ "e" est maintenant transmis
  className="absolute right-0 md:-right-16 p-4 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all cursor-pointer z-50"
>
  <FaChevronRight size={18} />
</button>
</div>

            {/* Légende Inférieure de la Modale */}
            <div className="mt-6 max-w-2xl text-center space-y-1.5 px-4" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00A3E0] bg-[#00A3E0]/10 border border-[#00A3E0]/20 px-3 py-1 rounded-md">
                {filteredItems[selectedImageIndex].category}
              </span>
              <h2 className="text-white font-extrabold text-lg md:text-xl tracking-tight">
                {filteredItems[selectedImageIndex].title}
              </h2>
              <p className="text-slate-400 text-xs md:text-sm font-semibold max-w-xl mx-auto leading-relaxed">
                {filteredItems[selectedImageIndex].desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

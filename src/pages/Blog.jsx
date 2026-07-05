import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import { FaBookOpen, FaCalendarAlt, FaUser, FaArrowRight, FaShieldAlt, FaHeartbeat, FaCar } from 'react-icons/fa';

// Simulation de données d'articles 100% Assurance & RDC
const blogPosts = [
  {
    id: 1,
    category: "Régulation",
    icon: <FaShieldAlt className="text-[#00A3E0]" />,
    title: "Comprendre la loi ARCA : Quelles sont les assurances obligatoires en RDC ?",
    excerpt: "Depuis la libéralisation du secteur des assurances par l'ARCA, plusieurs couvertures sont devenues strictement obligatoires pour les particuliers et entreprises en RD Congo. Faisons le point.",
    author: "Direction Technique ARCA",
    date: "15 Mai 2026",
    image: "https://unsplash.com", // Image générique pro
  },
  {
    id: 2,
    category: "Diaspora & Santé",
    icon: <FaHeartbeat className="text-[#CE1126]" />,
    title: "Comment prendre soin de la santé de ses parents à Kinshasa depuis l'étranger ?",
    excerpt: "Envoyer de l'argent par agence lors d'une urgence médicale est stressant et coûteux. Découvrez comment la micro-assurance connectée transforme la prise en charge médicale des familles.",
    author: "Dr. Albert Mukendi",
    date: "02 Juin 2026",
    image: "https://unsplash.com", // Image médicale
  },
  {
    id: 3,
    category: "Automobile",
    icon: <FaCar className="text-[#FDD100]" />,
    title: "Contrat d'assurance Auto en RDC : Franchise, bonus et tiers-payant expliqués",
    excerpt: "Vous achetez ou renouvelez une assurance automobile pour un proche à Lubumbashi ou Kinshasa ? Voici les pièges à éviter et comment fonctionne le réseau de garages agréés en cas de sinistre.",
    author: "Service Sinistres DRC",
    date: "28 Juin 2026",
    image: "https://unsplash.com", // Image route/auto
  }
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les articles en fonction de la recherche de l'utilisateur
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Barre de navigation sécurisée */}
      <NavbarSecured />

      {/* En-tête Principal du Blog (Thématique RDC) */}
      <header className="relative bg-gradient-to-br from-[#0C1E36] to-[#11294A] text-white px-6 py-20 pt-28 text-center overflow-hidden border-b-4 border-[#00A3E0]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00A3E0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-[#00A3E0]/20 text-[#00A3E0] text-xs font-bold uppercase tracking-widest border border-[#00A3E0]/30 inline-flex items-center gap-2 mb-4">
            <FaBookOpen /> Guide de l'Assuré & Prévention
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            L'Éducation Financière pour la <span className="text-[#FDD100]">RDC</span> & la <span className="text-[#00A3E0]">Diaspora</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Comprenez vos droits, optimisez vos contrats d'assurance et découvrez comment protéger au mieux vos proches restés au pays.
          </p>

          {/* Barre de recherche interne au blog */}
          <div className="mt-8 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Rechercher un article (ex: ARCA, Santé)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/60 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A3E0] text-sm backdrop-blur-sm"
            />
          </div>
        </div>
      </header>

      {/* Liste des Articles */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            Aucun article ne correspond à votre recherche.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300"
              >
                {/* Image de l'article */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 text-slate-800 dark:text-white">
                    {post.icon}
                    {post.category}
                  </div>
                </div>

                {/* Contenu textuel */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Métadonnées (Date & Auteur) */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-3 font-semibold">
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {post.date}</span>
                      <span className="flex items-center gap-1"><FaUser /> {post.author}</span>
                    </div>
                    {/* Titre */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-[#00A3E0] transition-colors">
                      {post.title}
                    </h3>
                    {/* Extrait */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Bouton de lecture */}
                  <button className="text-xs font-bold text-[#00A3E0] hover:text-[#0082B3] dark:hover:text-[#FDD100] flex items-center gap-1.5 transition-colors tracking-wider uppercase mt-auto">
                    Lire l'article <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Services
import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import authService from '../services/authService';

// Icônes adaptées à la Fintech et l'Assurance
import { 
  FaHome, FaBars, FaTimes, FaMoon, FaSun, 
  FaShieldAlt, FaFileContract, FaHospital, 
  FaSearch, FaUserShield, FaCreditCard, FaUserCircle,
  FaCalculator, FaBriefcaseMedical, FaBalanceScale
} from 'react-icons/fa';

export default function NavbarSecured() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Écouteur de défilement pour activer l'effet sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 45) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronisation de l'état d'authentification
  useEffect(() => {
    authService.initialize().then(() => {
      setIsAuthenticated(authService.isLoggedIn());
      setCurrentUser(authService.getCurrentUser());
    });

    const interval = setInterval(() => {
      setIsAuthenticated(authService.isLoggedIn());
      setCurrentUser(authService.getCurrentUser());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (audioService?.playClick) audioService.playClick();
    notificationService.info(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`, { autoClose: 2000 });
  };

  const handleNavClick = (href, e) => {
    e.preventDefault();
    setIsOpen(false);
    if (audioService?.playNavigate) audioService.playNavigate();
    navigate(href);
  };

// 1. Structure corrigée : Ajout de l'id manquant pour la catégorie Accueil
const navCategories = [
  {
    id: "accueil", // ─── ✅ AJOUTÉ
    label: "Accueil",
    items: [
      { href: '/', label: 'Home', icon: <FaHome /> },
    ]
  },
  {
    id: "offres",
    label: "Nos Offres",
    items: [
      { href: '/formules', label: 'Nos Formules', icon: <FaShieldAlt /> },
      { href: '/simulateur', label: 'Simulateur Tarif', icon: <FaCalculator /> }
    ]
  },
  {
    id: "services",
    label: "Services & Sinistres",
    items: [
      { href: '/reseau-soins', label: 'Réseau Soins', icon: <FaBriefcaseMedical /> },
      { href: '/declaration-sinistre', label: 'Déclarer Sinistre', icon: <FaFileContract /> }
    ]
  },
  {
    id: "institutionnel",
    label: "Institutionnel",
    items: [
      { href: '/conformite-arca', label: 'Conformité ARCA', icon: <FaBalanceScale /> }
    ]
  }
];

// 2. Injection dynamique de l'Espace Privé directement dans une catégorie existante ou dédiée
if (isAuthenticated) {
  // On l'injecte proprement dans le bloc Institutionnel pour éviter l'erreur de navItems non défini
  const instCat = navCategories.find(cat => cat.id === "institutionnel");
  if (instCat) {
    instCat.items.push({ href: '/dashboard', label: 'Mon Espace Privé', icon: <FaUserShield /> });
  }
}

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isSticky 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-2 shadow-md border-[#00A3E0]/20' 
          : 'bg-white dark:bg-slate-900 py-4 border-slate-100 dark:border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* LOGO DYNAMIQUE IMAGE CONGO RDC */}
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              className="flex items-center gap-3 cursor-pointer shrink-0" 
              onClick={() => navigate('/')}
            >
              <img 
                src="/images/logo.png" 
                alt="DRC" 
                className="h-10 w-auto block md:hidden object-contain"
              />
              <img 
                src="/images/logo.png" 
                alt="DRC Assurances" 
                className="h-12 w-auto hidden md:block object-contain"
              />
              <div className="hidden xl:flex flex-col justify-center border-l border-slate-200 dark:border-slate-700 pl-3">
                <span className="text-[8px] md:text-[9px] uppercase tracking-[3px] text-slate-500 dark:text-[#00A3E0] font-bold">
                  Écosystème Numérique Agréé ARCA
                </span>
              </div>
            </motion.div>

                       {/* NAVIGATION DESKTOP (ORGANISÉE PAR CATÉGORIES) */}
            <div className="hidden lg:flex items-center gap-6">
              {navCategories.map((category) => (
                <div key={category.id || category.label} className="relative group py-2">
                  {/* Titre de la catégorie */}
                  <button className="flex items-center gap-1 text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors">
                    {category.label}
                    <span className="text-[10px] opacity-60 group-hover:rotate-180 transition-transform duration-200">▼</span>
                  </button>

                  {/* Menu déroulant de la catégorie au survol */}
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50 p-2 space-y-1">
                    {category.items.map((item) => (
                      <button 
                        key={item.href} 
                        onClick={(e) => handleNavClick(item.href, e)} 
                        className="w-full px-3 py-2.5 flex items-center gap-2.5 text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-all rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                      >
                        <span className="text-[#00A3E0] dark:text-[#00A3E0] opacity-90">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* BARRE DE RECHERCHE RAPIDE ET ENGINS FINTECH */}
              <div className="flex items-center gap-1 ml-2 border-l border-slate-200 dark:border-slate-700 pl-4">
                <div className="relative flex items-center">
                  <AnimatePresence>
                    {searchOpen && (
                      <motion.input
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 160, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        type="text"
                        placeholder="N° de contrat (DRC-...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#00A3E0] mr-2 text-slate-800 dark:text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && searchQuery.trim()) {
                            notificationService.info(`Vérification de l'attestation "${searchQuery}"...`);
                            setSearchOpen(false);
                            setSearchQuery("");
                            navigate(`/dashboard?search=${searchQuery}`);
                          }
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => { if (audioService?.playClick) audioService.playClick(); setSearchOpen(!searchOpen); }}
                    title="Vérifier une attestation ARCA" 
                    className={`p-2 rounded-xl transition-colors ${searchOpen ? 'text-[#00A3E0] bg-slate-100 dark:bg-slate-800' : 'text-slate-400 hover:text-[#00A3E0]'}`}
                  >
                    <FaSearch />
                  </button>
                </div>

                <button onClick={toggleTheme} className="p-2 rounded-xl text-slate-400 hover:text-[#FDD100]">
                  {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
                </button>

                <button 
                  onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                  className="ml-1 flex items-center justify-center p-2 rounded-xl bg-[#00A3E0]/10 text-[#00A3E0] hover:bg-[#00A3E0] hover:text-white transition-all"
                  title={isAuthenticated ? "Mon Espace Assuré" : "Se connecter à la plateforme"}
                >
                  <FaUserCircle size={18} />
                </button>
              </div>
            </div>

            {/* CONTROLES NAVIGATION MOBILE */}
            <div className="lg:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="text-[#00A3E0]">
                {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white text-xl">
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

          </div>
        </div>

        {/* LISTE DÉROULANTE MOBILE (ORGANISÉE PAR BLOCS DE CATÉGORIES) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-4 space-y-4 shadow-inner overflow-y-auto max-h-[calc(100vh-80px)]"
            >
              {navCategories.map((category) => (
                <div key={category.id || category.label} className="space-y-1">
                  {/* Titre de section mobile */}
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-[#00A3E0] px-3 mb-1">
                    {category.label}
                  </div>
                  
                  {category.items.map((item) => (
                    <button
                      key={item.href}
                      onClick={(e) => { setIsOpen(false); handleNavClick(item.href, e); }}
                      className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200 rounded-xl hover:bg-[#00A3E0]/10 hover:text-[#00A3E0]"
                    >
                      <span className="text-[#00A3E0]">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              ))}
              
              <button
                onClick={() => { setIsOpen(false); navigate(isAuthenticated ? '/dashboard' : '/login'); }}
                className="w-full text-center px-4 py-3 bg-[#00A3E0] text-white rounded-xl font-bold block text-sm shadow-md"
              >
                {isAuthenticated ? 'Aller à Mon Espace Privé' : 'Se connecter / Espace Assuré'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
</>
  );
}
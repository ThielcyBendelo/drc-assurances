import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Services
import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import authService from '../services/authService';

// Icônes adaptées à la Fintech et l'Assurance
import { 
  FaHome, FaBars, FaTimes, FaMoon, FaSun, 
  FaShieldAlt, FaFileContract, FaSearch, FaUserShield, 
  FaCreditCard, FaUserCircle, FaCalculator, FaBriefcaseMedical, 
  FaBalanceScale, FaChevronDown, FaChevronUp, FaSignOutAlt, FaWallet, FaQrcode, FaHistory
} from 'react-icons/fa';

export default function NavbarSecured() {
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  
  // États de l'interface (Corrigés et regroupés ici)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  
  // États d'authentification
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // États de navigation et de défilement (Scroll)
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // État du Thème
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Gestion du clic en dehors pour fermer le menu de l'avatar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Détection du scroll combiné (Masquage/Affichage intelligent + Sticky)
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Effet Sticky
      if (currentScrollY > 45) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Masquage au scroll bas / Affichage au scroll haut
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setUserMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

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

  // Application du thème global
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
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    if (audioService?.playNavigate) audioService.playNavigate();
    navigate(href);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setCurrentUser(null);
      notificationService.success("Déconnexion réussie. À bientôt !");
      navigate('/');
    } catch (error) {
      notificationService.error("Erreur lors de la déconnexion.");
    }
  };

  const toggleMobileCategory = (id) => {
    if (activeMobileCategory === id) {
      setActiveMobileCategory(null);
    } else {
      setActiveMobileCategory(id);
    }
  };

  const navCategories = [
    {
      id: "accueil",
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

    return (
    <nav className={`fixed top-0 left-0 w-full z-50 font-sans border-b transition-all duration-300 transform ${
      isVisible ? 'translate-y-0' : '-translate-y-full shadow-none'
    } ${
      isSticky 
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl py-2 shadow-lg border-[#00A3E0]/20' 
        : 'bg-white dark:bg-slate-900 py-4 border-slate-100 dark:border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          
                    {/* ================= LOGO DYNAMIQUE ET SIGNATURE ARCA PREMIUM ================= */}
          <motion.div 
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center gap-3.5 cursor-pointer shrink-0 group relative py-1 px-2 rounded-xl hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-300" 
            onClick={() => navigate('/')}
          >
            {/* Conteneur de protection du logo avec micro-ombre */}
            <div className="relative p-1 bg-white/40 dark:bg-transparent rounded-lg backdrop-blur-xs border border-transparent group-hover:border-slate-200/40 dark:group-hover:border-slate-700/30 transition-all duration-300 shadow-xs">
              <img 
                src="/images/logo.png" 
                alt="DRC Assurances" 
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-102" 
              />
            </div>

            {/* Signature ARCA Dynamique et Haute Visibilité */}
            <div className="hidden xl:flex flex-col justify-center border-l-2 border-slate-200 dark:border-slate-800/80 pl-3.5 h-8 transition-colors duration-300 group-hover:border-[#00A3E0]">
              <span className="text-[9px] uppercase tracking-[3.5px] text-slate-500 dark:text-[#00A3E0] font-black transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-red-600 dark:group-hover:text-[#FDD100]">
                Écosystème Numérique
              </span>
              <span className="text-[8px] uppercase tracking-[2px] text-slate-400 dark:text-slate-500 font-extrabold mt-0.5">
                Agréé ARCA
              </span>
            </div>
          </motion.div>

          {/* ================= NAVIGATION DESKTOP SÉCURISÉE (KEY WARNING CORRIGÉ) ================= */}
          <div className="hidden lg:flex items-center gap-7">
            {navCategories && navCategories.map((category) => (
              <div key={category.id} className="relative group py-2">
                
                {/* Déclencheur de catégorie Desktop */}
                <button className="flex items-center gap-1.5 text-sm font-extrabold text-slate-700 dark:text-slate-200 hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-colors cursor-pointer">
                  {category.label}
                  <FaChevronDown size={10} className="opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {/* Dropdown Menu Desktop enveloppé sous Morphisme de Verre */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-2xl opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 p-2 space-y-1">
                  {category.items && category.items.map((item) => (
                    <button 
                      key={item.href} // ✅ SÉCURISÉ : Clé unique indispensable pour l'arbre de rendu React
                      onClick={(e) => handleNavClick(item.href, e)} 
                      className="w-full px-4 py-3 flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#00A3E0] dark:hover:text-[#FDD100] transition-all rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 text-left cursor-pointer"
                    >
                      <span className="text-[#00A3E0] opacity-90">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>

              </div>
            ))}
          </div>

           {/* CONTROLES UTILITAIRES & SYSTEMES BARRE */}
<div className="flex items-center gap-2 ml-2 border-l border-slate-200 dark:border-slate-800 pl-6 h-6">
  <div className="relative flex items-center">
    <AnimatePresence>
      {searchOpen && (
        <motion.input
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 180, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          type="text"
          placeholder="N° de contrat (DRC-...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-[#00A3E0] focus:border-transparent mr-2 text-slate-800 dark:text-white font-semibold"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              notificationService.info(`Vérification de l'attestation "${searchQuery}"...`);
              setSearchOpen(false);
              const targetQuery = searchQuery;
              setSearchQuery("");
              navigate(`/dashboard?search=${targetQuery}`);
            }
          }}
        />
      )}
    </AnimatePresence>
    <button 
      onClick={() => { if (audioService?.playClick) audioService.playClick(); setSearchOpen(!searchOpen); }}
      className={`p-2.5 rounded-xl transition-colors cursor-pointer ${searchOpen ? 'text-[#00A3E0] bg-[#00A3E0]/10' : 'text-slate-400 hover:text-[#00A3E0]'}`}
    >
      <FaSearch size={15} />
    </button>
  </div>

  <button onClick={toggleTheme} className="p-2.5 rounded-xl text-slate-400 hover:text-[#FDD100] cursor-pointer transition-colors">
    {theme === 'dark' ? <FaSun size={15} /> : <FaMoon size={15} />}
  </button>

  {/* ================= USER MENU PRO / DROPDOWN AVATAR (DESKTOP) ================= */}
  <div className="relative ml-2" ref={userMenuRef}>
    {isAuthenticated ? (
      <button 
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="flex items-center gap-2 p-1 rounded-full border border-slate-200 dark:border-slate-800 hover:border-[#00A3E0] transition-all bg-slate-50 dark:bg-slate-800 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00A3E0] to-[#FDD100] flex items-center justify-center text-white font-black text-xs shadow-inner">
          {currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : <FaUserCircle size={18} />}
        </div>
        <span className="text-xs font-black px-1 text-slate-700 dark:text-slate-200 hidden xl:block max-w-[100px] truncate">
          {currentUser?.name || "Espace Assuré"}
        </span>
        <FaChevronDown size={8} className={`opacity-60 transition-transform ${userMenuOpen ? 'rotate-180' : ''} hidden xl:block`} />
      </button>
    ) : (
      <button 
        onClick={(e) => handleNavClick('/login', e)}
        className="flex items-center justify-center p-2.5 rounded-xl bg-[#00A3E0]/10 text-[#00A3E0] hover:bg-[#00A3E0] hover:text-white transition-all cursor-pointer shadow-sm"
        title="Se connecter"
      >
        <FaUserCircle size={18} />
      </button>
    )}

    {/* Dropdown Menu de l'Espace Connecté */}
    <AnimatePresence>
      {userMenuOpen && isAuthenticated && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 mt-3 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-2xl z-50 p-3 space-y-2.5 font-sans"
        >
          {/* En-tête profil */}
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500">
              {currentUser?.role || "Assuré"}
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
              {currentUser?.email}
            </p>
          </div>

          {/* Liens du profil */}
          <div className="space-y-1">
            <button 
              onClick={(e) => { setUserMenuOpen(false); handleNavClick('/dashboard', e); }}
              className="w-full px-3 py-2 flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-[#00A3E0] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
            >
              Mon Tableau de bord
            </button>
            
            <button 
              onClick={(e) => { setUserMenuOpen(false); handleLogout(e); }}
              className="w-full px-3 py-2 flex items-center gap-2 text-xs font-bold text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-left"
            >
              Déconnexion
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
        {/* 2. Le Menu Desktop (Lui se cache sur mobile) */}
        <div className="hidden lg:flex items-center">
          {/* Vos liens desktop... */}
        </div>

        {/* 3. LE BOUTON MOBILE ET USER MENU (Doit être en dehors du bloc desktop !) */}
        <div className="lg:hidden flex items-center gap-3">
          
                   {/* USER MENU PRO / DROPDOWN AVATAR (MOBILE) */}
          {isAuthenticated && (
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // ✅ BANQUE FIX : Empêche le menu de se refermer tout seul
                  setUserMenuOpen(!userMenuOpen);
                }}
                className="flex items-center p-1 rounded-full border border-slate-200 dark:border-slate-800 hover:border-[#00A3E0] transition-all bg-slate-50 dark:bg-slate-800 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00A3E0] to-[#FDD100] flex items-center justify-center text-white font-black text-xs shadow-inner">
                  {currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : <FaUserCircle size={18} />}
                </div>
              </button>
                            {/* Dropdown Menu de l'Espace Connecté sur Mobile */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()} // ✅ AJOUTÉ : Empêche la fermeture quand on clique à l'intérieur du menu
                    className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-2xl z-[9999] p-3 space-y-2.5 font-sans" // ✅ CORRIGÉ : Passage en z-[9999] pour passer au-dessus des sections de la page
                  >
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500">
                        {currentUser?.role || "Assuré"}
                      </p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                        {currentUser?.email}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <button 
                        onClick={(e) => { setUserMenuOpen(false); handleNavClick('/dashboard', e); }}
                        className="w-full px-3 py-2 flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-[#00A3E0] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left"
                      >
                        Mon Tableau de bord
                      </button>
                      
                      <button 
                        onClick={(e) => { setUserMenuOpen(false); handleLogout(e); }}
                        className="w-full px-3 py-2 flex items-center gap-2 text-xs font-bold text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-left"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}


          {/* LE BOUTON HAMBURGER TOGGLE */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#00A3E0] transition-colors"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div> {/* Ce div ferme le conteneur principal flex de la navbar */}
    </div> {/* Ce div ferme le conteneur de centrage max-w-7xl */}

    {/* ================= NAVIGATION MOBILE ================= */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 w-full overflow-hidden"
        >
          {/* Contenu de votre menu mobile rempli dynamiquement */}
          {/* <div className="px-6 py-4 space-y-3"> */}
            {/* Bouton de connexion directe si l'usager n'est pas connecté */}
            {/* {!isAuthenticated && (
              <button
                onClick={(e) => handleNavClick('/login', e)}
                className="w-full py-3 mb-2 bg-[#00A3E0] hover:bg-[#0092c9] text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaUserCircle size={14} /> Connexion Espace Client
              </button>
            )} */}

            {navCategories.map((category) => (
              <div key={category.id} className="space-y-1">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 pt-2">
                  {category.label}
                </p>
                {category.items.map((item) => (
                  <button
                    key={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="w-full py-2.5 flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#00A3E0] text-left"
                  >
                    <span className="text-[#00A3E0]">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          {/* </div> */}
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
  );
}

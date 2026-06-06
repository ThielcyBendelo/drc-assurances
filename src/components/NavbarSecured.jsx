import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Services
import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import analyticsService from '../services/analyticsService';
import authService from '../services/authService';

// Icônes
import { 
  FaTachometerAlt, FaHome, FaBars, FaTimes, FaMoon, FaSun, 
  FaVolumeUp, FaVolumeMute, FaUtensils, FaBirthdayCake, FaBoxes, 
  FaChartLine, FaSearch, FaShareAlt, FaGift 
} from 'react-icons/fa';

export default function NavbarSecured() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(audioService.isEnabled());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // NOUVEL ÉTAT DYNAMIQUE : Gestion du défilement collant (sticky scroll)
  const [isSticky, setIsSticky] = useState(false);

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
    audioService.playClick();
    notificationService.info(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`, { autoClose: 2000 });
  };

  const toggleAudio = () => {
    const newState = audioService.toggle();
    setAudioEnabled(newState);
    newState ? notificationService.success('🔊 Sons activés') : notificationService.info('🔇 Sons désactivés');
  };

  const handleNavClick = (href, e) => {
    e.preventDefault();
    setIsOpen(false);
    audioService.playNavigate();
    navigate(href);
  };

  // 1. Nouvel état pour ouvrir/fermer la barre de recherche rapide
const [searchOpen, setSearchOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");

// 2. Fonction de partage native (WhatsApp, SMS, Réseaux sociaux)
const handleShareClick = async () => {
  audioService.playClick();
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'M-DELICE Abidjan',
        text: 'Découvrez les meilleures pâtisseries fines et Cake Designs d’Abidjan !',
        url: window.location.origin,
      });
      notificationService.success('Merci pour le partage ! 🍰');
    } catch (err) {
      console.log("Partage annulé ou bloqué");
    }
  } else {
    // Si le navigateur ne gère pas le partage natif (ex: vieux PC)
    navigator.clipboard.writeText(window.location.origin);
    notificationService.info('Lien du site copié dans le presse-papier !');
  }
};

// 3. Fonction pour le bouton Cadeaux
const handleGiftClick = () => {
  audioService.playClick();
  // Option A : Ouvre votre modale de devis pré-remplie avec l'option cadeau
  setSelectedIngredient("Fiche Recette Gratuite - Cadeau Bienvenue");
  setModalOpen(true);
  notificationService.success('🎁 Complétez vos informations pour recevoir votre fiche recette !');
};


  // NavItems de base pour tous les utilisateurs (Vitrine M-DELICE)
  const navItems = [
    { href: '/', label: 'Accueil', icon: <FaHome /> },
    { href: '/services', label: 'Notre Vitrine', icon: <FaUtensils /> },
    { href: '/projects', label: 'Cake Design', icon: <FaBirthdayCake /> },
  ];

  // Si l'utilisateur est connecté, on injecte dynamiquement la gestion de stock et financière
  if (isAuthenticated) {
    navItems.push(
      { href: '/skills', label: 'Gestion Stock', icon: <FaBoxes /> },
      { href: '/work', label: 'Finances', icon: <FaChartLine /> }
    );
  }

  return (
    <>
      {/* STRUCTURE GLOBALE ENVELOPPANTE DE FIXATION */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col w-full shadow-sm">
        
        {/* NOUVEAUTÉ : PREMIÈRE NAVBAR SUPÉRIEURE (Bandeau d'annonces comme l'image modèle) */}
        <div className={`w-full transition-all duration-300 bg-amber-100 dark:bg-stone-950 text-stone-800 dark:text-stone-200 border-b border-amber-200/50 dark:border-stone-800 text-xs md:text-sm font-medium px-4 py-2.5 flex items-center justify-between overflow-hidden ${
          isSticky ? 'h-0 py-0 opacity-0 border-b-0 pointer-events-none' : 'h-auto opacity-100'
        }`}>
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
            <p className="truncate font-sans tracking-wide">
              <span className="font-bold text-amber-800 dark:text-amber-400">M-DELICE Academy c'est : </span> 
              des ateliers vidéos exclusifs, des réductions sur vos commandes et des fiches recettes imprimables...
            </p>
            <button 
              onClick={() => navigate('/services')} 
              className="bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm transition-all flex-shrink-0"
            >
              Découvrir
            </button>
          </div>
        </div>

        {/* DEUXIÈME NAVBAR PRINCIPALE (STICKY AVEC STYLE DE VAGUE SUR MESURE) */}
        <nav className={`w-full transition-all duration-300 border-b border-stone-100 dark:border-stone-800 shadow-sm ${
          isSticky 
            ? 'bg-white/95 dark:bg-stone-900/95 backdrop-blur-md py-2' 
            : 'bg-white dark:bg-stone-900 py-4'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              
              {/* LOGO DYNAMIQUE M-DELICE */}
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className="flex flex-col cursor-pointer" 
                onClick={() => navigate('/')}
              >
                <span className="text-2xl font-black bg-gradient-to-r from-amber-700 to-orange-500 dark:from-amber-400 dark:to-orange-400 text-transparent bg-clip-text font-serif tracking-wide">
                  M-DELICE
                </span>
                <span className="text-[8px] uppercase tracking-[3px] text-stone-500 dark:text-amber-500/70 font-bold">
                  Haute Pâtisserie • Abidjan
                </span>
              </motion.div>

              {/* DESKTOP NAV */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <button 
                    key={item.href} 
                    onClick={(e) => handleNavClick(item.href, e)} 
                    className="px-4 py-2 flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-all rounded-full hover:bg-stone-50 dark:hover:bg-stone-800/50"
                  >
                    <span className="opacity-60">{item.icon}</span>
                    {item.label}
                  </button>
                ))}

                {/* AJOUTS OPTIONS SECONDAIRES ISSUES DU MODÈLE DE L'IMAGE */}
               {/* COMPOSANT MIS À JOUR ET OPTIMISÉ POUR LA NAVBAR */}
<div className="flex items-center gap-1 ml-2 border-l border-stone-200 dark:border-stone-800 pl-2 relative">
  
  {/* BARRE DE RECHERCHE RAPIDE DÉPLOYABLE (Pas besoin de créer une nouvelle page !) */}
  <div className="relative flex items-center">
    <AnimatePresence>
      {searchOpen && (
        <motion.input
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 150, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          type="text"
          placeholder="Rechercher un gâteau..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-amber-500 mr-2 text-stone-800 dark:text-white"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              notificationService.info(`Recherche de "${searchQuery}" en cours...`);
              setSearchOpen(false);
              setSearchQuery("");
              navigate('/services'); // Redirige vers la vitrine où se trouvent les gâteaux
            }
          }}
        />
      )}
    </AnimatePresence>
    <button 
      onClick={() => { audioService.playClick(); setSearchOpen(!searchOpen); }}
      title="Rechercher une recette" 
      className={`p-2 rounded-xl transition-colors ${searchOpen ? 'text-amber-600 bg-stone-100 dark:bg-stone-800' : 'text-stone-400 hover:text-amber-600'}`}
    >
      <FaSearch />
    </button>
  </div>

  {/* BOUTON PARTAGER (Déclenche le menu de partage du téléphone/PC) */}
  <button 
    onClick={handleShareClick}
    title="Partager le site à un proche" 
    className="p-2 text-stone-400 hover:text-amber-600 transition-colors rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/50"
  >
    <FaShareAlt />
  </button>

  {/* BOUTON CADEAUX (Connecté à votre formulaire / modale) */}
  <button 
    onClick={handleGiftClick}
    title="Recevoir ma recette gratuite" 
    className="p-2 text-stone-400 hover:text-amber-600 transition-colors rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/50 flex items-center gap-1 animate-pulse hover:animate-none"
  >
    <FaGift />
    <span className="text-[10px] font-black uppercase tracking-wider hidden xl:inline bg-amber-500 text-white px-1.5 py-0.5 rounded-md">Offert</span>
  </button>

</div>


                <div className="h-6 w-[1px] bg-stone-200 dark:bg-stone-800 mx-4" />

                {/* OUTILS ACCESSIBILITÉ : THEME, AUDIO & ESPACE PRO */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleAudio} 
                    className="p-2 rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    {audioEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
                  </button>

                  <button 
                    onClick={toggleTheme} 
                    className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400 hover:rotate-12 transition-all"
                  >
                    {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                  </button>

                  {isAuthenticated ? (
                    <button 
                      onClick={() => navigate('/dashboard')} 
                      className="ml-2 w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-lg hover:bg-orange-500 transition-all" 
                      title="Tableau de bord"
                    >
                      <FaTachometerAlt />
                    </button>
                  ) : (
                    <button 
                      onClick={() => navigate('/login')} 
                      className="ml-2 px-5 py-2 bg-amber-800 dark:bg-amber-500 text-white dark:text-stone-950 rounded-full text-sm font-bold shadow-md hover:shadow-amber-500/10 transition-all"
                    >
                      Connexion
                    </button>
                  )}
                </div>
              </div>

              {/* MOBILE MENU BUTTON */}
              <div className="md:hidden flex items-center gap-4">
                <button onClick={toggleTheme} className="text-amber-600 dark:text-amber-400">
                  {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>
                <button onClick={() => setIsOpen(!isOpen)} className="text-amber-950 dark:text-white text-2xl">
                  {isOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>

            </div>
          </div>

          {/* MOBILE NAV DROPDOWN */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-stone-100 dark:bg-stone-800 border-t border-stone-200 dark:border-stone-800"
              >
                <div className="py-4 px-6">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={(e) => {
                        handleNavClick(item.href, e);
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-semibold text-stone-700 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </>
  );
}

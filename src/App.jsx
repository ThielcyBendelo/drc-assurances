import React, { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AnimatePresence, motion } from 'framer-motion'; // ✅ Ajout d'AnimatePresence pour les transitions
import { FaShieldAlt } from 'react-icons/fa';
// Importation du fond interactif géométrique
import RippleGrid from './components/ui/RippleGrid';

// =========================================================================
// ⚡ FONCTION DE TRANSITION PRO (Simule la latence réseau pour afficher le Loader)
// =========================================================================
const lazyWithDelay = (importFunction) => {
  return lazy(() => {
    return Promise.all([
      importFunction(),
      new Promise((resolve) => setTimeout(resolve, 600)) // ✅ Force l'affichage de l'animation pendant 600ms
    ]).then(([moduleExports]) => moduleExports);
  });
};

// =========================================================================
// 1. PORTAIL PUBLIC : CHARGEMENT ASYNCHRONE AVEC TRANSITION FLUIDE
// =========================================================================
const Home = lazyWithDelay(() => import('./pages/Home'));
const FormulesPage = lazyWithDelay(() => import('./pages/ServicesPage'));         
const PacksMicroPage = lazyWithDelay(() => import('./pages/BoutiquePage'));       
const SimulateurTarifPage = lazyWithDelay(() => import('./pages/WorkPage'));       
const ClaimsDeclarationPage = lazyWithDelay(() => import('./pages/SkillsPage'));   
const NetworkPartnersPage = lazyWithDelay(() => import('./pages/ProjectsPage'));   
const ComplianceArcaPage = lazyWithDelay(() => import('./pages/ExperiencePage'));  
const BeneficiaryRegistrationPage = lazyWithDelay(() => import('./pages/ClientRegistrationPage')); 
const CheckoutPage = lazyWithDelay(() => import('./pages/PaymentPage'));           
const ContactSupportPage = lazyWithDelay(() => import('./pages/ContactPage'));     
const TestimonialsPage = lazyWithDelay(() => import('./pages/TestimonialsPage')); 
const BlogPreventionPage = lazyWithDelay(() => import('./pages/Blog.jsx'));       
const DashboardPage = lazyWithDelay(() => import('./pages/DashboardPage'));
const Galerie = lazyWithDelay(() => import('./pages/Galerie'));

// =========================================================================
// 2. SÉCURITÉ & AUTHENTIFICATION
// =========================================================================
import PrivateRoute from './components/PrivateRoute';
import ProfessionalSplashScreen from './components/ProfessionalSplashScreen';
import SecureLogin from './components/SecureLogin';
import SecureRegister from './components/SecureRegister';

// =========================================================================
// 3. ESPACE PRIVÉ & BACK-OFFICE
// =========================================================================
import AdminLayout from './dashboard/components/AdminLayout';
import AdminHome from './dashboard/AdminHome';
import BeneficiariesTable from './dashboard/Clients';       
import BuyersDiasporaTable from './dashboard/Subscribers'; 
import TransactionsJournal from './dashboard/PaymentManagement'; 
import QuittancesGenerator from './dashboard/InvoiceManagement';  
import RiskAnalytics from './dashboard/Analytics';         
import SystemMessaging from './dashboard/Messaging';       
import AccountProfile from './dashboard/Profile';         
import ForexFinanceDashboard from './dashboard/FinanceDashboard'; 

// 1. COMPOSANT LOCAL CORRIGÉ : RIPPLEGRID (Intégré directement pour éviter les bugs d'import)
// =========================================================================
function LocalRippleGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || 600;
    };

    resizeCanvas();

    const gap = 30; 
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      if (!ctx || !canvas) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const rows = Math.ceil(height / gap);
      const cols = Math.ceil(width / gap);

      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const isDark = document.documentElement?.classList.contains("dark") || false;
      
      const dotColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.06)";
      const activeColor = isDark ? "rgba(0, 163, 224, 0.45)" : "rgba(0, 124, 176, 0.35)";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gap + gap / 2;
          const y = r * gap + gap / 2;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let radius = 1.5;
          let color = dotColor;

          if (dist < 130) {
            const factor = (130 - dist) / 130;
            radius = 1.5 + factor * 2.5;
            ctx.fillStyle = activeColor;
            color = isDark 
              ? `rgba(0, 163, 224, ${0.08 + factor * 0.4})` 
              : `rgba(0, 124, 176, ${0.06 + factor * 0.35})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
    />
  );
}

// =========================================================================
// 2. COMPOSANT PRINCIPAL DE L'APPLICATION
// =========================================================================
export default function App() {
  
  const navigate = (path) => {
    console.log(`Navigation vers : ${path}`);
  };

  // Déclaration explicite et sécurisée des variantes pour Framer Motion
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 90, damping: 18 } 
    }
  };

// =========================================================================
// 🎛️ COMPOSANT LOADER DE TRANSITION INTERACTIVE
// =========================================================================
function PageTransitionLoader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 dark:bg-slate-950/90 backdrop-blur-md select-none pointer-events-auto"
    >
      {/* Barre de complétion supérieure cinétique animée */}
      <motion.div 
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, ease: "linear" }}
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#CE1126] via-[#00A3E0] to-[#FDD100] shadow-md"
      />
      
      {/* Logo Shield central animé en pulsation */}
      <div className="relative flex flex-col items-center space-y-4">
        <motion.div 
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="p-4 bg-white dark:bg-slate-900 border-2 border-[#00A3E0]/20 rounded-2xl shadow-2xl text-[#00A3E0]"
        >
          <FaShieldAlt size={32} className="text-[#00A3E0] dark:text-[#FDD100]" />
        </motion.div>
        
        {/* Légende textuelle Fintech */}
        <div className="text-center space-y-0.5">
          <p className="text-xs font-black uppercase tracking-[3px] text-slate-900 dark:text-white">DRC Assurances</p>
          <p className="text-[9px] uppercase tracking-[1.5px] text-slate-400 dark:text-slate-500 font-extrabold animate-pulse">Sécurisation du tunnel...</p>
        </div>
      </div>
    </motion.div>
  );
}

// =========================================================================
// COMPOSANT CONTENANT LES ROUTES COMPATIBLES TRANSITIONS DYNAMIQUES
// =========================================================================
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* --- PORTAIL ASSURÉ PUBLIC --- */}
        <Route path="/" element={<Home />} />
        <Route path="/formules" element={<FormulesPage />} />
        <Route path="/packs-micro" element={<PacksMicroPage />} />
        <Route path="/simulateur" element={<SimulateurTarifPage />} />
        <Route path="/declaration-sinistre" element={<ClaimsDeclarationPage />} />
        <Route path="/reseau-soins" element={<NetworkPartnersPage />} />
        <Route path="/conformite-arca" element={<ComplianceArcaPage />} />
        <Route path="/inscription-beneficiaire" element={<BeneficiaryRegistrationPage />} />
        <Route path="/passerelle-paiement" element={<CheckoutPage />} />
        <Route path="/urgences-contact" element={<ContactSupportPage />} />
        <Route path="/temoignages" element={<TestimonialsPage />} />
        <Route path="/guide-prevention" element={<BlogPreventionPage />} />
        
        {/* --- ACCÈS SÉCURISÉS --- */}
        <Route path="/login" element={<SecureLogin />} />
        <Route path="/register" element={<SecureRegister />} />
        
        {/* --- ALIAS DE COMPATIBILITÉ --- */}
        <Route path="/services" element={<FormulesPage />} />
        <Route path="/boutique" element={<PacksMicroPage />} />
        <Route path="/work" element={<SimulateurTarifPage />} />
        <Route path="/skills" element={<ClaimsDeclarationPage />} />
        <Route path="/projects" element={<NetworkPartnersPage />} />
        <Route path="/experience" element={<ComplianceArcaPage />} />
        <Route path="/clients" element={<BeneficiaryRegistrationPage />} />
        <Route path="/paiement" element={<CheckoutPage />} />
        <Route path="/contact" element={<ContactSupportPage />} />
        <Route path="/blog" element={<BlogPreventionPage />} />
        <Route path="/dashboard-page" element={<DashboardPage />} />
        <Route path="/galerie" element={<MainGalerie />} />

        {/* --- ESPACE PRIVÉ ET GESTION ADM --- */}
        <Route path="/dashboard" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<AdminHome />} />
          <Route path="clients" element={<BeneficiariesTable />} />
          <Route path="subscribers" element={<BuyersDiasporaTable />} />
          <Route path="payments" element={<TransactionsJournal />} />
          <Route path="invoices" element={<QuittancesGenerator />} />
          <Route path="analytics" element={<RiskAnalytics />} />
          <Route path="messages" element={<SystemMessaging />} />
          <Route path="profile" element={<AccountProfile />} />
          <Route path="finance" element={<ForexFinanceDashboard />} />
        </Route>
        
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

// Wrapper sécurisé pour la Galerie pour garantir le montage de Framer Motion
function MainGalerie() {
  return (
    <Suspense fallback={<PageTransitionLoader />}>
      <Galerie />
    </Suspense>
  );
}

const App = () => {
  const [splashDone, setSplashDone] = React.useState(false);

  return (
    <ThemeProvider>
      {!splashDone && (
        <ProfessionalSplashScreen onComplete={() => setSplashDone(true)} />
      )}
      
      {splashDone && (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors duration-300 font-['Saira']">
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
          
          <Suspense fallback={<PageTransitionLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;

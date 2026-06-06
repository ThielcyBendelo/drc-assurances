import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormSecurity from '../hooks/useFormSecurity';
import authService from '../services/authService';

// IMPORTATION DES ICÔNES REACT-ICONS/FA SÉLECTIONNÉES POUR LE FORMULAIRE
import { 
  FaLock, FaEnvelope, FaEye, FaEyeSlash, FaExclamationTriangle, 
  FaCheck, FaShieldAlt, FaFlask, FaSignInAlt, FaUtensils 
} from 'react-icons/fa';

const SecureLogin = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = {
    email: { type: 'email', required: true },
    password: { type: 'password', required: true },
  };

  const {
    formData,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
  } = useFormSecurity(formSchema, async (data) => {
    try {
      setApiError('');
      // Utiliser le service mock pour le login
      const resp = await authService.login(data.email, data.password);
      if (resp?.user?.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      setApiError(error.userMessage || error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');
    handleFormSubmit(e);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4 relative overflow-hidden">
      
      {/* Background décoratif immersif (Effet Glow Or & Cannelle en arrière-plan) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md bg-stone-900/60 backdrop-blur-md p-8 md:p-10 rounded-[40px] shadow-2xl border border-stone-800/80 relative z-10 transition-all duration-300">
        
        {/* Header de marque M-DELICE */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-orange-600/10">
            <span className="text-white text-xl"><FaUtensils /></span>
          </div>
          <h1 className="text-3xl font-black text-white font-serif tracking-tight">Espace Gérant</h1>
          <p className="text-stone-400 text-sm mt-1">Accédez au laboratoire de gestion M-DELICE</p>
        </div>

        {/* Message d'erreur API dynamique stylisé */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
            <FaExclamationTriangle className="text-red-400 shrink-0" size={16} />
            <p className="text-red-300 text-xs font-medium">{apiError}</p>
          </div>
        )}

        {/* Formulaire de saisie sécurisé */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider font-extrabold text-stone-400 mb-2 pl-1">
              Adresse Email
            </label>
            <div className="relative">
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Ex: gerant@m-delice.com" 
                value={formData.email || ''} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                disabled={isLoading} 
                className={`w-full pl-11 pr-4 py-3.5 bg-stone-950/40 border rounded-2xl text-white placeholder-stone-600 font-medium focus:outline-none focus:ring-2 transition-all ${
                  touched.email && errors.email 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-stone-800 focus:ring-amber-600/30 focus:border-amber-600'
                } disabled:opacity-50`} 
              />
              <span className="absolute left-4 top-[17px] text-stone-600">
                <FaEnvelope size={14} />
              </span>
            </div>
            {touched.email && errors.email && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 pl-1 font-semibold">
                <FaExclamationTriangle size={10} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2 pl-1">
              <label htmlFor="password" className="block text-xs uppercase tracking-wider font-extrabold text-stone-400">
                Mot de passe
              </label>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="text-xs font-bold text-amber-500 hover:text-orange-400 transition flex items-center gap-1"
              >
                {showPassword ? <><FaEyeSlash /> Masquer</> : <><FaEye /> Afficher</>}
              </button>
            </div>
            <div className="relative">
              <input 
                id="password" 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••••••" 
                value={formData.password || ''} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                disabled={isLoading} 
                className={`w-full pl-11 pr-4 py-3.5 bg-stone-950/40 border rounded-2xl text-white placeholder-stone-700 font-medium focus:outline-none focus:ring-2 transition-all ${
                  touched.password && errors.password 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-stone-800 focus:ring-amber-600/30 focus:border-amber-600'
                } disabled:opacity-50`} 
              />
              <span className="absolute left-4 top-[17px] text-stone-600">
                <FaLock size={14} />
              </span>
            </div>
            {touched.password && errors.password && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1 pl-1 font-semibold">
                <FaExclamationTriangle size={10} /> {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs font-semibold py-1">
            <label className="flex items-center gap-2 text-stone-400 hover:text-stone-300 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded-md border-stone-800 bg-stone-950 text-amber-600 focus:ring-amber-600/20 focus:ring-offset-stone-900" 
              />
              <span>Se souvenir de moi</span>
            </label>
            <button 
              type="button" 
              onClick={() => navigate('/forgot-password')} 
              className="text-amber-500 hover:text-orange-400 transition"
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full py-4 px-4 bg-gradient-to-r from-amber-700 to-orange-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-orange-600/5 hover:shadow-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin duration-1000">⏳</span> Chiffrement des jetons...
              </span>
            ) : (
              <><FaSignInAlt /> Valider la connexion</>
            )}
          </button>
        </form>

        {/* Footer Navigation Link */}
        <div className="mt-6 text-center border-t border-stone-800 pt-5">
          <p className="text-stone-500 text-xs font-medium">
            Pas encore de compte gérant ?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/register')} 
              className="text-amber-500 hover:text-orange-400 font-extrabold transition ml-1"
            >
              S'inscrire
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SecureLogin;

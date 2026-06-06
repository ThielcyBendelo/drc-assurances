import React from 'react';
import useFormSecurity from '../hooks/useFormSecurity';
import { sendContact } from '../services/contactApi';

const SecureContactForm = () => {
  // Schéma de validation du formulaire
  const formSchema = {
    name: {
      type: 'text',
      minLength: 2,
      maxLength: 50,
      required: true,
    },
    email: {
      type: 'email',
      required: true,
    },
    phone: {
      type: 'phone',
      required: false,
    },
    subject: {
      type: 'text',
      minLength: 5,
      maxLength: 100,
      required: true,
    },
    message: {
      type: 'text',
      minLength: 10,
      maxLength: 1000,
      required: true,
    },
  };

  // Hook de sécurité
  const {
    formData,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormSecurity(formSchema, async (data) => {
    try {
      // Envoyer les données à l'API backend
      await sendContact(data);
      alert('✓ Message envoyé avec succès !');
      resetForm();
    } catch (error) {
      console.error('Erreur :', error);
      throw new Error(error.message || 'Erreur lors de l\'envoi');
    }
  });

  // Composant d'erreur
  const FieldError = ({ error, touched }) => {
    return touched && error ? (
      <p className="text-red-500 text-sm mt-1">⚠️ {error}</p>
    ) : null;
  };

  // Composant d'input sécurisé
  const SecureInput = ({
    label,
    name,
    type = 'text',
    placeholder,
    required = false,
  }) => {
    const isTouched = touched[name];
    const error = errors[name];
    const hasError = isTouched && error;

    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name] || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            hasError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          disabled={isLoading}
        />
        <FieldError error={error} touched={isTouched} />
      </div>
    );
  };

  // Composant textarea sécurisé
  const SecureTextarea = ({
    label,
    name,
    placeholder,
    required = false,
    rows = 4,
  }) => {
    const isTouched = touched[name];
    const error = errors[name];
    const hasError = isTouched && error;

    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={formData[name] || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={rows}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            hasError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          disabled={isLoading}
        />
        <FieldError error={error} touched={isTouched} />
        <p className="text-xs text-gray-500 mt-1">
          {formData[name]?.length || 0}/1000 caractères
        </p>
      </div>
    );
  };

  return (
  <div className="max-w-2xl mx-auto bg-white dark:bg-stone-900 p-8 md:p-10 rounded-[40px] shadow-xl border border-stone-100 dark:border-stone-800 transition-all duration-300">
    
    {/* EN-TÊTE DU FORMULAIRE THÉMATISÉ M-DELICE */}
    <div className="text-center mb-8">
      <div className="inline-flex p-3 bg-amber-100 dark:bg-amber-500/20 rounded-2xl text-amber-800 dark:text-amber-400 mb-3">
        <FaUtensils size={22} />
      </div>
      <h2 className="text-3xl font-black text-stone-950 dark:text-white font-serif uppercase tracking-tight">
        Contact & Commandes
      </h2>
      <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
        Une envie particulière ou un événement à Abidjan ? Écrivez à notre atelier en toute sécurité.
      </p>
    </div>

    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Erreur générale stylisée */}
      {errors._form && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl text-center"
        >
          <p className="text-red-800 dark:text-red-400 text-sm font-medium">{errors._form}</p>
        </motion.div>
      )}

      {/* CHAMPS DU FORMULAIRE (Le style de vos composants internes SecureInput sera hérité) */}
      <div className="space-y-4">
        <SecureInput label="Nom complet" name="name" placeholder="Ex: Marie Kouassi" required />
        
        <div className="grid md:grid-cols-2 gap-4">
          <SecureInput label="Email" name="email" type="email" placeholder="marie@example.com" required />
          <SecureInput label="Téléphone (WhatsApp)" name="phone" type="tel" placeholder="Ex: +225 07 00 00 00 00" />
        </div>
        
        <SecureInput label="Sujet de la demande" name="subject" placeholder="Ex: Devis pour gâteau d'anniversaire" required />
        
        <SecureTextarea label="Votre message détaillé" name="message" placeholder="Précisez le nombre de parts, le thème visuel ou les saveurs souhaitées..." required rows={4} />
      </div>

      {/* BOUTONS D'ACTION MODERNISÉS STYLE PILULE */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button 
          type="submit" 
          disabled={isLoading} 
          className="flex-1 bg-amber-800 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-800/10 hover:shadow-orange-500/20 transition-all transform active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? '⏳ Traitement sécurisé...' : <>✓ Envoyer à l'atelier</>}
        </button>
        
        <button 
          type="button" 
          onClick={resetForm} 
          disabled={isLoading} 
          className="sm:w-1/3 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-stone-200 dark:hover:bg-stone-700 transition-all disabled:opacity-50"
        >
          ✕ Effacer
        </button>
      </div>
    </form>

    {/* INDICATEURS DE SÉCURITÉ RESTRUCTURÉS EN COULISSES PRO */}
    <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 text-center">
      <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-stone-400 block mb-4">
        Garanties de protection des données M-DELICE
      </span>
      
      {/* Grille de badges de sécurité épurés */}
      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-[11px] font-bold px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700 text-stone-600 dark:text-stone-300 rounded-full flex items-center gap-1.5 shadow-sm">
          🛡️ Anti-Injection HTML & XSS
        </span>
        <span className="text-[11px] font-bold px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700 text-stone-600 dark:text-stone-300 rounded-full flex items-center gap-1.5 shadow-sm">
          🧼 Entrées Utilisateur Assainies
        </span>
        <span className="text-[11px] font-bold px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700 text-stone-600 dark:text-stone-300 rounded-full flex items-center gap-1.5 shadow-sm">
          ⏳ Protection Anti-Abus (Rate-Limit)
        </span>
      </div>
    </div>

  </div>
);
}

export default SecureContactForm;

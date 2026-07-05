import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  FaFileContract, FaCarCrash, FaNotesMedical, FaHome, 
  FaMapMarkerAlt, FaCalendarAlt, FaCamera, FaPaperPlane, FaShieldAlt 
} from 'react-icons/fa';

export default function ClaimsDeclarationPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    policyNumber: '',
    claimType: 'automobile',
    occurrenceDate: '',
    occurrenceTime: '',
    province: 'Kinshasa',
    exactLocation: '',
    description: '',
    estimatedDamage: '',
    witnessContact: ''
  });

  const [files, setFiles] = useState([]);

  const claimTypes = [
    { id: 'automobile', label: 'Automobile / Accident', icon: <FaCarCrash className="text-xl" /> },
    { id: 'sante', label: 'Santé / Hospitalisation', icon: <FaNotesMedical className="text-xl" /> },
    { id: 'habitation', label: 'Habitation / Incendie / Vol', icon: <FaHome className="text-xl" /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const triggerGeolocation = () => {
    if (navigator.geolocation) {
      toast.info("Récupération des coordonnées GPS...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            exactLocation: `Lat: ${position.coords.latitude.toFixed(5)}, Long: ${position.coords.longitude.toFixed(5)}`
          }));
          toast.success("Position GPS ajoutée avec succès !");
        },
        () => {
          toast.error("Impossible de récupérer la position exacte. Veuillez l'écrire manuellement.");
        }
      );
    } else {
      toast.error("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Déclaration de sinistre transmise aux experts de DRC Assurances !");
      setFormData({
        policyNumber: '',
        claimType: 'automobile',
        occurrenceDate: '',
        occurrenceTime: '',
        province: 'Kinshasa',
        exactLocation: '',
        description: '',
        estimatedDamage: '',
        witnessContact: ''
      });
      setFiles([]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-['Saira']">
      <div className="max-w-3xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-10">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00A3E0] bg-[#00A3E0]/10 rounded-full">
            Guichet Numérique DRC Assurances
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight sm:text-4xl">
            Déclaration de Sinistre
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Déclarez votre incident en moins de 5 minutes. Nos équipes traitent votre dossier en conformité avec la réglementation ARCA.
          </p>
        </div>

        {/* Boîtier du Formulaire */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* 1. Type de sinistre */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider">
                1. Type d'assurance concernée
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {claimTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, claimType: type.id }))}
                    className={`p-4 flex flex-col items-center justify-center gap-2 border rounded-xl text-center font-bold text-xs transition-all
                      ${formData.claimType === type.id 
                        ? 'border-[#00A3E0] bg-[#00A3E0]/5 text-[#00A3E0] ring-2 ring-[#00A3E0]/20' 
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                      }`}
                  >
                    {type.icon}
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Contrat & Dégâts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <FaFileContract className="inline mr-2 text-[#00A3E0]" /> Numéro de Police / Attestation *
                </label>
                <input
                  type="text"
                  name="policyNumber"
                  required
                  placeholder="Ex: DRC-POL-2026-8943"
                  value={formData.policyNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Estimation financière des dégâts (USD)
                </label>
                <input
                  type="number"
                  name="estimatedDamage"
                  placeholder="Ex: 1500"
                  value={formData.estimatedDamage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] dark:text-white"
                />
              </div>
            </div>

            {/* 3. Temps et Région */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <FaCalendarAlt className="inline mr-2 text-[#00A3E0]" /> Date de l'incident *
                </label>
                <input
                  type="date"
                  name="occurrenceDate"
                  required
                  value={formData.occurrenceDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Heure approximative *
                </label>
                <input
                  type="time"
                  name="occurrenceTime"
                  required
                  value={formData.occurrenceTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Province RDC *
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] dark:text-white"
                >
                  <option value="Kinshasa">Kinshasa</option>
                  <option value="Kongo-Central">Kongo-Central</option>
                  <option value="Haut-Katanga">Haut-Katanga</option>
                  <option value="Nord-Kivu">Nord-Kivu</option>
                  <option value="Sud-Kivu">Sud-Kivu</option>
                  <option value="Lualaba">Lualaba</option>
                </select>
              </div>
            </div>

            {/* 4. Géolocalisation */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  <FaMapMarkerAlt className="inline mr-2 text-[#CE1126]" /> Lieu exact / Coordonnées GPS *
                </label>
                <button
                  type="button"
                  onClick={triggerGeolocation}
                  className="text-xs font-bold text-[#00A3E0] hover:underline flex items-center gap-1"
                >
                  📍 Utiliser ma position actuelle
                </button>
              </div>
              <input
                type="text"
                name="exactLocation"
                required
                placeholder="Ex: Croisement Boulevard du 30 Juin et Avenue Batetela, Gombe"
                value={formData.exactLocation}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] dark:text-white"
              />
            </div>      
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Description détaillée de l'incident *   
                </label>
                <textarea
                    name="description"
                    required
                    placeholder="Ex: Collision avec un autre véhicule à l'intersection, dégâts sur le pare-chocs avant et le phare gauche."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] dark:text-white"
                />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Témoins (Nom et Contact)
              </label>
              <textarea
                name="witnesses"
                placeholder="Ex: Jean Dupont - 081 23 45 67"
                value={formData.witnesses}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Pièces jointes (photos, documents)
                </label>
                <input
                    type="file"
                    name="attachments"
                    multiple
                    onChange={handleFileChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0] dark:text-white"     
            />  
            </div>
            <div className="flex justify-end">
              <button
                type="submit"       
                disabled={loading}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  loading ? 'bg-slate-500 cursor-not-allowed' : 'bg-[#00A3E0] hover:bg-[#0088C0] text-white'
                }`} 
                >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>   
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path> 
                    </svg>
                ) : (
                  <>
                    <FaPaperPlane className="text-white" />
                    <span>Soumettre la déclaration</span>
                  </>
                )}
                </button>
            </div>
          </form>
        </motion.div>
        </div>
    </div>
  );
}
import React, { useState } from 'react';
// Importation des icônes professionnelles pour le devis
import { 
  FaBirthdayCake, 
  FaUsers, 
  FaFileAlt, 
  FaCamera, 
  FaWhatsapp, 
  FaCheckCircle 
} from 'react-icons/fa';

export default function DevisGateau() {
  const [evenement, setEvenement] = useState('Anniversaire');
  const [parts, setParts] = useState(15);
  const [saveur, setSaveur] = useState('Chocolat Ivoirien');
  const [description, setDescription] = useState('');
  const [imageInspiration, setImageInspiration] = useState(null);
  const [aperçuImage, setAperçuImage] = useState(null);

  // Gestion du téléversement d'image
  const gererImage = (e) => {
    const fichier = e.target.files[0];
    if (fichier) {
      setImageInspiration(fichier);
      setAperçuImage(URL.createObjectURL(fichier));
    }
  };

  // ENVOI DE LA DEMANDE DE DEVIS SUR WHATSAPP
  const soumettreDevisWhatsApp = (e) => {
    e.preventDefault();
    
    const numeroWhatsApp = "2250701020304"; // À remplacer par votre numéro M-Délice

    // Construction du texte du message de devis
    let message = `Bonjour M-Délice ! 🎂\n\n`;
    message += `Je souhaite obtenir un devis pour un gâteau personnalisé :\n\n`;
    message += `✨ *Événement :* ${evenement}\n`;
    message += `👥 *Nombre de parts demandé :* ${parts} parts\n`;
    message += `🍦 *Parfum de base choisi :* ${saveur}\n\n`;
    message += `📝 *Description du projet :*\n${description}\n`;

    if (imageInspiration) {
      message += `\n📸 *Note :* Je possède une photo d'inspiration que je vais vous envoyer juste après ce message.`;
    }

    // Encodage de l'URL pour WhatsApp
    // Correction : Ajout du $ avant {numeroWhatsApp} et vérification du format du numéro
const urlWhatsApp = `https://wa.me{numeroWhatsApp}?text=${encodeURIComponent(message)}`;

    
    // Redirection vers l'application WhatsApp
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-amber-100 my-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-amber-950 font-serif flex items-center justify-center gap-2">
          <FaBirthdayCake className="text-amber-600" /> Création de Gâteau sur Mesure
        </h2>
        <p className="text-sm text-amber-800/80 mt-2">Mariages, Anniversaires, Célébrations à Abidjan — Confiez-nous vos rêves</p>
      </div>

      <form onSubmit={soumettreDevisWhatsApp} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type d'événement */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaCheckCircle className="text-amber-600 text-xs" /> Type d'événement
            </label>
            <select 
              value={evenement}
              onChange={(e) => setEvenement(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20 text-sm"
            >
              <option value="Anniversaire">🎂 Anniversaire</option>
              <option value="Mariage">👰 Mariage / Dot</option>
              <option value="Baptême">👶 Baptême</option>
              <option value="Autre">✨ Autre Célébration</option>
            </select>
          </div>

          {/* Nombre de parts */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FaUsers className="text-amber-600 text-sm" /> Nombre de parts : <span className="text-amber-700 font-bold">{parts}</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="150" 
              step="5"
              value={parts}
              onChange={(e) => setParts(e.target.value)}
              className="w-full accent-amber-600 h-2 bg-gray-200 rounded-lg cursor-pointer mt-4"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10 parts</span>
              <span>150 parts +</span>
            </div>
          </div>
        </div>

        {/* Choix de la saveur de base */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FaBirthdayCake className="text-amber-600 text-xs" /> Parfum de base souhaité
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'choc', nom: 'Chocolat Ivoirien' },
              { id: 'van', nom: 'Vanille Bourbon' },
              { id: 'mang', nom: 'Mangue / Passion' },
              { id: 'red', nom: 'Red Velvet' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSaveur(p.nom)}
                className={`p-3 text-sm font-medium rounded-xl border transition-all text-center ${
                  saveur === p.nom 
                    ? 'border-amber-600 bg-amber-600 text-white shadow-md' 
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-amber-50/50'
                }`}
              >
                {p.nom}
              </button>
            ))}
          </div>
        </div>

        {/* Description libre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaFileAlt className="text-amber-600 text-sm" /> Décrivez le gâteau de vos rêves
          </label>
          <textarea 
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Couleurs, thèmes, inscriptions à écrire (Ex: 'Joyeux Anniversaire Marie, thème princesse en dorures')..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            required
          ></textarea>
        </div>

        {/* Upload de l'image d'inspiration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaCamera className="text-amber-600 text-sm" /> Photo d'inspiration (Modèle recherché)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-amber-50/10 hover:bg-amber-50/30 transition-colors">
              <div className="flex flex-col items-center justify-center pt-4 pb-4">
                <FaCamera className="text-gray-400 text-2xl mb-2" />
                <p className="text-sm text-gray-500"><span className="font-semibold">Cliquez pour ajouter</span> ou glissez</p>
                <p className="text-xs text-gray-400">PNG, JPG ou JPEG</p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={gererImage} />
            </label>
          </div>
          
          {/* Aperçu de la photo chargée */}
          {aperçuImage && (
            <div className="mt-4 flex items-center gap-4 bg-amber-50/40 p-3 rounded-xl border border-amber-100 w-fit">
              <img src={aperçuImage} alt="Inspiration" className="w-16 h-16 object-cover rounded-lg shadow-sm" />
              <div>
                <p className="text-xs font-semibold text-gray-700">Modèle ajouté avec succès !</p>
                <p className="text-xs text-gray-400">Le récapitulatif l'indiquera sur WhatsApp.</p>
              </div>
            </div>
          )}
        </div>

        {/* Bouton de validation WhatsApp */}
        <button 
          type="submit"
          className="w-full bg-amber-850 text-white py-3.5 rounded-xl font-bold hover:bg-amber-900 transition-colors shadow-lg text-base flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="text-xl" /> Envoyer ma demande via WhatsApp
        </button>
      </form>
    </div>
  );
}

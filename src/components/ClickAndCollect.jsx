import React, { useState } from 'react';
// Importation des icônes professionnelles depuis Font Awesome (Fa)
import { 
  FaShoppingCart, 
  FaPlus, 
  FaMinus, 
  FaUser, 
  FaClock, 
  FaWhatsapp, 
  FaBirthdayCake, 
  FaStore 
} from 'react-icons/fa';

// IMPORTATION DU BOUTON CINETPAY (Ajouté à cette étape)
import CinetPayButton from './CinetPayButton.jsx';


const PATISSERIES_EXEMPLES = [
  { id: 1, nom: 'Mille-feuille Tradition', prix: 2500, image: 'https://unsplash.com' },
  { id: 2, nom: 'Opéra Café-Chocolat', prix: 3000, image: 'https://unsplash.com' },
  { id: 3, nom: 'Croissant Pur Beurre', prix: 1000, image: 'https://unsplash.com' },
  { id: 4, nom: 'Tarte aux Fruits Frais', prix: 3500, image: 'https://unsplash.com' },
];

export default function ClickAndCollect() {
  const [panier, setPanier] = useState([]);
  const [heureRetrait, setHeureRetrait] = useState('');
  const [nomClient, setNomClient] = useState('');

  const ajouterAuPanier = (produit) => {
    setPanier((prevPanier) => {
      const existe = prevPanier.find((item) => item.id === produit.id);
      if (existe) {
        return prevPanier.map((item) =>
          item.id === produit.id ? { ...item, quantite: item.quantite + 1 } : item
        );
      }
      return [...prevPanier, { ...produit, quantite: 1 }];
    });
  };

  const ajusterQuantite = (id, delta) => {
    setPanier((prevPanier) =>
      prevPanier
        .map((item) => (item.id === id ? { ...item, quantite: item.quantite + delta } : item))
        .filter((item) => item.quantite > 0)
    );
  };

  const totalGlobal = panier.reduce((total, item) => total + item.prix * item.quantite, 0);

  const envoyerCommandeWhatsApp = (e) => {
    e.preventDefault();
    if (panier.length === 0) return alert('Votre panier est vide !');
    if (!heureRetrait) return alert('Veuillez choisir une heure de retrait.');

    const numeroWhatsApp = "2250700000000"; // À remplacer par votre numéro

    let message = `Bonjour M-Délice ! 🥞\n\n`;
    message += `Je souhaite passer une commande en Click & Collect :\n`;
    message += `👤 *Nom :* ${nomClient}\n`;
    message += `⏰ *Heure de retrait :* ${heureRetrait}\n\n`;
    message += `🛒 *Détail de la commande :*\n`;
    
    panier.forEach((item) => {
      message += `- ${item.quantite}x ${item.nom} (${(item.prix * item.quantite).toLocaleString()} FCFA)\n`;
    });

    message += `\n💰 *Total à payer :* ${totalGlobal.toLocaleString()} FCFA`;

    const urlWhatsApp = `https://wa.me{numeroWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-amber-50/30">
      <h1 className="text-3xl font-bold text-amber-900 text-center mb-8 font-serif flex items-center justify-center gap-3">
        <FaBirthdayCake className="text-amber-600" /> Le Catalogue M-Délice & Click & Collect
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des produits */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PATISSERIES_EXEMPLES.map((produit) => (
            <div key={produit.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-100">
              <img src={produit.image} alt={produit.nom} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{produit.nom}</h3>
                <p className="text-amber-700 font-bold mt-1">{produit.prix.toLocaleString()} FCFA</p>
                <button 
                  onClick={() => ajouterAuPanier(produit)}
                  className="w-full mt-4 bg-amber-600 text-white py-2.5 rounded-xl font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FaPlus className="text-xs" /> Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Panier virtuel */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100 h-fit">
          <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2 border-b pb-3">
            <FaShoppingCart className="text-amber-600" /> Mon Panier
          </h2>

          {panier.length === 0 ? (
            <div className="text-center py-8">
              <FaStore className="text-gray-300 text-4xl mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Votre panier M-Délice est vide.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {panier.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-amber-50/50 p-3 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{item.nom}</h4>
                    <p className="text-xs text-amber-700 font-semibold">{(item.prix * item.quantite).toLocaleString()} FCFA</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg border px-2 py-1.5 shadow-sm">
                    <button onClick={() => ajusterQuantite(item.id, -1)} className="text-amber-700 font-bold p-1 hover:text-amber-900 transition-colors">
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center text-gray-800">{item.quantite}</span>
                    <button onClick={() => ajusterQuantite(item.id, 1)} className="text-amber-700 font-bold p-1 hover:text-amber-900 transition-colors">
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mt-4 space-y-4">
                <div className="flex justify-between text-lg font-bold text-amber-900">
                  <span>Total :</span>
                  <span>{totalGlobal.toLocaleString()} FCFA</span>
                </div>

                {/* Formulaire de validation */}
                <form onSubmit={envoyerCommandeWhatsApp} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                      <FaUser className="text-amber-700 text-2xs" /> Votre Nom
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ex: Kouassi" 
                      value={nomClient} 
                      onChange={(e) => setNomClient(e.target.value)} 
                      className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50/50" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                      <FaClock className="text-amber-700 text-2xs" /> Heure de retrait souhaitée
                    </label>
                    <input 
                      type="time" 
                      required 
                      value={heureRetrait} 
                      onChange={(e) => setHeureRetrait(e.target.value)} 
                      className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50/50" 
                    />
                  </div>

                  {/* Bouton Option 1 : WhatsApp */}
                  <button 
                    type="submit" 
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md mt-2 flex items-center justify-center gap-2" 
                  >
                    <FaWhatsapp className="text-lg" /> Commander sur WhatsApp
                  </button>

                  {/* Séparateur visuel élégant (Ajouté à cette étape) */}
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold">OU</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  {/* Bouton Option 2 : Bouton CinetPay Mobile Money Multi-opérateurs (Ajouté à cette étape) */}
                  <CinetPayButton 
                    montant={totalGlobal}
                    nomClient={nomClient}
                    infoCommande={`${panier.length} douceurs M-Délice`}
                    onSucces={(idTx) => {
                      setPanier([]);
                      alert(`Votre reçu de paiement porte le numéro : ${idTx}`);
                    }}
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

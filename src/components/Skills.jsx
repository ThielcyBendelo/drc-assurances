import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBoxes, FaPlus, FaExclamationTriangle, FaTrash, 
  FaUserFriends, FaArrowRight, FaPen, FaMinus, FaEdit, FaCheckCircle 
} from 'react-icons/fa';
import QuoteModal from './QuoteModal';

// Données initiales du stock M-DELICE Abidjan
const initialIngredients = [
  {
    id: 1,
    title: "Beurre de Baratte AOP 82%",
    category: "frais",
    supplierUrl: "https://wa.me",
    subtitle: "Viennoiseries & Pâtes",
    quantity: 45, // Stock sous forme de nombre pour les calculs CRUD
    alertThreshold: 20,
    location: "Chambre Froide 1",
    supplier: "Distri-Ivoire SAS",
    price: "4 500 F/kg",
    image: "https://unsplash.com"
  },
  {
    id: 2,
    title: "Chocolat Noir de Couverture 64%",
    category: "secs",
    supplierUrl: "https://wa.me",
    subtitle: "Mousses & Ganaches",
    quantity: 12,
    alertThreshold: 25, // Déclenche l'alerte car la quantité (12) < au seuil (25)
    location: "Réserve Sèche",
    supplier: "Cacao-Afrik Abidjan",
    price: "6 200 F/kg",
    image: "https://unsplash.com"
  }
];

export default function Skills() {
  const [stockList, setStockList] = useState(initialIngredients);
  const [activeFilter, setActiveFilter] = useState("tous");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  
  // États pour le formulaire d'ajout CRUD (Create)
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    title: '', subtitle: '', category: 'secs', price: '', 
    quantity: '', alertThreshold: '', location: '', supplier: ''
  });

  // --- ACTIONS CRUD ---

  // 1. CREATE : Ajouter un ingrédient
  const handleCreateIngredient = (e) => {
    e.preventDefault();
    if (!newIngredient.title || !newIngredient.quantity) return;

    const createdItem = {
      id: Date.now(),
      title: newIngredient.title,
      subtitle: newIngredient.subtitle || "Matière première",
      category: newIngredient.category,
      supplierUrl: "https://wa.me",
      quantity: Number(newIngredient.quantity),
      alertThreshold: Number(newIngredient.alertThreshold) || 0,
      location: newIngredient.location || "Réserve",
      supplier: newIngredient.supplier || "Fournisseur local",
      price: newIngredient.price ? `${newIngredient.price} F/kg` : "Non spécifié",
      image: "https://unsplash.com"
    };

    setStockList([createdItem, ...stockList]);
    setShowAddForm(false);
    setNewIngredient({ title: '', subtitle: '', category: 'secs', price: '', quantity: '', alertThreshold: '', location: '', supplier: '' });
  };

  // 2. UPDATE : Ajuster les quantités (+/-) rapides
  const handleUpdateQuantity = (id, amount) => {
    setStockList(prevList => 
      prevList.map(item => {
        if (item.id === id) {
          const nextQty = item.quantity + amount;
          return { ...item, quantity: nextQty < 0 ? 0 : nextQty };
        }
        return item;
      })
    );
  };

  // 3. DELETE : Supprimer un ingrédient du tableau
  const handleDeleteIngredient = (id) => {
    if (window.confirm("Voulez-vous vraiment retirer cet ingrédient du stock ?")) {
      setStockList(stockList.filter(item => item.id !== id));
    }
  };

  // --- SÉLECTIONS ET FILTRES (READ) ---
  const handleOrderClick = (title) => {
    setSelectedIngredient(`Réapprovisionnement Urgent : ${title}`);
    setModalOpen(true);
  };

  const handleSupplierContact = (url) => {
    window.open(url, '_blank');
  };

  const filteredStock = activeFilter === "tous" 
    ? stockList 
    : stockList.filter(item => item.category === activeFilter);

  return (
    <motion.section 
      id="stock" 
      className="py-20 px-6 bg-stone-50 dark:bg-stone-950 min-h-screen transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* 1. EN-TÊTE DE LA PAGE */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-stone-950 dark:text-amber-400 font-serif mb-6 uppercase tracking-tight">
            Contrôle des Stocks
          </h1>
          <div className="h-2 w-32 bg-orange-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto italic">
            "Mettez à jour vos matières premières en temps réel (Système CRUD) pour piloter l'atelier."
          </p>
        </div>

        {/* 2. ZONE DES COMMANDES FILTRES ET BOUTON AJOUT */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-stone-900 p-4 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {["tous", "frais", "secs"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  activeFilter === filter ? 'bg-amber-800 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {filter === 'tous' ? 'Tous' : filter === 'frais' ? 'Produits Frais' : 'Épicerie Sèche'}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full sm:w-auto px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <FaPlus /> {showAddForm ? "Fermer le formulaire" : "Ajouter un ingrédient"}
          </button>
        </div>

        {/* 3. FORMULAIRE CRUD : AJOUT INTERACTIF DÉPLOYABLE (CREATE) */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleCreateIngredient}
              className="mb-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-[30px] p-6 md:p-8 shadow-lg overflow-hidden space-y-4"
            >
              <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-white mb-2">Nouvel Ingrédient</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="text" placeholder="Nom de la matière première *" required value={newIngredient.title} onChange={(e) => setNewIngredient({...newIngredient, title: e.target.value})} className="p-3 bg-stone-50 dark:bg-stone-800 text-sm rounded-xl border border-stone-100 dark:border-stone-700 text-white outline-none focus:ring-1 focus:ring-amber-500" />
                <input type="text" placeholder="Usage (Ex: Mousses, Glaçages)" value={newIngredient.subtitle} onChange={(e) => setNewIngredient({...newIngredient, subtitle: e.target.value})} className="p-3 bg-stone-50 dark:bg-stone-800 text-sm rounded-xl border border-stone-100 dark:border-stone-700 text-white outline-none focus:ring-1 focus:ring-amber-500" />
                <input type="number" placeholder="Quantité initiale (kg) *" required min="0" value={newIngredient.quantity} onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})} className="p-3 bg-stone-50 dark:bg-stone-800 text-sm rounded-xl border border-stone-100 dark:border-stone-700 text-white outline-none focus:ring-1 focus:ring-amber-500" />
                <input type="number" placeholder="Seuil d'alerte critique (kg)" min="0" value={newIngredient.alertThreshold} onChange={(e) => setNewIngredient({...newIngredient, alertThreshold: e.target.value})} className="p-3 bg-stone-50 dark:bg-stone-800 text-sm rounded-xl border border-stone-100 dark:border-stone-700 text-white outline-none focus:ring-1 focus:ring-amber-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select value={newIngredient.category} onChange={(e) => setNewIngredient({...newIngredient, category: e.target.value})} className="p-3 bg-stone-50 dark:bg-stone-800 text-sm rounded-xl border border-stone-100 dark:border-stone-700 text-white outline-none focus:ring-1 focus:ring-amber-500">
                  <option value="secs">Épicerie Sèche</option>
                  <option value="frais">Produits Frais</option>
                </select>
                <input type="text" placeholder="Prix unitaire moyen (Ex: 4000)" value={newIngredient.price} onChange={(e) => setNewIngredient({...newIngredient, price: e.target.value})} className="p-3 bg-stone-50 dark:bg-stone-800 text-sm rounded-xl border border-stone-100 dark:border-stone-700 text-white outline-none focus:ring-1 focus:ring-amber-500" />
                <input type="text" placeholder="Zone de stockage (Ex: Frigo 2)" value={newIngredient.location} onChange={(e) => setNewIngredient({...newIngredient, location: e.target.value})} className="p-3 bg-stone-50 dark:bg-stone-800 text-sm rounded-xl border border-stone-100 dark:border-stone-700 text-white outline-none focus:ring-1 focus:ring-amber-500" />
<input type="text" placeholder="Fournisseur (Ex: Distri-Ivoire)" value={newIngredient.supplier} onChange={(e) => setNewIngredient({...newIngredient, supplier: e.target.value})} className="p-3 bg-stone-50 dark:bg-stone-800 text-sm rounded-xl border border-stone-100 dark:border-stone-700 text-white outline-none focus:ring-1 focus:ring-amber-500" />  
              </div>
              <button type="submit" className="px-6 py-3 bg-amber-800 hover:bg-orange-600 text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-md transition-colors">
                <FaCheckCircle className="inline-block mr-2" /> Ajouter l'ingrédient</button> 
            </motion.form>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {modalOpen && (
            <QuoteModal />
          )}
        </AnimatePresence>  
        {/* 4. TABLEAU DE GESTION DES STOCKS AVEC ACTIONS CRUD */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-lg"> 
            <thead>
              <tr className="text-left text-xs uppercase text-stone-400 font-bold tracking-wider border-b border-stone-100 dark:border-stone-800">
                <th className="p-4">Ingrédient</th> 
                <th className="p-4">Quantité</th>
                <th className="p-4">Seuil d'Alerte</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Prix Unit.</th>
                <th className="p-4">Emplacement</th>
                <th className="p-4">Fournisseur</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50 dark:divide-stone-800 text-sm font-medium">
              {filteredStock.map((item) => (
                <tr key={item.id} className={`text-stone-700 dark:text-stone-300 hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors ${item.quantity < item.alertThreshold ? 'bg-red-50 dark:bg-red-900/20' : ''}`}>  
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-800/80 rounded-full flex items-center justify-center text-white">
                      <FaBoxes size={14} /> 
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 dark:text-white">{item.title}</p>    
                      <p className="text-xs text-stone-500 dark:text-stone-400">{item.subtitle}</p>
                    </div>
                  </td> 
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleUpdateQuantity(item.id, -1)} className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors">  
                        <FaMinus size={10} />
                      </button>
                      <span>{item.quantity} kg</span> 
                      <button onClick={() => handleUpdateQuantity(item.id, 1)} className="p-1 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors">
                        <FaPlus size={10} />
                      </button> 
                    </div>
                  </td>
                  <td className="p-4">{item.alertThreshold} kg</td> 
                  <td className="p-4">{item.category === 'frais' ? 'Frais' : 'Sec'}</td>
                  <td className="p-4">{item.price}</td>
                  <td className="p-4">{item.location}</td>  
                  <td className="p-4">
                    <button onClick={() => handleSupplierContact(item.supplierUrl)} className="text-amber-500 hover:text-orange-400 transition-colors">
                      {item.supplier}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditItem(item)} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors">
                        <FaEdit size={14} />
                      </button>
                      <button onClick={() => handleDeleteItem(item.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>  
    </motion.section>
  );
}
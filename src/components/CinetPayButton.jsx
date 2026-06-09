import React, { useEffect, useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';

export default function CinetPayButton({ montant, nomClient, infoCommande, onSucces }) {
  const [scriptCharge, setScriptCharge] = useState(false);

  useEffect(() => {
    const verifierScript = () => {
      if (window.CinetPay) {
        setScriptCharge(true);
      }
    };
    verifierScript();
    const interval = setInterval(verifierScript, 1000);
    return () => clearInterval(interval);
  }, []);

 const executerPaiement = () => {
  if (!montant || montant <= 0) {
    alert("Le montant de la commande est invalide.");
    return;
  }

  // Clés officielles de test fournies par la documentation de CinetPay
  const CONFIG_CINETPAY = {
    apikey: "12913952795b87192667104.99281729", // Clé sandbox officielle CinetPay
    site_id: "444141",                          // ID de test officiel CinetPay
    notify_url: "https://votre-site.com"
  };

  const idTransaction = "MD-" + Math.floor(Math.random() * 10000000);

  window.CinetPay.setConfig({
    apikey: CONFIG_CINETPAY.apikey,
    site_id: CONFIG_CINETPAY.site_id,
    notify_url: CONFIG_CINETPAY.notify_url,
    mode: 'TEST' // <-- ON PASSE EN MODE TEST ICI POUR LE LOCALHOST
  });

  window.CinetPay.getCheckout({
    transaction_id: idTransaction,
    amount: montant,
    currency: 'XOF',
    channels: 'MOBILE_MONEY,WALLET', 
    description: `Commande M-Délice : ${infoCommande}`,
    customer_name: nomClient || "Client M-Délice",
    customer_surname: " ",
    customer_email: "client@m-delice.ci",
    customer_phone_number: "0700000000",
    customer_address: "Abidjan",
    customer_city: "Abidjan",
    customer_country: "CI",
    customer_state: "CI",
    customer_zip_code: "00225"
  });

  window.CinetPay.waitResponse(function(data) {
    if (data.status === "REFUSED") {
      alert("Le paiement de test a été annulé.");
    } else if (data.status === "ACCEPTED") {
      alert("🎉 Super ! Le paiement de test M-Délice a fonctionné !");
      if (onSucces) onSucces(idTransaction);
    }
  });
};


  return (
    <div className="block clear-both mt-4 p-4 bg-amber-50/60 rounded-xl border border-amber-100 text-center">
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3 opacity-90">
        <span className="text-[10px] font-bold text-amber-900/60 uppercase tracking-wider block w-full text-center mb-1">
          Modes de paiement sécurisés
        </span>
        <span className="px-2 py-0.5 bg-orange-500 text-white font-black text-[10px] rounded shadow-sm">Orange</span>
        <span className="px-2 py-0.5 bg-yellow-400 text-black font-black text-[10px] rounded shadow-sm">MTN</span>
        <span className="px-2 py-0.5 bg-blue-400 text-white font-black text-[10px] rounded shadow-sm">Wave</span>
        <span className="px-2 py-0.5 bg-red-600 text-white font-black text-[10px] rounded shadow-sm">Airtel</span>
        <span className="px-2 py-0.5 bg-green-600 text-white font-black text-[10px] rounded shadow-sm">M-Pesa</span>
      </div>

      <button
        type="button"
        onClick={executerPaiement}
        disabled={!scriptCharge}
        className={`w-full text-white py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 text-sm ${
          scriptCharge 
            ? 'bg-amber-700 hover:bg-amber-800 cursor-pointer' 
            : 'bg-gray-400 cursor-not-allowed opacity-50'
        }`}
      >
        <FaMobileAlt className="text-base" /> 
        {scriptCharge ? "Payer par Mobile Money" : "Chargement de la passerelle..."}
      </button>
    </div>
  );
}

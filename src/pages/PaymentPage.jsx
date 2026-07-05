import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import policyService from '../services/policyService.js';
import notificationService from '../services/notificationService';
import { 
  FaCreditCard, FaMobileAlt, FaShieldAlt, FaLock, 
  FaUser, FaPhone, FaCheckCircle, FaArrowLeft, FaSpinner 
} from 'react-icons/fa';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Récupération des données transmises par le tunnel d'achat précédent
  const selectedPack = location.state?.selectedPack || {
    id: 1,
    name: "Pack Santé Famille - CONFORT",
    price: 45,
    branch: "Santé",
    coverageLevel: "Confort",
    coverageLimit: "Plafond annuel : 3 500 USD"
  };

  const beneficiaryData = location.state?.beneficiaryData || {
    beneficiaryLastName: 'Mbuyi',
    beneficiaryFirstName: 'Thérèse',
    beneficiaryPhone: '+243810000000',
    beneficiaryCity: 'Kinshasa',
    beneficiaryAddress: 'Avenue de la Justice, Gombe',
    beneficiaryNationalID: 'N-RDC-89215'
  };

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [mobileOperator, setMobileOperator] = useState('mpesa');

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      notificationService.info("Traitement de la transaction financière et chiffrement ARCA...");

      const mockTxRef = paymentMethod === 'card' 
        ? `STR-ch_${Math.random().toString(36).substring(2, 12)}` 
        : `CIN-MM-${Math.floor(10000000 + Math.random() * 90000000)}`;

      const paymentDetails = {
        transactionReference: mockTxRef,
        gateway: paymentMethod === 'card' ? 'Stripe_Card' : 'CinetPay_MobileMoney',
        currency: 'USD',
        exchangeRate: 1
      };

      const result = await policyService.purchasePolicy(beneficiaryData, selectedPack, paymentDetails);

      if (result.success) {
        notificationService.success(`Paiement approuvé ! Contrat officiel émis : ${result.policyNumber}`);
        navigate('/dashboard', { 
          state: { 
            paymentSuccess: true,
            policyNumber: result.policyNumber
          } 
        });
      } else {
        notificationService.error(result.error || "Le régulateur a rejeté l'émission du certificat.");
      }
    } catch (error) {
      console.error("[Fintech Checkout Error]", error);
      notificationService.error("Échec critique lors de l'enregistrement de la police d'assurance.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <NavbarSecured />

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 pt-24">
        
        {/* RECAPITULATIF FINANCIER */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#00A3E0] mb-4">Récapitulatif de commande</h3>
            
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedPack.name}</p>
              <p className="text-xs text-slate-400 italic">{selectedPack.coverageLimit}</p>
            </div>

            <div className="py-4 border-b border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Bénéficiaire en RD Congo</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <FaUser className="text-[#00A3E0]" /> {beneficiaryData.beneficiaryFirstName} {beneficiaryData.beneficiaryLastName}
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 font-mono">
                <FaPhone className="text-green-500" /> {beneficiaryData.beneficiaryPhone} ({beneficiaryData.beneficiaryCity})
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between font-black text-slate-900 dark:text-white">
              <span>Montant de la prime :</span>
              <span className="text-2xl text-[#00A3E0]">{selectedPack.price} USD</span>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl flex items-start gap-3">
            <FaLock className="mt-1 flex-shrink-0 text-sm" />
            <p className="text-xs leading-relaxed">
              Vos informations d'identification de paiement sont entièrement chiffrées de bout en bout et transmises via un canal sécurisé isolé.
            </p>
          </div>
        </div>

        {/* GUICHETS FINTECH DE PAIEMENT */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 font-bold text-sm ${
                  paymentMethod === 'card'
                    ? 'border-[#00A3E0] bg-[#00A3E0]/5 text-[#00A3E0]'
                    : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <FaCreditCard size={20} />
                <span>Diaspora (Carte / Stripe)</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('mobile_money')}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 font-bold text-sm ${
                  paymentMethod === 'mobile_money'
                    ? 'border-[#00A3E0] bg-[#00A3E0]/5 text-[#00A3E0]'
                    : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <FaMobileAlt size={20} />
                <span>RDC Local (Mobile Money)</span>
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              
              {paymentMethod === 'card' ? (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Informations de Carte Internationale</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Numéro de carte</label>
                    <input type="text" maxLength="19" placeholder="4242 •••• •••• 4242" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Date d'expiration</label>
                      <input type="text" placeholder="MM / AA" maxLength="5" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0] text-center" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Code (CVC)</label>
                      <input type="password" placeholder="•••" maxLength="3" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0] text-center" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4">Opérateurs Congolais via CinetPay</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {['mpesa', 'orange', 'airtel'].map((op) => (
                      <button
                        key={op}
                        type="button"
                        onClick={() => setMobileOperator(op)}
                        className={`p-3 rounded-xl border text-xs font-black uppercase tracking-wider text-center transition-all ${
                          mobileOperator === op ? 'border-[#FDD100] bg-[#FDD100]/10 text-slate-800 dark:text-[#FDD100]' : 'border-slate-100 dark:border-slate-800 text-slate-400'
                        }`}
                      >
                        {op === 'mpesa' && "M-Pesa"}
                        {op === 'orange' && "Orange"}
                        {op === 'airtel' && "Airtel"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

             <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/simulateur')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FaArrowLeft /> Modifier la simulation
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#00A3E0] hover:bg-[#0082B3] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border-b-4 border-[#006180] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <><FaSpinner className="animate-spin" /> <span>Sécurisation...</span></>
                  ) : (
                    <><FaShieldAlt /> <span>Confirmer le paiement de {selectedPack.price} USD</span></>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

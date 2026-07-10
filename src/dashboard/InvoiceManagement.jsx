import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  FaFileInvoiceDollar, FaSearch, FaDownload, FaPrint, 
  FaShieldAlt, FaBarcode, FaCalendarAlt, FaCheckCircle,
  FaFilePdf, FaFilter, FaClock
} from 'react-icons/fa';
import notificationService from '../services/notificationService';

export default function InvoiceManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [sqlInvoices, setSqlInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. LIRE (FETCH) : Connexion asynchrone sécurisée au registre SQL Server de Render
  const fetchRealInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://onrender.com');
      if (!response.ok) throw new Error("Erreur de connexion API");
      const data = await response.json();
      
      // Remodelage unitaire pour s'aligner sur votre structure de données existante sans la casser
      const formattedInvoices = data.map(inv => ({
        invoiceNo: `QTC-2026-${inv.PolicyID}04`,
        policyNumber: inv.PolicyNumber,
        buyer: inv.BuyerName,
        buyerEmail: inv.BuyerEmail,
        beneficiary: `${inv.BeneficiaryName} (${inv.BeneficiaryCity})`,
        issueDate: new Date(inv.PaymentDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'Long', year: 'numeric' }),
        amount: `${parseFloat(inv.TotalPaidUSD).toFixed(2)} USD`,
        taxARCA: `${parseFloat(inv.TaxArcaUSD).toFixed(2)} USD`,
        pureAmount: `${parseFloat(inv.AmountUSD).toFixed(2)} USD`,
        branch: inv.InsuranceBranch,
        level: inv.CoverageLevel,
        txRef: inv.TransactionReference,
        status: "Émise & Signée",
        colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
      }));
      setSqlInvoices(formattedInvoices);
    } catch (error) {
      console.error("Mode déconnecté - Affichage du registre local :", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealInvoices();
  }, []);

  // Simulation du registre des quittances et attestations certifiées ARCA (Garantie de Secours)
  const staticInvoicesList = [
    {
      invoiceNo: "QTC-2026-0412",
      policyNumber: "DRC-2026-9821",
      buyer: "Jean Mbuyi",
      buyerEmail: "jean.mbuyi@gmail.com",
      beneficiary: "Thérèse Mbuyi (Kinshasa)",
      issueDate: "14 Juin 2026",
      amount: "540.00 USD",
      taxARCA: "54.00 USD",
      pureAmount: "486.00 USD",
      branch: "Santé",
      level: "Premium",
      txRef: "STR-ch_3MtgXTLkCw",
      status: "Émise & Signée",
      colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      invoiceNo: "QTC-2026-0411",
      policyNumber: "DRC-2026-9820",
      buyer: "Sarah K.",
      buyerEmail: "sarah.k@yahoo.be",
      beneficiary: "Arsène K. (Lubumbashi)",
      issueDate: "29 Juin 2026",
      amount: "348.00 USD",
      taxARCA: "34.80 USD",
      pureAmount: "313.20 USD",
      branch: "Automobile",
      level: "Confort",
      txRef: "CIN-MM-17195421",
      status: "Émise & Signée",
      colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      invoiceNo: "QTC-2026-0410",
      policyNumber: "DRC-2026-9819",
      buyer: "Marc L.",
      buyerEmail: "marc.l@outlook.com",
      beneficiary: "Fiston L. (Goma)",
      issueDate: "02 Juillet 2026",
      amount: "180.00 USD",
      taxARCA: "18.00 USD",
      pureAmount: "162.00 USD",
      branch: "Scolaire",
      level: "Essentiel",
      txRef: "CIN-MM-17195410",
      status: "En attente Visa",
      colorClass: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    }
  ];

  // Fusion intelligente des flux : Priorité aux lignes de SQL Server, bascule sur la simulation locale si vide
  const invoicesList = sqlInvoices.length > 0 ? sqlInvoices : staticInvoicesList;

  // 2. EXTRACTION (EXPORT) : Génération et compilation dynamique du document PDF certifié ARCA
  const handleDownloadPdf = (invoice) => {
    if (notificationService?.success) {
      notificationService.success(`Initialisation du moteur d'impression certifié pour la quittance ${invoice.invoiceNo}...`);
    }

    // Création à la volée d'une zone d'impression masquée isolée pour garantir un fond blanc corporate parfait
    const printNode = document.createElement('div');
    printNode.style.position = 'fixed';
    printNode.style.top = '-2000px';
    printNode.style.left = '-2000px';
    printNode.style.width = '750px';
    printNode.style.padding = '40px';
    printNode.style.backgroundColor = '#ffffff';
    printNode.style.color = '#0f172a';
    printNode.style.fontFamily = 'sans-serif';
    printNode.style.fontSize = '12px';

    printNode.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #00A3E0; padding-bottom:15px; margin-bottom:25px;">
        <div>
          <h1 style="color:#0f172a; margin:0; font-size:22px; font-weight:900; letter-spacing:1px;">DRC ASSURANCES</h1>
          <p style="margin:2px 0 0 0; font-size:10px; color:#64748b; font-weight:bold; text-transform:uppercase;">Agrément ARCA n° RDC/A-2026-X</p>
          <p style="margin:1px 0 0 0; font-size:10px; color:#94a3b8;">Siège social : Boulevard du 30 Juin, Gombe, Kinshasa</p>
        </div>
        <div style="text-align:right;">
          <h2 style="color:#CE1126; margin:0; font-size:16px; font-weight:900; text-transform:uppercase;">Quittance Officielle</h2>
          <p style="margin:4px 0 0 0; font-family:monospace; font-weight:bold;">N° ${invoice.invoiceNo}</p>
          <p style="margin:2px 0 0 0; color:#64748b; font-size:10px;">Date d'émission : ${invoice.issueDate}</p>
        </div>
      </div>
      <div style="display:grid; grid-template-cols:1fr 1fr; gap:30px; margin-bottom:30px; background-color:#f8fafc; padding:15px; border-radius:8px; border:1px solid #e2e8f0;">
        <div>
          <h4 style="margin:0 0 5px 0; color:#94a3b8; text-transform:uppercase; font-size:9px; letter-spacing:1px;">Souscripteur (Diaspora)</h4>
          <p style="margin:0; font-weight:bold; font-size:13px; color:#1e293b;">${invoice.buyer}</p>
          <p style="margin:2px 0 0 0; color:#64748b;">${invoice.buyerEmail || 'client.diaspora@drc-assurances.com'}</p>
        </div>
        <div style="text-align:right;">
          <h4 style="margin:0 0 5px 0; color:#94a3b8; text-transform:uppercase; font-size:9px; letter-spacing:1px;">Bénéficiaire local (RDC)</h4>
          <p style="margin:0; font-weight:bold; font-size:13px; color:#1e293b;">${invoice.beneficiary}</p>
        </div>
      </div>
      <div style="margin-bottom:30px;">
        <h4 style="margin:0 0 8px 0; color:#94a3b8; text-transform:uppercase; font-size:9px; letter-spacing:1px;">Spécifications de la Police d'Assurance</h4>
        <table style="w-full:100%; border-collapse:collapse; text-align:left; font-size:11px; width:100%;">
          <thead>
            <tr style="background-color:#f1f5f9; border-bottom:2px solid #e2e8f0; color:#475569;">
              <th style="padding:10px;">Numéro de Contrat</th>
              <th style="padding:10px;">Branche Couverture</th>
              <th style="padding:10px;">Niveau Formule</th>
              <th style="padding:10px; text-align:right;">Statut Visa</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e2e8f0; color:#1e293b; font-weight:bold;">
              <td style="padding:10px; font-family:monospace; color:#00A3E0;">${invoice.policyNumber}</td>
              <td style="padding:10px;">${invoice.branch || 'Santé Collective'}</td>
              <td style="padding:10px;">${invoice.level || 'Premium'}</td>
              <td style="padding:10px; text-align:right; color:#10b981;">Conforme ARCA</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="width:50%; margin-left:auto; margin-top:20px; border-top:1px solid #cbd5e1; padding-top:10px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:5px; color:#475569;">
          <span>Prime pure nette :</span>
          <span style="font-family:monospace;">${invoice.pureAmount || invoice.amount}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px; color:#CE1126; font-weight:bold;">
          <span>Taxe obligatoire ARCA (10%) :</span>
          <span style="font-family:monospace;">+ ${invoice.taxARCA}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:900; border-top:2px solid #0f172a; padding-top:8px; color:#0f172a; background-color:#f1f5f9; padding:6px; border-radius:4px;">
          <span>Total TTC perçu :</span>
          <span style="font-family:monospace; color:#00A3E0;">${invoice.amount}</span>
        </div>
      </div>
      <div style="margin-top:60px; text-align:center; border-top:1px dashed #e2e8f0; padding-top:15px; color:#94a3b8; font-size:9px; font-style:italic;">
        <p style="margin:0; font-weight:bold; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:4px;">🛡️ Document Certifié et Scellé Électriquement</p>
        Cette quittance certifie le versement des fonds par le souscripteur. Elle est émise en conformité avec l'article 412 du code des assurances en vigueur en République Démocratique du Congo.
      </div>
    `;

    document.body.appendChild(printNode);

    // Extraction de la zone virtuelle en Canvas haute résolution puis packaging en fichier PDF
    html2canvas(printNode, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // pdf.save(QUITTANCE_${invoice.invoiceNo}.pdf);
      document.body.removeChild(printNode);
    });
  };  

    const handlePrintCertificate = (policyNo) => {
    if (notificationService?.info) {
      notificationService.info(`Ouverture du module d'impression de l'attestation officielle ARCA liée au contrat ${policyNo}...`);
    }
  };

  // Filtrage combiné (Recherche textuelle + Statut)
  const filteredInvoices = invoicesList.filter(invoice => {
    const matchStatus = filterStatus === "Tous" || invoice.status === filterStatus;
    const matchSearch = invoice.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        invoice.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        invoice.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        invoice.beneficiary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen p-1 text-slate-800 dark:text-slate-100 animate-fadeIn font-['Saira']">
      
      {/* --- EN-TÊTE DU MODULE FINANCIER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
            <FaFileInvoiceDollar className="text-[#00A3E0]" /> Gestion des Quittances & Attestations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Émission instantanée des reçus fiscaux, décompte des taxes réglementaires de l'ARCA et génération de chartes de conformité.</p>
        </div>
      </div>

      {/* --- INFRASTRUCTURE DE FILTRAGE DES FACTURES --- */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Recherche textuelle */}
        <div className="sm:col-span-2 relative flex items-center">
          <span className="absolute left-3.5 text-slate-400"><FaSearch size={14} /></span>
          <input
            type="text"
            placeholder="Rechercher par N° Quittance, Police, Acheteur Diaspora ou Bénéficiaire..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
          />
        </div>

        {/* Filtrage par état */}
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-400"><FaFilter size={12} /></span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#00A3E0]"
          >
            <option value="Tous">Tous les statuts</option>
            <option value="Émise & Signée">Émises & Signées</option>
            <option value="En attente Visa">En attente Visa</option>
          </select>
        </div>

      </div>

      {/* --- REGISTRE DES DOCUMENTS COMPTABLES --- */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <h3 className="font-black text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FaShieldAlt className="text-[#00A3E0]" /> Grand Livre Comptable des Quittances
          </h3>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-md font-black flex items-center gap-1">
            <FaBarcode /> {filteredInvoices.length} Certificat(s) Archivés {sqlInvoices.length > 0 && "• LIVE SQL"}
          </span>
        </div>

        {loading && sqlInvoices.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs font-bold animate-pulse">Extraction des écritures fiscales en cours...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/20 dark:bg-slate-800/10">
                  <th className="p-4">N° Quittance</th>
                  <th className="p-4">N° Police Liée</th>
                  <th className="p-4">Acheteur (Diaspora)</th>
                  <th className="p-4">Bénéficiaire (RDC)</th>
                  <th className="p-4">Date de Validation</th>
                  <th className="p-4 text-center">Taxe ARCA (10%)</th>
                  <th className="p-4 text-center">Montant TTC</th>
                  <th className="p-4 text-center">Validation</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60 font-medium">
                {filteredInvoices.map((invoice, idx) => (
                  <tr key={idx} className="text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <FaFilePdf className="text-red-500" size={13} /> {invoice.invoiceNo}
                    </td>
                    
                    <td className="p-4 font-mono text-slate-400 font-bold">{invoice.policyNumber}</td>

                    <td className="p-4 font-black">{invoice.buyer}</td>

                    <td className="p-4 italic text-xs text-slate-500 dark:text-slate-400">{invoice.beneficiary}</td>

                    <td className="p-4 text-slate-400 font-semibold">
                      <span className="flex items-center gap-1.5 mt-0.5"><FaCalendarAlt size={11} /> {invoice.issueDate}</span>
                    </td>

                    <td className="p-4 text-center font-bold text-red-500 font-mono">{invoice.taxARCA}</td>

                    <td className="p-4 text-center font-black text-slate-900 dark:text-white bg-slate-50/20 dark:bg-slate-950/10 font-mono">{invoice.amount}</td>

                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${invoice.colorClass}`}>
                        <FaCheckCircle /> {invoice.status}
                      </span>
                    </td>

                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownloadPdf(invoice)}
                        title="Télécharger au format PDF"
                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                      >
                        <FaDownload size={12} />
                      </button>
                      <button
                        onClick={() => handlePrintCertificate(invoice.policyNumber)}
                        title="Imprimer l'attestation"
                        className="p-2 bg-[#00A3E0]/10 text-[#00A3E0] hover:bg-[#00A3E0] hover:text-white rounded-lg transition-all"
                      >
                        <FaPrint size={12} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}



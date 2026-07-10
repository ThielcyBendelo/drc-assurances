import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sql from 'mssql';

// Chargement des variables d'environnement
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuration SQL Server (Base de données DRC Assurances)
// Configuration SQL Server (Lecture stricte des accès du .env)
const dbConfig = {
    user: process.env.DB_USER,        // Prendra 'sa'
    password: process.env.DB_PASSWORD, // Prendra votre mot de passe
    server: process.env.DB_SERVER || 'localhost', 
    database: process.env.DB_NAME || 'DrcAssurancesDB',
    options: {
        encrypt: false, // Garder sur false pour SQLEXPRESS en local
        trustServerCertificate: true,
        enableArithAbort: true,
        connectTimeout: 15000
    }
};


// 💡 NOTE : Si la bibliothèque mssql exige un protocole d'authentification Windows, 
// elle va automatiquement utiliser les privilèges de votre session 'IRBENDELO' active.


// Connexion Initiale encapsulée dans une fonction asynchrone
// ✅ FIX : Empêche le crash fatal immédiat de Render si le serveur SQL met du temps à répondre
async function initializeDatabase() {
    try {
        const pool = await sql.connect(dbConfig);
        if (pool.connected) {
            console.log("✅ Connecté avec succès à SQL Server (DrcAssurancesDB)");
        }
    } catch (err) {
        console.error("❌ Erreur de connexion SQL Server :", err.message);
        console.log("💡 Note : Le serveur reste en ligne pour que Render ne coupe pas l'application.");
    }
}
initializeDatabase();

// =========================================================================
// 🌐 ACCUEIL ET DIAGNOSTICS DE L'ÉCOSYSTÈME
// =========================================================================

// ✅ AJOUTÉ : Route d'accueil racine pour éliminer définitivement le "Cannot GET /"
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; padding: 60px 20px; background-color: #0f172a; color: #f8fafc; min-h-screen: 100vh;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; padding: 40px; rounded-top: 16px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-bottom: 4px solid #00A3E0;">
                <h1 style="color: #00A3E0; margin-bottom: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">DRC Assurances</h1>
                <h3 style="color: #94a3b8; font-weight: 600; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Console Passerelle API</h3>
                <hr style="border: 0; border-top: 1px solid #334155; margin: 25px 0;" />
                <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6;">Le serveur API de production est actuellement <span style="color: #10b981; font-weight: bold;">En Ligne</span> et s'exécute de manière sécurisée.</p>
                <p style="color: #64748b; font-size: 12px; margin-bottom: 30px;">Réglementation et conformité sous la supervision de l'ARCA.</p>
                <a href="/api/status" style="display: inline-block; padding: 12px 24px; background-color: #00A3E0; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 14px; transition: background 0.2s;">Vérifier le statut système</a>
            </div>
        </div>
    `);
});

// Route de test d'intégrité de l'écosystème
app.get('/api/status', (req, res) => {
    res.json({ status: "En ligne", system: "DRC Assurances API", compliance: "ARCA" });
});

// =========================================================================
// 🛡️ ENDPOINT : CRUD DES SINISTRES (CLAIMS) POUR VOTRE PAGE ANALYTICS
// =========================================================================
app.get('/api/admin/claims', async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT c.*, p.PolicyNumber, p.InsuranceBranch, b.FirstName + ' ' + b.LastName AS BeneficiaryName
            FROM Claims c
            JOIN InsurancePolicies p ON c.PolicyID = p.PolicyID
            JOIN Beneficiaries b ON p.BeneficiaryID = b.BeneficiaryID
            ORDER BY c.EventDate DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =========================================================================
// 💳 ENDPOINT : JOURNAL DES TRANSACTIONS FINANCIÈRES (FINTECH & MOBILE MONEY)
// =========================================================================
app.get('/api/admin/payments', async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT p.*, ip.PolicyNumber, ip.InsuranceBranch, u.FirstName + ' ' + u.LastName AS BuyerName
            FROM Payments p
            JOIN InsurancePolicies ip ON p.PolicyID = ip.PolicyID
            JOIN Users u ON ip.BuyerID = u.UserID
            ORDER BY p.PaymentDate DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'extraction des flux financiers", details: err.message });
    }
});

// =========================================================================
// 📄 ENDPOINT : REGISTRE DES QUITTANCES ET COMPTABILITÉ ARCA
// =========================================================================
app.get('/api/admin/invoices', async (req, res) => {
    try {
        const result = await sql.query(`
            SELECT 
                ip.PolicyID,
                ip.PolicyNumber,
                ip.InsuranceBranch,
                ip.CoverageLevel,
                ip.StartDate,
                ip.EndDate,
                u.FirstName + ' ' + u.LastName AS BuyerName,
                u.Email AS BuyerEmail,
                b.FirstName + ' ' + b.LastName AS BeneficiaryName,
                b.City AS BeneficiaryCity,
                pay.TransactionReference,
                pay.AmountUSD,
                pay.TaxArcaUSD,
                pay.TotalPaidUSD,
                pay.PaymentDate
            FROM InsurancePolicies ip
            JOIN Users u ON ip.BuyerID = u.UserID
            JOIN Beneficiaries b ON ip.BeneficiaryID = b.BeneficiaryID
            JOIN Payments pay ON pay.PolicyID = ip.PolicyID
            ORDER BY pay.PaymentDate DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors du chargement des quittances", details: err.message });
    }
});



// ✅ FIX OBLIGATOIRE POUR DEPLOYER EN LIGNE : 
// Écouter sur l'hôte standard '0.0.0.0' pour que Render puisse router le trafic public vers votre port
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur DRC Assurances démarré sur le port ${PORT}`);
});

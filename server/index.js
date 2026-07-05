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
const dbConfig = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || process.env.DB_DATABASE || 'DrcAssurancesDB', // ✅ FIX : Gère à la fois DB_NAME et DB_DATABASE de votre .env
    options: {
        encrypt: true,
        trustServerCertificate: true,
        connectTimeout: 15000 // ✅ FIX : Évite le blocage infini sur Render si le réseau coupe
    }
};

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

// ✅ FIX OBLIGATOIRE POUR DEPLOYER EN LIGNE : 
// Écouter sur l'hôte standard '0.0.0.0' pour que Render puisse router le trafic public vers votre port
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur DRC Assurances démarré sur le port ${PORT}`);
});

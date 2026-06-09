import React from 'react';
import ClickAndCollect from '../components/ClickAndCollect.jsx'; // <-- Ajout de .jsx
import DevisGateau from '../components/DevisGateau.jsx'; 
import NavbarSecured from '../components/NavbarSecured';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-amber-50/20 py-8 px-4">
      <main className="container mx-auto space-y-12">
        {/* Module Click & Collect */}
        <NavbarSecured />
        <section id="boutique">
          <ClickAndCollect />
        </section>

        {/* Séparateur */}
        <div className="border-t border-dashed border-amber-200 my-10 max-w-4xl mx-auto"></div>

        {/* Formulaire de Devis */}
        <section id="devis-sur-mesure">
          <DevisGateau />
        </section>
          <FAQSection />
              <Footer />
      </main>
    </div>
  );
}

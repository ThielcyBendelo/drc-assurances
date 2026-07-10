import React from 'react';
import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md select-none pointer-events-auto"
    >
      {/* 1. BARRE DE PROGRESSION TOP (Style Fintech rapide) */}
      <motion.div 
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#CE1126] via-[#00A3E0] to-[#FDD100]"
      />

      {/* ================= SPINNER STYLE IOS INTERACTIF AU CENTRE ================= */}
      <div className="relative flex flex-col items-center space-y-5">
        <div className="ios-spinner">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
          <div className="bar7"></div>
          <div className="bar8"></div>
          <div className="bar9"></div>
          <div className="bar10"></div>
          <div className="bar11"></div>
          <div className="bar12"></div>
        </div>

        {/* Texte indicatif dynamique conservé */}
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[3px] text-slate-800 dark:text-white">
            DRC Assurances
          </p>
          <p className="text-[9px] uppercase tracking-[1px] text-slate-400 font-bold mt-1.5 animate-pulse">
            Sécurisation de l'espace...
          </p>
        </div>
      </div>
    </motion.div>
  );
}

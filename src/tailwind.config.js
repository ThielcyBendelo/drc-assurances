/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Gère le mode sombre de votre Navbar/FAQ
  theme: {
    extend: {
      // ✅ AJOUTEZ CE BLOC POUR ACTIVER LES NOUVELLES POLICES
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],           // Crée une classe réutilisable font-roboto
        Saira: ['Saira', 'sans serif'],
        Antonio: ['Antonio', 'sans serif']
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // S'assure que Tailwind lit bien tous vos composants React
  ],
  theme: {
    extend: {
      fontFamily: {
        // Ajoute la police "Plus Jakarta Sans" comme police sans-serif par défaut
        sans: ['"Plus Jakarta Sans"', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

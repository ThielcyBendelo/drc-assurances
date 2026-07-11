/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Idéal pour les paragraphes, boutons et petits textes (Lisibilité maximale)
        roboto: ['Roboto', 'sans-serif'],
        // Idéal pour votre grand titre moderne et pro
        saira: ['Saira', 'sans-serif'],
        // Disponible au besoin pour vos autres interfaces
        antonio: ['Antonio', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

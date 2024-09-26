/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}', // HTML va JavaScript fayllaridagi classlarni aniqlash uchun
  ],
  theme: {
    extend: {
      // active klass uchun o'zgarishlar
      colors: {
        'active-bg': '#1d4ed8', // Masalan, ko'k rang
        'active-text': '#ffffff', // Oq rang
      },
    },
  },
  plugins: [],
}

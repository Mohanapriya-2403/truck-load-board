/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        truckYellow: '#facc15', // Amber-400
        truckRed: '#dc2626',    // Red-600
      }
    },
  },
  plugins: [],
}
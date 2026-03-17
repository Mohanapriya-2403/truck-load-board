/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        truckYellow: '#facc15', 
        truckRed: '#dc2626',    
      }
    },
  },
  plugins: [],
}
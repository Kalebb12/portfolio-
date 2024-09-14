/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        custom1:"0px 8px 16px -3px #18274B14 , 0px 6px 8px -3px #18274B1F"
      },
      screens:{
        xSm : "480px"
      }
    },
  },
  plugins: [],
}
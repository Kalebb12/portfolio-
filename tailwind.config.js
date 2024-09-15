/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        custom1:"0px 8px 16px -3px #18274B14 , 0px 6px 8px -3px #18274B1F",
        focusShadow:" 0px 6px 5px -2px #18274B14 ,6px 0px 5px -2px #18274B14"
      },
      screens:{
        xSm : "480px"
      }
    },
  },
  plugins: [],
}
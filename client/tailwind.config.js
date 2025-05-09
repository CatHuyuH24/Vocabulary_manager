/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "420px", 
      },
      fontFamily: {
        lobster: ["Lobster", "sans-serif"],
        play: ["Play", "sans-serif"],
      },
    },
  },
  plugins: [],
};

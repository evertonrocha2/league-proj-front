/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        GeistSans: ["Geist Sans", "sans-serif"],
        GeistMono: ["Geist Mono", "monospace"],
        KTProj: ["KT Project", "sans-serif"],
      },
    },
  },
  plugins: [],
};

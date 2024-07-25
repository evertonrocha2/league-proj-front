/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        GeistSans: ["Geist Sans", "sans-serif"],
        GeistMono: ["Geist Mono", "monospace"],
        Orbitron: ["Orbitron", "sans-serif"],
        Tiny5: ["Tiny5", "sans-serif"],
        Michroma: ["Michroma", "sans-serif"],
        BeaufortForLol: ["Beaufort ForLol", "sans-serif"],
      },
    },
  },
  plugins: [],
};

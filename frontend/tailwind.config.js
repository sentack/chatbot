/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      colors: {
        gray: {
          850: "#1f2937",
          950: "#0f172a",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(168, 85, 247, 0.3)",
        "glow-lg": "0 0 40px rgba(168, 85, 247, 0.4)",
      },
    },
  },
  plugins: [],
};

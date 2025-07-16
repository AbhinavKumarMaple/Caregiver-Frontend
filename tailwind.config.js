/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#87bdf0",
        secondary: "#2DA6FF14",
        tertiary: "#0D5D59",
        caregray: "#616161",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.3s ease-out forwards",
        shimmer: "shimmer 1.5s infinite linear",
      },
      backgroundImage: {
        shimmer:
          "linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.2) 20%, transparent 40%)",
      },
      backgroundSize: {
        shimmer: "200% 100%",
      },
    },
  },
  plugins: [],
};

/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if using React/Vite/Next.js
  ],
  theme: {
    extend: {
      screens: {
        xs: "576px", // Small phones
        // sm: "640px", // Small tablets (default in Tailwind)
        // md: "768px",
        lg2: "992px", // Large tablets / small laptops
        // lg: "1024px",
        xl2: "1200px", // Extra large desktops
        // xl: "1280px",
        xxl: "1400px", // Wide screens
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode via a CSS class
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A5F", // Deep Navy Blue (Main Backgrounds, Headers)
        secondary: "#ff000c", // Crimson Red (Buttons, Call-to-Action)
        accent: "#4A90E2", // Light Blue (Hover Effects, Highlights)
        dark: "#202020", // Rich Black (Text, Footers, Navbar)
        light: "#F8F9FA", // Soft White (Backgrounds, Cards)
        muted: "#B0B3B8", // Muted Gray (Subtext, Borders, Secondary Buttons)
        lightBackground: "#ffffff", // White for light mode background
        darkBackground: "#111827", // Dark Blue-Black for dark mode
      },

      backgroundImage: {
        hero: "url('/christian-dark.jpg')",
        "church-banner-dark": "url('/praying.jpg')",
      },
    },
  },
  plugins: [],
  scrollBehavior: ["smooth"],
};

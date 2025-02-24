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
        "mobile-dark-hero": `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(/man-praying.jpg)`,
        "mobile-hero": `linear-gradient(rgba(255, 0, 12, 0.2), rgba(0, 0, 0, 0.5)), url(/man-praying.jpg)`,
        logo: "url('/logo.png')",
        "church-hero": `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('/hands3.jpg')`,
        "thank-you": "url('/thank-you.jpg')",
        "thank-you-dark": `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('/thanks-dark.jpg')`,
      },
    },
  },
  plugins: [],
  scrollBehavior: ["smooth"],
};
